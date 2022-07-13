import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import StudentTable from "../components/Table/StudentTable";
import { Button } from "antd";
import AddStudent from "../components/Form/AddStudent";
import { get } from "../Api/Based";
import { AccessToken } from "../config/config";

const StudentList = () => {
  const [userList, setUserList] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [refesh, setRefesh] = useState(false);

  const onClick = () => {
    setShowResults(!showResults);
  };

  const onAddOrDelete = () => {
    setRefesh(!refesh);
  };

  useEffect(() => {
    const Headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(AccessToken)}`,
      },
    };
    get("/get-list-of-Student-in-class", Headers)
      .then((res) => {
        if (res.data) {
          const data = res.data.map((user, index) => {
            return {
              key: index,
              ...user,
            };
          });
          setUserList(data);
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
      <StudentTable data={userList || []} call={onAddOrDelete} />
    </div>
  );
};

export default StudentList;
