import Constants from "expo-constants"
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import { Platform } from 'expo-modules-core';

export function URLWithDeviceInfo(url){
    const version = Constants.manifest.version
    let firstSymbol='?'
    if(url.includes('?')){
        firstSymbol='&'
    }
    if (Platform.OS === 'android') {
        return url+firstSymbol+'deviceID='+Application.androidId+'&model='+Device.modelName+'&osVersion='+Device.osVersion+'&appVersion='+version
    }
    if (Platform.OS === 'ios') {
        return url+firstSymbol+'deviceID='+Application.getIosIdForVendorAsync()+'&model='+Device.modelName+'&osVersion='+Device.osVersion+'&appVersion='+version
    }
}