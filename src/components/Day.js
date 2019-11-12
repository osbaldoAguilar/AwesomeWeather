import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import moment from 'moment';
// import {library} from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faCloud, faSun, faCloudRain } from '@fortawesome/free-solid-svg-icons';

//library.add(faSun, faCloud, faCloudRain);

class Day extends React.Component{
    // getIcon(){
    //     const newArray = Object.assign(this.props.dayInfo);
    //     console.log(newArray[0]);
    //     const forecast = newArray[0].weather[0].main;
    //     console.log("whole day", forecast);
    //     if (forecast === "Rain") {
    //         return <FontAwesomeIcon icon={faCloudRain} />;
    //     }
    //     if (forecast === "Clouds") {
    //         return <FontAwesomeIcon icon={faCloud} />;
    //     }
    //     if (forecast === "sunny") {
    //         return <FontAwesomeIcon icon={faSun} />;
    //     };   
    // }

    render() {
        return(
        <View>
            {/* <FontAwesomeIcon icon={this.getIcon()}/> */}
            <Text>{moment(this.props.day).format('dddd MMMM Do YYYY')}</Text>
            <Text>Max:{this.props.max}℉</Text>
            <Text>Min:{this.props.min}℉</Text>
            {/* <Text>Conditions: {this.props.descript1}</Text> */}
        </View>
        )
    }
}

export default Day;