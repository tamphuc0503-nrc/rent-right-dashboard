
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { clients } from '@/data/clients';

interface Client {
  id: number | string;
  name: string;
  email: string;
  phone: string;
}

interface ClientsState {
  clients: Client[];
  searchTerm: string;
}

const initialState: ClientsState = {
  clients,
  searchTerm: '',
};

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    addClient: (state, action: PayloadAction<Client>) => {
      state.clients.push(action.payload);
    }
  },
});

export const { setSearchTerm, addClient } = clientsSlice.actions;

// Selectors
export const selectClients = (state: RootState) => state.clients.clients;
export const selectSearchTerm = (state: RootState) => state.clients.searchTerm;
export const selectFilteredClients = (state: RootState) => {
  const { clients, searchTerm } = state.clients;
  return clients.filter(
    c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );
};

export default clientsSlice.reducer;
