import type {
  CellData,
  DimensionRange,
  Env,
  GetCloudflareAnalyticsQuery,
  Request,
  SheetStatus,
  Spreadsheet,
  ValueRange,
} from "../../../types";
import CloudflareAnalytics from "../../../cloudflare/CloudflareAnalytics";
import GoogleSheets from "../../../google/GoogleSheets";

async function appendSheetsWithQueryData(
  env: Env,
  sheets: GoogleSheets,
  query: GetCloudflareAnalyticsQuery,
): Promise<void> {
  if (Array.isArray(query.viewer?.accounts)) {
    const TEN = 10;
    const ONE_THOUSAND_MICROSECONDS_PER_MILLISECOND = 1000;
    for (const account of query.viewer.accounts) {
      if (account.r2OperationsAdaptiveGroups.length > 0) {
        const valueRange: ValueRange = {
          values: [],
        };
        for (const group of account.r2OperationsAdaptiveGroups) {
          if (group.dimensions !== null && group.sum !== null) {
            const { date, bucketName, actionType } = group.dimensions;
            const { requests } = group.sum;
            valueRange.values?.push([date, bucketName === "" ? "(none)" : bucketName, actionType, requests]);
          }
        }

        if (Array.isArray(valueRange.values) && valueRange.values.length > 0) {
          // eslint-disable-next-line no-await-in-loop -- Must be in order
          await sheets.appendValues({
            spreadsheetId: env.GOOGLE_SPREADSHEET_ID_ANALYTICS,
            range: "'R2 Operations'!A2",
            body: valueRange,
            valueInputOption: "USER_ENTERED",
          });
        }
      }
      if (account.r2StorageAdaptiveGroups.length > 0) {
        const valueRange: ValueRange = {
          values: [],
        };
        for (const group of account.r2StorageAdaptiveGroups) {
          if (group.dimensions !== null && group.max !== null) {
            const { date, bucketName } = group.dimensions;
            const { objectCount, metadataSize, payloadSize, uploadCount } = group.max;
            valueRange.values?.push([date, bucketName, objectCount, metadataSize, payloadSize, uploadCount]);
          }
        }
        if (Array.isArray(valueRange.values) && valueRange.values.length > 0) {
          // eslint-disable-next-line no-await-in-loop -- Must be in order
          await sheets.appendValues({
            spreadsheetId: env.GOOGLE_SPREADSHEET_ID_ANALYTICS,
            range: "'R2 Storage'!A2",
            body: valueRange,
            valueInputOption: "USER_ENTERED",
          });
        }
      }
      if (account.workersInvocationsScheduled.length > 0) {
        const valueRange: ValueRange = {
          values: [],
        };
        for (const invocation of account.workersInvocationsAdaptive) {
          if (
            invocation.dimensions !== null &&
            invocation.max !== null &&
            invocation.min !== null &&
            invocation.quantiles !== null &&
            invocation.sum !== null
          ) {
            const { date, scriptName } = invocation.dimensions;
            const cpuTimeMin =
              Math.round(TEN * (invocation.min.cpuTime / ONE_THOUSAND_MICROSECONDS_PER_MILLISECOND)) / TEN;
            const cpuTimeMax =
              Math.round(TEN * (invocation.max.cpuTime / ONE_THOUSAND_MICROSECONDS_PER_MILLISECOND)) / TEN;
            const cpuTimeP25 =
              Math.round(TEN * (invocation.quantiles.cpuTimeP25 / ONE_THOUSAND_MICROSECONDS_PER_MILLISECOND)) / TEN;
            const cpuTimeP50 =
              Math.round(TEN * (invocation.quantiles.cpuTimeP50 / ONE_THOUSAND_MICROSECONDS_PER_MILLISECOND)) / TEN;
            const cpuTimeP75 =
              Math.round(TEN * (invocation.quantiles.cpuTimeP75 / ONE_THOUSAND_MICROSECONDS_PER_MILLISECOND)) / TEN;
            const cpuTimeP90 =
              Math.round(TEN * (invocation.quantiles.cpuTimeP90 / ONE_THOUSAND_MICROSECONDS_PER_MILLISECOND)) / TEN;
            const cpuTimeP99 =
              Math.round(TEN * (invocation.quantiles.cpuTimeP99 / ONE_THOUSAND_MICROSECONDS_PER_MILLISECOND)) / TEN;
            const cpuTimeP999 =
              Math.round(TEN * (invocation.quantiles.cpuTimeP999 / ONE_THOUSAND_MICROSECONDS_PER_MILLISECOND)) / TEN;
            const { requests } = invocation.sum;
            valueRange.values?.push([
              date,
              scriptName,
              requests,
              cpuTimeMin,
              cpuTimeMax,
              cpuTimeP25,
              cpuTimeP50,
              cpuTimeP75,
              cpuTimeP90,
              cpuTimeP99,
              cpuTimeP999,
            ]);
          }
        }
        if (Array.isArray(valueRange.values) && valueRange.values.length > 0) {
          // eslint-disable-next-line no-await-in-loop -- Must be in order
          await sheets.appendValues({
            spreadsheetId: env.GOOGLE_SPREADSHEET_ID_ANALYTICS,
            range: "'Workers Invocations'!A2",
            body: valueRange,
            valueInputOption: "USER_ENTERED",
          });
        }
      }
      if (account.workersInvocationsAdaptive.length > 0) {
        const valueRange: ValueRange = {
          values: [],
        };
        const dateOptions: Intl.DateTimeFormatOptions = {
          timeZone: "America/New_York",
        };
        for (const invocation of account.workersInvocationsScheduled) {
          const runDateLocaleString = new Date(invocation.datetime).toLocaleString("en-US", dateOptions);
          const runDate = new Date(runDateLocaleString);
          let insertedRunDate = `${
            runDate.getMonth() + 1
          }/${runDate.getDate()}/${runDate.getFullYear()} ${runDate.getHours()}:`;
          if (runDate.getMinutes() < TEN) {
            insertedRunDate += `0${runDate.getMinutes()}:`;
          } else {
            insertedRunDate += `${runDate.getMinutes()}:`;
          }
          if (runDate.getSeconds() < TEN) {
            insertedRunDate += `0${runDate.getSeconds()}`;
          } else {
            insertedRunDate += runDate.getSeconds();
          }

          const scheduledDateLocaleString = new Date(invocation.scheduledDatetime).toLocaleString("en-US", dateOptions);
          const scheduledDate = new Date(scheduledDateLocaleString);
          let insertedScheduledDate = `${
            scheduledDate.getMonth() + 1
          }/${scheduledDate.getDate()}/${scheduledDate.getFullYear()} ${scheduledDate.getHours()}:`;
          if (scheduledDate.getMinutes() < TEN) {
            insertedScheduledDate += `0${scheduledDate.getMinutes()}:`;
          } else {
            insertedScheduledDate += `${scheduledDate.getMinutes()}:`;
          }
          if (scheduledDate.getSeconds() < TEN) {
            insertedScheduledDate += `0${scheduledDate.getSeconds()}`;
          } else {
            insertedScheduledDate += scheduledDate.getSeconds();
          }

          const cpuTimeMs = Math.round(TEN * (invocation.cpuTimeUs / ONE_THOUSAND_MICROSECONDS_PER_MILLISECOND)) / TEN;

          const { scriptName, status, cron } = invocation;
          valueRange.values?.push([insertedRunDate, scriptName, insertedScheduledDate, status, cpuTimeMs, cron]);
        }
        if (Array.isArray(valueRange.values) && valueRange.values.length > 0) {
          // eslint-disable-next-line no-await-in-loop -- Must be in order
          await sheets.appendValues({
            spreadsheetId: env.GOOGLE_SPREADSHEET_ID_ANALYTICS,
            range: "'Workers Cron'!A2",
            body: valueRange,
            valueInputOption: "USER_ENTERED",
          });
        }
      }
    }
  }
}

