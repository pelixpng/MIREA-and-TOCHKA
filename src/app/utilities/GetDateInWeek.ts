export function GetCurrentDayWeek() {
    const curr = new Date();
    const dataWeek: string[] = []
    if(curr.getDay()!=0){
        const first = curr.getDate() - curr.getDay() + 1; // Start from Monday
        const FirstDate = new Date(curr.setDate(first));
        const LastData = new Date(curr.setDate(FirstDate.getDate() + 6));
        if (LastData.getDate() > FirstDate.getDate()) {
            for (let i = FirstDate.getDate(); i < LastData.getDate(); i++) {
                dataWeek.push(i.toString())            
            }
        }
        else{
            const lastDayLastMounth = new Date(curr.getFullYear(), curr.getMonth(), 0);
            for (let x = FirstDate.getDate(); x <= lastDayLastMounth.getDate(); x++) {
                dataWeek.push(x.toString()) 
            }
            for (let y = 1; y < LastData.getDate(); y++) {
                dataWeek.push(y.toString())   
            }
        }
    }
    else{
        const last = curr.getDate() - curr.getDay();
        const LastData = new Date(curr.setDate(last));
        const FirstData = new Date(curr.setDate(LastData.getDate() - 6));
        if (LastData.getDate() > FirstData.getDate()) {
            for (let i = FirstData.getDate(); i < LastData.getDate(); i++) {
                dataWeek.push(i.toString())            
            }
        }
        else{
            const lastDayLastMounth = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
            for (let x = FirstData.getDate(); x <= lastDayLastMounth.getDate(); x++) {
                dataWeek.push(x.toString()) 
            }
            for (let y = 1; y < LastData.getDate(); y++) {
                dataWeek.push(y.toString())   
            }
        }
    }
    return dataWeek;
}
