/*
작성자 : 김택준
최초작성일 : 2019/11/20
설명 : 로그인 스크린 (나중에)
다음을 Prop으로 받겠습니다 (받는 타입은 PropTypes에서 기술) :
    안받음
*/


import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import MainScreen from '../MainScreen/MainScreen';
import { navigation, withNavigation, NavigationActions } from 'react-navigation'; 

class LoginScreen extends Component{
    render(){
        if(true) // 조건이 맞을 경우 메인 스크린 진입
            this.props.navigation.reset([NavigationActions.navigate({ routeName: 'TabNavigator' })], 0);

        return(
            <View>

            </View>
        )
    }
}

LoginScreen.propTypes = {
    name: PropTypes.string
  };

export default withNavigation(LoginScreen);