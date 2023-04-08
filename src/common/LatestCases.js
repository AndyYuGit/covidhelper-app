import { consoleTransport } from 'react-native-logs';
import {RequestCasesNumber} from '../services/RequestCasesNumber';
import {emptyCheck} from './EmptyCheck'
import {Logging} from './Logging'

function removeHyphenSpace(obj){
    if(!emptyCheck(obj)){
        obj=obj.map(v =>Object.entries(v).reduce((acc, [key, value]) =>Object.assign(acc, {[key.replace(/\s+|-+/g, '')]: value}),{}));
    }
    return obj;
}

export async function LatestCases(){
    try {
        Logging('Get latest cases start.','INFO')
        var result=new Array();
        var dt=new Date();
        var today= removeHyphenSpace(await RequestCasesNumber(dt));
        dt.setDate( dt.getDate() - 1 );
        var yesterday=removeHyphenSpace(await RequestCasesNumber(dt));
        if(emptyCheck(today)){
            result[0]=yesterday[0].Numberofpositivenucleicacidtestlaboratorydetections
            result[1]=yesterday[0].NumberofdeathcasesrelatedtoCOVID19
            dt.setDate( dt.getDate() + 1);
            result[2]=dt;
        }
        else{
            result[0]=today[0].Numberofpositivenucleicacidtestlaboratorydetections
            result[1]=today[0].NumberofdeathcasesrelatedtoCOVID19
            result[2]=dt;
        }
        Logging('Got latest cases case:'+result[0]+' death:'+result[1]+' date:'+result[2],'INFO')
        return result;
    }catch(error) {
        await Logging('Get latest cases error:'+error,'ERROR');
    }
}