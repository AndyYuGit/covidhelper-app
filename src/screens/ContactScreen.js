import { StyleSheet, Text, View,Switch,TouchableOpacity, TextInput  } from 'react-native';
import React, { useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Logging} from '../common/Logging'
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { axiosGet } from '../services/AxiosGet';
import{URLWithDeviceInfo} from '../common/URLWithDeviceInfo'
import * as SMS from 'expo-sms';
import * as Application from 'expo-application';
import Constants from "expo-constants"
import * as Device from 'expo-device';

export function ContactScreen (props){
    const [text, onChangeText] = useState("");
    const [warning, setWarning] = useState("");
    const [adminInfo,setAdminInfo]=useState("");
    const version = Constants.manifest.version

    useEffect(() => {
       const getAdminInfo = async () => {
          const result = await axiosGet(URLWithDeviceInfo('http://covidhelper1.ddns.net:8080/admins/AdminEmailPhoneNum?id=1'))
          setAdminInfo(result);
        };
        getAdminInfo()
    },[]);
  
    return(
        <View style={{flex: 1}}>
            <View style={styles.rows}>
            <Text style={styles.text}>Write something...</Text>
            <TextInput style ={styles.textBox} multiline placeholder="Tell me your advice or bug report..." selectionColor="#cba3ce" onChangeText={onChangeText}
            value={text}/>
            <TouchableOpacity key={'Send'} style={styles.button} onPress={async()=>{
                const mediaLibrarypermission=await MediaLibrary.requestPermissionsAsync()
                let logs=await AsyncStorage.getItem('logs')
                logs=logs!=null?JSON.parse(logs):[];
                const isAvailable = await SMS.isAvailableAsync();
                if (isAvailable&&mediaLibrarypermission) {
                    let fileUri = FileSystem.documentDirectory + "logs.txt";
                    await FileSystem.writeAsStringAsync(fileUri, 'deviceID='+Application.androidId+' model='+Device.modelName+' osVersion='+Device.osVersion+' appVersion='+version+'\n'+logs.toString(), { encoding: FileSystem.EncodingType.UTF8 });
                    const asset = await MediaLibrary.createAssetAsync(fileUri).then((response) => response).catch((error) => error)
                    await MediaLibrary.createAssetAsync(asset).then((response) => response).catch((error) => error)
                    const cURI=await FileSystem.getContentUriAsync(fileUri);
                    const { result } = await SMS.sendSMSAsync(
                        [adminInfo[1]],
                        text,
                        {
                            attachments: {
                              uri: cURI,
                              mimeType: 'text/plain',
                              filename: 'logs.txt',
                            },
                        }
                    )
                    await Logging('Send button is clicked with:'+text,'INFO')
                } else {
                    await Logging('Your SMS service is not available currently. Please try again or contact '+adminInfo[0]+' for help.','WARN')
                    setWarning('Your SMS service is not available currently. Please try againor contact '+adminInfo[0]+' for help.')
                }
            }}> 
             <Text style={styles.buttonLabel}>Send</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{warning}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rows: {
        flex: 1,flexDirection:'column',
    },
    itemLeft:{
        flex: 1,paddingTop:10
    },
    itemRight:{
        flex: 1,
    },
    text:{
        color:'#282F6F',fontSize: 16,
    },
    row:{
        padding: 10,
    },
    textInItem:{
        color:'#21254a'
    },
    textBox:{
        maxHeight: 500, 
        borderColor: "#21254a", 
        borderWidth: 1, 
        padding: 10, 
        width: "95%",
    },
    button:{
        fontSize:14,
        backgroundColor:'#21254a',
        borderRadius:10,
        borderColor:'#cba3ce',
        borderWidth: 2.4,
        width: "15%",
    },
    buttonLabel:{
        color:'white',fontSize: 22,
    },
  });