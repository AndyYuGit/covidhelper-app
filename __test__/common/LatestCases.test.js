import { LatestCases } from "../../src/common/LatestCases";
import AsyncStorage  from '../../__mocks__/@react-native-async-storage/async-storage'
import { emptyCheck } from "../../src/common/EmptyCheck";
jest.useFakeTimers()


it('returns',async () => {
    let result;
    asyncOperation = async () => { 
      await AsyncStorage.setItem('logs', '')
      result=await LatestCases();
    }
    await asyncOperation();;
    expect(emptyCheck(result[0].toString())).toBe(false);
    expect(emptyCheck(result[1].toString())).toBe(false);
    expect(emptyCheck(result[2].toString())).toBe(false);
  });