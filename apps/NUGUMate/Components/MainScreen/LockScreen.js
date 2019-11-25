/*
작성자 : 김택준, 추헌남
최초작성일 : 2019/11/20
설명 : 잠금화면 스크린
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
import { HeaderBackButton } from 'react-navigation-stack';

class LockScreen extends Component{

    constructor(props) {
        super(props);
        this._onComplete = this._onComplete.bind(this);
        this._onCheck = this._onCheck.bind(this)
        this.state = {
            _onSetStateSettingScreen : this.props.navigation.getParam('_onSetStateSettingScreen', () => {}),
            firstAttempt : true,
            secondAttempt : false,
            setError : false,
        }
    }

    static navigationOptions = ({ navigation }) => {
        const {params = {}} = navigation.state;
        
        return{
            headerLeft: ( <HeaderBackButton onPress = {() => params._DeactivatePassword()}/>) 
        }; 
    }
    
    _onComplete(inputtedPin, clear) {
        if (this.state.firstAttempt){
            this.setState({firstAttempt : false, secondAttempt : true})
            firstPin = inputtedPin
            clear()
        }

        if (this.state.setError){
            this.setState({setError : false, secondAttempt : true})
            firstPin = inputtedPin
            clear()
        }
    }

    _onCheck = async (inputtedPin, clear) => {
        if(firstPin == inputtedPin){
            await deviceStorage.saveKey("password", inputtedPin);            
            this.props.navigation.pop()
            this.state._onSetStateSettingScreen({toastVisible : true, toastMessage : '비밀번호 설정이 완료되었습니다.'})
            clear();
        }
        else{
            this.setState({setError : true, secondAttempt : false})
            clear()
        }
    } 

    _DeactivatePassword = async () => { 
        this.state._onSetStateSettingScreen({isLockEnabled : false}) 
        this.props.navigation.goBack()
    }

    componentDidMount(){ 
        this.props.navigation.setParams({
        _DeactivatePassword: this._DeactivatePassword 
        })
    } 

    render(){
        if(this.state.firstAttempt)
            return(
                <View style={{
                    flex           : 1,
                    backgroundColor: '#f1f1f1',
                    justifyContent : 'center',
                }}>
                    <Text style={styles.promptMessage}>
                        사용하실 비밀번호를 설정해주세요.
                    </Text>
                    <PinView
                        onComplete={this._onComplete}
                        pinLength={4}
                    />
                </View>
            );
        if(this.state.secondAttempt){
            return(
                <View style={{
                    flex           : 1,
                    backgroundColor: '#f1f1f1',
                    justifyContent : 'center',
                }}>
                    <Text style={styles.promptMessage}>
                        사용하실 비밀번호를 다시 한 번 입력해주세요.
                    </Text>
                    <PinView
                        onComplete={this._onCheck}
                        pinLength={4}
                    />
                </View>
            )}
        
        if(this.state.setError)
        return(
            <View style={{
                flex           : 1,
                backgroundColor: '#f1f1f1',
                justifyContent : 'center',
            }}>
                <Text style={styles.promptMessage}>
                    입력하신 비밀번호가 같지 않습니다. 다시 입력해주세요.
                </Text>
                <PinView
                    onComplete={this._onComplete}
                    pinLength={4}
                />
            </View>
        )
    }
}

LockScreen.propTypes = {
    name: PropTypes.string
  };

const styles = StyleSheet.create({
    promptMessage : {
        textAlign : "center",
        paddingBottom : 10,
    }
});

export default withNavigation(LockScreen);