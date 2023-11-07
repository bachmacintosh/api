import type { Timestamp } from "./index";

export interface Interval {
  startTime: Timestamp;
  values: {
    temperature: number;
  };
}

export interface Timeline {
  endTime: Timestamp;
  intervals: Interval[];
  startTime: Timestamp;
  timestep: Timestep;
}

export const timesteps = ["1d", "1h", "current"] as const;
export type Timestep = (typeof timesteps)[number];
export function isTimestep(value: unknown): value is Timestep {
  return typeof value === "string" && timesteps.includes(value as Timestep);
}

export const tomorrowFields = ["temperature"] as const;
export type TomorrowField = (typeof tomorrowFields)[number];

export type TomorrowLocation =
  | string
  | { coordinates: [number, number, ...number[]]; type: "LineString" }
  | { coordinates: [number, number, number, number, ...number[]]; type: "Polygon" }
  | { coordinates: [number, number]; type: "Point" }
  | [number, number];

export interface TomorrowRequest {
  fields: [TomorrowField, ...TomorrowField[]];
  location: TomorrowLocation;
  timesteps: [Timestep, ...Timestep[]];
  units: "imperial" | "metric";
  endTime?: TomorrowTime;
  startTime?: TomorrowTime;
  timezone?: "Amnerica/New_York" | "auto" | "UTC";
}

export interface TomorrowResponse {
  data: {
    timelines: Timeline[];
  };
}

export type TomorrowTime =
  | Timestamp
  | "now"
  | `nowMinus${number}${"d" | "h" | "m"}`
  | `nowPlus${number}${"d" | "h" | "m"}`;
