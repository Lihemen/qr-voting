import { response } from "../../util/response";
import { request } from "../../util/request";

async function getAllElections() {
  try {
    const res = await response(request.get("/api/elections"));

    return res;
  } catch (error) {
    throw error;
  }
}

async function getElection(id) {
  try {
    const res = await response(request.get(`/api/elections/${id}`));
    return res;
  } catch (error) {
    throw error;
  }
}

async function createElection(election) {
  try {
    const res = await response(request.post("/api/elections", election));
    return res;
  } catch (error) {
    throw error;
  }
}

async function deleteElection(id) {
  try {
    const res = await response(request.delete(`/api/elections/${id}`));
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function encryptResults(id) {
  try {
    const res = await response(
      request.get(`/api/elections/${id}/audit/encrypt`)
    );
    return res;
  } catch (error) {
    throw error;
  }
}

async function decryptResults(id, file) {
  try {
    // const formData = new FormData();
    // formData.append("file", file);
    const res = await response(
      request.post(`/api/elections/${id}/audit/decrypt`)
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log("ERROR FROM DECRYPTION API", error);
    throw error;
  }
}

export const electionServices = {
  getAllElections,
  getElection,
  createElection,
  deleteElection,
  encryptResults,
  decryptResults,
};
