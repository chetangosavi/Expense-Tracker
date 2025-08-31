import { useState } from "react";
import { registerUser } from "../../services/authServices.js";

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      setMessage(data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister} className="w-2/4 m-auto flex flex-col gap-4">
     <div className="mb-4">
            <h1 className="text-center leading-none text-xl">Create Account</h1>
            <h1 className="text-center text-5xl font-bold mb-4 leading-none">iExpense</h1>
        </div>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
        className="border py-3 px-5 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="border py-3 px-5 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="border py-3 px-5 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        type="submit"
        className="bg-purple-500 text-white py-3 rounded-full font-semibold hover:bg-purple-600 transition"
      >
        Register
      </button>
      {message && <p className="text-green-600 mt-2">{message}</p>}
    </form>
  );
};

export default RegisterForm;
