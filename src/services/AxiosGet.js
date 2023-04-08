import axios from 'axios';
import {Logging} from '../common/Logging'

export async function axiosGet(url,param){
    try {
        let response=null;
        if(param!=null){
          response = await axios.get(url,{ params: { [param.key]: [param.value] } });
        }
        else{
          response = await axios.get(url);
        }
        Logging('request success: '+response.status+' '+url,'INFO')  
        return response.data;
    }catch(error) {
      Logging('request failed'+': '+url,'ERROR')  
        if (error.response) {
          Logging(error.response.data+' '+error.response.status+' '+error.response.headers,'ERROR')
          } else if (error.request) {
            Logging(error.request,'ERROR')  
          } else {
            Logging(error.message,'ERROR') 
          }
          Logging(error.config,'ERROR')
    }
}