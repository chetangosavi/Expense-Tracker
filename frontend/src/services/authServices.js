import axios from "axios";
import { backendUrl } from "../constant/constants.js";

export const registerUser = async (userData) => {
  const res = await axios.post(`${backendUrl}/auth/register`, userData);
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await axios.post(`${backendUrl}/auth/login`, userData);
  return res.data;
};
