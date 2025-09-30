import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'settings_v1';

const useSettingsStore = create((set, get) => ({
  plantIdApiKey: '',
  setPlantIdApiKey: (k) => { set({ plantIdApiKey: k }); AsyncStorage.setItem(KEY, JSON.stringify({ plantIdApiKey: k })); },
  hydrate: async () => {
    try {
      const raw = await AsyncStorage.getItem(KEY);
      if (raw) {
        const obj = JSON.parse(raw);
        set({ plantIdApiKey: obj.plantIdApiKey || '' });
      }
    } catch {}
  },
}));

useSettingsStore.getState().hydrate();

export default useSettingsStore;