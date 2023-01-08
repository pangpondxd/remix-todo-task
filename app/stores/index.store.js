import create from "zustand";

export const formTodoStore = create((set) => ({
  form: {},
  setForm: (form) =>
    set((state) => ({
      form: { ...(state.form || {}), ...form },
    })),
  setFilterForm: (form) => set({ form }),
}));
