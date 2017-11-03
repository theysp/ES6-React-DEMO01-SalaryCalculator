import React, {
    Component,
  } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import  SalaryDiagram from "./comparison.js";
import './style.css';

class InputNum extends Component
{

    constructor(props){
        super(props);
        // this.protoTypes = {
        //     value: React.PropTypes.string.isRequired,
        //     limit_up: React.PropTypes.number.isRequired,
        //     limit_down: React.PropTypes.number.isRequired,
        //     isValid: React.PropTypes.bool.isRequired
        // };
        this.state = {
            value: this.props.value, 
            limit_up: this.props.limit_up, 
            limit_down: this.props.limit_down, 
            isValid: true
        };
    }
    

    updateLimitUp(lu){
        //this.setState({limit_up:lu});
        this.state.limit_up = lu;
        console.log("this.state.value: "+this.state.value+" this.state.limit_up "+this.state.limit_up);
        if(this.state.value < this.state.limit_down || this.state.value > this.state.limit_up)
        {
            this.setState({isValid: false});
            console.log("validate to false.");
        }else
        {
            this.setState({isValid: true});
        }
    }

    handleChange(event){
        var val = Number(event.target.value);
        
        if(val < this.state.limit_down || val > this.state.limit_up || isNaN(event.target.value))
        {
            this.setState({value: event.target.value});
            this.setState({isValid: false});
        }else
        {
            this.setState({value: event.target.value});
            this.setState({isValid: true});
            if("changeValue" in this.props)
            {
                this.props.changeValue(val);
            }
        }
    }
    
    render(){
        var value = this.state.value;
        var isValid = this.state.isValid;
        var textcolor = "black";
        //console.log("this.state.value: "+this.state.value+" this.state.limit_up "+this.state.limit_up);
        if(!this.state.isValid)
        {
            textcolor = "red";
            //console.log("set color to red ");
        }
            
        return (
            <input type="number" style={{color:textcolor}} value={value} onChange={this.handleChange.bind(this)} />
        );
    }
};

InputNum.defaultProps  = {
    value : "0.0",
    limit_up : 100,
    limit_down : -100,
    isValid: true
};



class SalaryCalculator extends React.Component
{
    constructor(props){
        super(props);
        this.houseComm = 0;
        this.salaryNum = 12;
        this.medInssure = 0;
        this.oldInssure = 0;
        this.minusAmount = 0;
        this.incomeBase = 0;
        this.incomeTaxRate =      0;
        this.incomeTaxMinus =        0;
        this.pureIncomePerMonth = 0;
        this.bonus =            0;
        this.purebonus =          0;
        this.totalIncomeWithoutIns = 0;
        this.state = {
            totalIncome: 0
            };
        this.handleClick = this.handleClick.bind(this);
    }
    

    changeSalary(val){
        if("BaseSalary" in this.refs)
        {
            this.refs.BaseSalary.updateLimitUp(val);
        }
    }


    gettaxrateandminus(income){
        var incomeThreshold = [1500,4500,9000,35000,55000,80000];
        var incomeTaxRate = [0.03,0.1,0.2,0.25,0.3,0.35,0.45];
        var incomeMinuses = [0,105,555,1005,2755,5505,13505];
        var i=0;
        for(i=0;i<incomeThreshold.length;++i)
        {
            if(incomeThreshold[i]>income)
            {
                break;
            }
        }
        return {taxRate:incomeTaxRate[i], taxMinus:incomeMinuses[i]};
    }

