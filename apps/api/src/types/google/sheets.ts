import type { sheets_v4 } from "@googleapis/sheets";

// BEGIN OUR OWN GOOGLE SHEETS TYPES

type Explode<T> = keyof T extends infer K
  ? K extends unknown
    ? { [I in keyof T]: I extends K ? T[I] : never }
    : never
  : never;
type AtMostOneOf<T> = Explode<Partial<T>>;
type AtLeastOneOf<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];
type ExactlyOneOf<T> = AtLeastOneOf<T> & AtMostOneOf<T>;

// 1. spreadsheets

// 1.1 Overview

// 1.1.1. Spreadsheets

// 1.1.2. Sheets

// 1.1.3. Cells

// 1.1.4. Pivot Tables

// 1.1.5. Charts

// TODO: EmbeddedChart

// TODO: ChartSpec

/** Position settings for text. */
interface TextPosition {
  /** Horizontal alignment setting for the piece of text. */
  horizontalAlignment: HorizontalAlign;
}

/** Properties of a data source chart. */
interface DataSourceChartProperties {
  /** ID of the data source that the chart is associated with. */
  dataSourceId: string;
  /** Output only. The data execution status. */
  dataExecutionStatus?: DataExecutionStatus;
}

// TODO: BasicChartSpec

/** How the chart should be visualized. */
enum BasicChartType {
  /** An area chart. */
  Area = "AREA",
  /** A bar chart. */
  Bar = "BAR",
  /** A column chart. */
  Column = "COLUMN",
  /** A combo chart. */
  Combo = "COMBO",
  /** A line chart. */
  Line = "LINE",
  /** A scatter chart. */
  Scatter = "SCATTER",
  /** A stepped area chart. */
  SteppedArea = "STEPPED_AREA",
  /** Default value, do not use. */
  Unspecified = "BASIC_CHART_TYPE_UNSPECIFIED",
}

/** Where the legend of the chart should be positioned. */
enum BasicChartLegendPosition {
  /** The legend is rendered on the bottom of the chart. */
  BottomLegend = "BOTTOM_LEGEND",
  /** The legend is rendered on the left of the chart. */
  LeftLegend = "LEFT_LEGEND",
  /** No legend is rendered. */
  NoLegend = "NO_LEGEND",
  /** The legend is rendered on the right of the chart. */
  RightLegend = "RIGHT_LEGEND",
  /** The legend is rendered on the top of the chart. */
  TopLegend = "TOP_LEGEND",
  /** Default value, do not use. */
  Unspecified = "BASIC_CHART_LEGEND_POSITION_UNSPECIFIED",
}

// TODO: BasicChartAxis

/** The position of a chart axis. */
enum BasicChartAxisPosition {
  /**
   * The axis rendered at the bottom of a chart. For most charts, this is the standard major axis. For bar charts, this
   * is a minor axis.
   */
  BottomAxis = "BOTTOM_AXIS",
  /**
   * The axis rendered at the left of a chart. For most charts, this is a minor axis. For bar charts, this is the
   * standard major axis.
   */
  LeftAxis = "LEFT_AXIS",
  /**
   * The axis rendered at the right of a chart. For most charts, this is a minor axis. For bar charts, this is an
   * unusual major axis.
   */
  RightAxis = "RIGHT_AXIS",
  /** Default value, do not use. */
  Unspecified = "BASIC_CHART_AXIS_POSITION_UNSPECIFIED",
}

/** The options that define a "view window" for a chart (such as the visible values in an axis). */
interface ChartAxisViewWindowOptions {
  /** The view window's mode. */
  viewWindowMode: ViewWindowMode;
  /**
   * The maximum numeric value to be shown in this view window. If unset, will automatically determine a maximum value
   * that looks good for the data.
   */
  viewWindowMax?: number;
  /**
   * The minimum numeric value to be shown in this view window. If unset, will automatically determine a minimum value
   * that looks good for the data.
   */
  viewWindowMin?: number;
}

/** The view window's mode. It defines how to treat the min and max of the view window. */
enum ViewWindowMode {
  /**
   * The default view window mode used in the Sheets editor for this chart type. In most cases, if set, the default mode
   * is equivalent to PRETTY.
   */
  Default = "DEFAULT_VIEW_WINDOW_MODE",
  /** Follows the min and max exactly if specified. If a value is unspecified, it will fall back to the PRETTY value. */
  Explicit = "EXPLICIT",
  /** Chooses a min and max that make the chart look good. Both min and max are ignored in this mode. */
  Pretty = "PRETTY",
  /** Do not use. Represents that the currently set mode is not supported by the API. */
  Unsupported = "VIEW_WINDOW_MODE_UNSUPPORTED",
}

