/*
작성자 : 추헌남, 김창희
최초작성일 : 2019/11/18
설명 : 각 날짜별 리더
다음을 Prop으로 받겠습니다 (받는 타입은 PropTypes에서 기술) :
    안받음
*/



import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableRipple } from 'react-native-paper';
import * as Font from 'expo-font';
import { navigation, withNavigation } from 'react-navigation';  
import ErrorPage from '../Tools/ErrorPage';

class EntryReader extends Component{
    static defaultProps = {
        selectedDate : '2019-01-01',
        diaryList : {},
        contents : '',
        isFontLoaded : true, 
        _Get_Monthly_Diary: () => {}, 
        _onSetState: () => {},
    }

    constructor(props) {
        super(props);
        this.state = {
            diaryList : this.props.diaryList,
            contents : '',
            isFontLoaded : true, 
            _Get_Monthly_Diary : this.props._Get_Monthly_Diary, 
        }
    }

    async componentDidMount() { 
        await Font.loadAsync({
          'jeju-myeongjo': require('../../assets/fonts/JejuMyeongjo.ttf'),
        });
        this.setState = {
            isFontLoaded : true,
        };
      }

    _onPressEdit = () => {
        this.props.navigation.navigate('EditEntry', { 
            selectedDate : this.props.selectedDate,
            diaryList : this.props.diaryList, 
            _Get_Monthly_Diary: this.state._Get_Monthly_Diary
        })} 

    render(){
        if (this.state.isFontLoaded){
            if (this.state.contents === '' && this.state.diaryList[this.props.selectedDate] === undefined){
                return(
                        <TouchableRipple style = {styles.touch}
                            onPress={() => this._onPressEdit()}>
                            <Text style = {{textAlign: 'center',}}>
                                아직은 글이 없네요.{"\n\n"}이 날의 일기를 작성해보시는 건 어떨까요?{"\n\n"}여기를 탭하여 작성해보세요! {"\n"}
                            </Text>
                        </TouchableRipple>
                    )
            }
            else{ 
                return(
                    <TouchableRipple style = {styles.touch}
                        onPress={() => this._onPressEdit()}>
                        <Text style = {{textAlign: 'center',}}>
                            {this.state.diaryList[this.props.selectedDate].contents}
                        </Text>
                    </TouchableRipple>
                )
            } 
        }
        else{ 
            return(
                <ErrorPage/>
            ) 
        }
    }
}

const styles = StyleSheet.create({
    touch : {
        height : 250,
        justifyContent : 'center',
        alignItems: 'center',
        //fontFamily: 'jeju-myeongjo',
    }
  });

export default withNavigation(EntryReader);