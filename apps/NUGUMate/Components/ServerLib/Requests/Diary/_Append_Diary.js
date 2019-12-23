/*
작성자: 김창희
작성일: 2019/12/14
사용자가 작성한 일기를 deviceStorage에 append 하는 함수입니다. 
_Save_Diary 과정 중 일부로 사용하기에 _Server_Request에서 따로 export 하지는 않았습니다.
*/

import {deviceStorage} from '../../config'; 

export default _Append_Diary = async(state, _onSetState) => { 

    let diaries = await deviceStorage.getItem("diaries");
    let append_diary = {}; 
    append_diary[state.selectedDate] = {"marked": true, "contents": state.contents};
    
    if(diaries == null){ 
        diaries = append_diary;       
    }    
    else{   
        diaries[state.selectedDate] = {"marked": true, "contents": state.contents};
    }     

    await deviceStorage.saveKey("diaries", JSON.stringify(diaries));
  
};