import axios from "axios";
import { backendUrl } from "../constant/constants.js";

const API_URL = `${backendUrl}/expenses/get-all-expenses`; 

export const getExpenses = async () => {
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, 
    },
  });
  return res.data;
};