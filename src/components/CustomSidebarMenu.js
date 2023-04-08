import React , { useEffect }from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';
 
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useDrawerStatus } from '@react-navigation/drawer';

import { useNavigation} from '@react-navigation/native';
import Constants from "expo-constants"
import {Logging} from '../common/Logging'

export function CustomSidebarMenu(props){
    const navigation = useNavigation();
    const version = Constants.manifest.version
    const isDrawerOpen = useDrawerStatus() === 'open';

    useEffect(() => {
        if(isDrawerOpen){
            Logging('Open the side bar menu','INFO')  
        }
    },[isDrawerOpen])

    return(
        <SafeAreaView style={{flex: 1}}>     
            <DrawerContentScrollView {...props} contentContainerStyle={{paddingTop: 100}}>
                <View style={styles.scrollHeader}>
                    <Text style={{
                    fontSize: 16,
                    textAlign: 'center',
                    color: 'white',
                    margin:40,
                    fontWeight: 'bold',
                    }}>
                        Covid Helper v{version}
                    </Text>
                </View>
                <DrawerItem
                labelStyle={styles.drawerItemLabelStyle}
                label="Report"
                icon={()=>{
                    return(
                        <Image source={require('../../assets/Text-Document-icon.png')}/>
                    );
                }}
                onPress={async ()=>{
                    navigation.navigate('Report', { screen: 'ReportScreen' });
                }}
                />
                <DrawerItem
                labelStyle={styles.drawerItemLabelStyle}
                label="Contact"
                icon={()=>{
                    return(
                        <Image source={require('../../assets/mailbox-icon.png')}/>
                    );
                }}
                onPress={async ()=>{
                    navigation.navigate('Contact', { screen: 'ContactScreen' });
                }}
                />
            </DrawerContentScrollView>
        </SafeAreaView>
    );
};
 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      flexDirection:"row",
    },
    drawerItemLabelStyle:{
        color: '#21254a',
    },
    scrollHeader:{
        backgroundColor:'#21254a',
    }
  });

export default CustomSidebarMenu;