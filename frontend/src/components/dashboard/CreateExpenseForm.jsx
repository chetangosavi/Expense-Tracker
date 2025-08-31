import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateExpenseForm = ({
  onClose,
  onSubmit,
  initialData = null,
  mode = "create",
}) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    paymentMethod: "Cash",
    currency: "INR",
    date: "",
    notes: "",
    recurring: false,
    tags: "",
  });

  const [displayDate, setDisplayDate] = useState("");
  // Prefill form when editing
  useEffect(() => {
    if (!initialData) return;

    // Ensure tags become a comma string for the input
    let tagsString = "";
    if (Array.isArray(initialData.tags)) {
      tagsString = initialData.tags.join(", ");
    } else if (initialData.tags == null) {
      tagsString = "";
    } else {
      // could be string or other
      tagsString = String(initialData.tags);
    }

    setFormData({
      title: initialData.title || "",
      amount: initialData.amount ?? "",
      category: initialData.category || "",
      paymentMethod: initialData.paymentMethod || "Cash",
      currency: initialData.currency || "INR",
      date: initialData.date,
      notes: initialData.notes || "",
      recurring: !!initialData.recurring,
      tags: tagsString,
    });
  }, [initialData]);

  const categories = [
    "Food",
    "Transport",
    "Groceries",
    "Shopping",
    "Bills",
    "Entertainment",
    "Utilities",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Robust tags handling: support array, string, undefined, number, etc.
    let tagsArray;
    if (Array.isArray(formData.tags)) {
      tagsArray = formData.tags.map((t) => String(t).trim()).filter(Boolean);
    } else {
      // ensure it's string then split
      const tagsStr = formData.tags == null ? "" : String(formData.tags);
      tagsArray = tagsStr
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    const payload = {
      ...formData,
      amount: Number(formData.amount),
      tags: tagsArray,
    };

    try {
      const token = localStorage.getItem("token");
      let res;

      if (mode === "edit" && initialData?._id) {
        // update - adjust endpoint if your backend differs
        res = await axios.put(
          `http://localhost:5000/api/expenses/update/${initialData._id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // create - keep your existing create route
        res = await axios.post(
          "http://localhost:5000/api/expenses/create-expense",
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      const returned = res.data?.expense ?? res.data;
      console.log("data returned", returned);
      const fixedExpense = {
        ...returned,
        date: returned.date
          ? new Date(returned.date).toISOString()
          : new Date().toISOString(),
      };
      toast.success(
        mode === "edit" ? "Updated successfully " : "Success! Form submitted "
      );

      if (typeof onSubmit === "function") onSubmit(fixedExpense);
      if (typeof onClose === "function") onClose();
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to submit form");
    }
  };

  useEffect(() => {
    if (initialData?.date) {
      setFormData((prev) => ({ ...prev, date: initialData.date }));
      setDisplayDate(new Date(initialData.date).toISOString().slice(0, 10));
    }
  }, [initialData]);

  const handleDateChange = (e) => {
    const val = e.target.value; // yyyy-mm-dd from input
    setDisplayDate(val);

    // Convert back to ISO string before storing in formData
    const isoDate = new Date(val).toISOString();
    setFormData((prev) => ({ ...prev, date: isoDate }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[450px] p-6">
        <h2 className="text-xl font-bold mb-4">
          {mode === "edit" ? "Edit Expense" : "Create Expense"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:ring focus:ring-indigo-300"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option>Cash</option>
            <option>Card</option>
            <option>UPI</option>
            <option>Bank Transfer</option>
          </select>

          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option>INR</option>
            <option>USD</option>
            <option>EUR</option>
          </select>

          <input
            type="date"
            name="date"
            value={displayDate}
            onChange={handleDateChange}
            className="w-full p-2 border rounded"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="recurring"
              checked={formData.recurring}
              onChange={handleChange}
            />
            <label>Recurring</label>
          </div>

          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              {mode === "edit" ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExpenseForm;
