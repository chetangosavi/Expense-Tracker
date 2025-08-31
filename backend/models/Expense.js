import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, 
    },
    title: {
      type: String,
      required: [true, "Expense title is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    category: {
      type: String,
      required: true,
      enum: ["Food", "Transport","Groceries", "Shopping", "Bills", "Entertainment","Utilities", "Other"],
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "UPI", "Bank Transfer", "Other"],
      default: "Cash",
    },
    currency: {
      type: String,
      default: "INR",
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    recurring: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String], //["office", "work trip"]
      default: [],
    },
  },
  { timestamps: true }
);

// Virtual property to format date nicely
//A virtual property is a field that doesn’t exist in the database, but is calculated dynamically when you access it.
expenseSchema.virtual("formattedDate").get(function () {
  return this.date.toLocaleDateString("en-IN");
});

// Static method: calculate total expenses for a user
expenseSchema.statics.calculateTotal = async function (userId) {
  const result = await this.aggregate([
    { $match: { userId } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  return result[0]?.total || 0;
};

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;

