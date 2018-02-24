export class EventDto {
  name: string;
  place: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt?: string;
  createdBy?: string;
  participants?: string[] | string | null;
}