function buildBatchUpdateSpreadsheetRequests(sheetStatus: SheetStatus[]): Request[] {
  const requests: Request[] = [];
  for (const status of sheetStatus) {
    if (!status.doesExist) {
      requests.push({
        addSheet: {
          properties: {
            title: status.title,
            sheetId: status.sheetId,
            gridProperties: {
              frozenRowCount: 1,
              rowCount: status.neededRows,
              columnCount: status.neededColumns,
            },
          },
        },
      });
      const values: CellData[] = [];
      for (const value of status.headerValues) {
        values.push({
          userEnteredValue: {
            stringValue: value,
          },
          userEnteredFormat: {
            textFormat: {
              bold: true,
            },
          },
        });
      }
      requests.push({
        updateCells: {
          fields: "userEnteredValue,userEnteredFormat",
          rows: [
            {
              values,
            },
          ],
          start: {
            sheetId: status.sheetId,
            rowIndex: 0,
            columnIndex: 0,
          },
        },
      });
    } else if (!status.hasData) {
      requests.push({
        updateSheetProperties: {
          fields: "title, gridProperties(frozenRowCount, rowCount, columnCount)",
          properties: {
            title: status.title,
            sheetId: status.sheetId,
            gridProperties: {
              frozenRowCount: 1,
              rowCount: status.neededRows,
              columnCount: status.neededColumns,
            },
          },
        },
      });
      const values: CellData[] = [];
      for (const value of status.headerValues) {
        values.push({
          userEnteredValue: {
            stringValue: value,
          },
          userEnteredFormat: {
            textFormat: {
              bold: true,
            },
          },
        });
      }
      requests.push({
        updateCells: {
          fields: "userEnteredValue,userEnteredFormat",
          rows: [
            {
              values,
            },
          ],
          start: {
            sheetId: status.sheetId,
            rowIndex: 0,
            columnIndex: 0,
          },
        },
      });
    }
  }
  return requests;
}

