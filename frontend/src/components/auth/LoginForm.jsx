import { useState } from "react";
import { loginUser } from "../../services/authServices.js";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      setMessage(data.message);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="w-2/4 m-auto flex flex-col gap-4 p-4"
      >
        <div className="mb-4"> 
            <h1 className="text-center leading-none text-xl">Login Into</h1>
            <h1 className="text-center text-5xl font-bold mb-4 leading-none">iExpense</h1>
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="border py-3 px-5 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-200"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="border py-3 px-5 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-200"
        />
        <button
          type="submit"
          className="bg-purple-500 text-white py-3 rounded-full font-semibold hover:bg-purple-600 transition"
        >
          Login
        </button>
        {message && <p className="text-green-600 mt-2">{message}</p>}
      </form>
    </>
  );
};

export default LoginForm;
