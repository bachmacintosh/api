import type { Timestamp as TomorrowTimestamp } from "./index";

export interface TomorrowInterval {
  startTime: TomorrowTimestamp;
  values: {
    temperature: number;
  };
}

export interface TomorrowTimeline {
  endTime: TomorrowTimestamp;
  intervals: TomorrowInterval[];
  startTime: TomorrowTimestamp;
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
    timelines: TomorrowTimeline[];
  };
}

export type TomorrowTime =
  | TomorrowTimestamp
  | "now"
  | `nowMinus${number}${"d" | "h" | "m"}`
  | `nowPlus${number}${"d" | "h" | "m"}`;
