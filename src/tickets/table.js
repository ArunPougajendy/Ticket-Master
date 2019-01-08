import React from 'react'
import TableRow from './table-row'

function TicketTable(props) {

    return (
        <div>
            <table className="table table-striped" >
                <thead className="thead-dark">
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Priority</th>
                        <th>Message</th>
                        <th>status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.tickets.map((ticket) =>{
                        return (<TableRow key = {ticket.ticket_code} ticket_code={ticket.ticket_code} name={ticket.name} department={ticket.department} priority={ticket.priority} message={ticket.message} status={ticket.status} handleStatusResponse={props.handleStatusResponse} />)
                    })}
                </tbody>
            </table>
        </div>
    )
}



export default TicketTable