import { logger } from "react-native-logs";
import AsyncStorage from "@react-native-async-storage/async-storage";



const customTransport = async (props) => {
   let logs=await AsyncStorage.getItem('logs');
   logs=logs!=null?JSON.parse(logs):[];
   if(logs.length>10000){
    logs.shift();
   }
   logs.push(props.msg+'\n');
   await AsyncStorage.setItem('logs',JSON.stringify(logs));
};


  const config = {
    levels: {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    },
    transport: customTransport,
    async: true,
    dateFormat: 'local',
    printLevel: true,
    printDate: true,
    enabled: true,
  };
  
  
  
export async function Logging(message,level){
    var configLogger=logger.createLogger(config)
    switch(level){
        case 'DEBUG':
            configLogger.debug(message);
            break;
        case 'INFO':
            configLogger.info(message);
            break;
        case 'WARN':
            configLogger.warn(message);
            break;
        case 'ERROR':
            configLogger.error(message);
            break;
    }
}