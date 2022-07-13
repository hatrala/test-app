import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import { get } from "../Api/Based";
import { AccessToken } from "../config/config";
import Find from "../components/Form/Find";
import LessionScoreTable from "../components/Table/LessionScoreTable";

export default function LessionScore() {
  const navigate = useNavigate();

  const { lessionId } = useParams();
  const [find, setFind] = useState(false);
  const [scoreTable, setScoreTable] = useState([]);

  const onClick = () => {
    setFind(!find);
  };

  useEffect(() => {
    if (lessionId) {
      const Headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(AccessToken)}`,
        },
      };
      get(`/lession/viewStudentScoreByLession/${lessionId}`, Headers)
        .then(function (response) {
          if (response.request.status === 200) {
            if (response.data.length === 0) {
              alert("Lession not exited or lesison does not have any student");
            } else {
              setScoreTable(
                response.data.map((score, index) => {
                  return {
                    key: index + 1,
                    ...score,
                  };
                })
              );
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [lessionId]);

  return (
    <div>
      <div style={{ padding: "10px 0" }}>
        <Button type="primary" onClick={onClick} shape={"circle"}>
          Find
        </Button>
      </div>
      <div style={{ padding: "0 10px" }}>
        {!find ? <p>Score of lession with id: {lessionId}</p> : null}
      </div>
      <div style={{ float: "left" }}>
        {find ? <Find call={onClick} name="lession" /> : null}
      </div>
      <div>
        <LessionScoreTable scoreTable={scoreTable} />
      </div>
    </div>
  );
}
