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

/** A chart embedded in a sheet. */
interface EmbeddedChart {
  /** The border of the chart. */
  border: EmbeddedObjectBorder;
  /** The ID of the chart. */
  chartId: number;
  /** The position of the chart. */
  position: EmbeddedObjectPosition;
  /** The specification of the chart. */
  spec: ChartSpec;
}

type ChartSpec = ExactlyOneOf<{
  /**
   * A basic chart specification, can be one of many kinds of charts. See BasicChartType for the list of all charts
   * this supports.
   */
  basicChart: BasicChartSpec;
  /** A bubble chart specification. */
  bubbleChart: BubbleChartSpec;
  /** A candlestick chart specification. */
  candlestickChart: CandlestickChartSpec;
  /** A histogram chart specification. */
  histogramChart: HistogramChartSpec;
  /** An org chart specification. */
  orgChart: OrgChartSpec;
  /** A pie chart specification. */
  pieChart: PieChartSpec;
  /** A scorecard chart specification. */
  scorecardChart: ScorecardChartSpec;
  /** A treemap chart specification. */
  treemapChart: TreemapChartSpec;
  /** A waterfall chart specification. */
  waterfallChart: WaterfallChartSpec;
}> & {
  /** The alternative text that describes the chart. This is often used for accessibility. */
  altText: string;
  /**
   * The background color of the entire chart. Not applicable to Org charts.
   * @deprecated Use backgroundColorStyle.
   */
  backgroundColor: Color;
  /**
   * The background color of the entire chart. Not applicable to Org charts. If backgroundColor is also set, this field
   * takes precedence.
   */
  backgroundColorStyle: ColorStyle;
  /** If present, the field contains data source chart specific properties. */
  dataSourceChartProperties: DataSourceChartProperties;
  /** The filters applied to the source data of the chart. Only supported for data source charts. */
  filterSpecs: FilterSpec[];
  /**
   * The name of the font to use by default for all chart text (e.g. title, axis labels, legend). If a font is specified
   * for a specific part of the chart it will override this font name.
   */
  fontName: string;
  /** Determines how the charts will use hidden rows or columns. */
  hiddenDimensionStrategy: ChartHiddenDimensionStrategy;
  /**
   * True to make a chart fill the entire space in which it's rendered with minimum padding. False to use the default
   * padding. (Not applicable to Geo and Org charts.)
   */
  maximized: boolean;
  /**
   * The order to sort the chart data by. Only a single sort spec is supported. Only supported for data source charts.
   */
  sortSpecs: SortSpec[];
  /** The subtitle of the chart. */
  subtitle: string;
  /** The subtitle text format. Strikethrough, underline, and link are not supported. */
  subtitleTextFormat: TextFormat;
  /** The subtitle text position. This field is optional. */
  subtitleTextPosition: TextPosition;
  /** The title of the chart. */
  title: string;
  /** The title text format. Strikethrough, underline, and link are not supported. */
  titleTextFormat: TextFormat;
  /** The title text position. This field is optional. */
  titleTextPosition?: TextPosition;
};

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

/** The specification for a basic chart. See BasicChartType for the list of charts this supports. */
interface BasicChartSpec {
  /** The axis on the chart. */
  axis: BasicChartAxis[];
  /** The type of the chart. */
  chartType: BasicChartType;
  /** The behavior of tooltips and data highlighting when hovering on data and chart area. */
  compareMode: BasicChartCompareMode;
  /** The domain of data this is charting. Only a single domain is supported. */
  domains: BasicChartDomain[];
  /**
   * The number of rows or columns in the data that are "headers". If not set, Google Sheets will guess how many rows
   * are headers based on the data.
   *
   * (Note that BasicChartAxis.title may override the axis title inferred from the header values.)
   */
  headerCount: number;
  /** The position of the chart legend. */
  legendPosition: BasicChartLegendPosition;
  /** The data this chart is visualizing. */
  series: BasicChartSeries[];
  /**
   * If some values in a series are missing, gaps may appear in the chart (e.g, segments of lines in a line chart will
   * be missing). To eliminate these gaps set this to true. Applies to Line, Area, and Combo charts.
   */
  interpolateNulls?: boolean;
  /** Gets whether all lines should be rendered smooth or straight by default. Applies to Line charts. */
  lineSmoothing?: boolean;
  /**
   * The stacked type for charts that support vertical stacking. Applies to Area, Bar, Column, Combo, and Stepped Area
   * charts.
   */
  stackedType?: BasicChartStackedType;
  /** True to make the chart 3D. Applies to Bar and Column charts. */
  threeDimensional?: boolean;
  /**
   * Controls whether to display additional data labels on stacked charts which sum the total value of all stacked
   * values at each value along the domain axis. These data labels can only be set when chartType is one of AREA, BAR,
   * COLUMN, COMBO or STEPPED_AREA and stackedType is either STACKED or PERCENT_STACKED. In addition, for COMBO, this
   * will only be supported if there is only one type of stackable series type or one type has more series than the
   * others and each of the other types have no more than one series. For example, if a chart has two stacked bar series
   * and one area series, the total data labels will be supported. If it has three bar series and two area series, total
   * data labels are not allowed. Neither CUSTOM nor placement can be set on the totalDataLabel.
   */
  totalDataLabel?: DataLabel;
}

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

