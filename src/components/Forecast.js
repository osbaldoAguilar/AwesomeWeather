import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import Day from './Day';
import { whileStatement } from '@babel/types';


class Forecast extends React.Component {
   
    constructor(props){
        super(props)
            this.state ={};
    }

    getMaxTemp(array) {
        let max = 0;
        array.map(item => {
          if (item.main.temp_max > max) {
            max = item.main.temp_max;
          }
        });
        return max;
      }
    
      getMinTemp(array) {
        let min = 400;
        array.map(item => {
          if (item.main.temp_min < min) {
            min = item.main.temp_min;
          }
        });
        return min;
      }
    
      getTemp(k) {
        let kelvin = k - 273.15;
        let farenheit = (kelvin * 9) / 5 + 32;
        let solution = Math.round(farenheit * 10) / 10;
        return solution;
      }


    componentDidMount(){
        console.log('props in today',this.props.today);
        this.setState({
            day: this.props.today[0].dt_txt,
            max: this.getTemp(this.getMaxTemp(this.props.today)),
            min: this.getTemp(this.getMinTemp(this.props.today)),

            day2: this.props.day2[0].dt_txt,
            max2: this.getTemp(this.getMaxTemp(this.props.day2)),
            min2: this.getTemp(this.getMinTemp(this.props.day2)),

            day3: this.props.day3[0].dt_txt,
            max3: this.getTemp(this.getMaxTemp(this.props.day3)),
            min3: this.getTemp(this.getMinTemp(this.props.day3)),

            day4: this.props.day4[0].dt_txt,
            max4: this.getTemp(this.getMaxTemp(this.props.day4)),
            min4: this.getTemp(this.getMinTemp(this.props.day4)),
            
            day5: this.props.day5[0].dt_txt,
            max5: this.getTemp(this.getMaxTemp(this.props.day5)),
            min5: this.getTemp(this.getMinTemp(this.props.day5)),
        })
    }

    
    render() {
        console.log('props in today',this.props.today);
        return (
            
            <View style={styles.container2}>
                <View style={{color: 'white', 
                    backgroundColor: 'powderblue',borderRadius: 15,width: 78,height: 150,}}>
                <Day
                    day={this.state.day}
                    max={this.state.max}
                    min={this.state.min}/>
                    </View>
                <View style={{ backgroundColor: 'powderblue',borderRadius: 15,width: 78,height: 150,}}>
                <Day
                    day={this.state.day2}
                    max={this.state.max2}
                    min={this.state.min2}/>
                    </View>
                <View style={{ backgroundColor: 'powderblue',borderRadius: 15,width: 78,height: 150,}}>
                <Day
                    day={this.state.day3}
                    max={this.state.max3}
                    min={this.state.min3}/>
                    </View>
                <View style={{ backgroundColor: 'powderblue',borderRadius: 15,width: 78,height: 150,}}>
                <Day
                    day={this.state.day4}
                    max={this.state.max4}
                    min={this.state.min4}/> 
                    </View>
                <View style={{ backgroundColor: 'powderblue',borderRadius: 15,width: 78,height: 150,}}>
                <Day
                    day={this.state.day5}
                    max={this.state.max5}
                    min={this.state.min5}/> 
                    </View>      

            </View>
       )
    }
}
const styles = StyleSheet.create({
	container2: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'baseline',
	},
	
})
export default Forecast;   
        //         <View style={{ backgroundColor: 'powderblue',borderRadius: 15,
        //   width: 78,
        //   height: 150,}}>
        //             <Text>{moment(this.props.day1).format("dddd MMM Do YY")}</Text>
        //             <Text>Max Temp: {this.props.max}℉</Text>
        //             <Text>Min Temp: {this.props.min}℉</Text>
        //             <Text>Conditions: {this.props.descript1}</Text>
        //         </View>
        //         <View style={{ backgroundColor: 'skyblue',borderRadius: 15,
        //   width: 78,
        //   height: 150,}}  >
        //             <Text>{moment(this.props.day2).format("dddd MMM Do YY")}</Text>
        //             <Text>Max Temp: {this.props.max2}℉</Text>
        //             <Text>Min Temp: {this.props.min2}℉</Text>
        //             <Text>Conditions: {this.props.descript2}</Text>
        //         </View>
        //         <View style={{ backgroundColor: 'steelblue',borderRadius: 15,
        //   width: 78,
        //   height: 150,}}>
        //             <Text>{moment(this.props.day3).format("dddd MMM Do YY")}</Text>
        //             <Text>Max Temp: {this.props.max3}℉</Text>
        //             <Text>Min Temp: {this.props.min3}℉</Text>
        //             <Text>Conditions: {this.props.descript3}</Text>
        //         </View>
        //         <View style={{ backgroundColor: 'skyblue',borderRadius: 15,
        //   width: 78,
        //   height: 150,}}>
        //             <Text>{moment(this.props.day4).format("dddd MMM Do YY")}</Text>
        //             <Text>Max Temp: {this.props.max4}℉</Text>
        //             <Text>Min Temp: {this.props.min4}℉</Text>
        //             <Text>Conditions: {this.props.descript4}</Text>
        //         </View>
        //         <View style={{ backgroundColor: 'powderblue',borderRadius: 15,
        //   width: 78,
        //   height: 150,}}>
        //             <Text>{moment(this.props.day5).format("dddd MMM Do YY")}</Text>
        //             <Text>Max Temp: {this.props.max5}℉</Text>
        //             <Text>Min Temp: {this.props.min5}℉</Text>
        //             <Text>Conditions: {this.props.descript5}</Text>
        //        </View>