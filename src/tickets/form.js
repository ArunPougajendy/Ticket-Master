import React from 'react'
import axios from 'axios'
import api from '../config/api'
import keys from '../config/credentials' 

class TicketForm extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            name:'',
            department:'',
            priority:'',
            message:'',
            hasErrors: false,
            serverErrorMessages: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const formdata = {
            name: this.state.name,
            department: this.state.department,
            priority:this.state.priority,
            message: this.state.message
        }
        //Client side validation
        axios.post(`${api.tickets.baseURL}?api_key=${keys.authentication}`,formdata).then((response) =>{
            console.log(response.data)
            this.props.handleResponse(response.data)
            this.setState({
                name:'',
                department:'',
                priority:'',
                message:'',
            })
        })
    }

    render() {
        return (
            <div>
                <h2> Add Ticket </h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group"> 
                    <label>
                        Name
                        <input type="text" name="name" value={this.state.name} onChange = {this.handleChange} className="form-control" />
                    </label>
                    </div>
                    <div className="form-group"> 
                    <label>
                        Department
                        <select value={this.state.department} name="department" onChange = {this.handleChange} className="form-control" >
                            <option value="">select</option>
                            <option value="Technical">Technical</option>
                            <option value="Sales">Sales</option>
                            <option value="Hr">Hr</option>
                        </select>
                    </label>
                    </div>  
                    <div className="form-check form-check-inline"> 
                        <label className = "form-check-label" >
                            <input type="radio" value="Low" checked={this.state.priority === 'Low'} name="priority" className="form-check-input" onChange={this.handleChange}/>Low
                        </label>
                    </div>
                    <div className="form-check form-check-inline"> 
                        <label className = "form-check-label" >
                            <input type="radio" value="Medium" checked={this.state.priority === 'Medium'} name="priority" className="form-check-input" onChange={this.handleChange}/>Medium
                        </label>
                    </div>
                    <div className="form-check form-check-inline"> 
                        <label className = "form-check-label" >
                            <input type="radio" value="High" checked={this.state.priority === 'High'} name="priority" className="form-check-input" onChange={this.handleChange}/>High
                        </label>
                    </div>

                    <div className="form-group"> 
                    <label>
                        Message
                        <textarea name="message" value = {this.state.message} onChange = {this.handleChange} className="form-control" ></textarea>
                    </label>
                    </div>
                    <input type="submit" className="btn btn-primary"></input> OR 
                    <input type="Reset" className="btn btn-secondary"></input>
                </form>
                
                
            </div>
        )
    }
}

export default TicketForm