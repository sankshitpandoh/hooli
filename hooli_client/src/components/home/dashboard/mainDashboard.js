import React from 'react';
import Chart from "react-google-charts";
import {chartData} from '../../../utilities/dataOps';
import '../../../stylesheets/dashboard/mainDashboard.css'


class MainDashboard extends React.Component {
    state  = {
            ageData: [],
            modeOfPayment: [],
            totalPatients: 0,
            totalMoney: 0,
            averageMoney: 0,
            patientsDayData: []
    }

    componentDidMount() {
        this.getChartData();
    }

    getChartData = () => {
        chartData(sessionStorage.getItem("authToken")).then((res) => {
            console.log(res)
            this.setState({
                ageData:[['Age', "People"], ...res.ageData],
                modeOfPayment:[ ["paymentMode", "people"] ,...res.modeOfPayment],
                totalPatients: res.totalPatients,
                totalMoney: res.totalMoney,
                averageMoney: (parseInt(res.totalMoney) / parseInt(res.totalPatients)),
                patientsDayData: [['Date', 'Patients'], ...res.patientsDayData]
            })
        }).catch((err) => {
            console.log(err)
        })
    } 

    render() {
        return (
            <div className="d-flex flex-wrap align-items-center justify-content-center p-5">
                <div className="col-4 mb-5">
                    <div className="data-display p-5 d-flex flex-column w-100 justify-content-center align-items-center">
                        <p>Total Patients:</p>
                        <strong className="mb-3">{this.state.totalPatients}</strong>
                    </div>
                </div>
                <div className="col-4 mb-5">
                    <div className="data-display p-5 d-flex flex-column w-100 justify-content-center align-items-center">
                        <p>Total Money Spent:</p>
                        <strong className="mb-3">{this.state.totalMoney.toFixed(2)}</strong>
                    </div>
                </div>
                <div className="col-4 mb-5">
                    <div className="data-display p-5 d-flex flex-column w-100 justify-content-center align-items-center">
                        <p>Average spending of a patient:</p>
                        <strong className="mb-3">{this.state.averageMoney.toFixed(2)}</strong>
                    </div>
                </div>
                <div className="col-6 mb-4">
                    <div className="d-flex justify-content-center align-items-center chart-cont">
                        <Chart
                            width={'100%'}
                            height={'230px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart...</div>}
                            data={this.state.ageData}
                            options={{
                                title: 'Age groups',
                                is3D: true
                            }}
                            rootProps={{ 'data-testid': '1' }}
                            />
                    </div>
                </div>
                <div className="col-6 mb-4">
                    <div className="d-flex justify-content-center align-items-center chart-cont">
                        <Chart
                            width={'100%'}
                            height={'230px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart...</div>}
                            data={this.state.modeOfPayment}
                            options={{
                                title: 'Payment Modes',
                                is3D: true
                            }}
                            rootProps={{ 'data-testid': '2' }}
                        />  
                    </div>
                </div>
                <div className="col-12">
                    <Chart
                        width={'100%'}
                        height={'300px'}
                        chartType="Bar"
                        loader={<div>Loading Chart...</div>}
                        data={this.state.patientsDayData}
                        options={{
                            chart: {
                            title: 'Patients per day',
                            },
                        }}
                        rootProps={{ 'data-testid': '3' }}
                    />
                </div>
            </div>
        )
    }
}

export default MainDashboard;