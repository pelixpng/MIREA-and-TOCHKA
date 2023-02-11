// Record - Создает тип объекта, ключами свойств которого являются Keys, а значениями свойств являются Type. 
// Эту утилиту можно использовать для отображения свойств одного типа на другой тип.

// Пример есть в tsLearning/utility-types 

//интерфейс для ответа Api
export interface ScheduleResponse {
    group: string
    schedule: Record<number, Day>
  }
  export interface Day {
    lessons: Lesson[][]
  }
  
  export interface Lesson {
    name: string
    //weeks: number[]
    time_start: string
    time_end: string
    types: string
    teachers: string[]
    rooms: string[]
  }
  