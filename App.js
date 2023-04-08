import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer,useNavigationContainerRef, } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomSidebarMenu from './src/components/CustomSidebarMenu';
import {ContactScreen} from './src/screens/ContactScreen';
import { ReportScreen } from './src/screens/ReportScreen';
import {ProfileScreen} from './src/screens/ProfileScreen';
import {HomeScreen} from './src/screens/HomeScreen';
import { DistrictsScreen } from './src/screens/DistrictsScreen';
import { LocationsScreen } from './src/screens/LocationsScreen';
import { ChatbotScreen } from './src/screens/ChatbotScreen';
import {Logging} from './src/common/Logging'
import {useEffect, useRef} from 'react';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();
const LOCATION_TASK_NAME = 'background-location-task';


export default function App() {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();
  

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute().name;
        const logging = async() => {
          await Logging('Navigate to '+currentRouteName,'INFO')  
        };

        if (previousRouteName !== currentRouteName) {
          routeNameRef.current = currentRouteName;
          await logging(currentRouteName);
        }
      }}
    >
      <StatusBar backgroundColor="#cba3ce" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name=" " component={DrawerScreen} options={{
          headerStyle: {height:30,backgroundColor: '#cba3ce' ,elevation: 0,},
        }}/>
        <Stack.Screen name="Contact" component={ContactScreen} options={{
          headerStyle: {backgroundColor: '#cba3ce' ,elevation: 0,},headerTintColor: '#21254a'
        }}/>
        <Stack.Screen name="Report" component={ReportScreen} options={{
          headerStyle: {backgroundColor: '#cba3ce' ,elevation: 0,},headerTintColor: '#21254a'
        }}/>
        <Stack.Screen name="Districts" component={DistrictsScreen} options={{
          headerStyle: {backgroundColor: '#cba3ce' ,elevation: 0,},headerTintColor: '#21254a'
        }}/>
        <Stack.Screen name="Locations" component={LocationsScreen} options={{
          headerStyle: {backgroundColor: '#cba3ce' ,elevation: 0,},headerTintColor: '#21254a'
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DrawerScreen (route,navigation) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen name="Covid Helper" component={CHScreen}  options={drawerOptions}/>
    </Drawer.Navigator> 
  );
};

function CHScreen (route,navigation){
  return (
    <Tab.Navigator screenOptions={tabOptions}>
        <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel:'Home'}}/>
        <Tab.Screen name="Chatbot" component={ChatbotScreen} options={{tabBarLabel:'Chatbot'}}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarLabel:'Profile'}}/>
      </Tab.Navigator>
  );
};




const drawerOptions=({route,navigation}) => ({
  drawerLabelStyle: {color:'#21254a'},
  drawerStyle: { backgroundColor: '#cba3ce' ,elevation: 0},
  headerStyle: { backgroundColor: '#cba3ce' ,elevation: 0},
  headerTintColor: '#21254a',
});

const tabOptions=({route,navigation}) => ({
  tabBarStyle: { backgroundColor: '#cba3ce',},
  tabBarLabelStyle: { fontSize: 12, color:'#282F6F'},
  tabBarActiveTintColor: '#21254a',
});

