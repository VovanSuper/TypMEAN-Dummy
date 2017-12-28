export class FbUserDto {
  readonly fb_token?: string;
  fb_id: string | number | null;
  fb_name?: string | null;
  fb_email?: string | null;
}