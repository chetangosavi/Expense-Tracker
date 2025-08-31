import axios from "axios";

const API_URL = "http://localhost:5000/api/expenses/get-all-expenses"; 

export const getExpenses = async () => {
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, 
    },
  });
  return res.data;
};