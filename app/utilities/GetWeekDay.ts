//получаем текущий день недели
export function getWeekDay() {
    const date = new Date()
    const days = ['СБ', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return days[date.getDay()];
}