import React, {
    Component,
  } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import Chart from "chart.js";
import {Pie,Bar,Line} from "react-chartjs-2"


class SalaryDiagram extends Component{
    constructor(props){
        super(props);
        // this.protoTypes = {
        //     value: React.PropTypes.string.isRequired,
        //     limit_up: React.PropTypes.number.isRequired,
        //     limit_down: React.PropTypes.number.isRequired,
        //     isValid: React.PropTypes.bool.isRequired
        // };
        
        this.data = {
            labels: ["净收入", "全收入"],
            datasets: [],
            // datasets: [{
            //     label: "",
            //     data: [],
            //     backgroundColor: [
            //     ],
            //     borderColor: [
            //     ],
            //     borderWidth: 1
            // }],
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        };

        this.state = {
            data:this.data
        };
    }

    pushdata(a,b){
        var idx = this.data.datasets.length;
        console.log("current chart idx: "+idx.toString())
        var bgcolor = SalaryDiagram.bkBackgroundColors[idx%SalaryDiagram.bkBackgroundColors.length];
        var boardercolor = SalaryDiagram.bkBorderColor[idx%SalaryDiagram.bkBorderColor.length];
        this.data.datasets.push({
            label: "公司"+(idx+1).toString(),
            data: [a,b],
            backgroundColor: [bgcolor,bgcolor],
            borderColor: [boardercolor,boardercolor],
            borderWidth: 1
        });

        // this.data.labels.splice(0,0,label+"净收入",label+"全收入");
        // this.data.datasets[0].data.splice(0,0,a,b);
        // this.data.datasets[0].backgroundColor.splice(0,0,bgcolor,bgcolor);
        // this.data.datasets[0].borderColor.splice(0,0,boardercolor,boardercolor);
        this.setState({data:this.data});
    }

    render(){
        return(
            <div  style={{height:"100vh"}}>
            <Bar ref="myBarSalary"
                data = {this.state.data}
                options={{maintainAspectRatio: false}}
                redraw={true}
            />
            </div>
        );
    }
}

SalaryDiagram.bkBackgroundColors = [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
];

SalaryDiagram.bkBorderColor = [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
];


export default SalaryDiagram;