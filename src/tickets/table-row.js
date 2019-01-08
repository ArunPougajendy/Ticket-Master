import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import api from '../config/api'
import keys from '../config/credentials' 

class TableRow extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading : false
        }
    }

    handleStatus (code,status) {
        this.setState({
            loading: true
        })
        const patchData = {
            ticket_code: code,
            status: status === 'completed' ? 'open' : 'completed'
        }
        axios.put(`${api.tickets.baseURL}/${code}?api_key=${keys.authentication}`,patchData).then((response) =>{
            this.props.handleStatusResponse(response.data)
            this.setState({
                loading: false
            })
        }).catch((err) => {console.log(err)})
    }

    render() {
        const { ticket_code ,name, department , priority, message, status } = this.props
        return (
            <tr>
                <td> <Link to={{
                    pathname: `/tickets/${ticket_code}`, 
                    state: { 
                        ticket_code, 
                        name, 
                        department, 
                        priority, 
                        message, 
                        status
                    }
                }}> {ticket_code}  </Link></td>
                <td>{name}</td>
                <td>{department}</td>
                <td>{priority}</td>
                <td>{message}</td>
                <td>{status}</td>  
                <td><input type="checkbox" name="test"  onChange={() =>{
                        this.handleStatus(ticket_code,status)
                }} defaultChecked = {status === 'completed' ? true : false } disabled = {this.state.loading}/> {this.state.loading && <img src={require('../../src/ajax-loader.gif')}  alt="Loader" />}  </td>
            </tr>
        )
    }
}

export default TableRow