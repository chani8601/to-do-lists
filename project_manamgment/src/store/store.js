import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducer/UserSlice'
import ProjectSlice from './reducer/ProjectSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    projectState: ProjectSlice
  }
})
