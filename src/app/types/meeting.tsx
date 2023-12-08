export interface BookingData {
  id: number;
  name: string;
  imageUrl: string | null;
  date: string;
  enddate: string | null;
  allDay: boolean | null;
  location: string;
}
