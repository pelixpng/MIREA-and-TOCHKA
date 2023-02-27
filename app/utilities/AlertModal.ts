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

    static teacherNotFound = (teacher: string) => {
        Alert.alert(
            `Расписание для: ${teacher} не найденно.`,
            'Возможно оно появится позже.',
            [{ text: 'Ок' }]
        )
    }

    static groupNotSelect = () => {
        Alert.alert(
            `Ошибка!`,
            'Вначале выбери группу из списка.',
            [{ text: 'Ок' }]
        )
    }

    static noInternetForMap = () => {
        Alert.alert(
            `Внимание!`,
            'Нет подключения к интернету, оналйн карта может не рабоать или не отображать все этажи. Воспользуйтесь офлайн картой либо подключитесь к интернету.',
            [{ text: 'Ок' }]
        )
    }

    static noInternetForFindTeacher = () => {
        Alert.alert(
            'Вы не подключены к интернету.',
            'Для поиска преподавателя требуется подключение к интернету',
            [{ text: 'Ок' }]
        )
    }
}