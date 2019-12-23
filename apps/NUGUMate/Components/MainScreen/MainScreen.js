/*
작성자 : 추헌남, 김창희
최초작성일 : 2019/11/17
설명 : 메인 스크린
다음을 Prop으로 받겠습니다 (받는 타입은 PropTypes에서 기술) :
    안받음 

참고: 여기서 this.state.nuguname은 asyncstorage 에서 불러온 이름 + 아/야 이다.    
*/


import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';
import EntryReader from './EntryReader';
import { Divider } from 'react-native-paper';
import { diaryEntry } from '../../Mockup';
import { navigation, withNavigation } from 'react-navigation';  
import {deviceStorage} from '../ServerLib/config';
import {_Get_Nuguname} from '../ServerLib/ServerRequest'; 
import {_RetrieveDisplay_Monthly_Diary} from '../ServerLib/ServerRequest'; 
import LoadingPage from '../Tools/LoadingPage';
import ErrorPage from '../Tools/ErrorPage';


class MainScreen extends Component{ 
    _isMounted = false;
    static defaultProps ={
        selectedDate : {},
        markedList : {}, 
        nuguname: " ", 
    }

    constructor(props){
        super(props);
        this.state = {
            selectedDate : moment(new Date()).format('YYYY-MM-DD'),  
            isLoading: true,   
            isError: false,
            year: moment(new Date()).format('YYYY'), 
            month: moment(new Date()).format('M'), 
            callnugu: " ",
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => {
        return(
            <View style={{flex: 1}}>
                <Image
                    style={{flex: 1, width: '45%', height: '45%'}}
                    resizeMode={"contain"}
                    source={require('../../assets/Primary_logo.png')}/>
            </View>
            )
        },
    })  

    // 0. 함수로 내려보낼 SetState
    _onSetStateMainScreen = (state) => {
        this.setState({
            ...state
        })
    } 
    //nuguname 요청 + 월간 일기 요청
    async componentDidMount() { 
        //AsyncStorage에 nuguname이 없을 때만 nuguname 요청 
        if(!await deviceStorage.getItem("nuguname")){
            await _Get_Nuguname({...this.state},this._onSetStateMainScreen);  
        } 
        await _RetrieveDisplay_Monthly_Diary({...this.state},this._onSetStateMainScreen, this.state.year, this.state.month);         
        this._isMounted = true; 
        if(this._isMounted){    
            //nuguname에 따라 아/야 를 덧붙임
            if(await deviceStorage.getItem("nuguname") === "바다" || await deviceStorage.getItem("nuguname") === "나비"){ 
                let callnugu = await deviceStorage.getItem("nuguname") + "야";
                this.setState({
                    nuguname: await deviceStorage.getItem("nuguname"), 
                    callnugu: callnugu}) 
            }   
            else if(await deviceStorage.getItem("nuguname") == "하늘" || await deviceStorage.getItem("nuguname") === "사랑"){ 
                let callnugu = await deviceStorage.getItem("nuguname") + "아";
                this.setState({
                    nuguname: await deviceStorage.getItem("nuguname"), 
                    callnugu: callnugu}) 
            }      
        }      
    }   
    componentWillUnmount() {
        this._isMounted = false
    }

    _Get_Monthly_Diary = async(paramyear,parammonth) => { 
        await _RetrieveDisplay_Monthly_Diary({...this.state},this._onSetStateMainScreen,paramyear,parammonth);    
    } 

    render(){   
        if(this.state.isLoading){ 
            return(
                <View>
                    <LoadingPage/>
                </View>
            ) 
        }  

        if(this.state.isError){
            return(
                <View>
                    <ErrorPage/>
                </View>
            )
        }

        else{

            return( 
                <View style={styles.main}>    
                
                    <Text style={styles.nugusentence}>
                        <Text>누구 스피커에 </Text>
                        <Text style={styles.nuguname}>"{this.state.callnugu}"</Text> 
                        <Text> 라고 말해보세요!</Text>
                    </Text>
                 
                    <View style = {styles.calendar}> 
                        <Calendar 
                                current = {this.state.current}
                                onMonthChange={async (obj) => 
                                    {await this._Get_Monthly_Diary(obj.year,obj.month)}}  
                                
                                onDayPress={day => {
                                    this.setState({
                                    selectedDate : day.year + "-" + day.dateString.split('-')[1] + "-" + day.dateString.split('-')[2],
                                });}}
                                markedDates={
                                    {...this.state.markedList,
                                        [this.state.selectedDate]: {
                                        selected: true,
                                        selectedColor: "rgb(76,174,249)"}}}
                            />
                    </View> 
                    <Divider/>
                    <View style = {styles.entryReader}>
                        <EntryReader 
                            selectedDate = {this.state.selectedDate}
                            diaryList = {this.state.markedList}
                            _Get_Monthly_Diary = {this._Get_Monthly_Diary}/>
                    </View>
                </View>
            ); 
        }
    }
}

const styles = StyleSheet.create({
    main : {
        padding: 10
    }, 

    nugusentence: {  
        width: '100%', 
        backgroundColor: '#f0f0f0', 
        //alignItems: 'center', 
        textAlign: 'center', 
        marginTop: 10, 
        paddingTop: 10, 
        paddingBottom: 10 
        
    }, 
    nuguname: {
        fontWeight: 'bold'
    },
    calendar : {
        paddingBottom : 10
    },
    entryReader : {
        height : 150,
        padding : 15
    }
  });

export default withNavigation(MainScreen);