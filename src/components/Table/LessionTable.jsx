import React from 'react'
import 'antd/dist/antd.css';
import { Space, Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { del } from '../../Api/Based';
import { AccessToken } from '../../config/config';


export default function LessionTable(props) {

    let navigate = useNavigate()

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
          title: 'Lession',
          dataIndex: 'lessionName',
          key: 'lessionName',
        },
        {
          title: 'LessionDesc',
          dataIndex: 'lessionDesc',
          key: 'lessionDesc',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle" direction = "vertical">
                <Button type="primary"  onClick={(e) =>handleEddit(e,record)}>Eddit Score</Button>
                {/* <Button type="primary" danger onClick={(e) =>handleDelete(e,record)}>Delete</Button> */}
            </Space>
          ),
        },
      ];

      const data = props.data

      function handleEddit(event,record) {
        event.stopPropagation();
        navigate(`/lession/${record.id}`)
        props.call()
      }

      function handleDelete(event,record) {
        event.stopPropagation();
        const Headers = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(AccessToken)}`,
          },
        };
        del(`/class/deleteStudent/${record.id}`, {}, Headers)
        .then(function (response) {
            console.log(response);
            if(response.request.status === 204) {
                alert("Delete Student successful")
                props.call()
            }
        })
        .catch(function (error) {
            alert(error)
            console.log(error);
        });
      };

  return (
    <div>
        <Table columns={columns} dataSource={data} />
    </div>
  )
}