/** The domain of a chart. For example, if charting stock prices over time, this would be the date. */
interface BasicChartDomain {
  /**
   * The data of the domain. For example, if charting stock prices over time, this is the data representing the dates.
   */
  domain: ChartData;
  /** True to reverse the order of the domain values (horizontal axis). */
  reversed: boolean;
}

/** The data included in a domain or series. */
type ChartData = ExactlyOneOf<{
  /** The reference to the data source column that the data reads from. */
  columnReference: DataSourceColumnReference;
  /** The source ranges of the data. */
  sourceRange: ChartSourceRange;
}> & {
  /** The aggregation type for the series of a data source chart. Only supported for data source charts. */
  aggregateType?: ChartAggregateType;
  /**
   * The rule to group the data by if the ChartData backs the domain of a data source chart. Only supported for data
   * source charts.
   */
  groupRule?: ChartGroupRule;
};

/** Source ranges for a chart. */
interface ChartSourceRange {
  /**
   * The ranges of data for a series or domain. Exactly one dimension must have a length of 1, and all sources in the
   * list must have the same dimension with length 1. The domain (if it exists) & all series must have the same number
   * of source ranges. If using more than one source range, then the source range at a given offset must be in order and
   * contiguous across the domain and series.
   *
   * For example, these are valid configurations:
   *
   * ```plaintext
   * domain sources: A1:A5
   * series1 sources: B1:B5
   * series2 sources: D6:D10
   *
   * domain sources: A1:A5, C10:C12
   * series1 sources: B1:B5, D10:D12
   * series2 sources: C1:C5, E10:E12
   * ```
   */
  sources: GridRange[];
}

/**
 * An optional setting on the ChartData of the domain of a data source chart that defines buckets for the values in the
 * domain rather than breaking out each individual value.
 *
 * For example, when plotting a data source chart, you can specify a histogram rule on the domain (it should only
 * contain numeric values), grouping its values into buckets. Any values of a chart series that fall into the same
 * bucket are aggregated based on the aggregateType.
 */
type ChartGroupRule = ExactlyOneOf<{
  /** A ChartDateTimeRule. */
  dateTimeRule: ChartDateTimeRule;
  /** A ChartHistogramRule */
  histogramRule: ChartHistogramRule;
}>;

/**
 * Allows you to organize the date-time values in a source data column into buckets based on selected parts of their
 * date or time values.
 */
interface ChartDateTimeRule {
  /** The type of date-time grouping to apply. */
  type: ChartDateTimeRuleType;
}

/** The available types of date-time grouping rules. */
enum ChartDateTimeRuleType {
  /** Group dates by day and month, for example 22-Nov. The month is translated based on the spreadsheet locale. */
  DayMonth = "DAY_MONTH",
  /** Group dates by day of month, from 1 to 31. */
  DayOfMonth = "DAY_OF_MONTH",
  /**
   * Group dates by day of week, for example Sunday. The days of the week will be translated based on the spreadsheet
   * locale.
   */
  DayOfWeek = "DAY_OF_WEEK",
  /**
   * Group dates by day of year, from 1 to 366. Note that dates after Feb. 29 fall in different buckets in leap years
   * than in non-leap years.
   */
  DayOfYear = "DAY_OF_YEAR",
  /** Group dates by hour using a 24-hour system, from 0 to 23. */
  Hour = "HOUR",
  /** Group dates by hour and minute using a 24-hour system, for example 19:45. */
  HourMinute = "HOUR_MINUTE",
  /**
   * Group dates by hour and minute using a 12-hour system, for example 7:45 PM. The AM/PM designation is translated
   * based on the spreadsheet locale.
   */
  HourMinuteAMPM = "HOUR_MINUTE_AMPM",
  /** Group dates by minute, from 0 to 59. */
  Minute = "MINUTE",
  /** Group dates by month, for example Nov. The month is translated based on the spreadsheet locale. */
  Month = "MONTH",
  /** Group dates by quarter, for example Q1 (which represents Jan-Mar). */
  Quarter = "QUARTER",
  /** Group dates by second, from 0 to 59. */
  Second = "SECOND",
  /** The default type, do not use. */
  Unspecified = "CHART_DATE_TIME_RULE_TYPE_UNSPECIFIED",
  /** Group dates by year, for example 2008. */
  Year = "YEAR",
  /** Group dates by year and month, for example 2008-Nov. The month is translated based on the spreadsheet locale. */
  YearMonth = "YEAR_MONTH",
  /** Group dates by year, month, and day, for example 2008-11-22. */
  YearMonthDay = "YEAR_MONTH_DAY",
  /** Group dates by year and quarter, for example 2008 Q4. */
  YearQuarter = "YEAR_QUARTER",
}

