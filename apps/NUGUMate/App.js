import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MainScreen, SettingScreen } from './Components/Components'
import AppContext from './Components/AppContext';
import EntryEditor from './Components/MainScreen/EntryEditor';

const MainStack = createStackNavigator({
  Main: MainScreen,
  EditEntry: EntryEditor,
});

const SettingStack = createStackNavigator({
  Settings: SettingScreen,
});

const TabNavigator = createBottomTabNavigator(
  {
    
    Main : {
      screen : MainStack,
      navigationOptions : {
        tabBarLabel : 'Main',
        tabBarIcon : ({tintColor}) => (<Icon name="home" color={tintColor} size = {20}/>)
      },
    },
    Settings : {
      screen : SettingStack,
      navigationOptions : {
        tabBarLabel : 'Settings',
        tabBarIcon : ({tintColor}) => (<Icon name="cog" color={tintColor} size = {20}/>)
        }
      },
    }
);

const AppContainer = createAppContainer(TabNavigator);


export default class App extends React.Component {
  static defaultProps = {
  }

  constructor(props){
    super(props);
    this.state = {
    }}

  render(){
    return(
      <AppContext.Provider value={this.state}>
        <AppContainer/>
      </AppContext.Provider>
    );
  }
}
