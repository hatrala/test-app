import React from "react";
import { Clock } from "../components/Clock";
import { MultipleInput } from "../components/MultipleInput";
import { NameForm } from "../components/NameForm";
import { SelectForm } from "../components/SelectForm";
import { Toggle } from "../components/Toggle";
import UserPropsRow from "../components/UserPropsRow";
import "../App.css";
import UserTableBody from "../components/UserTableBody";
import Axios from "axios"
import { ApiUrl } from "../config/config";


export class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            user: []
        }
        this.handleStatus = this.handleStatus.bind(this);
    }

    componentDidMount() {
        Axios.get(`${ApiUrl}/user/find`)
          .then(res => {
            this.setState({ user: res.data });
          })
          .catch(error => console.log(error));
      }

    handleStatus() {
      this.setState(prevState => ({
        status: !prevState.status
      }));
    }


    render() {
        return (
            <div>
                <Clock isOn = {this.state.status}/>
                <Toggle onStatusChange = {this.handleStatus} isToggleOn = {this.state.status}/>
                <table>
                    <UserPropsRow/>
                    <UserTableBody userList = {this.state.user}/>
                </table>
            </div>
        )
    }
}