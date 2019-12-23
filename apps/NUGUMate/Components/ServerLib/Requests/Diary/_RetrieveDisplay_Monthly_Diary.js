/*
작성자: 김창희
작성일: 2019/11/23
사용자가 월간 일기를 요청하고, 데이터를 받는 함수입니다.
*/
import { Alert } from 'react-native';
import axios from 'axios'; 
import {server,deviceStorage} from '../../config'; 
import moment from 'moment';

export default _RetrieveDisplay_Monthly_Diary = async(state, _onSetState, year, month) => {
    var url = server.serverURL + '/Diary/Search_Monthly_Diary';  
    
    var day = moment(new Date()).format("DD");
    if(month*1<10){
        month = "0"+month;
    } 
    
    let tempdate = year + "-" + month + "-" + day;
    let date = moment(tempdate).format("YYYY-MM-DD"); 
    
    
    _onSetState({
        isLoading: true,
    }); 
    
    let diaries = await deviceStorage.getItem("diaries");   
    //저장된 일기가 없을 때
    if(diaries == ""){
        diaries = {};
    }  
              
     _onSetState({ 
        isLoading: false, 
        markedList: diaries, 
        current: date
    });      

} 