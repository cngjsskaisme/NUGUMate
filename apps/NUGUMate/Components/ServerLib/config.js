/*
작성자: 김창희
작성일: 2019/11/23
서버 URL, AsyncStorage가 사용할 함수들을 정의합니다.
*/

import { AsyncStorage } from 'react-native';

// server 연결 관련 
const server = {
  serverURL: 'http://192.168.1.28:3000'
}; 

// asyncstorage 관련
const deviceStorage = {
  
  
  async saveKey(key, valueToSave) {
    try { 
      
      await AsyncStorage.setItem(key, valueToSave);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  /*
  async loadItem() {
    try {
      const value = await AsyncStorage.getItem('id_token');
      if (value !== null) {
        this.setState({
          Item: value,
          loading: false
        });
      } else {
        this.setState({
          loading: false
        });
      }
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },   
  */
  async getItem(item) {
    let value = "";
    try { 
      value = await AsyncStorage.getItem(item); 
      return value;
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }    
  }, 

  async deleteItem(item) {
    try{
      await AsyncStorage.removeItem(item)
      .then( 
      );
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }
}; 

export {server, deviceStorage}
