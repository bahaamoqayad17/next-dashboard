"use client";
import axios from "axios";
const instance = axios.create({
  baseURL: process.env.APP_URL,
  "Content-Type": "multipart/form-data",
});

export default instance;
