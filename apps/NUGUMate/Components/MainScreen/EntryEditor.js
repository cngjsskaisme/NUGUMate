/*
작성자 : 추헌남
최초작성일 : 2019/11/18
설명 : 메모 에디터입니다.
다음을 Prop으로 받겠습니다 (받는 타입은 PropTypes에서 기술) :
    안받음
*/



import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import moment from 'moment'

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
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${moment(navigation.state.params.selectedDate).format('YYYY-MM-DD  ddd')}`,
        headerRight: () => (
            <IconButton
                icon="check"
                size={25}
                onPress={() => console.log('Pressed')}
            />
        )
    })

    componentDidMount(){
        this.setState({
            contents : this.state.diaryList[this.state.selectedDate] === undefined ? this.state.contents : this.state.diaryList[this.state.selectedDate].contents
        })
    }
    
    render(){
        return(
            <View style={{padding: 20}}>
                <TextInput
                    style={{ height: '100%' }}
                    onChangeText={contents => this.setState({contents})}
                    value={this.state.contents}
                    placeholder='지금 떠오르는 생각이 있나요?'
                    multiline={true}
                    textAlignVertical={'top'}
                    autoFocus={true}
                />
            </View>
        );
    }
}

EntryEditor.propTypes = {
    name: PropTypes.string
  };

export default EntryEditor;