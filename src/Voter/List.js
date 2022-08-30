import React, { useEffect, useState } from "react";
import "./voter.css";
import Dashboard from "../Dashboard";

import { voterService } from "../services/voter";
import { electionServices } from "../services/election";

import { VoterCard } from "./components/VoterCard";

function useVotersList() {
  const [voters, setVoters] = useState([]);
  const [elections, setElections] = useState([]);

  useEffect(() => {
    const fetchVotersAndElections = async () => {
      const res = await voterService.getAllVoters();
      const els = await electionServices.getAllElections();
      setVoters([...res]);
      setElections([...els]);
    };

    fetchVotersAndElections();
  }, []);

  return [elections, voters];
}

export default function VoterList() {
  const [elections, voters] = useVotersList();

  return (
    <Dashboard>
      <div className="election-cards">
        {voters &&
          voters.map((voter) => (
            <VoterCard voter={voter} elections={elections} key={voter._id} />
          ))}
      </div>
    </Dashboard>
  );
}
