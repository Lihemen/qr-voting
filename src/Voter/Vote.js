import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { delayedRedirect } from "../util/redirect";
import { useAlert } from "react-alert";
import { electionServices } from "../services/election";
import { voterService } from "../services/voter";
import Button from "../components/Button";

export default function Vote() {
  const [parties, setParties] = useState([]);
  const [elections, setElections] = useState([]);
  const [showSelect, setShowSelect] = useState(true);
  const [party, setParty] = useState("");

  const alert = useAlert();

  const { id } = useParams();

  const fetchElections = async () => {
    const res = await electionServices.getAllElections();
    setElections([...res]);
  };
  const filterElection = (event) => {
    const { value } = event.target;
    const election = elections.filter((el) => el._id === value);
    setParties(election[0].parties);
    return;
  };
  const vote = async (event) => {
    event.preventDefault();
    try {
      await voterService.vote(id, party);
      alert.success("Vote Casted", { timeout: 1500 });
      return delayedRedirect(500, `/elections/`);
    } catch (error) {
      console.log(error);
      alert.error("Vote Failed", { timeout: 1500 });
    }
  };
  useEffect(() => {
    fetchElections();
  }, []);
  return (
    <div>
      {showSelect && (
        <form className="form">
          <h3>Choose Election</h3>
          <select name="election" onChange={filterElection}>
            <option selected disabled value="">
              Choose An Election
            </option>
            {elections.map((election) => (
              <option key={election._id} value={election._id}>
                {election.name}
              </option>
            ))}
          </select>
          <Button
            type="submit"
            text="Choose"
            handleClick={() => setShowSelect(false)}
          />
        </form>
      )}
      {!showSelect && (
        <div>
          <form className="form election-cards">
            {parties.length > 0 && (
              <>
                {parties.map((party) => (
                  <div className="election-card" key={party._id}>
                    <label htmlFor="party">{party.name} </label>
                    <input
                      type="radio"
                      name="party"
                      value={party._id}
                      onChange={(event) => setParty(event.target.value)}
                    />
                  </div>
                ))}
                <Button type="submit" text="VOTE" handleClick={vote} />
              </>
            )}
            {parties.length < 1 && (
              <p>
                This Election Has No Registered Parties{" "}
                <Button
                  text="Go Back"
                  handleClick={() => setShowSelect(true)}
                />{" "}
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
