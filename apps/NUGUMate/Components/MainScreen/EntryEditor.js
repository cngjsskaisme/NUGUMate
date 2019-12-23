/*
작성자 : 추헌남, 김창희
최초작성일 : 2019/11/18
설명 : 일기 에디터입니다.
다음을 Prop으로 받겠습니다 (받는 타입은 PropTypes에서 기술) :
    안받음
*/

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { IconButton } from 'react-native-paper'; 
import Icon from 'react-native-vector-icons/EvilIcons'; 
import PropTypes from 'prop-types';
import moment from 'moment'; 
import {_Save_Diary} from '../ServerLib/ServerRequest'; 
import {_Delete_Diary} from '../ServerLib/ServerRequest';
import LoadingPage from '../Tools/LoadingPage'; 
import ErrorPage from '../Tools/ErrorPage';
import { HeaderBackButton } from 'react-navigation-stack';

class EntryEditor extends Component{
    static defaultProps = {
        selectedDate : '2019-01-01',
        diaryList : {},
        contents: '',
    }

    constructor(props){
        super(props);
        this.state = {
            selectedDate : this.props.navigation.getParam('selectedDate', '2019-01-01'),
            diaryList : this.props.navigation.getParam('diaryList', {}),
            contents: '', 
            isLoading: false, 
            isError: false,
            _Get_Monthly_Diary: this.props.navigation.getParam('_Get_Monthly_Diary', {}), 
            What: '',
        }
    } 

    // 0. 함수로 내려보낼 SetState
    _onSetStateEntryEditor = (state) => {
        this.setState({
            ...state
        })
    }  

    static navigationOptions = ({ navigation }) => {
        const {params = {}} = navigation.state;
            return{
                title: `${moment(navigation.state.params.selectedDate).format('YYYY-MM-DD  ddd')}`,
                headerRight: () => (
                    <View style = {{flexDirection: "row"}}>                
                    
                        <Icon.Button 
                            name="trash" 
                            size={35} 
                            backgroundColor= "#ffffff" 
                            color="#000000"
                            onPress={() => params._onDiaryDeletePopupScreen()}   
                            style = {{flex:1}}
                        />
                        <IconButton
                            icon="check"
                            size={25}
                            onPress={() => params._onSaveDiary()} 
                            style = {{flex:1}}
                        />  
                    </View>
                ),  
                headerLeft: ( <HeaderBackButton onPress = {() => params._onDiaryNotSavePopupScreen()}/>),
            }; 
        } 

    //Save Button을 누를 시, 현재 작성한 일기를 저장하는 함수를 호출한다.
    _onSaveDiary = async () => { 
        await _Save_Diary({...this.state}, this._onSetStateEntryEditor); 
        
        if(!this.state.isError){
            this.props.navigation.navigate('Main') 
            let year = moment(this.state.selectedDate).format('YYYY'); 
            let month = moment(this.state.selectedDate).format('M');  
            await this.state._Get_Monthly_Diary(year,month); 
        }
    }  

    //Delete 버튼을 누를 시 삭제 여부를 확인하는 팝업입니다.
    _onDiaryDeletePopupScreen = async () => { 
        
        //일기를 저장하지 않은 상태에서 이 버튼을 누른 경우
        if(!(this.state.diaryList[this.state.selectedDate] === undefined)){
            Alert.alert(
                '일기 삭제',
                '삭제한 일기는 복구할 수 없습니다. 그래도 삭제하시겠습니까?',
                [
                    {
                    text: '취소',
                    //onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                    },
                    {text: '확인', onPress: async () => await this._onDeleteDiary()},
                ],
                {cancelable: false},
                ); 
        }
        else{
            Alert.alert(
                '일기 삭제 불가', 
                '일기를 저장한 다음에 삭제가 가능합니다. 작성 내역을 취소하고 싶으시면 뒤로 가기 버튼을 누르세요', 
                [{text: '확인'}]
            )
        } 
    } 

    //_onDiaryDeletePopupScreen에서 확인 버튼을 누를 시, 현재 작성한 일기를 삭제하는 함수를 호출한다.
    _onDeleteDiary = async () => { 
        await _Delete_Diary({...this.state}, this._onSetStateEntryEditor); 
        if(!this.state.isError){
            this.props.navigation.navigate('Main') 
            let year = moment(this.state.selectedDate).format('YYYY'); 
            let month = moment(this.state.selectedDate).format('M');  
            await this.state._Get_Monthly_Diary(year,month); 
        }
    }  

    //뒤로 가기 버튼을 누를 시 변경 내역 취소를 여부를 확인하는 팝업입니다.
    _onDiaryNotSavePopupScreen = () => { 

        Alert.alert(
            '변경 내역 취소',
            '확인 버튼을 누를 시 변경 내역을 반영하지 않습니다. 그래도 진행하시겠습니까?',
            [
                {
                text: '취소',
                style: 'cancel',
                },
                {text: '확인', onPress: async () => this.props.navigation.goBack()},
            ],
            {cancelable: false},
        ); 
    }
    
    componentDidMount(){
        this.setState({
            contents : this.state.diaryList[this.state.selectedDate] === undefined ? this.state.contents : this.state.diaryList[this.state.selectedDate].contents
        }) 
        this.props.navigation.setParams({
            _onSaveDiary: this._onSaveDiary, 
            _onDeleteDiary: this._onDeleteDiary, 
            _onDiaryDeletePopupScreen: this._onDiaryDeletePopupScreen,
            _onDiaryNotSavePopupScreen: this._onDiaryNotSavePopupScreen, 

        });
    }
    
    render(){ 
        if(this.state.isLoading){ 
            return(
                <View>
                    <LoadingPage What={this.state.What} />
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
                <View style={{padding: 20}}>
                    <TextInput
                        style={{ height: '100%' }}
                        onChangeText={contents => this.setState({contents})}
                        value={this.state.contents}
                        placeholder='지금 떠오르는 생각이 있나요?'
                        multiline={true}
                        textAlignVertical={'top'}
                    />
                </View>
            ); 
        }
    }
}

EntryEditor.propTypes = {
    name: PropTypes.string
  };

export default EntryEditor;