/** Allows you to organize numeric values in a source data column into buckets of constant size. */
interface ChartHistogramRule {
  /** The size of the buckets that are created. Must be positive. */
  intervalSize: number;
  /**
   * The maximum value at which items are placed into buckets. Values greater than the maximum are grouped into a single
   * bucket. If omitted, it is determined by the maximum item value.
   */
  maxValue?: number;
  /**
   * The minimum value at which items are placed into buckets. Values that are less than the minimum are grouped into a
   * single bucket. If omitted, it is determined by the minimum item value.
   */
  minValue?: number;
}

/** The type of aggregation for chart series. */
enum ChartAggregateType {
  /** Average aggregate function. */
  Average = "AVERAGE",
  /** Count aggregate function. */
  Count = "COUNT",
  /** Maximum aggregate function. */
  Max = "MAX",
  /** Median aggregate function. */
  Median = "MEDIAN",
  /** Minimum aggregate function. */
  Min = "MIN",
  /** Sum aggregate function. */
  Sum = "SUM",
  /** Default value, do not use. */
  Unspecified = "CHART_AGGREGATE_TYPE_UNSPECIFIED",
}

// 1.1.6. Other

/**
 * Represents a color in the RGBA color space.
 */
interface Color {
  /**
   * The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the
   * equation:
   *
   * `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)`
   *
   * This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely
   * transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to
   * distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid
   * color (as if the alpha value had been explicitly given a value of 1.0).
   */
  alpha: number;
  /** The amount of blue in the color as a value in the interval [0, 1]. */
  blue: number;
  /** The amount of green in the color as a value in the interval [0, 1]. */
  green: number;
  /** The amount of red in the color as a value in the interval [0, 1]. */
  red: number;
}

/** A color value. */
type ColorStyle = ExactlyOneOf<{
  /** RGB color. The `alpha` value in the Color object isn't generally supported.  */
  rgbColor: Color;
  /** Theme color. */
  themeColor: ThemeColorType;
}>;

/**
 * Theme color types.
 *
 * SpreadsheetProperties contain a SpreadsheetTheme that defines a mapping of these theme color types to concrete
 * colors.
 */
enum ThemeColorType {
  /** Represents the first accent color */
  Accent1 = "ACCENT1",
  /** Represents the second accent color */
  Accent2 = "ACCENT2",
  /** Represents the third accent color */
  Accent3 = "ACCENT3",
  /** Represents the fourth accent color */
  Accent4 = "ACCENT4",
  /** Represents the fifth accent color */
  Accent5 = "ACCENT5",
  /** Represents the sixth accent color */
  Accent6 = "ACCENT6",
  /** Represents the primary background color */
  Background = "BACKGROUND",
  /** Represents the color to use for hyperlinks */
  Link = "LINK",
  /** Represents the primary text color */
  Text = "TEXT",
  /** Unspecified theme color */
  Unspecified = "THEME_COLOR_TYPE_UNSPECIFIED",
}

/** The horizontal alignment of text in a cell. */
enum HorizontalAlign {
  /** The text is explicitly aligned to the center of the cell. */
  Center = "CENTER",
  /** The text is explicitly aligned to the left of the cell. */
  Left = "LEFT",
  /** The text is explicitly aligned to the right of the cell. */
  Right = "RIGHT",
  /** The horizontal alignment is not specified. Do not use this. */
  Unspecified = "HORIZONTAL_ALIGN_UNSPECIFIED",
}

/** The format of a run of text in a cell. Absent values indicate that the field isn't specified. */
interface TextFormat {
  /** True if the text is bold. */
  bold?: boolean;
  /** The font family. */
  fontFamily?: string;
  /** The size of the font. */
  fontSize?: number;
  /**
   * The foreground color of the text.
   * @deprecated Use foregroundColorStyle.
   */
  foregroundColor?: Color;
  /** The foreground color of the text. If foregroundColor is also set, this field takes precedence. */
  foregroundColorStyle?: ColorStyle;
  /** True if the text is italicized. */
  italic?: boolean;
  /**
   * The link destination of the text, if any. Setting the link field in a TextFormatRun will clear the cell's existing
   * links or a cell-level link set in the same request. When a link is set, the text foreground color will be set to
   * the default link color and the text will be underlined. If these fields are modified in the same request, those
   * values will be used instead of the link defaults.
   */
  link?: Link;
  /** True if the text has a strikethrough. */
  strikethrough?: boolean;
  /** True if the text is underlined. */
  underline?: boolean;
}

/** An external or local reference. */
interface Link {
  /** The link identifier. */
  uri: string;
}

/** A column in a data source. */
interface DataSourceColumn {
  /** The formula of the calculated column. */
  formula: string;
  /** The column reference. */
  reference: DataSourceColumnReference;
}