/** An axis of the chart. A chart may not have more than one axis per axis position. */
interface BasicChartAxis {
  /**
   * The format of the title. Only valid if the axis is not associated with the domain. The link field is not supported.
   */
  format: TextFormat;
  /** The position of this axis. */
  position: BasicChartAxisPosition;
  /** The axis title text position. */
  titleTextPosition: TextPosition;
  /** The view window options for this axis. */
  viewWindowOptions: ChartAxisViewWindowOptions;
  /** The title of this axis. If set, this overrides any title inferred from headers of the data. */
  title?: string;
}

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

/**
 * A single series of data in a chart. For example, if charting stock prices over time, multiple series may exist, one
 * for the "Open Price", "High Price", "Low Price" and "Close Price".
 */
interface BasicChartSeries {
  /** Information about the data labels for this series. */
  dataLabel: DataLabel;
  /** The data being visualized in this chart series. */
  series: ChartData;
  /**
   * The minor axis that will specify the range of values for this series. For example, if charting stocks over time,
   * the "Volume" series may want to be pinned to the right with the prices pinned to the left, because the scale of
   * trading volume is different than the scale of prices. It is an error to specify an axis that isn't a valid minor
   * axis for the chart's type.
   */
  targetAxis: BasicChartAxisPosition;
  /**
   * The color for elements (such as bars, lines, and points) associated with this series. If empty, a default color is
   * used.
   * @deprecated Use colorStyle.
   */
  color?: Color;
  /**
   * The color for elements (such as bars, lines, and points) associated with this series. If empty, a default color is
   * used. If color is also set, this field takes precedence.
   */
  colorStyle?: ColorStyle;
  /**
   * The line style of this series. Valid only if the chartType is AREA, LINE, or SCATTER. COMBO charts are also
   * supported if the series chart type is AREA or LINE.
   */
  lineStyle?: LineStyle;
  /**
   * The style for points associated with this series. Valid only if the chartType is AREA, LINE, or SCATTER. COMBO
   * charts are also supported if the series chart type is AREA, LINE, or SCATTER. If empty, a default point style is
   * used.
   */
  pointStyle?: PointStyle;
  /** Style override settings for series data points. */
  styleOverrides?: BasicSeriesDataPointStyleOverride[];
  /**
   * The type of this series. Valid only if the chartType is COMBO. Different types will change the way the series is
   * visualized. Only LINE, AREA, and COLUMN are supported.
   */
  type?: BasicChartType;
}

/** Properties that describe the style of a line. */
interface LineStyle {
  /** The dash type of the line. */
  type: LineDashType;
  /** The thickness of the line, in px. */
  width: number;
}

/** The dash type of a line. */
enum LineDashType {
  /** A custom dash for a line. Modifying the exact custom dash style is currently unsupported. */
  Custom = "CUSTOM",
  /** A dotted line. */
  Dotted = "DOTTED",
  /** No dash type, which is equivalent to a non-visible line. */
  Invisible = "INVISIBLE",
  /** A dashed line where the dashes have "long" length. */
  LongDashed = "LONG_DASHED",
  /** A line that alternates between a "long" dash and a dot. */
  LongDashedDotted = "LONG_DASHED_DOTTED",
  /** A dashed line where the dashes have "medium" length. */
  MediumDashed = "MEDIUM_DASHED",
  /** A line that alternates between a "medium" dash and a dot. */
  MediumDashedDotted = "MEDIUM_DASHED_DOTTED",
  /** A solid line. */
  Solid = "SOLID",
  /** Default value, do not use. */
  Unspecified = "LINE_DASH_TYPE_UNSPECIFIED",
}

/**
 * Settings for one set of data labels. Data labels are annotations that appear next to a set of data, such as the
 * points on a line chart, and provide additional information about what the data represents, such as a text
 * representation of the value behind that point on the graph.
 */
