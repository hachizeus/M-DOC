import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import axios from 'axios';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

// App configuration
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

// M-Pesa Transaction Handling
let transactionStatus = {};

const getOAuthToken = async () => {
  const auth = Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`).toString('base64');
  try {
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      { headers: { Authorization: `Basic ${auth}` } }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('OAuth Error:', error.response?.data || error.message);
    return null;
  }
};

app.post('/stk-push', async (req, res) => {
  console.log("STK Push Request Body:", req.body); 
  const token = await getOAuthToken();
  if (!token) return res.status(500).json({ message: 'Failed to obtain OAuth token' });

  const timestamp = new Date().toISOString().replace(/[-:.T]/g, '').slice(0, 14);
  const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');

  const { phone, amount } = req.body;
  const data = {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phone,
    PartyB: process.env.MPESA_SHORTCODE,
    PhoneNumber: phone,
    CallBackURL: `${process.env.CALLBACK_URL}/callback`,
    AccountReference: 'Test',
    TransactionDesc: 'Payment',
  };

  try {
    const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.MerchantRequestID) {
      transactionStatus[response.data.MerchantRequestID] = 'Pending';
    }

    res.json(response.data);
  } catch (error) {
    console.error('STK Push Error:', error.response?.data || error.message);
    res.status(500).json(error.response?.data || { message: 'Unknown STK push error' });
  }
});

app.post('/callback', (req, res) => {
  console.log('Callback Received:', JSON.stringify(req.body, null, 2));

  if (!req.body.Body || !req.body.Body.stkCallback) {
    console.error('Invalid callback format:', req.body);
    return res.status(400).json({ message: 'Invalid callback data' });
  }

  const { MerchantRequestID, ResultCode } = req.body.Body.stkCallback;
  
  if (!MerchantRequestID) {
    console.error('Missing MerchantRequestID in callback:', req.body);
    return res.status(400).json({ message: 'Invalid callback data' });
  }

  transactionStatus[MerchantRequestID] = ResultCode === 0 ? 'Success' : 'Failed';
  console.log(`Updated transaction ${MerchantRequestID} to ${transactionStatus[MerchantRequestID]}`);

  res.status(200).json({ message: 'Callback processed successfully' });
});


app.get('/transaction-status/:merchantRequestID', (req, res) => {
  const status = transactionStatus[req.params.merchantRequestID] || 'Pending';
  res.json({ status });
});

app.get('/', (req, res) => {
  res.send('API WORKING GREAT');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
