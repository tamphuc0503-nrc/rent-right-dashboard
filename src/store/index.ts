
import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './slices/sidebarSlice';
import propertiesReducer from './slices/propertiesSlice';
import clientsReducer from './slices/clientsSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    properties: propertiesReducer,
    clients: clientsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