interface DataLabel {
  /** The placement of the data label relative to the labeled data. */
  placement: DataLabelPlacement;
  /** The text format used for the data label. The link field is not supported. */
  textFormat: TextFormat;
  /** The type of the data label. */
  type: DataLabelType;
  /**
   * Data to use for custom labels. Only used if type is set to CUSTOM. This data must be the same length as the series
   * or other element this data label is applied to. In addition, if the series is split into multiple source ranges,
   * this source data must come from the next column in the source data. For example, if the series is B2:B4,E6:E8 then
   * this data must come from C2:C4,F6:F8.
   */
  customLabelData?: ChartData;
}

/** The type of a data label. */
enum DataLabelType {
  /** The data label is displayed using values from a custom data source indicated by customLabelData. */
  Custom = "CUSTOM",
  /** The data label is displayed using values from the series data. */
  Data = "DATA",
  /** The data label is not displayed. */
  None = "NONE",
  /**
   * The data label type is not specified and will be interpreted depending on the context of the data label within the
   * chart.
   */
  Unspecified = "DATA_LABEL_TYPE_UNSPECIFIED",
}

/** The placement of a data label relative to the labeled data. */
enum DataLabelPlacement {
  /** Above a data point. */
  Above = "ABOVE",
  /** Below a data point. */
  Below = "BELOW",
  /** Center within a bar or column, both horizontally and vertically. */
  Center = "CENTER",
  /** Inside a bar or column at the base. */
  InsideBase = "INSIDE_BASE",
  /** Inside a bar or column at the end (top if positive, bottom if negative). */
  InsideEnd = "INSIDE_END",
  /** To the left of a data point. */
  Left = "LEFT",
  /** Outside a bar or column at the end. */
  OutsideEnd = "OUTSIDE_END",
  /** To the right of a data point. */
  Right = "RIGHT",
  /** The positioning is determined automatically by the renderer. */
  Unspecified = "DATA_LABEL_PLACEMENT_UNSPECIFIED",
}

/** The style of a point on the chart. */
interface PointStyle {
  /** The point shape. If empty or unspecified, a default shape is used. */
  shape?: PointShape;
  /** The point size. If empty, a default size is used. */
  size?: number;
}

/** The shape of a point. */
enum PointShape {
  /** A circle shape. */
  Circle = "CIRCLE",
  /** A diamond shape. */
  Diamond = "DIAMOND",
  /** A hexagon shape. */
  Hexagon = "HEXAGON",
  /** A pentagon shape. */
  Pentagon = "PENTAGON",
  /** A square shape. */
  Square = "SQUARE",
  /** A star shape. */
  Star = "STAR",
  /** A triangle shape. */
  Triangle = "TRIANGLE",
  /** An x-mark shape. */
  XMark = "X_MARK",
  /** Default value. */
  Unspecified = "POINT_SHAPE_UNSPECIFIED",
}

/** Style override settings for a single series data point. */
interface BasicSeriesDataPointStyleOverride {
  /** The zero-based index of the series data point. */
  index: number;
  /**
   * Color of the series data point. If empty, the series default is used.
   * @deprecated Use colorStyle.
   */
  color?: Color;
  /**
   * Color of the series data point. If empty, the series default is used. If color is also set, this field takes
   * precedence.
   */
  colorStyle?: ColorStyle;
  /**
   * Point style of the series data point. Valid only if the chartType is AREA, LINE, or SCATTER. COMBO charts are also
   * supported if the series chart type is AREA, LINE, or SCATTER. If empty, the series default is used.
   */
  pointStyle?: PointStyle;
}

/**
 * When charts are stacked, range (vertical axis) values are rendered on top of one another rather than from the
 * horizontal axis. For example, the two values 20 and 80 would be drawn from 0, with 80 being 80 units away from the
 * horizontal axis. If they were stacked, 80 would be rendered from 20, putting it 100 units away from the horizontal
 * axis.
 */
enum BasicChartStackedType {
  /** Series are not stacked. */
  NotStacked = "NOT_STACKED",
  /** Vertical stacks are stretched to reach the top of the chart, with values laid out as percentages of each other. */
  PercentStacked = "PERCENT_STACKED",
  /** Series values are stacked, each value is rendered vertically beginning from the top of the value below it. */
  Stacked = "STACKED",
  /** Default value, do not use. */
  Unspecified = "BASIC_CHART_STACKED_TYPE_UNSPECIFIED",
}

/**
 * The compare mode type, which describes the behavior of tooltips and data highlighting when hovering on data and chart
 * area.
 */
enum BasicChartCompareMode {
  /** All data elements with the same category (e.g., domain value) are highlighted and shown in the tooltip. */
  Category = "CATEGORY",
  /** Only the focused data element is highlighted and shown in the tooltip. */
  Datum = "DATUM",
  /** Default value, do not use. */
  Unspecified = "BASIC_CHART_COMPARE_MODE_UNSPECIFIED",
}

