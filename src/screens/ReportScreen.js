import { StyleSheet, Text, View ,Switch, TextInput,ScrollView,TouchableOpacity,Image,FlatList} from 'react-native';
import React, { useEffect, useState } from "react";
import { axiosGet } from '../services/AxiosGet';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import{URLWithDeviceInfo} from '../common/URLWithDeviceInfo'
import {Logging} from '../common/Logging'

function isDifferenceSmallerThan(num1,num2,target){
    if(num1>=num2){
        return num1-num2<=target?true:false;
    }
    else{
        return num2-num1<=target?true:false;
    }
}

export  function ReportScreen(props){
    const [profiles,setProfiles]=useState('');
    const [storedLocations,setStoredLocations]=useState(null);
    const [latestVisitBuildings,setLatestVisitBuildings]=useState(null);
    const [currentReport,setCurrentReport]=useState(0);
    const [currentReportName,setCurrentReportName]=useState('Choose a report');
    const [currentReportDate,setCurrentReportDate]=useState('');
    const [reportResult,setReportResult]=useState(null);
    const isFocused = useIsFocused();

    function fillInReport(){
        let tempReportResult=[]
        if(latestVisitBuildings==null){
            return;
        }
        latestVisitBuildings.forEach(building=>{
            let isLatitudeNear,isLongitudeNear;
            let isEqualProfile=false;
            switch(currentReport){
                case 1:
                    isLatitudeNear=isDifferenceSmallerThan(profiles[2],building.latitude,0.01)
                    isLongitudeNear=isDifferenceSmallerThan(profiles[3],building.longitude,0.01)
                    if(building.district===profiles[0]&&building.name===profiles[1]){
                        isEqualProfile=true;
                    }
                    break;
                case 2:
                    isLatitudeNear=isDifferenceSmallerThan(profiles[6],building.latitude,0.01)
                    isLongitudeNear=isDifferenceSmallerThan(profiles[7],building.longitude,0.01)
                    if(building.district===profiles[4]&&building.name===profiles[5]){
                        isEqualProfile=true;
                    }
                    break;
                case 3:
                    isLatitudeNear=isDifferenceSmallerThan(profiles[10],building.latitude,0.01)
                    isLongitudeNear=isDifferenceSmallerThan(profiles[11],building.longitude,0.01)
                    if(building.district===profiles[8]&&building.name===profiles[9]){
                        isEqualProfile=true;
                    }
                    break;
                case 4:
                    for(let i=0;i<storedLocations.length;i++){
                        isLatitudeNear=isDifferenceSmallerThan(storedLocations[i].latitude,building.latitude,0.01)
                        isLongitudeNear=isDifferenceSmallerThan(storedLocations[i].longitude,building.longitude,0.01)
                        if(isLatitudeNear&&isLongitudeNear){
                            break;
                        }
                    }
                    break;
            }
            if(isLatitudeNear&&isLongitudeNear){
                if(isEqualProfile){
                    let profileBuilding=[building]
                    tempReportResult=profileBuilding.concat(tempReportResult)
                }
                else{
                    tempReportResult.push(building)
                }
                setCurrentReportDate(building.latedate)
                
            }
        })
        setReportResult(tempReportResult)
    }

    function clickUp(){
        if(currentReport==1||currentReport==0){
            setCurrentReport(4)
            setCurrentReportName('Stored Locations')
        }
        else if(currentReport==2){
            setCurrentReport(1)
            setCurrentReportName(profiles[0]+' '+profiles[1])
        }
        else if(currentReport==3){
            setCurrentReport(2)
            setCurrentReportName(profiles[4]+' '+profiles[5])
        }
        else if(currentReport==4){
            setCurrentReport(3)
            setCurrentReportName(profiles[8]+' '+profiles[9])
        }
    }

    function clickDown(){
        if(currentReport==1){
            setCurrentReport(2)
            setCurrentReportName(profiles[4]+' '+profiles[5])
        }
        else if(currentReport==2){
            setCurrentReport(3)
            setCurrentReportName(profiles[8]+' '+profiles[9])
        }
        else if(currentReport==3){
            setCurrentReport(4)
            setCurrentReportName('Stored Locations')
        }
        else if(currentReport==4||currentReport==0){
            setCurrentReport(1)
            setCurrentReportName(profiles[0]+' '+profiles[1])
        }
    }

    function BuildingsSeperator(){
        return (
          <View style={styles.buildingsSeperator}/>
        );
    }
    function renderbuildings({item,index}){
        return (
            <Text style={styles.textInItem}>{item.district} {item.name}</Text>
        )
      }


    useEffect(()=>{
        const getProfiles =async () => {
            try {
                let districtOfProfile1=await AsyncStorage.getItem('districtOfProfile1')
                let districtOfProfile2=await AsyncStorage.getItem('districtOfProfile2')
                let districtOfProfile3=await AsyncStorage.getItem('districtOfProfile3')
                let buildingOfProfile1=await AsyncStorage.getItem('buildingOfProfile1')
                let buildingOfProfile2=await AsyncStorage.getItem('buildingOfProfile2')
                let buildingOfProfile3=await AsyncStorage.getItem('buildingOfProfile3')
                let latitudeOfProfile1=parseFloat(await AsyncStorage.getItem('latitudeOfProfile1'))
                let latitudeOfProfile2=parseFloat(await AsyncStorage.getItem('latitudeOfProfile2'))
                let latitudeOfProfile3=parseFloat(await AsyncStorage.getItem('latitudeOfProfile3'))
                let longitudeOfProfile1=parseFloat(await AsyncStorage.getItem('longitudeOfProfile1'))
                let longitudeOfProfile2=parseFloat(await AsyncStorage.getItem('longitudeOfProfile2'))
                let longitudeOfProfile3=parseFloat(await AsyncStorage.getItem('longitudeOfProfile3'))
                districtOfProfile1=districtOfProfile1 !=null?districtOfProfile1:'None'
                districtOfProfile2=districtOfProfile2 !=null?districtOfProfile2:'None'
                districtOfProfile3=districtOfProfile3 !=null?districtOfProfile3:'None'
                buildingOfProfile1=buildingOfProfile1 !=null?buildingOfProfile1:''
                buildingOfProfile2=buildingOfProfile2 !=null?buildingOfProfile2:''
                buildingOfProfile3=buildingOfProfile3 !=null?buildingOfProfile3:''
                latitudeOfProfile1=!isNaN(latitudeOfProfile1)?latitudeOfProfile1:''
                latitudeOfProfile2=!isNaN(latitudeOfProfile2)?latitudeOfProfile2:''
                latitudeOfProfile3=!isNaN(latitudeOfProfile3)?latitudeOfProfile3:''
                longitudeOfProfile1=!isNaN(longitudeOfProfile1)?longitudeOfProfile1:''
                longitudeOfProfile2=!isNaN(longitudeOfProfile2)?longitudeOfProfile2:''
                longitudeOfProfile3=!isNaN(longitudeOfProfile3)?longitudeOfProfile3:''
                setProfiles([districtOfProfile1,buildingOfProfile1,latitudeOfProfile1,longitudeOfProfile1,
                  districtOfProfile2,buildingOfProfile2,latitudeOfProfile2,longitudeOfProfile2,
                  districtOfProfile3,buildingOfProfile3,latitudeOfProfile3,longitudeOfProfile3])
            } catch (error) {
              console.log(error)
            }        
          };

          const getStoredLocations=async()=>{
            try {
                await setStoredLocations(JSON.parse(await AsyncStorage.getItem('storedLocations')))
            } catch (error) {
                console.log(error)
            }
          }
          const getLatestVisitBuildings=async()=>{
            try {
                setLatestVisitBuildings(await axiosGet(URLWithDeviceInfo('http://covidhelper1.ddns.net:8080/latestvisitbuilding/')))
            } catch (error) {
                console.log(error)
            }
          }

          const setInitialReport=async ()=>{
            if(profiles[0]!=null&&profiles[1]!=null&&!isNaN(profiles[2])&&isNaN(profiles[3])){
                await setCurrentReport(1)
                await setCurrentReportName(profiles[0]+' '+profiles[1])
            }
            else if(profiles[4]!=null&&profiles[5]!=null&&!isNaN(profiles[6])&&!isNaN(profiles[7])){
                await setCurrentReport(2)
                await setCurrentReportName(profiles[4]+' '+profiles[5])
            }
            else if(profiles[8]!=null&&profiles[9]!=null&&!isNaN(profiles[10])&&!isNaN(profiles[11])){
                await setCurrentReport(3)
                await setCurrentReportName(profiles[9]+' '+profiles[10])
            }
            else if(storedLocations!=null){
                await setCurrentReport(4)
                await setCurrentReportName('Stored Locations')
            }
            else{
                
            }
          }

          const runPreparation=async()=>{
            await getProfiles();
            await getStoredLocations()
            await getLatestVisitBuildings()
            await setInitialReport();
          }

          if(isFocused){
            runPreparation()
          }
           
    },[isFocused]);

    useEffect(() => {
        fillInReport()
        Logging('Switch to '+currentReportName+' '+currentReportDate,'INFO')  
    }, [currentReport])

    return(
        <View style={styles.container}>
            <View style={styles.profileBar}>
                <TouchableOpacity
                style={styles.button}
                onPress={clickUp}
                >
                    <Image source={require('../../assets/Button-Up-icon.png')} />
                </TouchableOpacity>
                <Text>{currentReportName}</Text>
                <TouchableOpacity
                style={styles.button}
                onPress={clickDown}
                >
                    <Image source={require('../../assets/Button-Down-icon.png')} />
                </TouchableOpacity>
            </View>
            <BuildingsSeperator/>
            <FlatList
            data={reportResult}
            keyExtractor={(item,index)=> index.toString()}
            ItemSeparatorComponent={BuildingsSeperator}
            renderItem={renderbuildings}
            contentContainerStyle={{flexGrow: 1}}
            ListHeaderComponent={()=><Text>Here are buildings about your selected locations with reported case at {currentReportDate}:</Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#EEF0F4',
      marginBottom:0.1
    },
    profileBar:{
        flex:1,
        flexDirection:'row',
    },
    buildingsSeperator:{
      height: 0.5,
      width: '100%',
      backgroundColor: '#cba3ce',
    },
    profileBar:{
      padding: 10,
      alignItems: 'center',
    },
    textInItem:{
      color:'#21254a'
    },
    button:{
        alignItems: 'center',
    }
  });