function checkIfSheetsExist(sheetStatus: SheetStatus[], spreadsheet: Spreadsheet): void {
  sheetStatus.forEach((status) => {
    if (Array.isArray(spreadsheet.sheets)) {
      status.doesExist = spreadsheet.sheets.some((sheet) => {
        return (
          typeof sheet.properties?.title === "string" &&
          sheet.properties.title === status.title &&
          typeof sheet.properties.sheetId === "number" &&
          sheet.properties.sheetId === status.sheetId
        );
      });
    }
  });
}

async function checkIfSheetsHaveData(env: Env, sheetStatus: SheetStatus[], sheets: GoogleSheets): Promise<void> {
  const TWO = 2;
  const rangeMap = new Map<string, number>();
  for (const status of sheetStatus) {
    if (status.doesExist) {
      // Add  the first and second row of any sheets that do exist to the stack of ranges we'll be batchGetting.
      let rangeTitle = status.title;
      // Google doesn't need the single quotes for input, but we need to set them to match Google's returned ranges.
      if (status.title.includes(" ")) {
        rangeTitle = `'${status.title}'`;
      }

      /* Store the calculated Google Sheets A1 Range and the Sheet Status Array Index so we can safely work with them
       later, cause the array of ValueRanges may not match our SheetStatuses. */
      rangeMap.set(`${rangeTitle}!A1:${toA1Notation(TWO, status.neededColumns)}`, sheetStatus.indexOf(status));
    } else {
      // Any that don't exist obviously have no data.
      status.hasData = false;
    }
  }
  if (rangeMap.size) {
    const ranges = [...rangeMap.keys()];
    const values = await sheets.batchGetValues({
      spreadsheetId: env.GOOGLE_SPREADSHEET_ID_ANALYTICS,
      ranges,
      majorDimension: "ROWS",
    });
    if (Array.isArray(values.valueRanges)) {
      // At least one range was returned, so we'll check their content.
      for (const valueRange of values.valueRanges) {
        if (typeof valueRange.range !== "string") {
          throw new Error("Unexpected Missing Range String");
        }
        // Grab the stored array index that matches the range we're on.
        const statusIndex = rangeMap.get(valueRange.range);
        if (typeof statusIndex === "undefined") {
          throw new Error(`Range ${valueRange.range} doesn't match any known ranges.`);
        }
        if (Array.isArray(valueRange.values) && valueRange.values.length >= TWO) {
          // We have an array of arrays that we can check
          if (valueRange.values[0].length === sheetStatus[statusIndex].neededColumns) {
            // We have the correct number of columns in the header row
            let unfilledColumns = 0;
            const headerRow = valueRange.values[0];
            const firstRow = valueRange.values[1];
            for (const value of headerRow) {
              if (typeof value === "undefined" || value === null || value === "") {
                unfilledColumns += 1;
              }
            }
            for (const value of firstRow) {
              if (typeof value === "undefined" || value === null || value === "") {
                unfilledColumns += 1;
              }
            }
            if (unfilledColumns) {
              // We found missing columns in the header or first row, so there's incorrect or no data in the sheet.
              sheetStatus[statusIndex].hasData = false;
            }
          } else {
            // We don't have the correct header row, so there's either incorrect or no data in the sheet.
            sheetStatus[statusIndex].hasData = false;
          }
        } else {
          // We ran into an edge case that lacks an array of arrays for the values, so sheet has no data.
          sheetStatus[statusIndex].hasData = false;
        }
      }
    } else {
      // No ranges were returned, so none of the sheets have data.
      for (const status of sheetStatus) {
        status.hasData = false;
      }
    }
  }
}

