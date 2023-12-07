import { create } from "zustand";
import { formatDate, getCurrentDateInEST } from "../utils/calendar/dates";

interface CalendarState {
  currentSelectedDate: string;
  updateDate: (newDate: string) => void;
}

export const calendarStore = create<CalendarState>((set) => ({
  currentSelectedDate: formatDate(getCurrentDateInEST()),
  updateDate: (newDate) => set({ currentSelectedDate: newDate }),
}));
