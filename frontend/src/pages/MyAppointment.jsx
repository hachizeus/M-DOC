import  { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import React from "react";

const MyAppointment = () => {
  const { backendUrl, token, getDoctorData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [merchantRequestID, setMerchantRequestID] = useState("");
  const [status, setStatus] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  {merchantRequestID && <p className="text-sm text-gray-600">Merchant Request ID: {merchantRequestID}</p>}
  {status && <p className="text-sm text-gray-600">Payment Status: {status}</p>}

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handlePayment = async () => {
    if (!phone || !amount) {
      toast.error("Please enter phone number and amount.");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/stk-push`, {
        phone,
        amount,
      });

      setMerchantRequestID(response.data.MerchantRequestID);
      toast.info("Request sent. Please enter M-Pesa PIN.");
      checkTransactionStatus(response.data.MerchantRequestID);
      setShowPayment(false);
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Payment failed");
    }
  };

  const checkTransactionStatus = async (merchantRequestID) => {
    let attempts = 0;
    const maxAttempts = 10; // Increase attempts if needed
    let delay = 4000; // Start with 4 seconds
  
    const poll = async () => {
      try {
        const res = await axios.get(`${backendUrl}/transaction-status/${merchantRequestID}`);
        console.log("Transaction Status Response:", res.data);
        setStatus(res.data.status);
  
        if (res.data.status === "Success") {
          toast.success("Payment Successful!");
          getUserAppointments(); // Refresh appointments
          return;
        } else if (res.data.status === "Failed") {
          toast.error("Payment Failed!");
          return;
        }
  
        if (++attempts < maxAttempts) {
          setTimeout(poll, delay);
          delay *= 1.5; // Exponential backoff
        } else {
          toast.error("Transaction timed out. Please try again.");
        }
      } catch (error) {
        console.error("Status Check Error:", error);
        toast.error("Error checking transaction status.");
      }
    };
  
    poll();
  };
  
  
  

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);
  
  useEffect(() => {
    console.log("Updated Appointments:", appointments);
    appointments.forEach((item) => {
      console.log(`Appointment ID: ${item._id} | isCompleted: ${item.isCompleted} | Payment: ${item.payment}`);
    });
  }, [appointments]);
  
  

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        My <span className="text-blue-600">Appointments</span>
      </h2>

      <div className="space-y-4">
        {appointments.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Doctor Image */}
              <div className="flex-shrink-0 w-full md:w-48">
                <div className="relative pb-[120%]">
                  <img
                    className="absolute w-full h-full rounded-xl object-cover border-2 border-blue-50"
                    src={item.docData.image}
                    alt={item.docData.name}
                    style={{ objectPosition: "top center" }}
                  />
                </div>
              </div>

              {/* Appointment Details */}
              <div className="flex-1 grid gap-4 md:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800">{item.docData.name}</h3>
                  <p className="text-sm text-gray-600">{item.docData.speciality}</p>
                  <p className="text-sm text-gray-600">
                    {item.docData.address.line1}, {item.docData.address.line2}
                  </p>
                  <p className="text-sm text-gray-600">Fee: KES {item.fee}</p>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Date: {item.slotDate} | Time: {item.slotTime}
                  </p>

                  <div className="md:text-right">
                    {!item.cancelled && !item.isCompleted && (
                      <>
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors w-full md:w-auto"
                        >
                          Cancel Appointment
                        </button>
                        <button
                          onClick={() => {
                            setShowPayment(true);
                            setSelectedAppointment(item);
                          }}
                           className='px-4 py-2 ml-2 text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors w-full md:w-auto'
                        >
                          Pay Now
                        </button>
                      </>
                    )}
                    {item.cancelled && !item.isCompleted && (
                      <button className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg transition-colors w-full md:w-auto">
                        Appointment Cancelled
                      </button>
                    )}
                    {item.isCompleted && (
                      <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                        Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Modal */}
      {showPayment && selectedAppointment && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-green-600 mb-4 text-center">M-Pesa Payment</h2>
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-green-600 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border border-green-600 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={handlePayment} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
              Pay
            </button>
            <button onClick={() => setShowPayment(false)} className="w-full mt-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