    handleClick(event){
        if(!(this.refs.Salary.state.isValid
        &&this.refs.BaseSalary.state.isValid
        &&this.refs.OldInssureRate0.state.isValid
        &&this.refs.OldInssureRate1.state.isValid
        &&this.refs.MedInssureRate0.state.isValid
        &&this.refs.MedInssureRate1.state.isValid
        &&this.refs.HouseCommRate0.state.isValid
        &&this.refs.HouseCommRate1.state.isValid
        &&this.refs.JobInssureRate0.state.isValid
        &&this.refs.JobInssureRate1.state.isValid
        &&this.refs.WorkInjureInssureRate0.state.isValid
        &&this.refs.WorkInjureInssureRate1.state.isValid
        &&this.refs.ReproductionInssureRate0.state.isValid
        &&this.refs.ReproductionInssureRate1.state.isValid
        &&this.refs.IncomeTaxDiscount.state.isValid))
            return;
        var salary = eval(this.refs.Salary.state.value);
        var baseSalary = eval(this.refs.BaseSalary.state.value);
        var salaryNumber = eval(this.refs.SalaryNumber.state.value)
        var oldInssureRate0 = eval(this.refs.OldInssureRate0.state.value)/100;
        var oldInssureRate1 = eval(this.refs.OldInssureRate1.state.value)/100;
        var medInssureRate0 = eval(this.refs.MedInssureRate0.state.value)/100;
        var medInssureRate1 = eval(this.refs.MedInssureRate1.state.value)/100;
        var houseCommRate0 = eval(this.refs.HouseCommRate0.state.value)/100;
        var houseCommRate1 = eval(this.refs.HouseCommRate1.state.value)/100;
        var jobInssureRate0 = eval(this.refs.JobInssureRate0.state.value)/100;
        var jobInssureRate1 = eval(this.refs.JobInssureRate1.state.value)/100;
        var workInjureInssureRate0 = eval(this.refs.WorkInjureInssureRate0.state.value)/100;
        var workInjureInssureRate1 = eval(this.refs.WorkInjureInssureRate1.state.value)/100;
        var reproductionInssureRate0 = eval(this.refs.ReproductionInssureRate0.state.value)/100;
        var reproductionInssureRate1 = eval(this.refs.ReproductionInssureRate1.state.value)/100;
        var incomeTaxDiscount = eval(this.refs.IncomeTaxDiscount.state.value);
        
        this.houseComm = baseSalary * (houseCommRate0 + houseCommRate1);
        this.medInssure = baseSalary * (medInssureRate0 + medInssureRate1);
        this.oldInssure = baseSalary* (oldInssureRate0 + oldInssureRate1);
        this.minusAmount = baseSalary * (houseCommRate0+medInssureRate0+oldInssureRate0+jobInssureRate0);
        //计算每个月工资应缴税
        this.incomeBase = salary-this.minusAmount;
        var rateminus = this.gettaxrateandminus(this.incomeBase);
        this.incomeTaxRate = rateminus.taxRate;
        this.incomeTaxMinus = rateminus.taxMinus;
        this.pureIncomePerMonth = this.incomeBase - ((this.incomeBase - incomeTaxDiscount)*this.incomeTaxRate - this.incomeTaxMinus);
        //计算年终奖工资应缴税
        this.bonus = (salaryNumber-12)*salary;
        var bonusForTax = this.bonus;
        if(salary < 3500)
        {
            bonusForTax -= 3500-this.salary;
        }                    
        var bonusForTaxPerMonth = bonusForTax/12.0;
        rateminus =  this.gettaxrateandminus(bonusForTaxPerMonth);
        var incomeTaxRateForBonus = rateminus.taxRate;
        var incomeTaxMinusForBonus = rateminus.taxMinus;
        this.purebonus = this.bonus - (bonusForTax*incomeTaxRateForBonus-incomeTaxMinusForBonus);
        this.totalIncomeWithoutIns = this.pureIncomePerMonth*12+this.purebonus;
        var totalIncome = (this.pureIncomePerMonth+this.medInssure+this.oldInssure+this.houseComm)*12+this.purebonus;
        this.setState({totalIncome:totalIncome});
        this.refs.SalaryDiagram.pushdata(this.totalIncomeWithoutIns,totalIncome);
    }

