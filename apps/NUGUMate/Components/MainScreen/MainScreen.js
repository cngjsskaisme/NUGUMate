/*
작성자 : 추헌남
최초작성일 : 2019/11/17
설명 : 메인 스크린
다음을 Prop으로 받겠습니다 (받는 타입은 PropTypes에서 기술) :
    안받음
*/


import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment'
import EntryReader from './EntryReader';
import { Divider } from 'react-native-paper';
import { diaryEntry } from '../../Mockup';
import { navigation, withNavigation } from 'react-navigation'; 


class MainScreen extends Component{
    static defaultProps ={
        selectedDate : {},
        markedList : {},
    }

    constructor(props){
        super(props);
        this.state = {
            selectedDate : moment(Date()).format('YYYY-MM-DD'),
            markedList: diaryEntry,
        }
    }

    render(){
        return(
            <View style={styles.main}>
                <View style = {styles.calendar}>
                    <Calendar
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
                        diaryList = {this.state.markedList}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main : {
        padding: 10
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