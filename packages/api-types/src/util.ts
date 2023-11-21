// eslint-disable-next-line @typescript-eslint/naming-convention -- Type Branding Best Practice
export type Brand<T, U extends string> = T & { __brand: U };

export type RequireAtLeastOne<T extends object, Keys extends keyof T = keyof T> = {
  [K in Keys]-?: Partial<Pick<T, Exclude<Keys, K>>> & Required<Pick<T, K>>;
}[Keys] &
  Pick<T, Exclude<keyof T, Keys>>;