async function clearExistingSheetsWithoutData(
  env: Env,
  sheetStatus: SheetStatus[],
  sheets: GoogleSheets,
): Promise<void> {
  const ranges: string[] = [];
  for (const status of sheetStatus) {
    let sheetTitle = status.title;
    if (status.title.includes(" ")) {
      sheetTitle = `'${status.title}'`;
    }
    if (status.doesExist && !status.hasData) {
      ranges.push(sheetTitle);
    }
  }
  if (ranges.length) {
    await sheets.batchClearValues({
      spreadsheetId: env.GOOGLE_SPREADSHEET_ID_ANALYTICS,
      body: { ranges },
    });
  }
}

async function deleteOldRows(env: Env, sheetStatus: SheetStatus[], sheets: GoogleSheets): Promise<void> {
  const TWO = 2;
  const batchGetRanges: string[] = [];
  const clearRanges: string[] = [];
  const deleteRequests: Request[] = [];
  const dateOptions: Intl.DateTimeFormatOptions = {
    timeZone: "America/New_York",
  };
  const currentDateString = new Date().toLocaleString("en-US", dateOptions);
  const currentDate = new Date(currentDateString);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  for (const status of sheetStatus) {
    batchGetRanges.push(`${status.title}!A2:A`);
  }
  const batchGetResponse = await sheets.batchGetValues({
    spreadsheetId: env.GOOGLE_SPREADSHEET_ID_ANALYTICS,
    ranges: batchGetRanges,
  });
  if (Array.isArray(batchGetResponse.valueRanges)) {
    for (const valueRange of batchGetResponse.valueRanges) {
      const statusIndex = batchGetResponse.valueRanges.indexOf(valueRange);
      if (Array.isArray(valueRange.values) && valueRange.values.length > 0) {
        const dimensions: DimensionRange = {
          sheetId: sheetStatus[statusIndex].sheetId,
          dimension: "ROWS",
        };
        let currentRow = 2;
        let hasMoreRowsBelow = false;
        for (const value of valueRange.values) {
          if (typeof value[0] === "string" && value[0]) {
            const testDate = new Date(value[0]);
            if (!isNaN(testDate.getTime())) {
              const testYear = testDate.getFullYear();
              const testMonth = testDate.getMonth();
              const testDay = testDate.getDate();
              if (
                currentYear - testYear >= TWO ||
                (currentYear - testYear === 1 && currentMonth > testMonth) ||
                (currentYear - testYear === 1 && currentMonth === testMonth && currentDay > testDay)
              ) {
                if (typeof dimensions.startIndex === "number" && typeof dimensions.endIndex === "number") {
                  dimensions.endIndex += 1;
                } else {
                  dimensions.startIndex = currentRow - 1;
                  dimensions.endIndex = currentRow;
                }
              } else {
                hasMoreRowsBelow = true;
                break;
              }
            }
          }
          currentRow += 1;
        }
        if (typeof dimensions.startIndex === "number" && typeof dimensions.endIndex === "number") {
          if (!hasMoreRowsBelow) {
            dimensions.startIndex += 1;
            clearRanges.push(
              `${sheetStatus[statusIndex].title}!A2:${toA1Notation(TWO, sheetStatus[statusIndex].neededColumns)}`,
            );
          }
          if (dimensions.endIndex > dimensions.startIndex) {
            deleteRequests.push({
              deleteDimension: {
                range: dimensions,
              },
            });
          }
        }
      }
    }
    if (deleteRequests.length) {
      await sheets.batchUpdateSpreadsheet({
        spreadsheetId: env.GOOGLE_SPREADSHEET_ID_ANALYTICS,
        body: { requests: deleteRequests },
      });
    }
    if (clearRanges.length) {
      await sheets.batchClearValues({
        spreadsheetId: env.GOOGLE_SPREADSHEET_ID_ANALYTICS,
        body: { ranges: clearRanges },
      });
    }
  }
}

