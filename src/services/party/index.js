import { response } from "../../util/response";
import { request } from "../../util/request";

async function getAllParties() {
  try {
    const res = await response(request.get("/api/parties"));

    return res;
  } catch (error) {
    throw error;
  }
}

async function getParty(id) {
  try {
    const res = await response(request.get(`/api/parties/${id}`));

    return res;
  } catch (error) {
    throw error;
  }
}

async function addPartyToElection(partyId, electionId) {
  try {
    const res = await response(
      request.put(`/api/parties/add-to-election`, { partyId, electionId })
    );

    return res;
  } catch (error) {
    throw error;
  }
}

async function createParty(party) {
  try {
    const res = await response(request.post("/api/parties", party));

    return res;
  } catch (error) {
    throw error;
  }
}

async function deleteParty(id) {
  try {
    const res = await response(request.delete(`/api/parties/${id}`));

    return res;
  } catch (error) {
    throw error;
  }
}

export const partyServices = {
  addPartyToElection,
  createParty,
  getAllParties,
  getParty,
  deleteParty,
};
