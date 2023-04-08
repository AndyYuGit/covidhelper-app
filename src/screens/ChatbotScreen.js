import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View ,Switch, TextInput,ScrollView,TouchableOpacity,Image,FlatList} from 'react-native';
import { GiftedChat,InputToolbar,LeftAction, ChatInput, SendButton,Bubble,Composer,Send } from 'react-native-gifted-chat'
import { axiosGet } from '../services/AxiosGet';
import{URLWithDeviceInfo} from '../common/URLWithDeviceInfo'
import {Logging} from '../common/Logging'


export function ChatbotScreen(props){
    const [messages, setMessages] = useState([]);
    const [information, setInformation] = useState([]);
    const [messageCount, setMessageCount] = useState(2);

    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hello, what can I help you?Following the adjustment of local anti-epidemic measures, starting from 30 December 2022, the Department of Health will not provide the list of buildings visited by cases tested positive for SARS-CoV-2 virus in the past 14 days. The update of latest visit building has temporarily terminated until further adjustment of local anti-epidemic measures. The version of latest visit building has preserved on 28 December 2022',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Bot',
              avatar: require('../../assets/bot-icon.png'),
            },
          },
        ])
      }, [])

      useEffect(() => {
        if(information.length!=0){
          setMessageCount(messageCount+1)
          Logging('Get information:'+information.toString(),'INFO')
          setMessages(previousMessages => GiftedChat.append(previousMessages, [
            {
              _id: messageCount,
              text: information.toString(),
              user: {
                 _id: 2,
                name: 'Bot',
                avatar: require('../../assets/bot-icon.png'),
              },
            }
          ]))
        }
      }, [information])

      async function getInformation(messageText){
        try {
          setInformation(await axiosGet(URLWithDeviceInfo('http://covidhelper1.ddns.net:8080/keywords/Information?message='+messageText)))
        } catch (error) {
          await Logging('Get information request by message:'+messageText+' error:','ERROR')
        }
      }


      async function onSend(messages){
        setMessages(previousMessages => GiftedChat.append(previousMessages, [
          {
            _id: messageCount,
            text: messages[0].text,
            user: {
               _id: 1,
            },
          }
        ]))
        setMessageCount(messageCount+1)
        await Logging('Get information request by message:'+messages[0].text,'INFO')
        await getInformation(messages[0].text)
      }

      function renderBubble(props) {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: '#cba3ce',
              },
              right:{
                backgroundColor: '#cba3ce',
              }
            }}
            textStyle={{
              left: {
                color:'white'
              },
              right: {
                color: 'white',
              }
            }}
            timeTextStyle={{ left: { color: 'white' },right: { color:'white'} }}
          />
        );
      }

      function renderSend(props){
        return(
          <Send
            {...props}
            textStyle={{color:'#cba3ce'}}
          />
        )
      }
     
      function renderInputToolbar(props) {
        return (
          <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: '#21254a',
              color:'white'
            }}
            renderComposer={props=>
              <Composer
                {...props} 
                textInputProps={{...props.textInputProps,selectionColor:'#cba3ce'}}
                textInputStyle={{ color: 'white'}} 
                placeholderTextColor = 'white' 
              /> 
            } 
          />
        );
      };
    
      return (
        <View style={styles.container}>
          <GiftedChat 
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
              _id: 1,
            }}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
            renderSend={renderSend}
          />
        </View>
      )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#EEF0F4',
    marginTop:-33,
  }
});