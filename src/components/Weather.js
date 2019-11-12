import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';


class Weather extends React.Component {
    
    // const mapApi =`https://maps.googleapis.com/maps/api/staticmap?center=${collect.zipcode},${collect.country}&zoom=10&size=400x400&key=AIzaSyCax_SYepqqE7QxlygPau7lyJggwYcJUTE`
        render() {
            console.log('this is map',this.props.map)
            if(!this.props.temperature || this.props.map == undefined){
                return <View></View>
            }
            else
            return ( 
                <View>
                
                    <Image style={{width:200,height:200}} source={this.props.map}/>
                    <View style={{backgroundColor: 'powderblue',borderRadius: 15,padding:5}}>
                        <Text style={styles.text}> Location: {this.props.city},{this.props.country}</Text>
                    </View>
                    <View style={{ backgroundColor: 'skyblue',borderRadius: 15,padding:6}}>
                        <Text style={styles.text}>Temperature: {this.props.temperature}</Text>
                        <Text style={styles.text}>Humidity: {this.props.humidity}</Text>
                    </View>
                    <View style={{ backgroundColor: 'steelblue',borderRadius: 15, padding:10}}>
                        <Text style={styles.text}>Conditions: {this.props.description}</Text>
                    </View>

                    <Text>{this.props.error}</Text>  

                    </View>
            )
        }
}

const styles = StyleSheet.create({
	container1: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    text:{
        color: 'white'
    }
	
})
export default Weather;