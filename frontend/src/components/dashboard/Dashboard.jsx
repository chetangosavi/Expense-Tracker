import SummaryCard from "./SummaryCard";
import ExpenseChart from "./ExpenseChart";
import ExpenseTable from "./Expensetable";
import LineChart from "./LineChart.jsx";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { getExpenses } from "../../services/expenseServices.js";
import PieChart from "./PieChart.jsx";
import BarChart from "./BarChart.jsx";
import Accordion from "./Accordion";
import Modal from "../modal/Modal.jsx";
import CreateExpenseForm from "./CreateExpenseForm.jsx";
import Footer from "./Footer.jsx";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../constant/constants.js";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const navigate = useNavigate()
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

  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => [newExpense, ...prev]);
  };

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

  // Summary Cards: Functions for totalExpense, montlyExpense, categoryTotal
  const totalExpense = expenses.reduce((acc, e) => acc + (e.amount || 0), 0);

  // Monthly expenses
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

  // Category-wise totals
  const categoryTotals = expenses.reduce((acc, e) => {
    if (!e.category) return acc;
    acc[e.category] = (acc[e.category] || 0) + (e.amount || 0);
    return acc;
  }, {});

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-4/5 m-auto flex-1">
        <Navbar
          onAddExpense={handleAddExpense}
          toggleView={() => navigate("/dashboardtabs")}
          currentView="accordion"
        />

        {/* Summary Cards */}
        <Accordion title="Summary Cards" defaultOpen={true}>
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
        </Accordion>

        {/* Expense Table */}
        <Accordion title="Expense Table" defaultOpen={true}>
          <ExpenseTable
            expenses={expenses}
            onDelete={handleDeleteExpense}
            onEdit={openEditModal}
          />
        </Accordion>

        {/* Expense Analytics */}
        <Accordion title="Expense Analytics" defaultOpen={true}>
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
        </Accordion>
      </div>

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
      <Footer />
    </div>
  );
};

export default Dashboard;