/** A pie chart. */
interface PieChartSpec {
  /** The data that covers the domain of the pie chart. */
  domain: ChartData;
  /** Where the legend of the pie chart should be drawn. */
  legendPosition: PieChartLegendPosition;
  /** The size of the hole in the pie chart. */
  pieHole: number;
  /** The data that covers the one and only series of the pie chart. */
  series: ChartData;
  /** True if the pie is three dimensional. */
  threeDimensional: boolean;
}

/** Where the legend of the chart should be positioned. */
enum PieChartLegendPosition {
  /** The legend is rendered on the bottom of the chart. */
  BottomLegend = "BOTTOM_LEGEND",
  /** Each pie slice has a label attached to it. */
  LabeledLegend = "LABELED_LEGEND",
  /** The legend is rendered on the left of the chart. */
  LeftLegend = "LEFT_LEGEND",
  /** No legend is rendered. */
  NoLegend = "NO_LEGEND",
  /** The legend is rendered on the right of the chart. */
  RightLegend = "RIGHT_LEGEND",
  /** The legend is rendered on the top of the chart. */
  TopLegend = "TOP_LEGEND",
  /** Default value, do not use. */
  Unspecified = "PIE_CHART_LEGEND_POSITION_UNSPECIFIED",
}

/** A bubble chart. */
interface BubbleChartSpec {
  /** The data containing the bubble labels. These do not need to be unique. */
  bubbleLabels: ChartData;
  /** The opacity of the bubbles between 0 and 1.0. 0 is fully transparent and 1 is fully opaque. */
  bubbleOpacity: number;
  /** The data containing the bubble x-values. These values locate the bubbles in the chart horizontally. */
  domain: ChartData;
  /** Where the legend of the chart should be drawn. */
  legendPosition: BubbleChartLegendPosition;
  /** The data containing the bubble y-values. These values locate the bubbles in the chart vertically. */
  series: ChartData;
  /**
   * The bubble border color.
   * @deprecated Use bubbleBorderColorStyle.
   */
  bubbleBorderColor?: Color;
  /** The bubble border color. If bubbleBorderColor is also set, this field takes precedence. */
  bubbleBorderColorStyle?: ColorStyle;
  /** The max radius size of the bubbles, in pixels. If specified, the field must be a positive value. */
  bubbleMaxRadiusSize?: number;
  /** The minimum radius size of the bubbles, in pixels. If specific, the field must be a positive value. */
  bubbleMinRadiusSize?: number;
  /**
   * The data containing the bubble sizes. Bubble sizes are used to draw the bubbles at different sizes relative to each
   * other. If specified, groupIds must also be specified. This field is optional.
   */
  bubbleSizes?: ChartData;
  /** The format of the text inside the bubbles. Strikethrough, underline, and link are not supported. */
  bubbleTextStyle?: TextFormat;
  /**
   * The data containing the bubble group IDs. All bubbles with the same group ID are drawn in the same color. If
   * bubbleSizes is specified then this field must also be specified but may contain blank values. This field is
   * optional.
   */
  groupIds?: ChartData;
}

/** Where the legend of the chart should be positioned. */
enum BubbleChartLegendPosition {
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
  Unspecified = "BUBBLE_CHART_LEGEND_POSITION_UNSPECIFIED",
}

/** A candlestick chart. */
interface CandlestickChartSpec {
  /** The Candlestick chart data. Only one CandlestickData is supported. */
  data: CandlestickData[];
  /**
   * The domain data (horizontal axis) for the candlestick chart. String data will be treated as discrete labels, other
   * data will be treated as continuous values.
   */
  domain: CandlestickDomain;
}

/** The domain of a CandlestickChart. */
interface CandlestickDomain {
  /** The data of the CandlestickDomain. */
  data: ChartData;
  /** True to reverse the order of the domain values (horizontal axis). */
  reversed: boolean;
}

/** The Candlestick chart data, each containing the low, open, close, and high values for a series. */
interface CandlestickData {
  /**
   * The range data (vertical axis) for the close/final value for each candle. This is the top of the candle body. If
   * greater than the open value the candle will be filled. Otherwise the candle will be hollow.
   */
  closeSeries: CandlestickSeries;
  /**
   * The range data (vertical axis) for the high/maximum value for each candle. This is the top of the candle's center
   * line.
   */
  highSeries: CandlestickSeries;
  /**
   * The range data (vertical axis) for the low/minimum value for each candle. This is the bottom of the candle's center
   * line.
   */
  lowSeries: CandlestickSeries;
  /**
   * The range data (vertical axis) for the open/initial value for each candle. This is the bottom of the candle body.
   * If less than the close value the candle will be filled. Otherwise the candle will be hollow.
   */
  openSeries: CandlestickSeries;
}

