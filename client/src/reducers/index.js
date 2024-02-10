import { configureStore } from '@reduxjs/toolkit'
import recipes from './recipes'

// Automatically adds the thunk middleware and the Redux DevTools extension
export default configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    recipes
  }
})