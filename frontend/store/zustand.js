import { createJSONStorage, persist } from "zustand/middleware";

import { create } from "zustand";

export const useAuth = create(
  persist(
    (set, get) => ({
      jwt: null,
      update: (jwt) => set({ jwt }),
      clear: () => set({ jwt: null }),
    }),
    {
      name: "mbc-state", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
