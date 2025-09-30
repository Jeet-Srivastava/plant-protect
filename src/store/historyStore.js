import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'history_records_v1';

const useHistoryStore = create((set, get) => ({
  records: [],
  addRecord: (rec) => {
    set(state => ({ records: [...state.records, rec] }));
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(get().records));
  },
  clear: () => { set({ records: [] }); AsyncStorage.removeItem(STORAGE_KEY); },
  hydrate: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) set({ records: JSON.parse(raw) });
    } catch {}
  },
}));

// hydrate immediately
useHistoryStore.getState().hydrate();

export default useHistoryStore;