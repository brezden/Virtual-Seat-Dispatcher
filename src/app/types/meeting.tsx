export interface BookingData {
  id: number;
  name: string;
  userEmail: string | null;
  imageUrl: string | null;
  date: string;
  enddate: string | null;
  allDay: boolean | null;
  location: number;
}

export interface Booking {
  userEmail: string;
  startDate: Date;
  endDate?: Date;
  allDay?: boolean;
  location: number;
  guests: boolean;
}