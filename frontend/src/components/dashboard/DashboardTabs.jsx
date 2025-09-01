import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SummaryCard from "./SummaryCard";
import ExpenseTable from "./Expensetable";
import LineChart from "./LineChart.jsx";
import BarChart from "./BarChart.jsx";
import PieChart from "./PieChart.jsx";
import Modal from "../modal/Modal.jsx";
import CreateExpenseForm from "./CreateExpenseForm.jsx";
import { getExpenses } from "../../services/expenseServices.js";
import Footer from "./Footer.jsx";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../constant/constants.js";

const DashboardTabs = () => {
  const [expenses, setExpenses] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [activeTab, setActiveTab] = useState("Summary");
  const navigate = useNavigate();
  // Fetch expenses
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data.expenses || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Add, edit, delete handlers
  const handleAddExpense = (newExpense) =>
    setExpenses((prev) => [newExpense, ...prev]);

  const handleDeleteExpense = async (id) => {
    try {
      await fetch(`${backendUrl}/expenses/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setIsEditModalOpen(true);
  };

  const handleEditExpense = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((e) => (e._id === updatedExpense._id ? updatedExpense : e))
    );
  };

  // Summary calculations
  const totalExpense = expenses.reduce((acc, e) => acc + (e.amount || 0), 0);

  const monthlyExpense = expenses
    .filter((e) => {
      const date = new Date(e.date);
      const now = new Date();
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    })
    .reduce((acc, e) => acc + (e.amount || 0), 0);

  const categoryTotals = expenses.reduce((acc, e) => {
    if (!e.category) return acc;
    acc[e.category] = (acc[e.category] || 0) + (e.amount || 0);
    return acc;
  }, {});

  const monthlyExpensesList = expenses.filter((e) => {
    const date = new Date(e.date);
    const now = new Date();
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  });

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="w-4/5 m-auto flex-1">
          <Navbar
            onAddExpense={handleAddExpense}
            toggleView={() => navigate("/dashboard")}
            currentView="tabs"
          />

          {/* Tabs */}
          <div className="mt-6">
            <div className="flex border-b border-gray-300 mb-6">
              {["Summary", "All Records", "Monthly Records", "Analytics"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 -mb-px font-medium border-b-2 transition-colors ${
                      activeTab === tab
                        ? "border-blue-500 text-blue-500"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            {/* Tab Contents */}
            {activeTab === "Summary" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 my-6">
                <SummaryCard
                  title="Total Expenses"
                  amount={totalExpense || 0}
                  color="bg-green-100 text-black"
                  icon="💰"
                />
                <SummaryCard
                  title="This Month"
                  amount={monthlyExpense || 0}
                  color="bg-blue-100 text-black"
                  icon="📅"
                />
                {[
                  "Food",
                  "Transport",
                  "Groceries",
                  "Shopping",
                  "Bills",
                  "Entertainment",
                  "Utilities",
                  "Other",
                ].map((cat) => (
                  <SummaryCard
                    key={cat}
                    title={cat}
                    amount={categoryTotals[cat] || 0}
                    color="bg-white text-gray-800"
                    icon="📌"
                  />
                ))}
              </div>
            )}

            {activeTab === "All Records" && (
              <div className="my-6">
                <ExpenseTable
                  expenses={expenses}
                  onDelete={handleDeleteExpense}
                  onEdit={openEditModal}
                />
              </div>
            )}

            {activeTab === "Monthly Records" && (
              <div className="my-6">
                <ExpenseTable
                  expenses={monthlyExpensesList}
                  onDelete={handleDeleteExpense}
                  onEdit={openEditModal}
                />
              </div>
            )}

            {activeTab === "Analytics" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[80vh] max-h-[800px] mt-2 mb-5">
                <div className="flex flex-col gap-6 h-full">
                  <div className="flex-1 min-h-0">
                    <LineChart expenses={expenses} />
                  </div>
                  <div className="flex-1 min-h-0">
                    <BarChart expenses={expenses} />
                  </div>
                </div>
                <div className="flex-1 min-h-0">
                  <PieChart expenses={expenses} />
                </div>
              </div>
            )}
          </div>

          {/* Edit Modal */}
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setEditingExpense(null);
            }}
          >
            <CreateExpenseForm
              initialData={editingExpense}
              mode="edit"
              onSubmit={(updated) => {
                handleEditExpense(updated);
                setIsEditModalOpen(false);
                setEditingExpense(null);
              }}
              onClose={() => {
                setIsEditModalOpen(false);
                setEditingExpense(null);
              }}
            />
          </Modal>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DashboardTabs;