/** An unique identifier that references a data source column. */
interface DataSourceColumnReference {
  /** The display name of the column. It should be unique within a data source. */
  name: string;
}

/**
 * The data execution status.
 *
 * A data execution is created to sync a data source object with the latest data from a DataSource. It is usually
 * scheduled to run at background, you can check its state to tell if an execution completes
 *
 * There are several scenarios where a data execution is triggered to run:
 *
 * - Adding a data source creates an associated data source sheet as well as a data execution to sync the data from the
 * data source to the sheet.
 * - Updating a data source creates a data execution to refresh the associated data source sheet similarly.
 * - You can send refresh request to explicitly refresh one or multiple data source objects.
 */
interface DataExecutionStatus {
  /** The error code. */
  errorCode: DataExecutionErrorCode;
  /** The error message, which may be empty. */
  errorMessage: string;
  /** Gets the time the data last successfully refreshed.  */
  lastRefreshTime: string;
  /** The state of the data execution. */
  state: DataExecutionState;
}

/** An enumeration of data execution states. */
enum DataExecutionState {
  /** The data execution has completed with errors. */
  Failed = "FAILED",
  /** The data execution has not started. */
  NotStarted = "NOT_STARTED",
  /** The data execution has started and is running. */
  Running = "RUNNING",
  /** The data execution has completed successfully. */
  Succeeded = "SUCCEEDED",
  /** Default value, do not use */
  Unspecified = "DATA_EXECUTION_STATE_UNSPECIFIED",
}

enum DataExecutionErrorCode {
  /** The data execution is currently in progress, can not be refreshed until it completes. */
  ConcurrentQuery = "CONCURRENT_QUERY",
  /** The database referenced by the data source is not found. */
  DataNotFound = "DATA_NOT_FOUND",
  /** The data execution returns duplicate column names or aliases.  */
  DuplicateColumnNames = "DUPLICATE_COLUMN_NAMES",
  /** Error is received from the backend data execution engine (e.g. BigQuery). Check errorMessage for details. */
  Engine = "ENGINE",
  /** The data execution is interrupted. Please refresh later.  */
  Interrupted = "INTERRUPTED",
  /** The data execution returns columns with missing aliases. */
  MissingColumnAlias = "MISSING_COLUMN_ALIAS",
  /** The data source object is currently in error state. To force refresh, set force in RefreshDataSourceRequest. */
  ObjectInErrorState = "OBJECT_IN_ERROR_STATE",
  /** The data source object does not exist. */
  ObjectNotFound = "OBJECT_NOT_FOUND",
  /** The data source object specification is invalid. */
  ObjectSpecInvalid = "OBJECT_SPEC_INVALID",
  /** Other errors. */
  Other = "OTHER",
  /** One or some of the provided data source parameters are invalid. */
  ParameterInvalid = "PARAMETER_INVALID",
  /** The user does not have access to the database referenced by the data source. */
  PermissionDenied = "PERMISSION_DENIED",
  /** The data execution timed out. */
  TimedOut = "TIMED_OUT",
  /** The data execution returns more cells than the limit. */
  TooManyCells = "TOO_MANY_CELLS",
  /** The data execution returns values that exceed the maximum characters allowed in a single cell. */
  TooManyCharsPerCell = "TOO_MANY_CHARS_PER_CELL",
  /** The data execution returns more columns than the limit. */
  TooManyColumns = "TOO_MANY_COLUMNS",
  /** The data execution returns more rows than the limit. */
  TooManyRows = "TOO_MANY_ROWS",
  /** Default value, do not use */
  Unspecified = "DATA_EXECUTION_ERROR_CODE_UNSPECIFIED",
  /** The data execution returns an unsupported data type.  */
  UnsupportedDataType = "UNSUPPORTED_DATA_TYPE",
}

/** The kinds of value that a cell in a spreadsheet can have. */
type ExtendedValue = ExactlyOneOf<{
  /** Represents a boolean value. */
  boolValue: boolean;
  /** Represents an error. This field is read-only. */
  errorValue: Readonly<ErrorValue>;
  /** Represents a formula. */
  formulaValue: string;
  /** Represents a double value. Note: Dates, Times and DateTimes are represented as doubles in SERIAL_NUMBER format. */
  numberValue: number;
  /**
   * Represents a string value. Leading single quotes are not included. For example, if the user typed '123 into the UI,
   * this would be represented as a stringValue of "123".
   */
  stringValue: string;
}>;

/** An error in a cell. */
interface ErrorValue {
  /** A message with more information about the error (in the spreadsheet's locale). */
  message: string;
  /** The type of error. */
  type: ErrorType;
}

