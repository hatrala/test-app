import React, { useState, memo } from "react";
import "antd/dist/antd.css";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { patch } from "../../Api/Based";
import { AccessToken } from "../../config/config";

const ScoreTable = (props) => {
  const { studentId } = useParams();

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const [form] = Form.useForm();
  const [data, setData] = useState(props.scoreTable);
  const [editingKey, setEditingKey] = useState("");

  // const [refesh, setRefesh] = useState(props.refesh);

  useEffect(() => {
    setData(props.scoreTable);
  }, [props]);

  // useEffect(() => {
  //   setRefesh(props.refesh);
  // }, [useParams()]);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      lessionName: "",
      score: 0,
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        const Headers = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(AccessToken)}`,
          },
        };
        patch(
          `/lession/EditScore/${studentId}`,
          {
            lessionName: newData[index].lessionName,
            score: newData[index].score,
          },
          Headers
        )
          .then(function (response) {
            console.log(response);
            if (response.request.status === 204) {
              setData(newData);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Lession",
      dataIndex: "lessionName",
      key: "lessionName",
      width: "5%",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      width: "5%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: "5%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "score" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default memo(ScoreTable);
