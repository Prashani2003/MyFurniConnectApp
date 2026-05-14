import axios from "axios";

const AI_API = axios.create({
  baseURL: "http://192.168.1.3:5001"
});

// ===============================
// AI DESIGN
// ===============================

export const getAIDesign = async (data) => {

  return AI_API.post(
    "/design-suggestion",
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


// ===============================
// GENERATE AI IMAGE
// ===============================

export const generateAIImage = async (data) => {

  return AI_API.post(
    "/generate-ai-image",
    data
  );

};