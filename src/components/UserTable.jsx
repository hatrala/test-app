import React, { Component } from 'react'
import UserPropsRow from './UserPropsRow'
import UserTableBody from './UserTableBody'

export class UserTable extends Component {
    constructor(props) {
        super(props)
    }
  render() {
    return (
        <table>
            <UserPropsRow/>
            <UserTableBody userList = {this.props.userList}/>
        </table>
    )
  }
}

export default UserTable