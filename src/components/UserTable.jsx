import React, { Component } from 'react'
import UserPropsRow from './UserPropsRow'
import UserTableBody from './UserTableBody'

export class UserTable extends Component {
  render() {
    return (
        <table>
            <UserPropsRow/>
            <UserTableBody/>
        </table>
    )
  }
}

export default UserTable