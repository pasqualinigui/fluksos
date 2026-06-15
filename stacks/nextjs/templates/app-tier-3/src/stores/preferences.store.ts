import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PreferencesState {
  theme: 'light' | 'dark' | 'system';
  locale: string;
  setTheme: (theme: PreferencesState['theme']) => void;
  setLocale: (locale: string) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: 'system',
      locale: 'pt-BR',
      setTheme: (theme) => set({ theme }),
      setLocale: (locale) => set({ locale })
    }),
    { name: 'user-preferences' }
  )
);
