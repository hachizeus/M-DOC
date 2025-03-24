import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const {backendUrl, token, setToken} = useContext(AppContext)
  const navigate = useNavigate()
  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Sign Up') {
        const {data} = await axios.post(backendUrl + '/api/user/register',{name,password,email})
        if (data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
          
        } else {  
          toast.error(data.message)
        }
        
      }else {
        const {data} = await axios.post(backendUrl + '/api/user/login',{password,email})
        if (data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
          
        }else{
          toast.error(data.message)
        }
      }
      
    } catch (error) {
      toast.error(error.message)
      
    }
    // Add your form submission logic here
  }
  useEffect(()=>{
    if (token) {
      navigate('/')
    }

  },[token])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <form 
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl"
      >
        <div className="p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {state === 'Sign Up' ? "Welcome!" : "Welcome Back!"}
            </h2>
            <p className="text-gray-500">
              {state === 'Sign Up' 
                ? "Create your account to continue"
                : "Sign in to your account"}
            </p>
          </div>

          {state === "Sign Up" && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                type="text"
                placeholder="John Din"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              type="email"
              placeholder="john@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button
            type='submit'
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.01]"
          >
            {state === 'Sign Up' ? "Create Account" : "Sign In"}
          </button>

          <div className="text-center text-sm text-gray-600">
            {state === "Sign Up" ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setState('Login')}
                  className="text-blue-600 hover:text-blue-800 font-medium underline transition-colors"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setState('Sign Up')}
                  className="text-blue-600 hover:text-blue-800 font-medium underline transition-colors"
                >
                  Register here
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login