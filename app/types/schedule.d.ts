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
  