/** The series of a CandlestickData. */
interface CandlestickSeries {
  /** The data of the CandlestickSeries. */
  data: ChartData;
}

/**
 * An org chart. Org charts require a unique set of labels in labels and may optionally include parentLabels and
 * tooltips. parentLabels contain, for each node, the label identifying the parent node. tooltips contain, for each
 * node, an optional tooltip.
 *
 * For example, to describe an OrgChart with Alice as the CEO, Bob as the President (reporting to Alice) and Cathy as VP
 * of Sales (also reporting to Alice), have labels contain "Alice", "Bob", "Cathy", parentLabels contain "", "Alice",
 * "Alice" and tooltips contain "CEO", "President", "VP Sales".
 */
interface OrgChartSpec {
  /** The data containing the labels for all the nodes in the chart. Labels must be unique. */
  labels: ChartData;
  /** The size of the org chart nodes. */
  nodeSize: OrgChartNodeSize;
  /**
   * The data containing the tooltip for the corresponding node. A blank value results in no tooltip being displayed for
   * the node. This field is optional.
   */
  tooltips: ChartData;
  /**
   * The color of the org chart nodes.
   * @deprecated Use nodeColorStyle.
   */
  nodeColor?: Color;
  /** The color of the org chart nodes. If nodeColor is also set, this field takes precedence. */
  nodeColorStyle?: ColorStyle;
  /**
   * The data containing the label of the parent for the corresponding node. A blank value indicates that the node has
   * no parent and is a top-level node. This field is optional.
   */
  parentLabels?: ChartData;
  /**
   * The color of the selected org chart nodes.
   * @deprecated Use selectedNodeColorStyle.
   */
  selectedNodeColor?: Color;
  /** The color of the selected org chart nodes. If selectedNodeColor is also set, this field takes precedence. */
  selectedNodeColorStyle?: ColorStyle;
}

/** The size of the org chart nodes. */
enum OrgChartNodeSize {
  /** The large org chart node size. */
  Large = "LARGE",
  /** The medium org chart node size. */
  Medium = "MEDIUM",
  /** The small org chart node size. */
  Small = "SMALL",
  /** Default value, do not use. */
  Unspecified = "ORG_CHART_LABEL_SIZE_UNSPECIFIED",
}

/**
 * A histogram chart. A histogram chart groups data items into bins, displaying each bin as a column of stacked items.
 * Histograms are used to display the distribution of a dataset. Each column of items represents a range into which
 * those items fall. The number of bins can be chosen automatically or specified explicitly.
 */
interface HistogramChartSpec {
  /** The position of the chart legend. */
  legendPosition: HistogramChartLegendPosition;
  /**
   * The outlier percentile is used to ensure that outliers do not adversely affect the calculation of bucket sizes. For
   * example, setting an outlier percentile of 0.05 indicates that the top and bottom 5% of values when calculating
   * buckets. The values are still included in the chart, they will be added to the first or last buckets instead of
   * their own buckets. Must be between 0.0 and 0.5.
   */
  outlierPercentile: number;
  /**
   * The series for a histogram may be either a single series of values to be bucketed or multiple series, each of the
   * same length, containing the name of the series followed by the values to be bucketed for that series.
   */
  series: HistogramSeries[];
  /** Whether horizontal divider lines should be displayed between items in each column. */
  showItemDividers: boolean;
  /**
   * By default the bucket size (the range of values stacked in a single column) is chosen automatically, but it may be
   * overridden here. E.g., A bucket size of 1.5 results in buckets from 0 - 1.5, 1.5 - 3.0, etc. Cannot be negative.
   * This field is optional.
   */
  bucketSize?: number;
}

/** A histogram series containing the series color and data. */
interface HistogramSeries {
  /** The data for this histogram series. */
  data: ChartData;
  /**
   * The color of the column representing this series in each bucket. This field is optional.
   * @deprecated Use barColorStyle.
   */
  barColor?: Color;
  /**
   * The color of the column representing this series in each bucket. This field is optional. If barColor is also set,
   * this field takes precedence.
   */
  barColorStyle?: ColorStyle;
}

