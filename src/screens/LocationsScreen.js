import React, { useState, useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SafeAreaView,Text,StyleSheet,View,FlatList,TextInput,TouchableOpacity} from 'react-native';
import {useIsFocused } from '@react-navigation/native';
import { axiosGet } from '../services/AxiosGet';
import{URLWithDeviceInfo} from '../common/URLWithDeviceInfo'
import {Logging} from '../common/Logging'

export function LocationsScreen (props){
    const isFocused = useIsFocused();
    const {selectedScreen,district}=props.route.params
    const [search, setSearch] = useState('');
    const [filteredBuildings, setFilteredBuildings] = useState([]);
    const [allBuildings, setAllBuildings] = useState([]);
    
    function searchFilter(searchInput){
        if (searchInput) {
            setFilteredBuildings(allBuildings.filter(function (building) {
              return building.indexOf(searchInput) > -1;
            }));
        } else {
            setFilteredBuildings(allBuildings);
        }
        setSearch(searchInput);
    }

    function renderbuildings({item,index}){
      return (
        <TouchableOpacity key={index} style={styles.building} onPress={async()=>{
          let tempDistrict=district
          if(tempDistrict==='Central %26 Western'){
            tempDistrict='Central & Western'
          }
          await AsyncStorage.setItem('districtOfProfile'+selectedScreen.toString(),tempDistrict)
          await AsyncStorage.setItem('buildingOfProfile'+selectedScreen.toString(),item)
          const longAndLat =await axiosGet(URLWithDeviceInfo('http://covidhelper1.ddns.net:8080/building/BuildingLatLong?district='+district+'&building='+item))
          await AsyncStorage.setItem('longitudeOfProfile'+selectedScreen.toString(),longAndLat[0].toString())
          await AsyncStorage.setItem('latitudeOfProfile'+selectedScreen.toString(),longAndLat[1].toString())
          Logging(tempDistrict+' '+item+' '+longAndLat[0]+' '+longAndLat[1]+' is selected','INFO') 
          props.navigation.navigate('Profile', { screen: 'ProfileScreen'});
        }}>
          <Text style={styles.textInItem}>{item}</Text>
        </TouchableOpacity>
      )
    }

    function BuildingsSeperator(){
      return (
        <View style={styles.buildingsSeperator}/>
      );
    }

    useEffect(() => {
        const getBuildings = async () => {
            const result =await axiosGet(URLWithDeviceInfo('http://covidhelper1.ddns.net:8080/building/DistrictsBuildings?district='+district))
            setFilteredBuildings(result)
            setAllBuildings(result);
        };
        if(isFocused){
          Logging('location screen:'+props.route.params.district,'INFO') 
          getBuildings();  
        } 
      },[isFocused]);

    return(
      
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => searchFilter(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search buildings..."
            placeholderTextColor = "#21254a"
            selectionColor="#cba3ce"
          />
          <FlatList
            data={filteredBuildings}
            keyExtractor={(item,index)=> index.toString()}
            ItemSeparatorComponent={BuildingsSeperator}
            renderItem={renderbuildings}
          />
      </View>
    
    );
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#EEF0F4',
      marginBottom:0.1
    },
    textInput:{
      height: 40,
      borderWidth: 1,
      paddingLeft: 20,
      margin: 5,
      borderColor: "#21254a",
      backgroundColor: '#FFFFFF',
      color:"#21254a",
    },
    buildingsSeperator:{
      height: 0.5,
      width: '100%',
      backgroundColor: '#cba3ce',
    },
    building:{
      padding: 10,
    },
    textInItem:{
      color:'#21254a'
    }
  });