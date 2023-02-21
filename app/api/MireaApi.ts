import { ScheduleResponse, teacherScheduleReasponse } from "../types/schedule";

export default class ApiService {
    static async current_week() {
        const res = await fetch(`http://schedule.mirea.ninja/api/schedule/current_week`);
        const json = await res.json();
        return Number(json.week)
    }

    static async full_schedule(group: string) {
        const res = await fetch(`https://schedule.mirea.ninja/api/schedule/${group}/full_schedule`);
        const json = await res.json() as ScheduleResponse;
        return json
    }

    static async all_groups() {
        const res = await fetch(`https://schedule.mirea.ninja/api/schedule/groups`);
        const json = await res.json();
        return json
    }

    static async teacher_schedule(name: string) {
        const res = await fetch(`https://schedule.mirea.ninja/api/schedule/teacher/${name}`);
        const json = await res.json() as teacherScheduleReasponse;
        return json
    }
}








// export async function current_week() {
//     const res = await fetch(`http://schedule.mirea.ninja/api/schedule/current_week`);
//     const json = await res.json();
//     return json.week + ""
// }


// useEffect(() => {
    
//     (async () =>{
//         const currentWeek = await current_week();

//         // dispatch(setWeek(currentWeek))
//     })
// }, []);