/** Where the legend of the chart should be positioned. */
enum HistogramChartLegendPosition {
  /** The legend is rendered on the bottom of the chart. */
  BottomLegend = "BOTTOM_LEGEND",
  /** The legend is rendered inside the chart area. */
  InsideLegend = "INSIDE_LEGEND",
  /** The legend is rendered on the left of the chart. */
  LeftLegend = "LEFT_LEGEND",
  /** No legend is rendered. */
  NoLegend = "NO_LEGEND",
  /** The legend is rendered on the right of the chart. */
  RightLegend = "RIGHT_LEGEND",
  /** The legend is rendered on the top of the chart. */
  TopLegend = "TOP_LEGEND",
  /** Default value, do not use. */
  Unspecified = "HISTOGRAM_CHART_LEGEND_POSITION_UNSPECIFIED",
}

/** A waterfall chart. */
interface WaterfallChartSpec {
  /** The line style for the connector lines. */
  connectorLineStyle: LineStyle;
  /** The domain data (horizontal axis) for the waterfall chart. */
  domain: WaterfallChartDomain;
  /** True to interpret the first value as a total. */
  firstValueIsTotal: boolean;
  /** True to hide connector lines between columns. */
  hideConnectorLines: boolean;
  /** The data this waterfall chart is visualizing. */
  series: WaterfallChartSeries[];
  /** The stacked type. */
  stackedType: WaterfallChartStackedType;
  /**
   * Controls whether to display additional data labels on stacked charts which sum the total value of all stacked
   * values at each value along the domain axis. stackedType must be STACKED and neither CUSTOM nor placement can be set
   * on the totalDataLabel.
   */
  totalDataLabel?: DataLabel;
}

/** The domain of a waterfall chart. */
interface WaterfallChartDomain {
  /** The data of the WaterfallChartDomain. */
  data: ChartData;
  /** True to reverse the order of the domain values (horizontal axis). */
  reversed: boolean;
}

/** A single series of data for a waterfall chart. */
interface WaterfallChartSeries {
  /**
   * Custom subtotal columns appearing in this series. The order in which subtotals are defined is not significant. Only
   * one subtotal may be defined for each data point.
   */
  customSubtotals: WaterfallChartCustomSubtotal[];
  /** The data being visualized in this series. */
  data: ChartData;
  /** Information about the data labels for this series. */
  dataLabel: DataLabel;
  /**
   * True to hide the subtotal column from the end of the series. By default, a subtotal column will appear at the end
   * of each series. Setting this field to true will hide that subtotal column for this series.
   */
  hideTrailingSubtotal: boolean;
  /** Styles for all columns in this series with negative values. */
  negativeColumnsStyle: WaterfallChartColumnStyle;
  /** Styles for all columns in this series with positive values. */
  positiveColumnsStyle: WaterfallChartColumnStyle;
  /** Styles for all subtotal columns in this series. */
  subtotalColumnsStyle: WaterfallChartColumnStyle;
}

/** Styles for a waterfall chart column. */
interface WaterfallChartColumnStyle {
  /** The label of the column's legend. */
  label: string;
  /**
   * The color of the column.
   * @deprecated Use colorStyle.
   */
  color?: Color;
  /** The color of the column. If color is also set, this field takes precedence. */
  colorStyle?: ColorStyle;
}

/** A custom subtotal column for a waterfall chart series. */
interface WaterfallChartCustomSubtotal {
  /**
   * True if the data point at subtotalIndex is the subtotal. If false, the subtotal will be computed and appear after
   * the data point.
   */
  dataIsSubtotal: boolean;
  /** A label for the subtotal column. */
  label: string;
  /**
   * The zero-based index of a data point within the series. If dataIsSubtotal is true, the data point at this index is
   * the subtotal. Otherwise, the subtotal appears after the data point with this index. A series can have multiple
   * subtotals at arbitrary indices, but subtotals do not affect the indices of the data points. For example, if a
   * series has three data points, their indices will always be 0, 1, and 2, regardless of how many subtotals exist on
   * the series or what data points they are associated with.
   */
  subtotalIndex: number;
}

/** Stacked type options for waterfall charts. */
enum WaterfallChartStackedType {
  /** Series will spread out along the horizontal axis. */
  Sequential = "SEQUENTIAL",
  /** Values corresponding to the same domain (horizontal axis) value will be stacked vertically. */
  Stacked = "STACKED",
  /** Default value, do not use. */
  Unspecified = "WATERFALL_STACKED_TYPE_UNSPECIFIED",
}

