import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  activeModal: string | null;
  toggleSidebar: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  activeModal: null,
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null })
}));
