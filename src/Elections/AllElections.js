import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";

import { electionServices } from "../services/election";
import { shortDate } from "../util/shortDate";
import { useAlert } from "react-alert";
import { useModal } from "../components/useModal";
import { history } from "../util/history";

function useElections() {
  const [elections, setElections] = useState([]);
  useEffect(() => {
    const fetchElections = async () => {
      try {
        const res = await electionServices.getAllElections();
        setElections([...res]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchElections();
  }, []);
  return elections;
}

export default function AllElections() {
  const elections = useElections();

  const { renderModal, toggleModal } = useModal();
  const alert = useAlert();

  const deleteEl = async (id) => {
    try {
      await electionServices.deleteElection(id);
      alert.success("Election Deleted", { timeout: 1500 });
      setTimeout(() => history.go(0), 1500);
    } catch (error) {
      alert.error(error.toString(), { timeout: 1500 });
    }
    return toggleModal();
  };

  return (
    <>
      <section className="search-and-user">
        <div className="admin-profile">
          <Link to="/elections/create" className="party-create-btn">
            <FaPlusSquare />
            Create
          </Link>
        </div>
      </section>
      <ul className="election-cards">
        {elections &&
          elections.map((election) => (
            <li key={election._id} className="election-card">
              <h3>{election.name}</h3>
              <p>
                Start: {shortDate(election.start)} | End:{" "}
                {shortDate(election.end)}{" "}
              </p>
              <div className="flow">
                <Link to={`/elections/${election._id}`}>Details</Link>
                <button
                  className="btn btn--inline btn--rounded bg--red"
                  onClick={toggleModal}
                >
                  Delete
                </button>
              </div>
              {renderModal(
                <div>
                  <p>Are you sure you want to proceed</p>
                  <button
                    className="btn bg--red"
                    onClick={() => deleteEl(election._id)}
                  >
                    Proceed
                  </button>
                </div>
              )}
            </li>
          ))}
        {!elections && <li>No Elections Available...</li>}
      </ul>
    </>
  );
}
