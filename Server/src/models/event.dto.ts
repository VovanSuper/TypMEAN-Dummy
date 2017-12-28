export class EventDto {
  readonly id?: number | string;
  readonly name: string;
  readonly place: string;
  readonly description: string;
  startDate: string;
  endDate: string;
  createdAt?: string;
  createdBy?: string;
  participants?: number[] | string[] | string | null;
}