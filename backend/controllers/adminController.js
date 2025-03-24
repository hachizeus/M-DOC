import express from 'express';
import multer from 'multer';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import userModel from '../models/userModel.js'
import appointmentModel from '../models/appointmentModel.js'
import jwt from 'jsonwebtoken'

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json()); // For parsing application/json

// API for adding a doctor
const addDoctor = async (req, res) => {
    try {
        console.log(req.file); // Debugging line
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        if (!imageFile) {
            return res.json({ success: false, message: "No file uploaded" });
        }

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Validation of email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validating password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Prepare doctor data
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address), // Assuming address is a JSON string
            date: Date.now()
        };

        // Save doctor data to the database
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        // Send success response
        res.json({ success: true, message: "Doctor added successfully" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Define your route
app.post('/add-doctor', upload.single('image'), addDoctor);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});

 //API for admi login
 const loginAdmin = async (req,res) => {
    try {

        const {email,password} = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})

        }else{
            res.json({success:false,message:"Invalid credentials"})
        }
        
    } catch (error) {
        console.log(error);
        res.json({ success: false,message:error.message });
    }
    
 }
 //Api to get doctors list for admin panel
 const allDoctors = async (req,res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error);
        res.json({success: false,message:error.message });
    }
    
 }
 //Api to get appointment for admin panel
 const appointmentsAdmin = async (req,res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error);
        res.json({success: false,message:error.message });
    }
    
 }

 //Api for Appointment Cancelation
 const appointmentCancel = async (req,res) =>{
    try {
        const { appointmentId} = req.body
    
        const appointmentData = await appointmentModel.findById(appointmentId)

    
        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})
    
        //Release doctor slot
    
        const {docId, slotDate, slotTime} = appointmentData
        const doctorData = await doctorModel.findById(docId)
    
        let slots_booked = doctorData.slots_booked
    
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
    
        await doctorModel.findByIdAndUpdate(docId, {slots_booked})
        res.json({success:true, message:'Appointment Cancelled'})
    
    } catch (error) {
        console.log(error);
            res.json({ success: false, message: error.message });
    }
    }

    //Api to get Dasboard Data for admin panel
    const adminDasboard = async (req,res) => {
        try {
            const doctors = await doctorModel.find({})
            const users = await userModel.find({})
            const appointments = await appointmentModel.find({})
            
            const dashData = {
                doctors:doctors.length,
                appointments:appointments.length,
                patients:users.length,
                latestAppointments: appointments.reverse().slice(0,5)

            }
            res.json({success:true,dashData})
        
        } catch (error) {
            console.log(error);
            res.json({success: false,message:error.message });
        }
        
     }

export { addDoctor,loginAdmin,allDoctors, appointmentsAdmin,appointmentCancel, adminDasboard };