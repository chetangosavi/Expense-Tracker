import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Navbar from "./Navbar";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch logged-in user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json();
        console.log("User Data",data)
        setUser(data); // assuming backend sends { user: { name, email, ... } }
      } catch (err) {
        console.error(err);
        navigate("/"); // redirect to login if not authorized
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-4/5 m-auto flex-1">
        <Navbar
            toggleView={() => navigate("/dashboard")}
            currentView="profile"
          />
        <div className="bg-white shadow rounded p-6 max-w-md mx-auto">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Name</h2>
            <p className="text-gray-700">{user.name}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold">Email</h2>
            <p className="text-gray-700">{user.email}</p>
          </div>

          {/* Add more fields if available */}
          {user.role && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Role</h2>
              <p className="text-gray-700">{user.role}</p>
            </div>
          )}

          <Button
            title="Logout"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/", { replace: true });
            }}
            className="bg-red-500 hover:bg-red-600 mt-4 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