    render(){
        return (
            <div>
                <div>
                    <div>
                        <span className="label1">输入月薪(1~1亿)：</span>
                        <span className="input"><InputNum ref="Salary" limit_up={1e8} limit_down={1} value="10000" changeValue={this.changeSalary.bind(this)}/></span>
                    </div>
                    <div>
                        <span className="label1"> 输入五险一金基准月薪(1~月薪)： </span>
                        <span className="input"><InputNum ref="BaseSalary" limit_up={10000} limit_down={1} value="10000"/></span>
                        {console.log("output base salary ")}
                    </div>
                    <div>
                        <span className="label1"> 输入月薪数量(12~1000)： </span>
                        <span className="input"><InputNum ref="SalaryNumber" limit_up={10000} limit_down={12} value="15"/></span>
                    </div>
                    <div>
                    </div>
                    <div>
                        <span className="label2"></span>
                        <span className="label3" style={{align:"center"}}>个人比例 %</span>
                        <span className="label3" style={{align:"center"}}>单位比例 %</span>
                    </div>
                    <div>
                        <span className="label2">养老保险</span>
                        <span className="input"><InputNum ref="OldInssureRate0" limit_up={100} limit_down={0} value="8"/></span>
                        <span className="input"><InputNum ref="OldInssureRate1" limit_up={100} limit_down={0} value="20"/></span>
                    </div>
                    <div>
                        <span className="label2">医疗保险</span>
                        <span className="input"><InputNum ref="MedInssureRate0" limit_up={100} limit_down={0} value="2"/></span>
                        <span className="input"><InputNum ref="MedInssureRate1" limit_up={100} limit_down={0} value="11"/></span>
                    </div>
                    <div>
                        <span className="label2">失业保险</span>
                        <span className="input"><InputNum ref="JobInssureRate0" limit_up={100} limit_down={0} value="0.5"/></span>
                        <span className="input"><InputNum ref="JobInssureRate1" limit_up={100} limit_down={0} value="1.5"/></span>
                    </div>
                    <div>
                        <span className="label2">住房公积金</span>
                        <span className="input"><InputNum ref="HouseCommRate0" limit_up={100} limit_down={0} value="12"/></span>
                        <span className="input"><InputNum ref="HouseCommRate1" limit_up={100} limit_down={0} value="12"/></span>
                    </div>
                    <div>
                        <span className="label2">工伤保险</span>
                        <span className="input"><InputNum ref="WorkInjureInssureRate0" limit_up={100} limit_down={0} value="0"/></span>
                        <span className="input"><InputNum ref="WorkInjureInssureRate1" limit_up={100} limit_down={0} value="0.5"/></span>
                    </div>
                    <div>
                        <span className="label2">生育保险</span>
                        <span className="input"><InputNum ref="ReproductionInssureRate0" limit_up={100} limit_down={0} value="0"/></span>
                        <span className="input"><InputNum ref="ReproductionInssureRate1" limit_up={100} limit_down={0} value="1"/></span>
                    </div>
                    <div>
                        <span className="label1">扣除数（元）</span>
                        <span className="input"><InputNum ref="IncomeTaxDiscount" limit_up={1e8} limit_down={1} value="3500"/></span>
                    </div>
                    <div>
                        <span className="lineButton" ><button className="calculatebutton" type="button" onClick={this.handleClick.bind(this)}>计算收入</button></span>
                    </div>
                </div>
                <SalaryDiagram ref="SalaryDiagram"/>
                <div>
                    <ul>
                        <li>公积金：{this.houseComm.toFixed(2)}</li>
                        <li>医疗保险：{this.medInssure.toFixed(2)}</li>
                        <li>养老保险：{this.oldInssure.toFixed(2)}</li>
                        <li>每月收入扣除的五险一金数量：{this.minusAmount.toFixed(2)}</li>
                        <li>月收入个人所得税率：{this.incomeTaxRate.toFixed(2)}</li>
                        <li>月收入个人所得税应扣除数：{this.incomeTaxMinus.toFixed(2)}</li>
                        <li>净月收入：{this.pureIncomePerMonth.toFixed(2)}</li>
                        <li>税前奖金：{this.bonus.toFixed(2)}</li>
                        <li>税后奖金：{this.purebonus.toFixed(2)}</li>
                        <li>不计五险一金年收入：{this.totalIncomeWithoutIns.toFixed(2)}</li>
                        <li>计医疗养老保险与住房公积金年收入：{this.state.totalIncome.toFixed(2)}</li>
                    </ul>
                </div>
            </div>
        );
    }
};

ReactDOM.render(
    <SalaryCalculator name="HAHA"/>,
    document.getElementById("calculatorcontainer")
  );
