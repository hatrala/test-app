import React from "react";
import Axios from "axios";
import { ApiUrl } from "../config/config";
export class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: ''
    };
  
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeEmail(event) {
      this.setState({
        email: event.target.value
      });
    }

    handleChangePassword(event) {
        this.setState({
          password: event.target.value
        });
      }
  
    handleSubmit(event) {
        Axios.post(`${ApiUrl}/user/login`, this.state)
          .then(function (response) {
            console.log(response);
            localStorage.setItem("AccessToken", response.data.token);

          })
          .catch(function (error) {
            console.log(error);
          });
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            email:
            <input type="text"  onChange={this.handleChangeEmail} value={this.state.email}/>
          </label>
          <label>
            password:
            <input type="text" value={this.state.password} onChange={this.handleChangePassword}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }