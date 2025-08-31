import Expense from "../models/Expense.js";

export const createExpense = async (req, res) => {
  try {
    const { title, amount, category, paymentMethod, date, notes, recurring, tags } = req.body;

    // validation: form fields 
    if ( [title, amount, category, paymentMethod, date].some(field => !field) || tags === undefined || recurring === undefined ){
        return res.status(400).json({ message: "Failed! All fields are required" });
    }

    const expense = new Expense({
      userId: req.user._id,
      title,
      amount,
      category,
      paymentMethod,
      date,
      notes,
      recurring,
      tags
    });

    const savedExpense = await expense.save();
    res.status(201).json({ message: "Success! Expense created successfully",expense });
  } catch (error) {
    res.status(500).json({ message: "Failed! Error creating expense", error: error.message });
  }
};

export const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOne({ _id: id, userId: req.user._id });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({
      message: "Success! Expense retrieved",
      expense,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed! Error retrieving expense", error: error.message });
  }
};

export const getUserExpensesWithTotal = async (req, res) => {
  try {
    const userId = req.user._id;
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    const total = await Expense.calculateTotal(userId);

    res.json({message:"Success! Expenses fetched successfully", expenses, total });
    
  } catch (error) {
    res.status(500).json({ message: "Failed! Error fetching data", error: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const expense = await Expense.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      updates,
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Failed! Expense not found or not authorized" });
    }

    res.status(200).json({
      message: "Success! Expense updated",
      expense,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed! Error updating expense", error: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found or not authorized" });
    }

    res.status(200).json({
      message: "Success! Expense deleted",
      expense,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed! Error deleting expense", error: error.message });
  }
};