export * from "./sheets";

export interface SheetStatus {
  doesExist: boolean;
  hasData: boolean;
  headerValues: string[];
  neededColumns: number;
  neededRows: number;
  sheetId: number;
  title: string;
}
