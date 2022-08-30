import { request } from "../../util/request";
import { response } from "../../util/response";
import { setAuthHeader } from "../../util/authHeader";
import { saveAs } from "file-saver";

const login = async ({ email, password }) => {
  try {
    const res = await response(
      request.post("/auth/login", { email, password })
    );
    const { voter, token } = res;
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem(
      voter.role === "admin" ? "admin" : "user",
      JSON.stringify(voter)
    );
    console.log(voter);
    return voter;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return;
};

const register = async (user) => {
  try {
    const res = await response(request.post("/auth/signup", user));
    const { voter, token } = res;
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(voter));
    return voter;
  } catch (error) {
    throw error;
  }
};

const vote = async (voterId, party) => {
  try {
    const res = await response(
      request.post(`/api/voters/${voterId}/vote`, { party })
    );

    return res;
  } catch (error) {
    throw error;
  }
};

const authenticate = async (token, key) => {
  try {
    const res = await response(
      request.post("/api/qrcode/decrypt", { token, key })
    );
    return res;
  } catch (error) {
    throw error;
  }
};

const getAllVoters = async () => {
  try {
    const res = await response(request.get("/api/voters"));

    return res;
  } catch (error) {
    throw error;
  }
};

const getVoter = async (id) => {
  try {
    const res = await response(request.get(`/api/voters/${id}`));

    return res;
  } catch (error) {
    throw error;
  }
};

const addVoterToElection = async (voterId, electionId) => {
  try {
    const res = await response(
      request.put(`/api/voters/add-to-election`, { electionId, voterId })
    );

    return res;
  } catch (error) {
    throw error;
  }
};

const generateQRCode = async (key) => {
  try {
    const headers = setAuthHeader();
    console.log(headers);

    const res = await response(
      request.post("/api/qrcode/generate", { key }, { headers })
    );

    return res;
  } catch (error) {
    throw error;
  }
};

const downloadQRImage = async (url, title) => {
  try {
    return saveAs(url, title);
  } catch (error) {
    throw error;
  }
};

const deleteVoter = async (id) => {
  try {
    const res = await response(request.delete(`/api/voters/${id}`));

    return res;
  } catch (error) {
    throw error;
  }
};

export const voterService = {
  login,
  logout,
  register,
  addVoterToElection,
  authenticate,
  getAllVoters,
  getVoter,
  generateQRCode,
  vote,
  downloadQRImage,
  deleteVoter,
};
