import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ScheduleResponse } from '../types/schedule';
import { ItemProps } from '../components/ui/schedule/Subject';


//reducer — чистая функция которая будет отвечать за обновление состояния. 
//Здесь реализовывается логика в соответствие с которой будет происходить обновление полей store.

// Функция createSlice возвращает объект, включающий (но не ограничивающийся) действия и редьюсер, 
// которые нам нужно экспортировать для использования в нашем приложении.


//TODO: сделать интерфейс под апи
//TODO: исправить типизацию
interface InitialState {
    group:string;
    week:number;
    schedule:ScheduleResponse;
    schedulePars:[ItemProps[]]
    allGroupsList:Array<Object>;
    isAppOffline:boolean
}



const initialState:InitialState = {
    group:"",
    week: 0,
    schedule:{
        group:"",
        schedule:[]
    },
    schedulePars:[[]],
    allGroupsList:[],
    isAppOffline:false
}

// export const getAllGroups = createAsyncThunk(
//     'groupState/getAllGroups',
//     async function() {
        
//     }
// )

const counterSlice = createSlice({
    name: 'groupState', 
    initialState,
    reducers: { // тут делаем редусеры (функции)
        addGroupToRedux: (state, action: PayloadAction<string>) =>{
            state.group = action.payload
        },
        addWeekToRedux: (state, action: PayloadAction<number>) => {
            state.week = action.payload
        },
        addScheduleToRedux: (state, action: PayloadAction<any>) => {
            state.schedule = action.payload
        },
        addScheduleParsToRedux: (state, action: PayloadAction<any>) => {
            state.schedulePars = action.payload
        },
        addAllgroupToRedux: (state, action: PayloadAction<Array<Object>>) => {
            state.allGroupsList = action.payload
        },
        addIsAppOfflineToRedux: (state, action: PayloadAction<boolean>) => {
            state.isAppOffline = action.payload
        }
    },
})

export const { addGroupToRedux, addWeekToRedux, addScheduleToRedux, addScheduleParsToRedux, addAllgroupToRedux, addIsAppOfflineToRedux } = counterSlice.actions //экспортируем функцию
export default counterSlice.reducer // экспортируем редусеры