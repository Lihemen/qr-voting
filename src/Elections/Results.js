import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";

import { electionServices } from "../services/election";
import { useModal } from "../components/useModal";
import { useAlert } from "react-alert";

function useElections() {
  const [elections, setElections] = useState([]);
  useEffect(() => {
    const fetchElections = async () => {
      try {
        const res = await electionServices.getAllElections();
        setElections([...res]);
      } catch (error) {
        setElections((state) => [...state]);
      }
    };
    fetchElections();
  }, []);
  return elections;
}

export default function Results() {
  const elections = useElections();

  const [resultImage, setResultImage] = useState("");
  const [electionId, setElectionId] = useState("");
  const { renderModal, toggleModal } = useModal();
  const [decrypted, setDecrypted] = useState(false);
  const [results, setResults] = useState({});

  const alert = useAlert();
  const encrypt = async (id) => {
    try {
      const url = await electionServices.encryptResults(id);
      setResultImage(url);
    } catch (error) {
      alert.error("Unable to generate Image", { timeout: 1000 });
    }
  };

  const decrypt = async (id) => {
    // HACK
    try {
      const res = await electionServices.decryptResults(id, null);
      if (!res) {
        toggleModal();
        console.log("M");
      }
      setDecrypted(true);
      setResults({ ...res });
      alert.success("DECRYPTED", { timeout: 1000 });
    } catch (error) {
      toggleModal();
      console.log(error);
    }
    // fetch(resultImage, { method: "GET", mode: "cors" })
    //   .then((response) => response.blob())
    //   .then((data) => {
    //     // console.log("raw data", data);
    //     // const file = new File(data, `election-${id}-results`, {
    //     //   type: "image/jpeg" || "image/png",
    //     // });

    //     // console.log("formated", file);
    //     electionServices.decryptResults(id, data).then((results) => {
    //       setDecrypted(true);
    //       setResults({ ...results });
    //       alert.success("Decryption successful", { timeout: 700 });
    //       toggleModal();
    //       return;
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setDecrypted(false);
    //     toggleModal();
    //     alert.error("Unable to decrypt image", { timeout: 1000 });
    //   });
    // return;
  };

  return (
    <div className="election-cards">
      {elections &&
        elections.map((election) => (
          <li key={election._id} className="election-card">
            <h3>{election.name}</h3>
            <Button
              text="Decrypt Results"
              handleClick={() => {
                setDecrypted(false);
                setResults({});
                toggleModal();
                encrypt(election._id);
                setElectionId(election._id);
              }}
            />
            {renderModal(
              <div>
                {!decrypted && (
                  <>
                    <img
                      alt="Encrypted Result"
                      src={resultImage}
                      width={250}
                      height={250}
                    />
                    <Button
                      text="Decrypt"
                      handleClick={() => {
                        decrypt(electionId);
                      }}
                    />
                  </>
                )}
                {decrypted && (
                  <div>
                    <p>Election name: {results?.electionName} </p>
                    <p>Registered Voters: {results?.totalRegisteredVoters} </p>
                    <p>
                      Registered Parties: {results?.totalRegisteredParties}{" "}
                    </p>
                    <p>
                      <p> Total votes </p> 
                      <ul>
                        {results?.votes?.map(el => (<li key={el.acronym}> {el.acronym}: {el.voteCount} </li>))}
                      </ul>
                    </p>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
    </div>
  );
}
