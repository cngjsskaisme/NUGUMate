/*
작성자: 김창희
작성일: 2019/11/23
사용자에게 부여한 nuguname이 없을 때, nuguname을 부여한 후 asyncstorage에 저장하는 함수입니다.
*/
import { Alert } from 'react-native';
import axios from 'axios'; 
import {server, deviceStorage} from '../../config';

export default _handleGetDMList = async(state, _onSetState) => {
    var url = server.serverURL + '/Nugu/Assign_NuguName';  

    _onSetState({
        isLoading: true,
        isError: false
    })  
    await axios.post(url, {timeout: 5000}) 
        .then(async (response) => {       
            _onSetState({
                isLoading: false, 
            });    
            await deviceStorage.saveKey("nuguname",response.data.nuguname) 
             
        }) 
        .catch(( err ) => {
            _onSetState({
                isLoading: false,
                isError: true 
            });
            Alert.alert(
                '서버에 연결할 수 없어요. 앱을 끄신 후 다시 실행해 주세요.',
                '다음 사항을 확인해주세요 : \n 1. 현재 기기가 와이파이에 연결되어 있나요? \n 2. 공지 사항을 통해 현재 서비스가 점검 중 인지 확인해 주세요',
                [{text: '확인'}]
            ); 
            _onSetState({ 
                isError: true,
                isLoading: false
              });  
        });    
} 