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

class SettingScreen extends Component{
    static defaultProps = {
        isSwitchOn : false,
    }

    constructor(props){
        super(props);
        this.state = {
            isSwitchOn : false,
        }
    }

    render(){
        return(
            <View>
                <Text>
                    비밀번호 설정
                </Text>
                <Switch
                    value={this.state.isSwitchOn}
                    onValueChange={() => { this.setState({ isSwitchOn: !isSwitchOn }); }}
                />
            </View>
        );
    }
}

SettingScreen.propTypes = {
    name: PropTypes.string
  };

export default SettingScreen;