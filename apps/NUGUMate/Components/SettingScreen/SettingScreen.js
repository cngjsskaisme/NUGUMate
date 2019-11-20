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
import { Snackbar } from 'react-native-paper';

class SettingScreen extends Component{
    static defaultProps = {
        toastVisible : false,
        toastMessage : '',
        isLockEnabled : false,
    }

    constructor(props){
        super(props);
        this._onSetStateSettingScreen = this._onSetStateSettingScreen.bind(this)
        this.state = {
            toastVisible : false,
            toastMessage : '',
            isLockEnabled : false,
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => {
            return(
                <Text style = {{padding : 25, fontWeight : 'bold', fontSize : 20}}>
                    설정
                </Text>
            )
        },
    })

    _onSetStateSettingScreen(state){
        this.setState({...this.state, ...state})
    }

    _onChangePassword(newState) {
        this.setState(newState)
        if(!this.state.isLockEnabled) {
            this.props.navigation.navigate('LockScreen', { 
                _onSetStateSettingScreen : this._onSetStateSettingScreen,
            })
        }
        if(this.state.isLockEnabled) {
            this.setState({toastVisible : true, toastMessage : '비밀번호 설정이 해제되었습니다.'})
        }
    }

    render(){
        return(
            <View style={{flex: 1, padding : 15}}>
                <View style={styles.menuEntry}>
                    <Text style={styles.menuName}>
                        비밀번호 설정
                    </Text>
                    <Switch
                        onValueChange={(value) => { this._onChangePassword({ isLockEnabled: value }) }}
                        value={this.state.isLockEnabled}
                    />
                </View>
                {this.state.toastVisible?
                    <View style={{flex: 1, justifyContent : 'center'}}>
                        <Snackbar
                            visible={this.state.toastVisible}
                            onDismiss={() => this.setState({ toastVisible: false })}
                            style={{flexDirection: 'column-reverse'}}
                            duration={2500}>
                            {this.state.toastMessage}
                        </Snackbar>
                    </View> :
                    <View></View>
                    }
            </View>
        );
    }
}

SettingScreen.propTypes = {
    name: PropTypes.string
  };

const styles = StyleSheet.create({
    menuEntry : {
        flexDirection : "row",
        padding: 15,
        borderColor : 'gray',
        borderBottomWidth : 0.5,
        alignItems : 'center',
        justifyContent : 'center',
    },
    menuName : {
        paddingRight : '65%',
        fontSize: 15,
    },
});
  
export default withNavigation(SettingScreen);