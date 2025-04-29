import React, { useState } from "react";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    MobileNumber: "",
    Password: "",
    ConfirmPassword: "",
    usertype: "User", // default
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Registration failed");

        alert("✅ " + data.message);
        console.log("Registered:", data);

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
        console.error("Register error:", error.message);
        alert("❌ " + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      
      try {
        const res = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: formData.Email,
            Password: formData.Password,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");

        alert("✅ " + data.message);
        console.log("Logged in:", data);

        
        window.location.href = "https://admin-charity-bg56.vercel.app/";
      } catch (error) {
        console.error("Login error:", error.message);
        alert("❌ " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isRegister ? "Register" : "Login"}
        </h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300"
                  value={formData.FullName}
                  onChange={(e) =>
                    setFormData({ ...formData, FullName: e.target.value })
                  }
                />
              </div>
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="Enter your mobile number"
                  className="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300"
                  value={formData.MobileNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, MobileNumber: e.target.value })
                  }
                />
              </div>
            </>
          )}
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300"
              value={formData.Email}
              onChange={(e) =>
                setFormData({ ...formData, Email: e.target.value })
              }
            />
          </div>
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300"
              value={formData.Password}
              onChange={(e) =>
                setFormData({ ...formData, Password: e.target.value })
              }
            />
          </div>
          {isRegister && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300"
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
            className={`w-full mt-4 p-2 rounded-lg text-white ${
              loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
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
            className="text-blue-500 hover:underline"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
