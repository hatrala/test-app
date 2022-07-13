import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import FindStudent from "../components/Form/FindStudent";
import ScoreTable from "../components/Table/ScoreTable";
import { get } from "../Api/Based";
import { AccessToken } from "../config/config";
import Find from "../components/Form/Find";

export default function Score() {
  const navigate = useNavigate();

  const { studentId } = useParams();
  const [find, setFind] = useState(false);
  const [scoreTable, setScoreTable] = useState([]);

  const onClick = () => {
    setFind(!find);
  };

  useEffect(() => {
    if (studentId) {
      const Headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(AccessToken)}`,
        },
      };
      get(`/lession/viewStudentScore/${studentId}`, Headers)
        .then(function (response) {
          if (response.request.status === 200) {
            if (response.data.length === 0) {
              alert("Student not exited or student does not have lession");
              navigate(`/score`);
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
  }, [studentId]);

  return (
    <div>
      <div style={{ padding: "10px 0" }}>
        <Button type="primary" onClick={onClick} shape={"circle"}>
          Find
        </Button>
      </div>
      <div style={{ padding: "0 10px" }}>
        {!find ? <p>Score of student with id: {studentId}</p> : null}
      </div>
      <div style={{ float: "left" }}>
        {find ? <Find call={onClick} name ="score" /> : null}
      </div>
      <div>
        <ScoreTable scoreTable={scoreTable} />
      </div>
    </div>
  );
}