enum ErrorType {
  /** Corresponds to the #DIV/0 error. */
  DivideByZero = "DIVIDE_BY_ZERO",
  /** Corresponds to the #ERROR! error. */
  Error = "ERROR",
  /** Corresponds to the Loading... state. */
  Loading = "LOADING",
  /** Corresponds to the #N/A error. */
  NA = "N_A",
  /** Corresponds to the #NAME? error. */
  Name = "NAME",
  /** Corresponds to the #NULL! error. */
  NullValue = "NULL_VALUE",
  /** Corresponds to the #NUM! error. */
  Num = "NUM",
  /** Corresponds to the #REF! error. */
  Ref = "REF",
  /** The default error type, do not use this. */
  Unspecified = "ERROR_TYPE_UNSPECIFIED",
  /** Corresponds to the #VALUE! error. */
  Value = "VALUE",
}

/**
 * A condition that can evaluate to true or false. BooleanConditions are used by conditional formatting, data
 * validation, and the criteria in filters.
 */
interface BooleanCondition {
  /** The type of condition. */
  type: ConditionType;
  /**
   * The values of the condition. The number of supported values depends on the condition type. Some support zero
   * values, others one or two values, and ConditionType.ONE_OF_LIST supports an arbitrary number of values.
   */
  values: ConditionValue[];
}

