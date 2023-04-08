import { axiosGet } from './AxiosGet';

export async function RequestCasesNumber(dt){
    var date=dt.getDate();
    if(date<10){
        date='0'+date
    }
    var month=dt.getMonth()+1;
    if(month<10){
        month='0'+month
    }
    return await axiosGet('https://api.data.gov.hk/v2/filter?q=%7B%22resource%22%3A%22http%3A%2F%2Fwww.chp.gov.hk%2Ffiles%2Fmisc%2Flatest_situation_of_reported_cases_covid_19_eng.csv%22%2C%22section%22%3A1%2C%22format%22%3A%22json%22%2C%22filters%22%3A%5B%5B1%2C%22eq%22%2C%5B%22'+date+'%2F'+month+'%2F'+dt.getFullYear()+'%22%5D%5D%5D%7D',null);
}