import React, { Component } from 'react'
import { User } from '../config/config'
import "../App.css";


export class UserPropsRow extends Component {
    constructor(props) {
        super(props)
        this.userKey = Object.keys(User)
    }
  render() {
    const userKey = this.userKey
    const head = userKey.map((key) =>{
        return <th>{key}</th>
    })
    return (
        <thead>
            <tr>
                {head}
            </tr>
        </thead>    
    )
  }
}

export default UserPropsRow