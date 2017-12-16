/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var FB: any;

declare let app: {
  ENV: string,
  API_HOST: string,
  API_PORT: number
}