async function normalizeSpreadsheet(env: Env, sheetStatus: SheetStatus[], sheets: GoogleSheets): Promise<void> {
  const spreadsheet = await sheets.getSpreadsheet({ spreadsheetId: env.GOOGLE_SPREADSHEET_ID_ANALYTICS });

  checkIfSheetsExist(sheetStatus, spreadsheet);
  await checkIfSheetsHaveData(env, sheetStatus, sheets);
  await clearExistingSheetsWithoutData(env, sheetStatus, sheets);
  const requests = buildBatchUpdateSpreadsheetRequests(sheetStatus);
  await sheets.batchUpdateSpreadsheet({ spreadsheetId: env.GOOGLE_SPREADSHEET_ID_ANALYTICS, body: { requests } });
}

function toA1Notation(row: number, column: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let columnRef = "";
  column -= 1;

  if (column < 1) {
    columnRef = chars[0];
  } else {
    const ALPHABET_LENGTH = 26;
    const BASE_26 = column.toString(ALPHABET_LENGTH);
    const digits = BASE_26.split("");
    columnRef = digits
      .map((digit, idx) => {
        return chars[parseInt(digit, ALPHABET_LENGTH) - (idx === digits.length - 1 ? 0 : 1)];
      })
      .join("");
  }
  return `${columnRef}${Math.max(row, 1)}`;
}

export default async function updateCloudflareAnalyticsSpreadsheet(env: Env): Promise<void> {
  const sheetStatus: SheetStatus[] = [
    {
      doesExist: true,
      hasData: true,
      headerValues: ["Date", "Bucket Name", "Action Type", "Requests"],
      neededColumns: 4,
      neededRows: 2,
      sheetId: 100,
      title: "R2 Operations",
    },
    {
      doesExist: true,
      hasData: true,
      headerValues: ["Date", "Bucket Name", "Object Count", "Metadata Size", "Payload Size", "Open Multipart Uploads"],
      neededColumns: 6,
      neededRows: 2,
      sheetId: 101,
      title: "R2 Storage",
    },
    {
      doesExist: true,
      hasData: true,
      headerValues: ["Run Time", "Worker", "Sched. Time", "Status", "CPU Time", "Crontab"],
      neededColumns: 6,
      neededRows: 2,
      sheetId: 102,
      title: "Workers Cron",
    },
    {
      doesExist: true,
      hasData: true,
      headerValues: [
        "Date",
        "Worker",
        "Requests",
        "CPU Min",
        "CPU Max",
        "CPU P25",
        "CPU P50",
        "CPU P75",
        "CPU P90",
        "CPU P99",
        "CPU P999",
      ],
      neededColumns: 11,
      neededRows: 2,
      sheetId: 103,
      title: "Workers Invocations",
    },
  ] as const;

  const analytics = new CloudflareAnalytics(env);
  const sheets = new GoogleSheets(env);

  const TEN = 10;
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  let startDate = `${yesterday.getFullYear()}-`;
  if (yesterday.getMonth() + 1 < TEN) {
    startDate += `0${yesterday.getMonth() + 1}-`;
  } else {
    startDate += `${yesterday.getMonth() + 1}-`;
  }
  if (yesterday.getDate() < TEN) {
    startDate += `0${yesterday.getDate()}`;
  } else {
    startDate += `${yesterday.getDate()}`;
  }
  const endDate = startDate;
  const startTime = `${startDate}T00:00:00.000Z`;
  const endTime = `${startDate}T23:59:59.999Z`;
  const accountTag = env.CLOUDFLARE_ACCOUNT_TAG;
  const query = await analytics.get({ accountTag, startDate, endDate, startTime, endTime });

  await normalizeSpreadsheet(env, sheetStatus, sheets);
  await deleteOldRows(env, sheetStatus, sheets);
  await appendSheetsWithQueryData(env, sheets, query);
}