/** A Treemap chart. */
interface TreemapChartSpec {
  /** The data that contains the treemap cell labels. */
  labels: ChartData;
  /** The data the contains the treemap cells' parent labels. */
  parentLabels: ChartData;
  /**
   * The data that determines the size of each treemap data cell. This data is expected to be numeric. The cells
   * corresponding to non-numeric or missing data will not be rendered. If colorData is not specified, this data is used
   * to determine data cell background colors as well.
   */
  sizeData: ChartData;
  /**
   * The data that determines the background color of each treemap data cell. This field is optional. If not specified,
   * sizeData is used to determine background colors. If specified, the data is expected to be numeric. colorScale will
   * determine how the values in this data map to data cell background colors.
   */
  colorData?: ChartData;
  /**
   * The color scale for data cells in the treemap chart. Data cells are assigned colors based on their color values.
   * These color values come from colorData, or from sizeData if colorData is not specified. Cells with color values
   * less than or equal to minValue will have minValueColor as their background color. Cells with color values greater
   * than or equal to maxValue will have maxValueColor as their background color. Cells with color values between
   * minValue and maxValue will have background colors on a gradient between minValueColor and maxValueColor, the
   * midpoint of the gradient being midValueColor. Cells with missing or non-numeric color values will have noDataColor
   * as their background color.
   */
  colorScale?: TreemapChartColorScale;
  /**
   * The background color for header cells.
   * @deprecated Use headerColorStyle.
   */
  headerColor?: Color;
  /** The background color for header cells. If headerColor is also set, this field takes precedence. */
  headerColorStyle?: ColorStyle;
  /** True to hide tooltips. */
  hideTooltips?: boolean;
  /**
   * The number of additional data levels beyond the labeled levels to be shown on the treemap chart. These levels are
   * not interactive and are shown without their labels. Defaults to 0 if not specified.
   */
  hintedLevels?: number;
  /**
   * The number of data levels to show on the treemap chart. These levels are interactive and are shown with their
   * labels. Defaults to 2 if not specified.
   */
  levels?: number;
  /**
   * The maximum possible data value. Cells with values greater than this will have the same color as cells with this
   * value. If not specified, defaults to the actual maximum value from colorData, or the maximum value from sizeData if
   * colorData is not specified.
   */
  maxValue?: number;
  /**
   * The minimum possible data value. Cells with values less than this will have the same color as cells with this
   * value. If not specified, defaults to the actual minimum value from colorData, or the minimum value from sizeData if
   * colorData is not specified.
   */
  minValue?: number;
  /** The text format for all labels on the chart. The link field is not supported. */
  textFormat?: TextFormat;
}

/** A color scale for a treemap chart. */
interface TreemapChartColorScale {
  /**
   * The background color for cells with a color value greater than or equal to maxValue. Defaults to #109618 if not
   * specified.
   * @deprecated Use maxValueColorStyle.
   */
  maxValueColor?: Color;
  /**
   * The background color for cells with a color value greater than or equal to maxValue. Defaults to #109618 if not
   * specified. If maxValueColor is also set, this field takes precedence.
   */
  maxValueColorStyle?: ColorStyle;
  /**
   * The background color for cells with a color value at the midpoint between minValue and maxValue. Defaults to
   * #efe6dc if not specified.
   * @deprecated Use midValueColorStyle.
   */
  midValueColor?: Color;
  /**
   * The background color for cells with a color value at the midpoint between minValue and maxValue. Defaults to
   * #efe6dc if not specified. If midValueColor is also set, this field takes precedence.
   */
  midValueColorStyle?: ColorStyle;
  /**
   * The background color for cells with a color value less than or equal to minValue. Defaults to #dc3912 if not
   * specified.
   * @deprecated Use minValueColorStyle.
   */
  minValueColor?: Color;
  /**
   * The background color for cells with a color value less than or equal to minValue. Defaults to #dc3912 if not
   * specified. If minValueColor is also set, this field takes precedence.
   */
  minValueColorStyle?: ColorStyle;
  /**
   * The background color for cells that have no color data associated with them. Defaults to #000000 if not specified.
   * @deprecated Use noDataColorStyle.
   */
  noDataColor?: Color;
  /**
   * The background color for cells that have no color data associated with them. Defaults to #000000 if not specified.
   * If noDataColor is also set, this field takes precedence.
   */
  noDataColorStyle?: ColorStyle;
}

/**
 * A scorecard chart. Scorecard charts are used to highlight key performance indicators, known as KPIs, on the
 * spreadsheet. A scorecard chart can represent things like total sales, average cost, or a top selling item. You can
 * specify a single data value, or aggregate over a range of data. Percentage or absolute difference from a baseline
 * value can be highlighted, like changes over time.
 */
