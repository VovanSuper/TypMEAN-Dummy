export class EventDto {
  readonly id?: number | string;
  readonly name: string;
  readonly place: string;
  startDate: string;
  endDate: string;
  participants?: number[] | string[] | string | null;
}