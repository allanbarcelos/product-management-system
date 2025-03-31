// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '@features/sidebar/sidebarSlice'; // Importa o reducer
import backgroundReducer from '@features/background/backgroundSlice'; // Importa o reducer

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    background: backgroundReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;