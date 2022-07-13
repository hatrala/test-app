import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm.jsx";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import { Button } from "antd";
import StudentList from "./pages/StudentList";
import Score from "./pages/Score";
import Admin from "./pages/Admin";
import { get } from "./Api/Based";
import Lession from "./pages/Lession";
import LessionScore from "./pages/LessionScore";
import LessionScoreTable from "./components/Table/LessionScoreTable";
const { Header, Content, Footer } = Layout;

const array = [
  {
    key: "1",
    label: "Home",
    path: "/",
  },
  {
    key: "2",
    label: "Login",
    path: "/login",
  },
];

function App() {
  let navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [header, setHeader] = useState(array);
  const Token = localStorage.getItem("AccessToken");

  const checkAdmin = () => {
    const Headers = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    get(`/admin`, Headers)
      .then((res) => {
        console.log(res);
        if (res.request.status === 204) {
          navigate(`/admin`);
        }
      })
      .catch((error) => {
        switch (error.request.status) {
          case 401:
            alert("Login require");
            break;
          case 403:
            alert("Only admin can access this page");
            break;
          default:
            alert(error);
            break;
        }
      });
  };

  useEffect(() => {
    console.log("abc");
    if (Token !== null) {
      setIsLogin(true);
    }
  }, [Token]);

  useEffect(() => {
    if (isLogin) {
      setHeader([
        {
          key: 1,
          label: "Home",
          path: "/",
        },
        {
          key: 3,
          label: "Student",
          path: "/studentList",
        },
        // {
        //   key: 4,
        //   label: "Score",
        //   path: "/score",
        // },
        {
          key: 6,
          label: "Lession",
          path: "/lession"
        },
        {
          key: 5,
          label: "Admin",
          path: "/admin",
        },
      ]);
    }
  }, [isLogin]);

  function handleClick(e) {
    localStorage.removeItem("AccessToken");
    navigate("/");
    refreshPage();
  }

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      <Layout className="layout">
        <Header>
          <div className="logo"></div>
          <Menu
            onClick={(e) => {
              switch (e.key) {
                case "1":
                  navigate("/");
                  break;
                case "2":
                  navigate("/login");
                  break;
                case "3":
                  navigate("/studentList");
                  break;
                case "4":
                  navigate("/score");
                  break;
                case "5":
                  checkAdmin();
                  break;
                case "6":
                  navigate("/lessionList")
                  break;
                default:
                  navigate("/");
              }
            }}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={header}
          />
          {isLogin ? (
            <div style={{ float: "right" }}>
              <Button type="primary" danger onClick={(e) => handleClick(e)}>
                Logout
              </Button>
            </div>
          ) : null}
        </Header>
        <Layout className="layout">
          <Content
            style={{
              padding: "50px 50px",
            }}
          >
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/studentList" element={<StudentList />} />
              <Route path="score" element={<Score />}>
                <Route exact path=":studentId" element={<Score />} />
              </Route>
              <Route path="lessionList" element={<Lession />}/>
              <Route path="lession" element={<LessionScore />}>
                <Route exact path=":lessionId" element={<LessionScore />} />
              </Route>
            </Routes>
          </Content>
        </Layout>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
