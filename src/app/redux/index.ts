import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import rootReducer from './rootReducer'

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
    reducer: rootReducer,
})


// псевдонимы для useDispatch и useSelector, добавим к ним типизацию, а затем экспортируем эти псевдонимы, 
// чтобы нам не нужно было делать это каждый раз, когда мы хотим их использовать.
// Вынести в файл hooks и типизацию в types или можно оставить в хукс
export type AppDispatch = typeof store.dispatch
export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector
export default store