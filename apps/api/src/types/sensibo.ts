/*
  Update these values to fit your device's parameters.
  https://home.sensibo.com/api/v2/pods/<POD_ID>/?apiKey=<YOUR_API_KEY>&fields=remoteCapabilities
*/
export const acFanLevels = ["auto", "high", "low", "medium", "quiet", "strong"] as const;
export type AcFanLevel = (typeof acFanLevels)[number];
export function isFanLevel(value: unknown): value is AcFanLevel {
  return typeof value === "string" && acFanLevels.includes(value as AcFanLevel);
}

export const acLightModes = ["off", "on"] as const;
export type AcLightMode = (typeof acLightModes)[number];
export function isAcLightMode(value: unknown): value is AcLightMode {
  return typeof value === "string" && acLightModes.includes(value as AcLightMode);
}

export const acModes = ["auto", "cool", "dry", "fan", "heat"] as const;
export type AcMode = (typeof acModes)[number];
export function isAcMode(value: unknown): value is AcMode {
  return typeof value === "string" && acModes.includes(value as AcMode);
}

export const acSwingModes = ["rangeFull", "stopped"] as const;
export type AcSwingMode = (typeof acSwingModes)[number];
export function isAcSwingMode(value: unknown): value is AcSwingMode {
  return typeof value === "string" && acSwingModes.includes(value as AcSwingMode);
}

/*
  End Customization
*/

export const sensiboBaseUrl = "https://home.sensibo.com/api/v2";

export interface AcState {
  fanLevel: AcFanLevel;
  light: AcLightMode;
  mode: AcMode;
  on: boolean;
  swing: AcSwingMode;
  targetTemperature: number;
  temperatureUnit: TemperatureUnit;
}

export interface ConnectionStatus {
  isAlive: boolean;
  lastSeen: SensiboTimestamp;
}

export interface Location {
  address: string[];
  country: string | null;
  countryAlpha2: string;
  createTime: SensiboTimestamp;
  features: unknown[];
  geofenceTriggerRadius: number;
  id: string;
  latLon: [number, number];
  name: string;
  shareAnalytics: boolean;
  subscription: object | null;
  technician: object | null;
  updateTime: SensiboTimestamp;
}

export interface Measurements {
  feelsLike: number;
  humidity: number;
  rssi: number;
  temperature: number;
  time: SensiboTimestamp;
}

export interface RemoteCapability {
  fanLevels: AcFanLevel[];
  light: AcLightMode[];
  swing: AcSwingMode[];
  temperatures: Record<TemperatureUnit, TemperatureRange>;
}

export interface SensiboConfig {
  cutoffHour: number;
}

export interface SensiboPod {
  acState: AcState & { timestamp: SensiboTimestamp };
  connectionStatus: ConnectionStatus;
  id: string;
  location: Location;
  measurements: Measurements;
  remoteCapabilites: {
    modes: Record<AcMode, RemoteCapability>;
  };
  room: SensiboRoom;
  schedules: SensiboSchedule | null;
  smartMode: SmartMode | null;
  status: string;
  temperatureUnit: TemperatureUnit;
  timer: SensiboTimer | null;
}

export interface SensiboAcStateRequest {
  acState: Partial<AcState>;
}

export interface SensiboPodCollectionResponse {
  result: SensiboPod[];
  status: "error" | "success";
}

export type SensiboPodResponse =
  | {
      result: null;
      status: "error";
    }
  | {
      result: SensiboPod;
      status: "success";
    };

export interface SensiboRoom {
  icon: string;
  name: string;
  pureBoostConfig: null;
  uid: string;
}

export interface SensiboSchedule {
  acState: AcState;
  causedBy: SensiboUser;
  createTime: string;
  createTimeSecondsAgo: number;
  id: string;
  isEnabled: boolean;
  name: string | null;
  nextTime: string;
  nextTimeSecondsFromNow: number;
  podUid: string;
  recurringDays: ("Friday" | "Monday" | "Saturday" | "Sunday" | "Thursday" | "Tuesday" | "Wednesday")[];
  targetTimeLocal: string;
  timezone: string;
}

export interface SensiboTimer {
  acState: AcState;
  causedBy: SensiboUser;
  createTime: string;
  createTimeSecondsAgo: number;
  id: string;
  isEnabled: boolean;
  targetTime: string;
  targetTimeSecondsFromNow: number;
}

export interface SensiboTimestamp {
  secondsAgo: number;
  time: string;
}

export interface SensiboUser {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface SmartMode {
  deviceUid: string;
  enabled: boolean;
  highTemperatureState: AcState;
  highTemperatureThreshold: number;
  highTemperatureWebhook: string | null;
  lowTemperatureState: AcState;
  lowTemperatureThreshold: number;
  lowTemperatureWebhook: string | null;
  sync_with_ac_power: boolean;
  type: "feelsLike" | "humidity" | "temperature";
}

export interface TemperatureRange {
  isNative: boolean;
  values: number[];
}

export const temperatureUnits = ["C", "F"] as const;
export type TemperatureUnit = (typeof temperatureUnits)[number];
export function isTemperatureUnit(value: unknown): value is TemperatureUnit {
  return typeof value === "string" && temperatureUnits.includes(value as TemperatureUnit);
}
