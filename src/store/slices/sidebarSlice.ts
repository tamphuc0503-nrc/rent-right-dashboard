
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { SidebarItem } from '@/types/sidebar';

interface SidebarState {
  isOpen: boolean;
  expandedItems: string[];
  clientsPanelOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: true, // Default to open on desktop
  expandedItems: [],
  clientsPanelOpen: false,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    toggleExpandedItem: (state, action: PayloadAction<string>) => {
      const itemTitle = action.payload;
      if (state.expandedItems.includes(itemTitle)) {
        state.expandedItems = state.expandedItems.filter(title => title !== itemTitle);
      } else {
        state.expandedItems.push(itemTitle);
      }
    },
    setClientsPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.clientsPanelOpen = action.payload;
    }
  },
});

export const { toggleSidebar, setSidebarOpen, toggleExpandedItem, setClientsPanelOpen } = sidebarSlice.actions;

// Selectors
export const selectSidebarIsOpen = (state: RootState) => state.sidebar.isOpen;
export const selectExpandedItems = (state: RootState) => state.sidebar.expandedItems;
export const selectClientsPanelOpen = (state: RootState) => state.sidebar.clientsPanelOpen;

export default sidebarSlice.reducer;
