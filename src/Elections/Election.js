import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";

import { useAlert } from "react-alert";
import { electionServices } from "../services/election";
import { shortDate } from "../util/shortDate";

function useElection() {
  const { electionId } = useParams();
  const [election, setElection] = useState({});

  useEffect(() => {
    const fetchElection = async () => {
      const res = await electionServices.getElection(electionId);
      setElection({ ...res });
    };

    fetchElection();
  }, [electionId]);

  return election;
}

export default function Election() {
  const election = useElection();
  const alert = useAlert();

  const encodeResults = async (id) => {
    try {
      await electionServices.encryptResults(id);
      alert.success("Result encrypted!", { timeout: 2000 });
    } catch (error) {
      alert.error("Unable to encrypt results", { timeout: 1200 });
    }
    return;
  };

  return (
    <div className="card">
      <h3>{election.name} </h3>
      <p>Registered Voters: {election.voters?.length}</p>
      <p>Registered Parties: {election.parties?.length}</p>
      <p>
        Duration: {shortDate(election.start)} - {shortDate(election.end)}{" "}
      </p>
      <Button
        text="Encrypt Results"
        handleClick={() => encodeResults(election._id)}
      />
    </div>
  );
}
