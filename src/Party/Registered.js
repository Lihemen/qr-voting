import React, { useEffect, useState } from "react";
import "./party.css";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { useAlert } from "react-alert";

import Dashboard from "../Dashboard";
import Button from "../components/Button";
import { useModal } from "../components/useModal";

import { partyServices } from "../services/party";
import { electionServices } from "../services/election";

import { history } from "../util/history";

function useParties() {
  const [parties, setParties] = useState([]);
  const [elections, setElections] = useState([]);

  useEffect(() => {
    const fetchPartiesAndElections = async () => {
      try {
        const res = await partyServices.getAllParties();
        const el = await electionServices.getAllElections();
        setParties([...res]);
        setElections([...el]);
      } catch (error) {
        setParties([]);
        setElections([]);
      }
    };
    fetchPartiesAndElections();
  }, []);
  return [parties, elections];
}

export default function Registered() {
  const [parties, elections] = useParties();

  return (
    <Dashboard>
      <section className="search-and-user">
        <div className="admin-profile">
          <Link to="/parties/create" className="party-create-btn">
            <FaPlusSquare />
            Create
          </Link>
        </div>
      </section>
      <ul className="election-cards">
        {parties &&
          parties.map((party) => (
            <PartyCard party={party} key={party._id} elections={elections} />
          ))}
      </ul>
      {!parties && <p>There are no parties, create a New One </p>}
    </Dashboard>
  );
}

function PartyCard({ party, elections }) {
  const [electionId, setElectionId] = useState("");
  const { renderModal, toggleModal } = useModal();
  const alert = useAlert();

  const deleteParty = async (id) => {
    try {
      await partyServices.deleteParty(id);
      alert.success("Party deleted successfully", { timeout: 1500 });
      setTimeout(() => history.go(0), 1500);
    } catch (error) {
      alert.error("Unable to delete party", { timeout: 1500 });
    }
  };

  const handleSelect = (e) => {
    const { value } = e.target;
    setElectionId(value);
  };
  const handleSubmit = async () => {
    try {
      await partyServices.addPartyToElection(party._id, electionId);
      alert.success("Party added to Election", { timeout: 2000 });
    } catch (e) {
      alert.error("Party not added", { timeout: 2000 });
      console.log(e);
    }
  };
  return (
    <>
      <li className="election-card" key={party._id}>
        <h3>{party.name} </h3>
        <p>{party.acronym} </p>
        <p>{party.candidate.name} </p>
        <div className="flow">
          <button onClick={() => toggleModal()}>Add To Election</button>
          <button className="bg--red" onClick={() => deleteParty(party._id)}>
            Delete
          </button>
        </div>
      </li>
      {renderModal(
        <form className="form">
          <select defaultValue="Choose An Election" onChange={handleSelect}>
            <option value="Choose An Election">Choose An Election</option>
            {elections &&
              elections.map((election) => (
                <option value={election._id} key={election._id}>
                  {election.name}{" "}
                </option>
              ))}
          </select>
          <Button handleClick={handleSubmit} text="Add" type="button" />
        </form>
      )}
    </>
  );
}
