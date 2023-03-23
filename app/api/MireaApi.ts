import { ScheduleResponse, TeacherScheduleReasponse, GroupSearcheResponse } from "../types/schedule";

export default class ApiService {
    static async getCurrentWeek() {
        const response = await fetch(`http://schedule.mirea.ninja/api/schedule/current_week`);
        const json = await response.json();
        return Number(json.week)
    }

    static async full_schedule(group: string) {
        const response = await fetch(`https://schedule.mirea.ninja/api/schedule/${group}/full_schedule`);
        const json = await response.json() as ScheduleResponse;
        return json
    }

    static async all_groups() {
        const response = await fetch(`https://schedule.mirea.ninja/api/schedule/groups`);
        const json = await response.json() as GroupSearcheResponse;
        return json
    }

    static async teacher_schedule(name: string) {        
        const response = await fetch(`https://schedule.mirea.ninja/api/schedule/teacher/${name}`);
        const json = await response.json() as TeacherScheduleReasponse;
        return json
    }
}
