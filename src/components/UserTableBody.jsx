import React, { Component } from 'react'


export class UserTableBody extends Component {
    constructor(props) {
        super(props)
    }
  render() {
    const tableBody = this.props.userList.map((user) =>{
        return (
            <tr>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.type}</td>
            </tr>
        )
    })


    return (
      <tbody>
        {tableBody}
      </tbody>
    )
  }
}

export default UserTableBody