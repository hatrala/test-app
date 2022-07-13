import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import StudentTable from "../components/Table/StudentTable";
import { Button } from "antd";
import AddStudent from "../components/Form/AddStudent";
import { get } from "../Api/Based";
import { AccessToken } from "../config/config";
import LessionScore from "./LessionScore";
import LessionTable from "../components/Table/LessionTable";

const Lession = () => {
  const [lessionList, setLessionList] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [refesh, setRefesh] = useState(false);

  const onClick = () => {
    setShowResults(!showResults);
  };

  const onAddOrDelete = () => {
    setRefesh(!refesh);
  };

  useEffect(() => {
    get("/lession/find")
      .then((res) => {
        if (res.data) {
          const data = res.data.map((user, index) => {
            return {
              key: index,
              ...user,
            };
          });
          setLessionList(data);
        }
      })
      .catch((error) => console.log(error));
  }, [refesh]);

  return (
    <div>
      <div style={{ padding: "10px 0" }}>
        <Button type="primary" onClick={onClick} shape={"circle"}>
          Add
        </Button>
      </div>
      <div style={{ float: "left" }}>
        {showResults ? <AddStudent call={onAddOrDelete} /> : null}
      </div>
      <LessionTable data={lessionList || []} call={onAddOrDelete} />
    </div>
  );
};

export default Lession;
