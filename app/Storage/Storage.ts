import AsyncStorage from '@react-native-async-storage/async-storage'
import { addGroupToRedux } from '../redux/counter'

export default class StorageService {
    //clear all storage
    static delData = async () => {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            // saving error
        }
    }

    static storeData = async (dispatch:any, key:string, value:string ) => {
        try {
            dispatch(addGroupToRedux(value))
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            // saving error
        }
    }
}