import React, { Component } from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import Weather from './src/components/Weather';
import Forecast from './src/components/Forecast';
import moment from 'moment';

 class App extends Component {

	constructor(props){
		super(props);
		this.state={
		
		}
	}

	kelvin2Farenheit(k) {
		let kelvin = k - 273.15;
		let farenheit = kelvin * 9/5 + 32;
		let solution = Math.round( farenheit * 10) / 10;
		return solution;
	  }
	
	updateValue(text,field){
		if(field=='zipcode'){
			this.setState({
				zipcode:text,
			})
		}
		else if(field=='country'){
			this.setState({
				country:text,
			})
		}
	}

	getWeather = async () => {
		let collect={}
		collect.zipcode=this.state.zipcode,
		collect.country=this.state.country,
		console.warn('data in collect:',collect);

		const apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${collect.zipcode},${collect.country}&appid=b769441f3656a0af22b0fe932644fee0&units=metrics`);
		const data = await apiCall.json();
		console.warn('weather: ',data);

		const apiForecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${collect.zipcode},${collect.country}&appid=b769441f3656a0af22b0fe932644fee0&units=metrics`);
		const dataForecast = await apiForecast.json();
		console.log('forecast: ',dataForecast);
		
		this.parseDays(dataForecast.list)
		console.log('inside parseDays',this.parseDays(dataForecast.list))
		let map = { 
			uri	: `https://maps.googleapis.com/maps/api/staticmap?center=${collect.zipcode},${collect.country}&zoom=10&size=400x400&key=AIzaSyCax_SYepqqE7QxlygPau7lyJggwYcJUTE`
			}

		if (collect.zipcode && collect.country){
			this.setState({
			  temperature: data.main.temp,
			  city: data.name,
			  country: data.sys.country,
			  humidity: data.main.humidity,
			  description: data.weather[0].description,
			  error:'',
			  map:map,
			})
		  }else{
			this.setState({
			  error: "Please enter ZipCode and Country"
			})
		}
	}

	parseDays(forecast){
		console.log('forecast', forecast)
		//let weatherData = this.state.hourlyForecast;
		let today = [];
		let day2 = [];
		let day3 = [];
		let day4 = [];
		let day5 = [];
        const hoy = moment().format('MMMM Do YYYY')
		forecast.map((weatherItem)=> {
			const forecastDate = moment(weatherItem.dt * 1000).format('MMMM Do YYYY')

			if(forecastDate === hoy){
				console.log('im from today!', weatherItem)
				today.push(weatherItem)
			}
    
			if(forecastDate === moment().add(1, 'd').format('MMMM Do YYYY')) {
				day2.push(weatherItem)
			}


			if(forecastDate === moment().add(2, 'd').format('MMMM Do YYYY')){
				day3.push(weatherItem)
			}

			if(forecastDate === moment().add(3, 'd').format('MMMM Do YYYY')){
				day4.push(weatherItem)
			}
			
			if(forecastDate === moment().add(4, 'd').format('MMMM Do YYYY')){
				day5.push(weatherItem)
				console.log('today', today)
			}
			
		});
		console.log("weather today", today);
		console.log("weather day 2", day2);
		console.log("weather day 3", day3);
		console.log("weather day 4", day4);
		console.log("weather day 5", day5);
		this.setState({
			today: today,
			day2: day2,
			day3: day3,
			day4: day4,
			day5: day5,
			isForecast: true,
			})
	}

		// if(collect.zipcode && collect.country){
		// 	this.setState({
				
		// 	})
		// }else{
		// 		console.warn('No Map');
		// 	}
		
		// if (collect.zipcode && collect.country){
		// 	console.log('day1:',moment(dataForecast.list[2].dt_txt).format("dddd MMM Do YY"))
		// 	this.setState({
		// 		day1: dataForecast.list[2].dt_txt,
		// 		temp1: dataForecast.list[2].main.temp,
		// 		descript1: dataForecast.list[2].weather[0].description,
		
		// 		day2: dataForecast.list[10].dt_txt,
		// 		temp2: dataForecast.list[10].main.temp,
		// 		descript2: dataForecast.list[10].weather[0].description,
		
		// 		day3: dataForecast.list[18].dt_txt,
		// 		temp3: dataForecast.list[18].main.temp,
		// 		descript3: dataForecast.list[18].weather[0].description,
		
		// 		day4: dataForecast.list[26].dt_txt,
		// 		temp4: dataForecast.list[26].main.temp,
		// 		descript4: dataForecast.list[26].weather[0].description,
		
		// 		day5: dataForecast.list[34].dt_txt,
		// 		temp5: dataForecast.list[34].main.temp,
		// 		descript5: dataForecast.list[34].weather[0].description,
		// 	})
		// }else{
		// 	this.setState({

		// 	})
		// }
		// /////////////////////////////////////////////////////////////////////////
		// if(collect.zipcode && collect.country){
		// 	let min = Math.min(
		// 		dataForecast.list[2].main.temp_min,
		// 		dataForecast.list[3].main.temp_min,
		// 		dataForecast.list[4].main.temp_min,
		// 		dataForecast.list[5].main.temp_min,
		// 		dataForecast.list[6].main.temp_min,
		// 		dataForecast.list[7].main.temp_min,
		// 		dataForecast.list[8].main.temp_min,
		// 		dataForecast.list[9].main.temp_min)
		// 	console.warn('this is Math.min',min);
		// 	// for(var i=0; i> min.length;i++){
		// 	// 	let checkDay='';
		// 	// 	if(moment(dataForecast.list[i].dt_txt).format("dddd MMM Do YY")==moment(dataForecast.list[i+1].dt_txt).format("dddd MMM Do YY")){
		// 	// 		console.log('Same day',moment(dataForecast.list[i].dt_txt).format("dddd MMM Do YY"))
		// 	// 	}
		// 	// };
		// 	// let day =[day1,day2,day3,day4,day5]
		// 	// let checked = min.map(day=>min.length){
		// 	// 	if(moment(dataForecast.list[i].dt_txt).format("dddd MMM Do YY")==moment(dataForecast.list[i+1].dt_txt).format("dddd MMM Do YY")){
		// 	// 		return day;
		// 	// 	}
		// 	// }
		// 	this.setState({
		// 		min:min,
		// 	})
		// 	console.log('this the 1st min ',min)
		// }
		// if(collect.zipcode && collect.country){
		// 	let min2 = Math.min(
		// 		dataForecast.list[10].main.temp_min,
		// 		dataForecast.list[11].main.temp_min,
		// 		dataForecast.list[12].main.temp_min,
		// 		dataForecast.list[13].main.temp_min,
		// 		dataForecast.list[14].main.temp_min,
		// 		dataForecast.list[15].main.temp_min,
		// 		dataForecast.list[16].main.temp_min,
		// 		dataForecast.list[17].main.temp_min,)
		// 	this.setState({
		// 		min2:min2,
		// 	})
		// 	console.log('this the  min ',min2)
		// }
		// if(collect.zipcode && collect.country){
		// 	let min3 = Math.min(
		// 		dataForecast.list[18].main.temp_min,
		// 		dataForecast.list[19].main.temp_min,
		// 		dataForecast.list[20].main.temp_min,
		// 		dataForecast.list[21].main.temp_min,
		// 		dataForecast.list[22].main.temp_min,
		// 		dataForecast.list[23].main.temp_min,
		// 		dataForecast.list[24].main.temp_min,
		// 		dataForecast.list[25].main.temp_min,)
		// 	this.setState({
		// 		min3:min3,
		// 	})
		// }
		// if(collect.zipcode && collect.country){
		// 	let min4 = Math.min(
		// 		dataForecast.list[26].main.temp_min,
		// 		dataForecast.list[27].main.temp_min,
		// 		dataForecast.list[28].main.temp_min,
		// 		dataForecast.list[29].main.temp_min,
		// 		dataForecast.list[30].main.temp_min,
		// 		dataForecast.list[31].main.temp_min,
		// 		dataForecast.list[32].main.temp_min,
		// 		dataForecast.list[33].main.temp_min,)
		// 	this.setState({
		// 		min4:min4,
		// 	})
		// }
		// if(collect.zipcode && collect.country){
		// 	let min5 = Math.min(
		// 		dataForecast.list[34].main.temp_min,
		// 		dataForecast.list[35].main.temp_min,
		// 		dataForecast.list[36].main.temp_min,
		// 		dataForecast.list[37].main.temp_min,
		// 		dataForecast.list[38].main.temp_min,
		// 		dataForecast.list[39].main.temp_min,)
		// 	this.setState({
		// 		min5:min5,
		// 	})
		// }
		// /////////////////////////////////////////////////////////////////////////
		// if(collect.zipcode && collect.country){
		// 	let max = Math.max(
		// 		dataForecast.list[2].main.temp_max,
		// 		dataForecast.list[3].main.temp_max,
		// 		dataForecast.list[4].main.temp_max,
		// 		dataForecast.list[5].main.temp_max,
		// 		dataForecast.list[6].main.temp_max,
		// 		dataForecast.list[7].main.temp_max,
		// 		dataForecast.list[8].main.temp_max,
		// 		dataForecast.list[9].main.temp_max,)
		// 	this.setState({
		// 		max:max,
		// 	})
		// }
		// if(collect.zipcode && collect.country){
		// 	let max2 = Math.max(	
		// 		dataForecast.list[10].main.temp_max,
		// 		dataForecast.list[11].main.temp_max,
		// 		dataForecast.list[12].main.temp_max,
		// 		dataForecast.list[13].main.temp_max,
		// 		dataForecast.list[14].main.temp_max,
		// 		dataForecast.list[15].main.temp_max,
		// 		dataForecast.list[16].main.temp_max,
		// 		dataForecast.list[17].main.temp_max,)
		// 	this.setState({
		// 		max2:max2,
		// 	})
		// }
		// if(collect.zipcode && collect.country){
		// 	let max3 = Math.max(
		// 		dataForecast.list[18].main.temp_max,
		// 		dataForecast.list[19].main.temp_max,
		// 		dataForecast.list[20].main.temp_max,
		// 		dataForecast.list[21].main.temp_max,
		// 		dataForecast.list[22].main.temp_max,
		// 		dataForecast.list[23].main.temp_max,
		// 		dataForecast.list[24].main.temp_max,
		// 		dataForecast.list[25].main.temp_max,)
		// 	this.setState({
		// 		max3:max3,
		// 	})
		// }
		// if(collect.zipcode && collect.country){
		// 	let max4 = Math.max(
		// 		dataForecast.list[26].main.temp_max,
		// 		dataForecast.list[27].main.temp_max,
		// 		dataForecast.list[28].main.temp_max,
		// 		dataForecast.list[29].main.temp_max,
		// 		dataForecast.list[30].main.temp_max,
		// 		dataForecast.list[31].main.temp_max,
		// 		dataForecast.list[32].main.temp_max,
		// 		dataForecast.list[33].main.temp_max,)
		// 	this.setState({
		// 		max4:max4,
		// 	})
		// }
		// if(collect.zipcode && collect.country){
		// 	let max5 = Math.max(
		// 		dataForecast.list[34].main.temp_max,
		// 		dataForecast.list[35].main.temp_max,
		// 		dataForecast.list[36].main.temp_max,
		// 		dataForecast.list[37].main.temp_max,
		// 		dataForecast.list[38].main.temp_max,
		// 		dataForecast.list[39].main.temp_max,)
		// 	this.setState({
		// 		max5:max5,
		// 	})
		// }
		
	
	render() {

		return(
		
			<View style={styles.container}>
				{!this.state.isForecast &&
				<View style={styles.titles}>
					<Text>This is my mobile react-native wheather app</Text>
					<Text>Enter a zip and country code</Text>
					<Text>To get the current weather and forecast</Text>
					<Text>4 the up coming days</Text>
				</View>}
				{!this.state.isForecast &&
				<TextInput
					placeholder='zipcode...'
					style={styles.input}
					onChangeText={(text)=>this.updateValue(text,'zipcode')}
					value={this.state.text}/>}
				{!this.state.isForecast &&
				<TextInput
					placeholder='country code...'
					style={{textTransform: 'uppercase'}}
					onChangeText={(text)=>this.updateValue(text,'country')}
					value={this.state.text}/>}
				{!this.state.isForecast &&
				<TouchableOpacity onPress={()=> this.getWeather()} style={styles.btn}>
					<Text>Get Weather</Text>
				</TouchableOpacity>}
				<View style={{flex:2}}>
					<Weather
						temperature = {this.state.temperature && this.kelvin2Farenheit(this.state.temperature)}
						city={this.state.city}
						country={this.state.country}
						humidity={this.state.humidity}
						description={this.state.description}
						map={this.state.map}
						error={this.state.error}/>
				</View>
				<View style={{flex:2}}>
					{this.state.isForecast &&
					<Forecast
						today={this.state.today}
						day2={this.state.day2}
						day3={this.state.day3}
						day4={this.state.day4}
						day5={this.state.day5}
				
					
						/>}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		// flex: 1,
		// paddingTop:50,
		// justifyContent: 'center',
		// alignItems: 'center',
		// backgroundColor: '#F5FCFF'
	},
	input:{
		textTransform: 'uppercase',
	},

	titles:{
		backgroundColor:'whitesmoke',
		color:'red',
		padding:10,
		textTransform: 'uppercase',
		// autoCapitalize="characters",
		borderRadius: 3,
	},
	btn: {
		backgroundColor:'skyblue',
		height:26,
		fontSize: 25,
		textAlign: 'center',		
		margin: 10,
		alignItems:'center',
		color:'whitesmoke',
		// background: palevioletred,
		borderRadius: 3,
		
  }
})
 export default App
 	// day1 = {this.state.day1}
						// max = {this.state.max && this.kelvin2Farenheit(this.state.max)}
						// min = {this.state.min && this.kelvin2Farenheit(this.state.min)}
						// descript1 = {this.state.descript1}
						
						// day2 = {this.state.day2}
						// max2 = {this.state.max2 && this.kelvin2Farenheit(this.state.max2)}
						// min2 = {this.state.min2 && this.kelvin2Farenheit(this.state.min2)}
						// descript2 = {this.state.descript2}

						// day3 = {this.state.day3}
						// max3 = {this.state.max3 && this.kelvin2Farenheit(this.state.max3)}
						// min3 = {this.state.min3 && this.kelvin2Farenheit(this.state.min3)}
						// descript3 = {this.state.descript3}

						// day4 = {this.state.day4}
						// max4 = {this.state.max4 && this.kelvin2Farenheit(this.state.max4)}
						// min4 = {this.state.min4 && this.kelvin2Farenheit(this.state.min4)}
						// descript4 = {this.state.descript4}
						
						// day5 = {this.state.day5}
						// max5 = {this.state.max5 && this.kelvin2Farenheit(this.state.max5)}
						// min5 = {this.state.min5 && this.kelvin2Farenheit(this.state.min5)}
						// descript5 = {this.state.descript5}