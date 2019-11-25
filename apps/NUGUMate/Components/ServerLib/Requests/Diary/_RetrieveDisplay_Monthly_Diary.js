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
    let paramdate = moment(tempdate).format("YYYY-MM-DD"); 
    _onSetState({
        isLoading: true,
    })  

    await axios.get(url, {
        params: {
            nuguname: await deviceStorage.getItem("nuguname"), 
            year: year, 
            month: month 
        }, 
        timeout: 5000
      }) 
        .then((response) => {             
            _onSetState({ 
              isLoading: false,
              markedList: response.data, 
              current: paramdate
            });   
        }) 
        .catch(( err ) => {
            Alert.alert(
                '서버에 연결할 수 없어요. 앱을 끄신 후 다시 실행해 주세요.',
                '다음 사항을 확인해주세요 : \n 1. 현재 기기가 와이파이에 연결되어 있나요? \n 2. 공지 사항을 통해 현재 서비스가 점검 중 인지 확인해 주세요.',
                [{text: '확인'}]
            ); 
            _onSetState({ 
                isError: true,
                isLoading: false
              }); 
        });    
} 