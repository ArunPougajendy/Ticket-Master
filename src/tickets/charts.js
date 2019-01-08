import React from 'react'
import { ProgressBar }  from 'react-bootstrap'
import Chart from 'react-google-charts';



function Progress (props) {
    let completedTickets = props.tickets.filter(ticket => ticket.status === 'completed');
    let result = Math.round((completedTickets.length/props.tickets.length)*100);
    return (
        <div>
            <ProgressBar  now={result} />
        </div>
    )
}

function PieChart (props) {
    let highTickets = props.tickets.filter(ticket =>  ticket.priority === 'High')
    let mediumTickets = props.tickets.filter(ticket =>  ticket.priority === 'Medium')
    let lowTickets = props.tickets.filter(ticket =>  ticket.priority === 'Low')

    return (
        <div>
            <Chart
                width={'800px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Ticket status', 'count'],
                    ['highTickets', highTickets.length],
                    ['mediumTickets' , mediumTickets.length],
                    ['lowTickets' , lowTickets.length]
                ]}
            />
        </div>
    )
}

function BarChart (props) {

    let technicalTickets = props.tickets.filter(ticket => ticket.department === 'Technical')
    let technicalCompleted = technicalTickets.filter(ticket => ticket.status ==='completed')
    let salesTickets = props.tickets.filter(ticket => ticket.department === 'Sales')
    let salesCompleted = salesTickets.filter(ticket => ticket.status ==='completed')
    let hrTickets = props.tickets.filter(ticket => ticket.department === 'Hr')
    let hrCompleted = hrTickets.filter(ticket => ticket.status ==='completed')

    return (
        <Chart
            width={'500px'}
            height={'300px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={[
                ['Year', 'complted', 'open'],
                ['Technical', technicalCompleted.length, technicalTickets.length - technicalCompleted.length ],
                ['Sales', salesCompleted.length, salesTickets.length - salesCompleted.length ],
                ['Hr', hrCompleted.length, hrTickets.length - hrCompleted.length  ]
            ]}
        />
    )  
}


class Charts extends React.Component {


    render() {
        return (
            <div>
                <Progress tickets ={this.props.tickets}/>
                <br/>
                <div className="row">
                    <div className =" col-md-6">
                        <PieChart tickets ={this.props.tickets} />
                    </div>
                    <div className =" col-md-6">
                        <BarChart tickets ={this.props.tickets} />
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Charts