/*
작성자 : 추헌남, 김창희
최초작성일 : 2019/11/25
설명 : 에러 페이지입니다.
다음을 Prop으로 받겠습니다 (받는 타입은 PropTypes에서 기술) :
    없음
*/


import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { ContentMedium, TitleBold, MetaLight } from '../Theming/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-paper';

class ErrorPage extends Component{
    render(){
        return(
            <View style={styles.ErrorView}>
                <View style={styles.Header}>
                    <TitleBold style={{fontSize:30}}><Text style={{textAlign: "center"}}>에러 발생!</Text></TitleBold>
                </View>
                <View>
                    <Text style={{fontSize:20, textAlign: "center"}}>다음을 실행해 주세요 : {"\n"}</Text>
                    <MetaLight style={{fontSize: 20}}>
                    1. 인터넷 연결 후, 앱을 다시 실행해 주세요.
                   
                    </MetaLight> 
                   
                    <MetaLight style={{fontSize: 20, paddingBottom: 15}}>
                    2. 현재 서비스가 점검 중 인지 확인해 주세요. 
                    </MetaLight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ErrorView: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: '45%'
    },
    Header: {
        justifyContent: 'flex-end',
        paddingBottom: 15, 
    },
    Body: {
        
    }
})

export default ErrorPage;