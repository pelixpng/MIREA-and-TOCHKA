import { Alert } from "react-native"

export default class AlertModalService {
    static noInternet = () => {
        Alert.alert(
            'Вы не подключены к интернету.',
            'Для загрузки расписания требуется подключение к интернету',
            [{ text: 'Ок' }]
        )
    }

    static apiCrash = () => {
        Alert.alert(
            'Ведутся технические работы.',
            'Расписание временно не доступно, попробуйте позже.',
            [{ text: 'Ок' }]
        )
    }

    static groupNotFound = (group: string) => {
        Alert.alert(
            `Расписание для группы: ${group} не найденно.`,
            'Возможно оно появится позже.',
            [{ text: 'Ок' }]
        )
    }

    // static storeData =  () => {
        
    // }
}