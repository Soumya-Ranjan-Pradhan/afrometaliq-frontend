import { create } from "zustand";

type GlobalStore = {
    isComingSoon: boolean;
    setIsComingSoon: (isComingSoon: boolean) => void;
};

export const useGlobalStore = create<GlobalStore>((set) => ({
    isComingSoon: false,
    setIsComingSoon: (isComingSoon) => set({ isComingSoon }),
}));
