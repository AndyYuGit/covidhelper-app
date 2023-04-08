import { StyleSheet, Text, View ,Switch, TextInput,ScrollView,TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from "react";
import { axiosGet } from '../services/AxiosGet';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FgLocationStoreButton } from '../components/FgLocationStoreButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


function removeSpace(obj){
  Object.keys(obj).forEach((key) => {
    var replacedKey = key.trim().replace(/\s+/g, '');
    if (key !== replacedKey) {
       obj[replacedKey] = obj[key];
       delete obj[key];
    }
 });
 return obj;
}

export function ProfileScreen(props) {

    const [result,setResult]=useState(0);
    const [profiles,setProfiles]=useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [text, onChangeText] = useState("");
    const isFocused = useIsFocused();

    useEffect(() => {
      const getResult = async () => {
        //const result =removeSpace(await axiosGet('http://192.168.8.203:8080/building/DistrictsBuildings')) 
        //setResult(result.TuenMun);
      };

      const getProfiles =async () => {
        try {
          let districtOfProfile1=await AsyncStorage.getItem('districtOfProfile1')
          let districtOfProfile2=await AsyncStorage.getItem('districtOfProfile2')
          let districtOfProfile3=await AsyncStorage.getItem('districtOfProfile3')
          let buildingOfProfile1=await AsyncStorage.getItem('buildingOfProfile1')
          let buildingOfProfile2=await AsyncStorage.getItem('buildingOfProfile2')
          let buildingOfProfile3=await AsyncStorage.getItem('buildingOfProfile3')
          districtOfProfile1=districtOfProfile1 !=null?districtOfProfile1:''
          districtOfProfile2=districtOfProfile2 !=null?districtOfProfile2:''
          districtOfProfile3=districtOfProfile3 !=null?districtOfProfile3:''
          buildingOfProfile1=buildingOfProfile1 !=null?buildingOfProfile1:'Set location'
          buildingOfProfile2=buildingOfProfile2 !=null?buildingOfProfile2:'Set location'
          buildingOfProfile3=buildingOfProfile3 !=null?buildingOfProfile3:'Set location'
          setProfiles([districtOfProfile1,buildingOfProfile1,districtOfProfile2,buildingOfProfile2,districtOfProfile3,buildingOfProfile3])
        } catch (error) {
          console.log(error)
        }        
      };
      getProfiles();     
    },[isFocused]);

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container} enableOnAndroid={true} enableAutomaticScroll={true}
      extraScrollHeight={100} extraHeight={80}>
        <TouchableOpacity style={styles.rect} onPress={()=>{
          props.navigation.navigate('Districts', { screen: 'DistrictsScreen',selectedScreen:1 });
        }}>
          <Text>{profiles[1]}{"\n"}{profiles[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rect} onPress={()=>{
          props.navigation.navigate('Districts', { screen: 'DistrictsScreen',selectedScreen:2 });
        }}>
          <Text>{profiles[3]}{"\n"}{profiles[2]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rect} onPress={()=>{
          props.navigation.navigate('Districts', { screen: 'DistrictsScreen',selectedScreen:3 });
        }}>
          <Text>{profiles[5]}{"\n"}{profiles[4]}</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
        <Text style={styles.storeText}>Store Current Location</Text>
          {}
          <FgLocationStoreButton  name={text} style={styles.button}/>
        </View>
      </KeyboardAwareScrollView >
    );
  };

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      backgroundColor: '#EEF0F4',
      marginBottom:0.1
    },
    rect:{
      flex:0.01,
      margin:30,
      height:75,
      width:250,
      backgroundColor:'#EEF0F4',
      borderRadius:20,
      elevation:7,
      alignItems: 'center',
    },
    footer: {
      flex:1,
      marginLeft:100,
      marginRight:100,
      flexDirection:'row',
      position:'absolute',
      bottom:100
    },
    dataText:{
      color:'#cba3ce',fontSize:22
    },
    labelText:{
      color:'#21254a',fontSize:14
    },
    input: {
      height: 26.1,
      margin: 5,
      padding: 5,
      borderRadius:20,
    },
    storeText: {
      height: 26.1,
      margin: 1,
      padding: 1,
      borderRadius:20,
    },
    button:{
      
    }
  });