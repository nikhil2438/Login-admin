// 
import React, { useState } from "react";
import logo from "../assets/logo.png";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    MobileNumber: "",
    Password: "",
    ConfirmPassword: "",
    usertype: "User",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isRegister) {
      if (formData.Password !== formData.ConfirmPassword) {
        alert("Passwords do not match");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Registration failed");

        alert("✅ " + data.message);
        setFormData({
          FullName: "",
          Email: "",
          MobileNumber: "",
          Password: "",
          ConfirmPassword: "",
          usertype: "User",
        });
        setIsRegister(false);
      } catch (error) {
        alert("❌ " + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const res = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Email: formData.Email,
            Password: formData.Password,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");

        alert("✅ " + data.message);
        window.location.href = "https://admin-charity-bg56.vercel.app/";
      } catch (error) {
        alert("❌ " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-red-500 to-orange-600 p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <img src={logo} alt="Ma Siddheshwari Logo" className="w-20 h-20 mb-3" />
          <h1 className="text-xl font-semibold text-orange-600 mb-1">
            Welcome to Ma Siddheshwari App
          </h1>
          <h2 className="text-2xl font-bold text-orange-700">
            Ma Siddheshwari Trust
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <div className="mb-3">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-orange-400"
                  value={formData.FullName}
                  onChange={(e) =>
                    setFormData({ ...formData, FullName: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="Mobile number"
                  className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-orange-400"
                  value={formData.MobileNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, MobileNumber: e.target.value })
                  }
                />
              </div>
            </>
          )}
          <div className="mb-3">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-orange-400"
              value={formData.Email}
              onChange={(e) =>
                setFormData({ ...formData, Email: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-orange-400"
              value={formData.Password}
              onChange={(e) =>
                setFormData({ ...formData, Password: e.target.value })
              }
            />
          </div>
          {isRegister && (
            <div className="mb-3">
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-orange-400"
                value={formData.ConfirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, ConfirmPassword: e.target.value })
                }
              />
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-2 rounded-lg text-white font-semibold transition duration-200 ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading
              ? isRegister
                ? "Registering..."
                : "Logging in..."
              : isRegister
              ? "Register"
              : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-orange-600 hover:underline font-medium"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
