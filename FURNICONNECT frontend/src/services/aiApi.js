import axios from "axios";

const AI_API = axios.create({
  baseURL: "http://10.16.190.247:5001"
});

// ===============================
// AI DESIGN
// ===============================

export const getAIDesign = async (data) => {

  return AI_API.post(
    "/ai-design",
    data
  );

};

// ===============================
// MATERIAL ESTIMATION
// ===============================

export const estimateMaterials = async (data) => {

  return AI_API.post(
    "/material-estimation",
    data
  );

};