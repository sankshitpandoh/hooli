/* App.js */
import React from 'react';
import * as CanvasJSReact from 'canvasjs-react-charts';
import {end_points} from '../../../config/endPoints';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
var dataPoints =[];
class DateChart extends React.Component {
 
	render() {	
		const options = {
			theme: "light2",
			title: {
				text: "Daily Patients"
			},
			axisY: {
				title: "Patients",
				prefix: "$"
			},
			data: [{
				type: "line",
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.00",
				dataPoints: dataPoints
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
		</div>
		);
	}
	
	componentDidMount(){
		var chart = this.chart;
		fetch("https://canvasjs.com/data/gallery/react/nifty-stock-price.json")
		// fetch(end_points.getPatientDayWiseData)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			for (var i = 0; i < data.length; i++) {
				dataPoints.push({
					x: data[i].x,
					y: data[i].y
				});
			}
			chart.render();
		});
	}
}
 
// module.exports = App
export default DateChart;