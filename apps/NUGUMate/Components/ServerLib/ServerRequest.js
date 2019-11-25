/*
작성자: 김창희
작성일: 2019/11/23
백엔드에 데이터를 요청하고 전송 받는 함수들을 export 하는 파일입니다.
*/

//Diary 관련
import _RetrieveDisplay_Monthly_Diary from './Requests/Diary/_RetrieveDisplay_Monthly_Diary'; 
import _Save_Diary from './Requests/Diary/_Save_Diary';
import _Delete_Diary from './Requests/Diary/_Delete_Diary';

//Nugu 관련 
import _Get_Nuguname from './Requests/Nugu/_Get_Nuguname';

export {
    
    //Diary 관련
    _RetrieveDisplay_Monthly_Diary, _Save_Diary, _Delete_Diary,

    //Nugu 관련 
    _Get_Nuguname

}

