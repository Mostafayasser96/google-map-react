export interface ZoneData{
  name: string;
  nameRequired: string;
  color: string;
  colorRequired: string
}
export interface Path{
  lat: string;
  lng: string;
  id: string;
}
export interface ServerPoly{
  color: string;
  label: string;
  points: Path[];
  _id?: string;
}