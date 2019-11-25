/*
작성자 : 김창희
최초작성일 : 2019/11/23
설명 : 사용자가 이전에 잠금 설정을 했는 지의 여부에 따라 LockScreen 혹은 MainScreen으로 이동합니다.
다음을 Prop으로 받겠습니다 (받는 타입은 PropTypes에서 기술) :
    안받음
*/

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import PinView from 'react-native-pin-view';
import { navigation, withNavigation } from 'react-navigation'; 
import { Snackbar } from 'react-native-paper';  
import {deviceStorage} from '../ServerLib/config'; 
import InitialPage from '../Tools/InitialPage'; 


class InitialScreen extends Component{
    _isMounted = false;
    
    constructor(props) {
        super(props);
        this._onComplete = this._onComplete.bind(this);
        this._onCheck = this._onCheck.bind(this)
        this.state = {
            setError : false, 
            isLoading: true, 
        } 
    } 
    
    async componentDidMount() { 
        this._isMounted = true; 
        
        if(!await deviceStorage.getItem("password")){
            this.props.navigation.navigate('Main') 
        }  
        if(this._isMounted){
            this.setState({isLoading: false}) 
        }
    } 

    componentWillUnmount(){
        this._isMounted = false
    }
    
    //firstPin: 사용자가 입력한 비밀 번호 저장 
    //clear(): 비밀 번호 네 자리 안 보이게. firstPin 값을 삭제하지는 않는다.
    _onComplete = async (inputtedPin, clear) => {
        const { navigation } = this.props;    
        firstPin = inputtedPin;  
        clear() 
        if(await deviceStorage.getItem("password") == inputtedPin){
            this.props.navigation.navigate('Main');
        }
         
    }

    _onCheck = async (inputtedPin, clear) => {
                
        if(password == inputtedPin){               
            this.props.navigation('Main')
        }
        else{
            this.setState({setError : true, secondAttempt : false})
            clear()
        }
    }

    render(){ 
        if(this.state.isLoading){
            return(
                <View>
                    <InitialPage/>
                </View>
            )
        } 
        else return(
                <View style={{
                    flex           : 1,
                    backgroundColor: '#f1f1f1',
                    justifyContent : 'center',
                }}>
                    <Text style={styles.promptMessage}>
                        비밀번호를 입력해주세요
                    </Text>
                    <PinView
                        onComplete={this._onComplete}
                        pinLength={4}
                    />
                </View>
            )  
    };  
}

const styles = StyleSheet.create({
    promptMessage : {
        textAlign : "center",
        paddingBottom : 10,
    }
});

export default withNavigation(InitialScreen);