import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userName.trim().length === 0 || password.trim().length === 0) {
      alert("Invalid username or password");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        import.meta.env.VITE_LOGIN_URL,
        {
          userName,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (!response.status === 200) {
        throw new Error("Failed to log in");
      }

      // Handle successful response
      const data = response.data;
      // console.log("Login successful:", data.success);
      if (data.success) {
        dispatch(login(data.userName));
        toast.success("login successful", { autoClose: 2000 });
        setTimeout(() => navigate("/dash"), 500);
        return;
      }
    } catch (error) {
      toast.error(error.response?.data?.error);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="login-main">
        {/* <div className="login-left">
        <img src={Image} alt="" />
      </div> */}
        <div className="login-right">
          <div className="login-right-container">
            {/* <div className="login-logo">
            <img src={Logo} alt="" />
          </div> */}
            <div className="login-center">
              <h2>Welcome back!</h2>
              <p>Please enter your details</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="userName"
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}
                />
                <div className="pass-input-div">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {showPassword ? (
                    <FaEyeSlash
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FaEye onClick={() => setShowPassword(!showPassword)} />
                  )}
                </div>

                <div className="login-center-buttons">
                  <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Log In"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginAdmin;
