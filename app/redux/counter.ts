import { createSlice, PayloadAction } from '@reduxjs/toolkit'


//reducer — чистая функция которая будет отвечать за обновление состояния. 
//Здесь реализовывается логика в соответствие с которой будет происходить обновление полей store.

// Функция createSlice возвращает объект, включающий (но не ограничивающийся) действия и редьюсер, 
// которые нам нужно экспортировать для использования в нашем приложении.

const counterSlice = createSlice({
    name: 'groupState', 
    initialState: 'Пока ничего нет',
    reducers: { // тут делаем редусеры (функции)
        addGroupToRedux: (state, action: PayloadAction<string>) => state = action.payload, //принятое значение сохраняем
       // decrement: (state, action: PayloadAction<number>) => state - action.payload,
    },
})

export const { addGroupToRedux } = counterSlice.actions //экспортируем функцию
export default counterSlice.reducer // экспортируем редусеры