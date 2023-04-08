import { StyleSheet, Text, View ,ScrollView} from 'react-native';
import React, { useEffect, useState } from "react";
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { LatestCases } from '../common/LatestCases';


export function HomeScreen (props){
    const [result,setResult]=useState(0);
    const isFocused = useIsFocused();

    useEffect(() => {
        const getResult = async () => {
          const result = await LatestCases();
          setResult(result);
        };
        getResult()
    },[]);

    

    return (
     <View style={styles.container}>
          <View style={[styles.circle]}>
            <Text style={styles.dataText}>{typeof result[0]==='undefined'?'Loading...':(isFocused ?result[0]:'')}</Text>
            <Text style={styles.labelText}>Confirmed Cases</Text>
            <Text>{"\n"}</Text>
            <Text style={styles.dataText}>{typeof result[1]==='undefined'?'Loading...':(isFocused ?result[1]:'')}</Text>
            <Text style={styles.labelText}>Death Cases</Text>
          </View>          
          <View style={styles.footer}>
            <Text style={styles.labelText}>Last updated at: {typeof result[2]==='undefined'?'':(isFocused?result[2].getFullYear()+'-'+(result[2].getMonth()+1)+'-'+result[2].getDate():'')}</Text>
          </View>
    </View>
      
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EEF0F4'
    },
    circle:{
      position:'absolute',
      height:300,
      width:300,
      backgroundColor:'#EEF0F4',
      borderRadius:150,
      elevation:7,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      position:'absolute',
      bottom:100
    },
    dataText:{
      color:'#cba3ce',fontSize:22
    },
    labelText:{
      color:'#21254a',fontSize:14
    }

    
  });