/** The type of condition. */
enum ConditionType {
  /** The cell's value must be empty. Supported by conditional formatting and filters. Requires no ConditionValues. */
  Blank = "BLANK",
  /**
   * The cell's value must be TRUE/FALSE or in the list of condition values. Supported by data validation. Renders as a
   * cell checkbox. Supports zero, one or two ConditionValues. No values indicates the cell must be TRUE or FALSE, where
   * TRUE renders as checked and FALSE renders as unchecked. One value indicates the cell will render as checked when it
   * contains that value and unchecked when it is blank. Two values indicate that the cell will render as checked when
   * it contains the first value and unchecked when it contains the second value. For example, ["Yes","No"] indicates
   * that the cell will render a checked box when it has the value "Yes" and an unchecked box when it has the value
   * "No".
   */
  Boolean = "BOOLEAN",
  /**
   * The condition's formula must evaluate to true. Supported by data validation, conditional formatting and filters.
   * Not supported by data source sheet filters. Requires a single ConditionValue.
   */
  CustomFormula = "CUSTOM_FORMULA",
  /**
   * The cell's value must be after the date of the condition's value. Supported by data validation, conditional
   * formatting and filters. Requires a single ConditionValue that may be a relative date.
   */
  DateAfter = "DATE_AFTER",
  /**
   * The cell's value must be before the date of the condition's value. Supported by data validation, conditional
   * formatting and filters. Requires a single ConditionValue that may be a relative date.
   */
  DateBefore = "DATE_BEFORE",
  /**
   * The cell's value must be between the dates of the two condition values. Supported by data validation. Requires
   * exactly two ConditionValues.
   */
  DateBetween = "DATE_BETWEEN",
  /**
   * The cell's value must be the same date as the condition's value. Supported by data validation, conditional
   * formatting and filters. Requires a single ConditionValue for data validation, conditional formatting, and filters
   * on non-data source objects and at least one ConditionValue for filters on data source objects.
   */
  DateEq = "DATE_EQ",
  /** The cell's value must be a date. Supported by data validation. Requires no ConditionValues. */
  DateIsValid = "DATE_IS_VALID",
  /**
   * The cell's value must be outside the dates of the two condition values. Supported by data validation. Requires
   * exactly two ConditionValues.
   */
  DateNotBetween = "DATE_NOT_BETWEEN",
  /**
   * The cell's value must be exactly not the condition's value. Supported by filters on data source objects. Requires
   * at least one ConditionValue.
   */
  DateNotEq = "DATE_NOT_EQ",
  /**
   * The cell's value must be on or after the date of the condition's value. Supported by data validation. Requires a
   * single ConditionValue that may be a relative date.
   */
  DateOnOrAfter = "DATE_ON_OR_AFTER",
  /**
   * The cell's value must be on or before the date of the condition's value. Supported by data validation. Requires a
   * single ConditionValue that may be a relative date.
   */
  DateOnOrBefore = "DATE_ON_OR_BEFORE",
  /** The cell's value must follow the pattern specified. Requires a single ConditionValue. */
  FilterExpression = "FILTER_EXPRESSION",
  /**
   * The cell's value must not be empty. Supported by conditional formatting and filters. Requires no ConditionValues.
   */
  NotBlank = "NOT_BLANK",
  /**
   * The cell's value must be between the two condition values. Supported by data validation, conditional formatting and
   * filters. Requires exactly two ConditionValues.
   */
  NumberBetween = "NUMBER_BETWEEN",
  /**
   * The cell's value must be equal to the condition's value. Supported by data validation, conditional formatting and
   * filters. Requires a single ConditionValue for data validation, conditional formatting, and filters on non-data
   * source objects and at least one ConditionValue for filters on data source objects.
   */
  NumberEq = "NUMBER_EQ",
  /**
   * The cell's value must be greater than the condition's value. Supported by data validation, conditional formatting
   * and filters. Requires a single ConditionValue.
   */
  NumberGreater = "NUMBER_GREATER",
  /**
   * The cell's value must be greater than or equal to the condition's value. Supported by data validation, conditional
   * formatting and filters. Requires a single ConditionValue.
   */
  NumberGreaterThanEq = "NUMBER_GREATER_THAN_EQ",
  /**
   * The cell's value must be less than the condition's value. Supported by data validation, conditional formatting and
   * filters. Requires a single ConditionValue.
   */
  NumberLess = "NUMBER_LESS",
  /**
   * The cell's value must be less than or equal to the condition's value. Supported by data validation, conditional
   * formatting and filters. Requires a single ConditionValue.
   */
  NumberLessThanEq = "NUMBER_LESS_THAN_EQ",
  /**
   * The cell's value must not be between the two condition values. Supported by data validation, conditional formatting
   * and filters. Requires exactly two ConditionValues.
   */
  NumberNotBetween = "NUMBER_NOT_BETWEEN",
  /**
   * The cell's value must be not equal to the condition's value. Supported by data validation, conditional formatting
   * and filters. Requires a single ConditionValue for data validation, conditional formatting, and filters on non-data
   * source objects and at least one ConditionValue for filters on data source objects.
   */
  NumberNotEq = "NUMBER_NOT_EQ",
  /**
   * The cell's value must be in the list of condition values. Supported by data validation. Supports any number of
   * condition values, one per item in the list. Formulas are not supported in the values.
   */
  OneOfList = "ONE_OF_LIST",
  /**
   * The cell's value must be listed in the grid in condition value's range. Supported by data validation. Requires a
   * single ConditionValue, and the value must be a valid range in A1 notation.
   */
  OneOfRange = "ONE_OF_RANGE",
  /**
   * The cell's value must contain the condition's value. Supported by data validation, conditional formatting and
   * filters. Requires a single ConditionValue.
   */
  TextContains = "TEXT_CONTAINS",
  /**
   * The cell's value must end with the condition's value. Supported by conditional formatting and filters. Requires a
   * single ConditionValue.
   */
  TextEndsWith = "TEXT_ENDS_WITH",
  /**
   * The cell's value must be exactly the condition's value. Supported by data validation, conditional formatting and
   * filters. Requires a single ConditionValue for data validation, conditional formatting, and filters on non-data
   * source objects and at least one ConditionValue for filters on data source objects.
   */
  TextEq = "TEXT_EQ",
  /** The cell's value must be a valid email address. Supported by data validation. Requires no ConditionValues. */
  TextIsEmail = "TEXT_IS_EMAIL",
  /** The cell's value must be a valid URL. Supported by data validation. Requires no ConditionValues. */
  TextIsUrl = "TEXT_IS_URL",
  /**
   * The cell's value must not contain the condition's value. Supported by data validation, conditional formatting and
   * filters. Requires a single ConditionValue.
   */
  TextNotContains = "TEXT_NOT_CONTAINS",
  /**
   * The cell's value must be exactly not the condition's value. Supported by filters on data source objects. Requires
   * at least one ConditionValue.
   */
  TextNotEq = "TEXT_NOT_EQ",
  /**
   * The cell's value must start with the condition's value. Supported by conditional formatting and filters. Requires a
   * single ConditionValue.
   */
  TextStartsWith = "TEXT_STARTS_WITH",
  /** The default value, do not use. */
  Unspecified = "CONDITION_TYPE_UNSPECIFIED",
}

/** The value of the condition. */
type ConditionValue = ExactlyOneOf<{
  /**
   * A relative date (based on the current date). Valid only if the type is DATE_BEFORE, DATE_AFTER,
   * DATE_ON_OR_BEFORE or DATE_ON_OR_AFTER.
   *
   * Relative dates are not supported in data validation. They are supported only in conditional formatting and
   * conditional filters.
   */
  relativeDate: RelativeDate;
  /**
   * A value the condition is based on. The value is parsed as if the user typed into a cell. Formulas are supported
   * (and must begin with an = or a '+').
   */
  userEnteredValue: string;
}>;

enum RelativeDate {
  /** The value is one month before today. */
  PastMonth = "PAST_MONTH",
  /** The value is one week before today. */
  PastWeek = "PAST_WEEK",
  /** The value is one year before today. */
  PastYear = "PAST_YEAR",
  /** The value is today. */
  Today = "TODAY",
  /** The value is tomorrow. */
  Tomorrow = "TOMORROW",
  /** Default value, do not use. */
  Unspecified = "RELATIVE_DATE_UNSPECIFIED",
  /** The value is yesterday. */
  Yesterday = "YESTERDAY",
}

