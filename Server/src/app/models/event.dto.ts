export class EventDto {
  readonly id?: number | string;
  readonly name: string;
  readonly place: string;
  startTime: string;
  endTime: string;
  date: string;
  createdAt: string;
  createdBy?: string;
  participants?: number[] | string[]

}