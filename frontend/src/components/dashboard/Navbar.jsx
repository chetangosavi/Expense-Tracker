import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Modal from "../modal/Modal.jsx";
import CreateExpenseForm from "./CreateExpenseForm.jsx";

const Navbar = ({ onAddExpense, toggleView, currentView }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const goToProfile = () => {
    navigate("/profile"); // navigate to profile route
  };

  return (
    <>
      {/* Navbar */}
      <div className="flex justify-between items-center py-2 mb-5">
        <h1 className="text-3xl font-bold">Expense Tracker</h1>
        <div className="flex gap-4">
          <Button
            title="+ Create Expense"
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 hover:bg-green-600"
          />
          {/* Toggle View Button */}
          {toggleView && (
            <Button
              title={
                currentView === "accordion"
                  ? "Switch to Tabs"
                  : "Switch to Accordion"
              }
              onClick={toggleView}
              className="bg-blue-500 hover:bg-blue-600"
            />
          )}
          <Button
            title="Logout"
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600"
          />
          {/* Profile Icon Button */}
          <Button
            onClick={goToProfile}
            className="bg-gray-300 hover:bg-gray-300 p-2 rounded-full text-xl"
            title="👤"
          />
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateExpenseForm
          onClose={() => setIsModalOpen(false)}
          onSubmit={(data) => {
            console.log("Expense created:", data);
            onAddExpense(data);
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
};

export default Navbar;
