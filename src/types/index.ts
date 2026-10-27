export type CustomerLocation = {
  state: string;
  stateCode: string;
  cities: string[];
};

/** Optional map pin. Leave empty until real coordinates are confirmed. */
export type CityMarker = {
  city: string;
  stateCode: string;
  /** Horizontal position inside the Brazil map viewBox. */
  x: number;
  /** Vertical position inside the Brazil map viewBox. */
  y: number;
};