/**
 * A range on a sheet. All indexes are zero-based. Indexes are half open, i.e. the start index is inclusive and the end
 * index is exclusive -- [startIndex, endIndex). Missing indexes indicate the range is unbounded on that side.
 *
 * For example, if "Sheet1" is sheet ID 123456, then:
 *
 * Sheet1!A1:A1 == sheetId: 123456, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 1
 *
 * Sheet1!A3:B4 == sheetId: 123456, startRowIndex: 2, endRowIndex: 4, startColumnIndex: 0, endColumnIndex: 2
 *
 * Sheet1!A:B == sheetId: 123456, startColumnIndex: 0, endColumnIndex: 2
 *
 * Sheet1!A5:B == sheetId: 123456, startRowIndex: 4, startColumnIndex: 0, endColumnIndex: 2
 *
 * Sheet1 == sheetId: 123456
 *
 * The start index must always be less than or equal to the end index. If the start index equals the end index, then the
 * range is empty. Empty ranges are typically not meaningful and are usually rendered in the UI as #REF!.
 */
interface GridRange {
  /** The sheet this range is on. */
  sheetId: number;
  /** The end column (exclusive) of the range, or not set if unbounded. */
  endColumnIndex?: number;
  /** The end row (exclusive) of the range, or not set if unbounded.  */
  endRowIndex?: number;
  /** The start column (inclusive) of the range, or not set if unbounded. */
  startColumnIndex?: number;
  /** The start row (inclusive) of the range, or not set if unbounded. */
  startRowIndex?: number;
}

/** A sort order. */
enum SortOrder {
  /** Sort ascending. */
  Ascending = "ASCENDING",
  /** Sort descending. */
  Descending = "DESCENDING",
  /** Default value, do not use this. */
  Unspecified = "SORT_ORDER_UNSPECIFIED",
}

/** The filter criteria associated with a specific column. */
type FilterSpec = ExactlyOneOf<{
  /** The zero-based column index. */
  columnIndex: number;
  /** Reference to a data source column. */
  dataSourceColumnReference: DataSourceColumnReference;
}> & {
  /** The criteria for the column. */
  filterCriteria: FilterCriteria;
};

/** Criteria for showing/hiding rows in a filter or filter view. */
type FilterCriteria = {
  /**
   * A condition that must be true for values to be shown. (This does not override hiddenValues -- if a value is listed
   * there, it will still be hidden.)
   */
  condition?: BooleanCondition;
  /** Values that should be hidden. */
  hiddenValues?: string[];
} & (
  | ExactlyOneOf<{
      /**
       * The background fill color to filter by; only cells with this fill color are shown. Mutually exclusive with
       * visibleForegroundColor.
       * @deprecated Use visibleBackgroundColorStyle.
       */
      visibleBackgroundColor: Color;
      /**
       * The background fill color to filter by; only cells with this fill color are shown. This field is mutually
       * exclusive with visibleForegroundColor, and must be set to an RGB-type color. If visibleBackgroundColor is also
       * set, this field takes precedence.
       */
      visibleBackgroundColorStyle: ColorStyle;
      /**
       * The foreground color to filter by; only cells with this foreground color are shown. Mutually exclusive with
       * visibleBackgroundColor.
       * @deprecated Use visibleForegroundColorStyle.
       */
      visibleForegroundColor: Color;
      /**
       * The foreground color to filter by; only cells with this foreground color are shown. This field is mutually
       * exclusive with visibleBackgroundColor, and must be set to an RGB-type color. If visibleForegroundColor is also
       * set, this field takes precedence.
       */
      visibleForegroundColorStyle: ColorStyle;
    }>
  | {
      visibleBackgroundColor?: never;
      visibleBackgroundColorStyle?: never;
      visibleForegroundColor?: never;
      visibleForegroundColorStyle?: never;
    }
);

/** A sort order associated with a specific column or row. */
type SortSpec = ExactlyOneOf<{
  /** Reference to a data source column. */
  dataSourceColumnReference: DataSourceColumnReference;
  /** The dimension the sort should be applied to. */
  dimensionIndex: number;
}> & {
  /** The order data should be sorted. */
  sortOrder: SortOrder;
} & (
    | ExactlyOneOf<{
        /**
         * The background fill color to sort by; cells with this fill color are sorted to the top. Mutually exclusive
         * with foregroundColor.
         * @deprecated Use backgroundColorStyle.
         */
        backgroundColor: Color;
        /**
         * The background fill color to sort by; cells with this fill color are sorted to the top. Mutually exclusive
         * with foregroundColor, and must be an RGB-type color. If backgroundColor is also set, this field takes
         * precedence.
         */
        backgroundColorStyle: ColorStyle;
        /**
         * The foreground color to sort by; cells with this foreground color are sorted to the top. Mutually exclusive
         * with backgroundColor.
         * @deprecated Use foregroundColorStyle.
         */
        foregroundColor: Color;
        /**
         * The foreground color to sort by; cells with this foreground color are sorted to the top. Mutually exclusive
         * with backgroundColor, and must be an RGB-type color. If foregroundColor is also set, this field takes
         * precedence.
         */
        foregroundColorStyle: ColorStyle;
      }>
    | {
        backgroundColor?: never;
        backgroundColorStyle?: never;
        foregroundColor?: never;
        foregroundColorStyle?: never;
      }
  );

