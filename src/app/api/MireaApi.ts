import { scheduleApi } from "../constant/links";
import { ScheduleResponse, TeacherScheduleReasponse, GroupSearcheResponse } from "../types/schedule";

export default class ApiService {
    static async getCurrentWeek() { 
        const response = await fetch(scheduleApi+"current_week");
        const json = await response.json();
        return Number(json.week)
    }

    static async getFullSchedule(group: string) {
        const response = await fetch(scheduleApi+group+"/full_schedule");
        const json = await response.json() as ScheduleResponse;
        return json
    }

    static async getAllGroups() {
        const response = await fetch(scheduleApi+"groups");
        const json = await response.json() as GroupSearcheResponse; 
        const groupsArray = json.groups.reduce((acc: Array<object>, item: string) => {
            acc.push({ label: item, value: item });
            return acc;
        }, []);
        return groupsArray;
    }

    static async getTeacherSchedule(name: string) {        
        const response = await fetch(scheduleApi+"teacher/"+name);
        const json = await response.json() as TeacherScheduleReasponse;
        return json
    }
}
