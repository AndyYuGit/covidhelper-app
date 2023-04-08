import {axiosGet} from "../../src/services/AxiosGet";
import AsyncStorage  from '../../__mocks__/@react-native-async-storage/async-storage'
import { emptyCheck } from "../../src/common/EmptyCheck";
jest.useFakeTimers()

it('responses',async () => {
    let result;
    asyncOperation = async () => { 
      await AsyncStorage.setItem('logs', '')
      result=await axiosGet('https://randomuser.me/api/')
    }
    await asyncOperation()
    expect(emptyCheck(result)).toBe(false)
  });

  it('throws',async () => {
    let result;
    asyncOperation = async () => { 
      await AsyncStorage.setItem('logs', '')
      result=await axiosGet('Hello world')
    }
    expect(async ()=>{
      await asyncOperation().toThrow()
    })
  });