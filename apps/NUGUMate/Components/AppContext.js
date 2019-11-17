/*
작성자 : 추헌남
최초작성일 : 2019/11/18
설명 : App의 전체적인 Context를 정의
다음을 Prop으로 받겠습니다 (받는 타입은 PropTypes에서 기술) :
    아직 안받습니다.
*/

import React from 'react';

export const defaultContext = {
}

const AppContext = React.createContext();

export default AppContext