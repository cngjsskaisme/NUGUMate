/*
작성자 : 김택준
최초작성일 : 2019/11/20
설명 : 잠금화면 스크린
다음을 Prop으로 받겠습니다 (받는 타입은 PropTypes에서 기술) :
    안받음
*/

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import PinView from 'react-native-pin-view';

class LockScreen extends Component{
    constructor(props) {
        super(props);
        this.onComplete = this.onComplete.bind(this);
        this.state = {
            pin: "896745"
        }
    }

    onComplete(inputtedPin, clear) {
        if (inputtedPin != this.state.pin) {
            clear();
        } else {
            console.log("Pin is correct");
        }
    }

    onPress(inputtedPin, clear, pressed) {
        console.log("Pressed: " + pressed);
        console.log("inputtedpin: " + inputtedPin);
    }
    render(){
        return(
            <View style={{
                flex           : 1,
                backgroundColor: '#f1f1f1',
                justifyContent : 'center'
              }}>
                <PinView
                onPress={this.onPress}
                onComplete={this.onComplete}
                pinLength={this.state.pin.length}
                // pinLength={6} // You can also use like that.
                />
              </View>
        );
    }
}

LockScreen.propTypes = {
    name: PropTypes.string
  };

export default LockScreen;