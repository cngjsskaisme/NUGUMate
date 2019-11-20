/*
작성자 : 추헌남
최초작성일 : 2019/11/17
설명 : 설정 스크린
다음을 Prop으로 받겠습니다 (받는 타입은 PropTypes에서 기술) :
    안받음
*/


import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Switch } from 'react-native-paper';
import PropTypes from 'prop-types';
import LockScreen from '../MainScreen/LockScreen';
import { navigation, withNavigation } from 'react-navigation'; 

class SettingScreen extends Component{
    static defaultProps = {
        isLockEnabled : false,
    }

    constructor(props){
        super(props);
        this.state = {
            isLockEnabled : false,
        }
    }

    _onChangeFunction(newState) {
        this.setState(newState)
        if(!this.state.isLockEnabled) {
            this.props.navigation.navigate('LockScreen', { 
                selectedDate : this.props.selectedDate,
                diaryList : this.props.diaryList,
            })
        }
    }

    render(){
        console.log(this.state.isLockEnabled)
        return(
            <View>
                <Text>
                    비밀번호 설정
                </Text>
                <Switch
                    onValueChange={(value) => { this._onChangeFunction({ isLockEnabled: value }) }}
                    value={this.state.isLockEnabled}
                />
            </View>
        );
    }
}

SettingScreen.propTypes = {
    name: PropTypes.string
  };

export default withNavigation(SettingScreen);