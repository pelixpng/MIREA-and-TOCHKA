import { MMKV } from 'react-native-mmkv'
import { addGroupToRedux } from '../redux/counter'

export const Storage = new MMKV()

export default class StorageServiceMMKV{
    static clearData = () => {
       Storage.clearAll()
    }

    static saveGroup = (group: string, dispatch: any) => {
        dispatch(addGroupToRedux(group))
        Storage.set('group', group)
    }

    static saveSchedule = (week: string, scheduleCache: string) => {
        Storage.set('week', week)
        Storage.set('schedule', scheduleCache)
    }

    static saveLastUpdate = (dateUpdate: string) => {
        Storage.set('dateUpdate', dateUpdate)
    }
}