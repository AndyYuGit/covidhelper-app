import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from "react";



export function DistrictsScreen (props){
    const [isEnabled, setIsEnabled] = useState(false);
    const {selectedScreen}=props.route.params
  
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.rows1} onPress={()=>{
            props.navigation.navigate('Locations', { screen: 'LocationsScreen',selectedScreen:selectedScreen, district:'Central %26 Western'});
            }}>
                <Text style={styles.text1}>Central & Western</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rows2} onPress={()=>{
            props.navigation.navigate('Locations', { screen: 'LocationsScreen',selectedScreen:selectedScreen, district:'Eastern'});
            }}>
                <Text style={styles.text2}>Eastern</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rows1} onPress={()=>{
            props.navigation.navigate('Locations', { screen: 'LocationsScreen',selectedScreen:selectedScreen, district:'Islands'});
            }}>
                <Text style={styles.text1}>Islands</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rows2} onPress={()=>{
            props.navigation.navigate('Locations', { screen: 'LocationsScreen',selectedScreen:selectedScreen, district:'Kowloon City'});
            }}>
                <Text style={styles.text2}>Kowloon City</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rows1} onPress={()=>{
            props.navigation.navigate('Locations', { screen: 'LocationsScreen',selectedScreen:selectedScreen, district:'Kwai Tsing'});
            }}>
                <Text style={styles.text1}>Kwai Tsing</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rows2} onPress={()=>{
            props.navigation.navigate('Locations', { screen: 'LocationsScreen',selectedScreen:selectedScreen, district:'Kwun Tong'});
            }}>
                <Text style={styles.text2}>Kwun Tong</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rows1} onPress={()=>{
            props.navigation.navigate('Locations', { screen: 'LocationsScreen',selectedScreen:selectedScreen, district:'North'});
            }}>
                <Text style={styles.text1}>North</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rows2} onPress={()=>{
            props.navigation.navigate('Locations', { screen: 'LocationsScreen',selectedScreen:selectedScreen, district:'Sai Kung'});
            }}>
                <Text style={styles.text2}>Sai Kung</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rows1} onPress={()=>{
            props.navigation.navigate('Locations', { screen: 'LocationsScreen',selectedScreen:selectedScreen, district:'Sha Tin'});
            }}>
                <Text style={styles.text1}>Sha Tin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rows2} onPress={()=>{
            props.navigation.navigate('Locations', { screen: 'LocationsScreen',selectedScreen:selectedScreen, district:'Sham Shui Po'});
            }}>
                <Text style={styles.text2}>Sham Shui Po</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rows1} onPress={()=>{
            props.navigation.navigate('Locations', { screen: 'LocationsScreen',selectedScreen:selectedScreen, district:'Southern'});
            }}>
                <Text style={styles.text1}>Southern</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rows2} onPress={()=>{
            props.navigation.navigate('Locations', { screen: 'LocationsScreen',selectedScreen:selectedScreen, district:'Tai Po'});
            }}>
                <Text style={styles.text2}>Tai Po</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rows1} onPress={()=>{
            props.navigation.navigate('Locations', { screen: 'LocationsScreen',selectedScreen:selectedScreen, district:'Tsuen Wan'});
            }}>
                <Text style={styles.text1}>Tsuen Wan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rows2} onPress={()=>{
            props.navigation.navigate('Locations', { screen: 'LocationsScreen',selectedScreen:selectedScreen, district:'Tuen Mun'});
            }}>
                <Text style={styles.text2}>Tuen Mun</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rows1} onPress={()=>{
            props.navigation.navigate('Locations', { screen: 'LocationsScreen',selectedScreen:selectedScreen, district:'Wan Chai'});
            }}>
                <Text style={styles.text1}>Wan Chai</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rows2} onPress={()=>{
            props.navigation.navigate('Locations', { screen: 'LocationsScreen',selectedScreen:selectedScreen, district:'Wong Tai Sin'});
            }}>
                <Text style={styles.text2}>Wong Tai Sin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rows1} onPress={()=>{
            props.navigation.navigate('Locations', { screen: 'LocationsScreen',selectedScreen:selectedScreen, district:'Yau Tsim Mong'});
            }}>
                <Text style={styles.text1}>Yau Tsim Mong</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rows2} onPress={()=>{
            props.navigation.navigate('Locations', { screen: 'LocationsScreen',selectedScreen:selectedScreen, district:'Yuen Long'});
            }}>
                <Text style={styles.text2}>Yuen Long</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#EEF0F4',
        marginBottom:0.1
      },
    rows1: {
        flex: 1,flexDirection:'row'
    },
    rows2: {
        flex: 1,flexDirection:'row',backgroundColor: '#282F6F',margin:8,borderColor:'#cba3ce',borderWidth: 5,
    }
    ,
    itemLeft:{
        flex: 1,paddingTop:10
    },
    itemRight:{
        flex: 1,
    },
    text1:{
        color:'#282F6F',fontSize: 16,
    },
    text2:{
        color:'#FFFFFF',fontSize: 16,
    }
  });