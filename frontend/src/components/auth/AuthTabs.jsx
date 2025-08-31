import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
      <div className="relative w-full bg-white shadow-xl overflow-hidden flex">
        {/* Left Panel */}
        <div className="w-1/2 h-screen bg-gradient-to-br from-purple-500 to-pink-500 text-white flex flex-col justify-center items-center p-12">
          
          <h2 className="text-5xl font-bold mb-2">
            {activeTab === "login" ? "Welcome Back!" : "Hello, Friend!"}
          </h2>
          <p className="text-center mb-10">
            {activeTab === "login"
              ? "Login to your account"
              : "Create your account now"}
          </p>
          <button
            onClick={() =>
              setActiveTab(activeTab === "login" ? "register" : "login")
            }
            className="px-6 py-2 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-pink-500 transition"
          >
            {activeTab === "login" ? "Register" : "Login"}
          </button>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 h-screen flex flex-col justify-center p-12 transition-transform duration-500 ease-in-out">
          {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default AuthTabs;

