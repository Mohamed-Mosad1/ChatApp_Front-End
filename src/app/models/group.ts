export interface IGroup {
  name: string;
  connections: IConnection[];
}

export interface IConnection {
  connectionId: string;
  userName: string;
}
