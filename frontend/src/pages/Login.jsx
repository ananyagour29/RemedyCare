
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Login = () => {
  const { axios, navigate, setUserToken } = useAppContext();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post("/api/user/send-otp", {
        email,
      });

      if (data.success) {
        // Existing user => direct login
        if (data.token) {
          localStorage.setItem("userToken", data.token);
          localStorage.setItem("userEmail", email);

          if (setUserToken) {
            setUserToken(data.token);
          }

          toast.success("Welcome Back");
          navigate("/home");
          return;
        }

        toast.success("OTP sent successfully");
        setOtpSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post("/api/user/verify-otp", {
        email,
        otp,
      });

      if (data.success) {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userEmail", email);

        if (setUserToken) {
          setUserToken(data.token);
        }

        toast.success("Login successful");
        navigate("/home");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="w-full max-w-md bg-white border rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            User Login
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Login using Email OTP
          </p>

          <form onSubmit={verifyOtp}>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border p-3 rounded mb-4 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {!otpSent ? (
              <button
                type="button"
                onClick={sendOtp}
                disabled={loading}
                className="w-full bg-cyan-600 text-white py-3 rounded"
              >
                {loading ? "Sending..." : "Continue"}
              </button>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full border p-3 rounded mb-4 outline-none"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyan-600 text-white py-3 rounded"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </>
            )}
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => navigate("/admin")}
              className="text-cyan-600 hover:underline"
            >
              Are you an admin? Login here
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;