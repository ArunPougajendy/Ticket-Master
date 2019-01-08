import React from 'react'
import axios from 'axios'
import api from '../config/api'
import keys from '../config/credentials'


import TicketTable from './table'
import TicketForm from './form'
import Charts from './charts'
import Search from './search'

function LoadImg() {
    return (
        <div>
            <img src={require('../../src/silhouette-solo-loader-dribbble_v2.gif')}  alt="Loader" />
        </div>
    )
}

class TicketIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tickets: [],
            filteredTickets: [],
            isLoaded: false
        }
        this.handleResponse = this.handleResponse.bind(this)
        this.handleStatusResponse = this.handleStatusResponse.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    componentDidMount() {
        axios.get(`${api.tickets.baseURL}?api_key=${keys.authentication}`).then((response) => {
            this.setState({
                tickets: response.data,
                filteredTickets: response.data,
                isLoaded:true
            })
        })
    }

    handleResponse(ticket) {
        this.setState(prevState => ({
            tickets: prevState.tickets.concat(ticket),
            filteredTickets: prevState.tickets.concat(ticket)
        }))
    }

    handleStatusResponse(responseTicket) {
        let oldTicket = this.state.filteredTickets.find(ticket => ticket.ticket_code === responseTicket.ticket_code  )
        oldTicket.status = responseTicket.status
        this.setState( prevState => ({
            // tickets : [].concat(prevState.tickets),
            filteredTickets: [].concat(prevState.filteredTickets)
        }))
    }

    handleSearch(code) {
        this.setState(prevState => {
            return {
                filteredTickets: prevState.tickets.filter(ticket => ticket.ticket_code.toLowerCase().indexOf(code.toLowerCase()) >= 0 )
            }
        })

    }
    
    render() {
        return (
            <div>
                
                <div className ="row">
                    <div className="col-md-8">
                        <div className = "row">
                            <div className = "col-md-8" >
                                <h3> Listing Tickets - {this.state.filteredTickets.length} of {this.state.tickets.length} </h3>
                                <span class="badge badge-success">Completed : {this.state.tickets.filter(ticket => ticket.status === 'completed').length}</span> | 
                                <span class="badge badge-danger">Open : {this.state.tickets.filter(ticket => ticket.status === 'open').length}</span>
                            </div>
                            <div className = "col-md-4">
                                <Search handleSearch={this.handleSearch}/>
                            </div>
                        </div>
                        <div className = "row">
                            <div className = "col-md-8">
                            </div>
                            <div className = "col-md-4">
                                <h2> Buttons </h2>
                            </div>
                        </div>
                        { this.state.isLoaded ? <TicketTable tickets = {this.state.filteredTickets} handleStatusResponse={this.handleStatusResponse} /> : <LoadImg />}
                        {/* <Progress tickets = {this.state.tickets} /> */}
                        
                    </div>
                    <div className="col-md-4">
                        <TicketForm handleResponse ={this.handleResponse} />
                        
                    </div>
                    <div className ="row">
                        <Charts tickets = {this.state.tickets} />                    
                    </div>
                </div>
                
                
            </div>
        )
    }
}



export default TicketIndex