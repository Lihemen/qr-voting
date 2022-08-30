import React, { useState } from "react";
import Button from "../../components/Button";
import { useModal } from "../../components/useModal";
import { voterService } from "../../services/voter";
import { useAlert } from "react-alert";
import { history } from "../../util/history";
import { Link } from "react-router-dom";

function VoterCard({ voter, elections }) {
  const [electionId, setElectionId] = useState("");
  const { renderModal, toggleModal } = useModal();
  const alert = useAlert();

  const handleSelect = (e) => {
    const { value } = e.target;
    setElectionId(value);
  };
  const handleSubmit = async () => {
    try {
      await voterService.addVoterToElection(voter._id, electionId);
      alert.success("Voter added to Election", { timeout: 1500 });
    } catch (e) {
      alert.error("Voter not added", { timeout: 1500 });
    }
  };

  const deleteVoter = async (id) => {
    try {
      await voterService.deleteVoter(id);
      alert.success("Voter Deleted", { timeout: 1000 });
      setTimeout(() => history.go(0), 1200);
    } catch (error) {}
  };

  return (
    <>
      <div className="card">
        <div className="col">
          <div className="card__header">
            <h4>
              {voter.firstName} {voter.lastName}
            </h4>
            <p>Voted: {voter.voted.toString()}</p>
          </div>
          <div className="card__body">
            <p>{voter.phoneNumber} </p>
            <p>{voter.email} </p>
          </div>
        </div>
        <div className="flow">
          <button className="btn btn--inline" onClick={toggleModal}>
            Add to Election
          </button>
          <Link className="btn btn--inline" to={`/voters/${voter._id}/vote`}>
            Vote
          </Link>
          <button
            className="btn btn--inline bg--red"
            onClick={() => deleteVoter(voter._id)}
          >
            Delete
          </button>
        </div>
      </div>
      {renderModal(
        <form className="form">
          <div className="input_container">
            <select onChange={handleSelect} className="input">
              <option value="" disabled selected>
                Choose Election
              </option>
              {elections.map((election) => (
                <option value={election._id} key={election._id}>
                  {election.name}{" "}
                </option>
              ))}
            </select>
          </div>
          <Button handleClick={handleSubmit} text="Add" type="button" />
        </form>
      )}
    </>
  );
}

export { VoterCard };
