import { StyleSheet, Text, View ,Switch,TouchableOpacity, Alert,ActivityIndicator} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';
import React, { useEffect, useState } from "react";
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import {Logging} from '../common/Logging'

export function FgLocationStoreButton(props){
    const isFocused = useIsFocused();
    const [showLoading, setShowLoading]=useState(false)

    async function storeLocation(){
        Logging('Store location start','INFO')
        setShowLoading(true)
        const {status:fgStatus} =await Location.requestForegroundPermissionsAsync();
        if (fgStatus != 'granted') {
            Logging('Permission to access location was denied','INFO')
            return;
        }else{
            try {
              let tempLocations=await AsyncStorage.getItem('storedLocations')
              if(tempLocations==null){
                tempLocations=[]
              }
              else{
                tempLocations=JSON.parse(tempLocations)
              }  
              let tempObject=new Object();
              let tempDate=new Date()
              let currentLocation=await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.BestForNavigation,
              })
              tempObject.latitude=currentLocation.coords.latitude
              tempObject.longitude=currentLocation.coords.longitude
              tempObject.year=tempDate.getFullYear();
              tempObject.month=tempDate.getMonth()+1;
              tempObject.date=tempDate.getDate();
              tempObject.name=props.name
              tempLocations.push(tempObject)
              tempLocations=JSON.stringify(tempLocations)
              await AsyncStorage.setItem('storedLocations', tempLocations);
              setShowLoading(false)
              Logging('Location '+tempObject.latitude+' '+tempObject.longitude+' is stored','INFO')
            } catch (error) {
              Logging('Location store is failed:'+error,'ERROR')
            }
            
        }
    }

    useEffect(() => {
        
    },[isFocused]);

    return (
          <View>
            {showLoading||
            <TouchableOpacity
              style={styles.button}
              onPress={storeLocation}
            >
              <Text style={{color:'#ffffff',}}>Store</Text>
            </TouchableOpacity>}
            {showLoading&&<ActivityIndicator size="small" color="#cba3ce" />}
          </View>
          
      );
}

const styles = StyleSheet.create({
    button:{
      fontSize:14,
      backgroundColor:'#21254a',
      borderRadius:10,
      height:25,
      borderColor:'#cba3ce',
      borderWidth: 2.4,
    },
    
});