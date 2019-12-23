/*
작성자: 김창희
작성일: 2019/11/24
사용자가 조회한 날짜의 일기를 작성 및 편집한 내용을 데이터 베이스에 저장하는 함수입니다.
*/
import { Alert } from 'react-native';
import axios from 'axios'; 
import {server,deviceStorage} from '../../config'; 
import _Append_Diary from '../Diary/_Append_Diary';

export default _Save_Diary = async(state, _onSetState) => {
    var url = server.serverURL + '/Diary/Save_Daily_Diary';  

    _onSetState({
        isLoading: true, 
        What: "일기 저장 중"
    })  
 
    await _Append_Diary(state, _onSetState); 

    await axios.post(url, {
            nuguname: await deviceStorage.getItem("nuguname"),
            date: state.selectedDate, 
            contents: state.contents
        },
        {
            timeout: 5000 
        }
        ) 
        .then((response) => {       
            _onSetState({ 
              isLoading: false,    
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