interface ScorecardChartSpec {
  /** The data for scorecard key value. */
  keyValueData: ChartData;
  /** Formatting options for key value. */
  keyValueFormat: KeyValueFormat;
  /**
   * The aggregation type for key and baseline chart data in scorecard chart. This field is not supported for data
   * source charts. Use the ChartData.aggregateType field of the keyValueData or baselineValueData instead for data
   * source charts. This field is optional.
   */
  aggregateType?: ChartAggregateType;
  /** The data for scorecard baseline value. This field is optional. */
  baselineValueData?: ChartData;
  /** Formatting options for baseline value. This field is needed only if baselineValueData is specified. */
  baselineValueFormat?: BaselineValueFormat;
  /**
   * Custom formatting options for numeric key/baseline values in scorecard chart. This field is used only when
   * numberFormatSource is set to CUSTOM. This field is optional.
   */
  customFormatOptions?: ChartCustomNumberFormatOptions;
  /** The number format source used in the scorecard chart. This field is optional. */
  numberFormatSource?: ChartNumberFormatSource;
  /**
   * Value to scale scorecard key and baseline value. For example, a factor of 10 can be used to divide all values in
   * the chart by 10. This field is optional.
   */
  scaleFactor?: number;
}

/** Formatting options for key value. */
interface KeyValueFormat {
  /**
   * Specifies the horizontal text positioning of key value. This field is optional. If not specified, default
   * positioning is used.
   */
  position?: TextPosition;
  /** Text formatting options for key value. The link field is not supported. */
  textFormat?: TextFormat;
}

/** Formatting options for baseline value. */
interface BaselineValueFormat {
  /** The comparison type of key value with baseline value. */
  comparisonType: ComparisonType;
  /** Description which is appended after the baseline value. This field is optional. */
  description?: string;
  /**
   * Color to be used, in case baseline value represents a negative change for key value. This field is optional.
   * @deprecated Use negativeColorStyle.
   */
  negativeColor?: Color;
  /**
   * Color to be used, in case baseline value represents a negative change for key value. This field is optional. If
   * negativeColor is also set, this field takes precedence.
   */
  negativeColorStyle?: ColorStyle;
  /**
   * Specifies the horizontal text positioning of baseline value. This field is optional. If not specified, default
   * positioning is used.
   */
  position?: TextPosition;
  /**
   * Color to be used, in case baseline value represents a positive change for key value. This field is optional.
   * @deprecated Use positiveColorStyle.
   */
  positiveColor?: Color;
  /**
   * Color to be used, in case baseline value represents a positive change for key value. This field is optional. If
   * positiveColor is also set, this field takes precedence.
   */
  positiveColorStyle?: ColorStyle;
  /** Text formatting options for baseline value. The link field is not supported. */
  textFormat?: TextFormat;
}

/** The comparison type of key value with baseline value. */
enum ComparisonType {
  /** Use absolute difference between key and baseline value. */
  AbsoluteDifference = "ABSOLUTE_DIFFERENCE",
  /** Use percentage difference between key and baseline value. */
  PercentageDifference = "PERCENTAGE_DIFFERENCE",
  /** Default value, do not use. */
  Unspecified = "COMPARISON_TYPE_UNDEFINED",
}

/** The number formatting source options for chart attributes. */
enum ChartNumberFormatSource {
  /** Apply custom formatting as specified by ChartCustomNumberFormatOptions. */
  Custom = "CUSTOM",
  /** Inherit number formatting from data. */
  FromData = "FROM_DATA",
  /** Default value, do not use. */
  Undefined = "CHART_NUMBER_FORMAT_SOURCE_UNDEFINED",
}

/** Custom number formatting options for chart attributes. */
interface ChartCustomNumberFormatOptions {
  /** Custom prefix to be prepended to the chart attribute. This field is optional. */
  prefix?: string;
  /** Custom suffix to be appended to the chart attribute. This field is optional. */
  suffix?: string;
}

/**
 * Determines how charts should handle source rows that are hidden. Hidden rows include both manually hidden and hidden
 * by a filter.
 */
enum ChartHiddenDimensionStrategy {
  /** Charts will not skip any hidden rows or columns. */
  ShowAll = "SHOW_ALL",
  /** Charts will skip hidden columns only. */
  SkipHiddenColumns = "SKIP_HIDDEN_COLUMNS",
  /** Charts will skip hidden rows only. */
  SkipHiddenRows = "SKIP_HIDDEN_ROWS",
  /** Charts will skip hidden rows and columns. */
  SkipHiddenRowsAndColumns = "SKIP_HIDDEN_ROWS_AND_COLUMNS",
  /** Default value, do not use. */
  Unspecified = "CHART_HIDDEN_DIMENSION_STRATEGY_UNSPECIFIED",
}

/** A border along an embedded object. */
interface EmbeddedObjectBorder {
  /**
   * The color of the border.
   * @deprecated Use colorStyle.
   */
  color?: Color;
  /** The color of the border. If color is also set, this field takes precedence. */
  colorStyle?: ColorStyle;
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