type EmbeddedObjectPosition = ExactlyOneOf<{
  /** If true, the embedded object is put on a new sheet whose ID is chosen for you. Used only when writing. */
  newSheet: boolean;
  /** The position at which the object is overlaid on top of a grid. */
  overlayPosition: OverlayPosition;
  /** The sheet this is on. Set only if the embedded object is on its own sheet. Must be non-negative. */
  sheetId: number;
}>;

/** The location an object is overlaid on top of a grid. */
interface OverlayPosition {
  /** The cell the object is anchored to. */
  anchorCell: GridCoordinate;
  /** The height of the object, in pixels. Defaults to 371. */
  heightPixels: number;
  /** The horizontal offset, in pixels, that the object is offset from the anchor cell. */
  offsetXPixels: number;
  /** The vertical offset, in pixels, that the object is offset from the anchor cell. */
  offsetYPixels: number;
  /** The width of the object, in pixels. Defaults to 600. */
  widthPixels: number;
}

/** A coordinate in a sheet. All indexes are zero-based. */
interface GridCoordinate {
  /** The column index of the coordinate. */
  columnIndex: number;
  /** The row index of the coordinate. */
  rowIndex: number;
  /** The sheet this coordinate is on. */
  sheetId: number;
}

// 1.2 batchUpdate

// 1.3 create

// 1.4 get

// 1.5 getByDataFilter

// 2. spreadsheets.developerMetadata

// 3. spreadsheets.sheets

// 4. spreadsheets.values

// 5. Types

// END TYPES

export type GoogleSheetsRequestMethods = "GET" | "POST" | "PUT";

export const googleSheetsRequestUris = ["/"] as const;
export type GoogleSheetsRequestUris = (typeof googleSheetsRequestUris)[number];

export interface GoogleSheetsRequestOptions<
  Method extends GoogleSheetsRequestMethods,
  Path extends Record<string, boolean | number | string> | null,
  Body = null,
  Query = null,
> {
  body: Body;
  method: Method;
  path: Path;
  query: Query;
}

export interface GoogleSheetsRequestOptionsMap {
  spreadsheets: GoogleSheetsRequestOptions<"POST", null, sheets_v4.Schema$Spreadsheet>;
  "spreadsheets/{spreadsheetId}": GoogleSheetsRequestOptions<
    "GET",
    { spreadsheetId: string },
    null,
    { includeGridData?: boolean; range?: string[] }
  >;
  "spreadsheets/{spreadsheetId}/developerMetadata/{metadataId}": GoogleSheetsRequestOptions<
    "GET",
    { metadataId: string; spreadsheetId: string }
  >;
  "spreadsheets/{spreadsheetId}/developerMetadata:search": GoogleSheetsRequestOptions<
    "POST",
    { spreadsheetId: string },
    sheets_v4.Schema$SearchDeveloperMetadataRequest
  >;
  "spreadsheets/{spreadsheetId}/sheets/{sheetId}:copyTo": GoogleSheetsRequestOptions<
    "POST",
    { sheetId: string; spreadsheetId: string },
    sheets_v4.Schema$CopySheetToAnotherSpreadsheetRequest
  >;
  "spreadsheets/{spreadsheetId}/values/{range}:append": GoogleSheetsRequestOptions<
    "POST",
    { range: string; spreadsheetId: string },
    sheets_v4.Schema$ValueRange,
    Exclude<sheets_v4.Params$Resource$Spreadsheets$Values$Append, "range" | "requestBody" | "spreadsheetId">
  >;
  "spreadsheets/{spreadsheetId}:batchUpdate": GoogleSheetsRequestOptions<
    "POST",
    { spreadsheetId: string },
    sheets_v4.Schema$BatchUpdateSpreadsheetRequest
  >;
  "spreadsheets/{spreadsheetId}:getByDataFilter": GoogleSheetsRequestOptions<
    "POST",
    { spreadsheetId: string },
    sheets_v4.Schema$GetSpreadsheetByDataFilterRequest
  >;
}
