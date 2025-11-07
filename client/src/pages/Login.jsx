// import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

//Components
import Alert from "../components/Alert";

const Login = ({ alert, showAlert }) => {
  const [adminLogin, setAdminLogin] = useState({
    email: "",
    psw: "",
  });

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/admin", { replace: true });
    }
  }, []);

  const onChangeHandler = (e) => {
    setAdminLogin({
      ...adminLogin,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        "http://localhost:5500/api/user/login",
        adminLogin
      );
      console.log(data);
      if (data.status === "User Verified") {
        console.log(data);
        console.log(data.status);
        showAlert({
          type: "success",
          msg: data.status,
        });
        // Store both tokens for compatibility
        localStorage.setItem("adminToken", "true");
        localStorage.setItem("token", data.token);
        navigate("/admin", { replace: true });
      } else {
        showAlert({
          type: "danger",
          msg: data.error,
        });
      }
    } catch (error) {
      console.log(error);
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }

      showAlert({
        type: "danger",
        msg: error.response?.data?.error || "Login failed",
      });
    }
  };

  return (
      <>
        <div className="flex justify-center items-center min-h-screen bg-gray-300">
          <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
            {/* Title */}
            <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
              Login into admin panel
            </h1>

            {/* Form */}
            <Alert alert={alert} />
            <form onSubmit={onSubmitHandler} className="space-y-4">
              <p className="text-gray-600 text-sm text-center">
                Please fill this form to login
              </p>
              <hr className="my-4" />

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-semibold text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  onChange={onChangeHandler}
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="psw"
                  className="block font-semibold text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="psw"
                  name="psw"
                  placeholder="Enter password"
                  required
                  onChange={onChangeHandler}
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <hr className="my-4" />

              {/* Terms */}
              <p className="text-sm text-gray-600 text-center">
                By logging in you agree to our{" "}
                <a
                  href="#"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Terms & Privacy
                </a>
              </p>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>

              {/* Register Link */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </>
    );
};

export default Login;
