import React from 'react' 
import { Link } from 'react-router-dom'
class TicketShow extends React.Component {

    render() {
        const { ticket_code, name, priority, department, message, status } = this.props.location.state
        return (
            <div>
                <ul class="list-group">
                    <li class="list-group-item">{ ticket_code } </li>
                    <li class="list-group-item"> { name }</li>
                    <li class="list-group-item">{ priority } </li>
                    <li class="list-group-item">{ department } </li>
                    <li class="list-group-item"> { message } </li>
                    <li class="list-group-item"> {status} </li>
                </ul>

                <Link to='/'> back </Link>
            </div>
        )
    }
}

export default TicketShow