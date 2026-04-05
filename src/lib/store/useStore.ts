import { create } from 'zustand';

interface GridState {
    intensity: number;
    color: string;
    isBooted: boolean;
    setIntensity: (val: number) => void;
    setBooted: (val: boolean) => void;
}

export const useStore = create<GridState>((set) => ({
    intensity: 1.0,
    color: '#00f2ff',
    isBooted: false,
    setIntensity: (val) => set({ intensity: val }),
    setBooted: (val) => set({ isBooted: val }),
}));