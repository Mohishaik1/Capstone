import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';

// styles

//components
import Alert from '../components/Alert';
import { use } from "react";



const Register = ({alert, showAlert}) => {

    const [registerFormData, setRegisterFormData] = useState({
        fullname: '',
        email: '',
        phone: '',
        psw: '',
        pswRepeat: ''
    });

    const navigate = useNavigate;

    const onChangeHandler = (e)=>{
        try {
            console.log(e.target.name, e.target.value);
            setRegisterFormData({
                ...registerFormData,
                [e.target.name]: e.target.value
            });
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmitHandler = async (e)=>{
        try {
            e.preventDefault();
            if(registerFormData.psw !== registerFormData.pswRepeat){
                showAlert({
                  type: 'danger',
                  msg: 'Passwords do not match'
                });
            } else {
                const {data} = await axios.post('http://localhost:5500/api/user/register', registerFormData);
                console.log(data);
                showAlert({
                  type: 'success',
                  msg: data.success
                })
               navigate('/login'); 
            }
        } catch (error) {
            console.log(error);
            showAlert({
              type: 'danger',
              msg: error.response.data.error
            })
        }
    }

  return (
    <>
       <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          Al-Hateem
        </h1>

        {/* Alert */}
        <Alert alert={alert} />

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <p className="text-gray-600 text-sm text-center">
            Please fill this form to create an account
          </p>
          <hr className="my-4" />

          {/* Full Name */}
          <div>
            <label htmlFor="fullname" className="block font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter your full name"
              required
              onChange={onChangeHandler}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              onChange={onChangeHandler}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              required
              onChange={onChangeHandler}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="psw" className="block font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="psw"
              name="psw"
              placeholder="Enter password"
              required
              onChange={onChangeHandler}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="pswRepeat" className="block font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="pswRepeat"
              name="pswRepeat"
              placeholder="Re-enter password"
              required
              onChange={onChangeHandler}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <hr className="my-4" />

          {/* Terms */}
          <p className="text-sm text-gray-600 text-center">
            By creating an account you agree to our{" "}
            <a href="#" className="text-green-600 font-semibold hover:underline">
              Terms & Privacy
            </a>
          </p>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Register
          </button>

          {/* Sign-in */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?
              <Link to="/login" className="text-green-600 font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;