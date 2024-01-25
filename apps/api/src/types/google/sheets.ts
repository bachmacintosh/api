/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/sort-type-constituents */

/*
THIS IS AN AUTO-GENERATED DOCUMENT.

TITLE: Google Sheets API
DESCRIPTION: Reads and writes Google Sheets.
ROOT URL: https://sheets.googleapis.com/
DOCUMENTATION: https://developers.google.com/sheets/
REVISION DATE: 20240116
*/

/*
SCHEMAS
*/
/**
 * Adds a new banded range to the spreadsheet.
 */
export interface AddBandingRequest {
  /**
   * The banded range to add. The bandedRangeId field is optional; if one is not set, an id will be randomly generated. (It is an error to specify the ID of a range that already exists.)
   */
  bandedRange?: BandedRange;
}
/**
 * The result of adding a banded range.
 */
export interface AddBandingResponse {
  /**
   * The banded range that was added.
   */
  bandedRange?: BandedRange;
}
/**
 * Adds a chart to a sheet in the spreadsheet.
 */
export interface AddChartRequest {
  /**
   * The chart that should be added to the spreadsheet, including the position where it should be placed. The chartId field is optional; if one is not set, an id will be randomly generated. (It is an error to specify the ID of an embedded object that already exists.)
   */
  chart?: EmbeddedChart;
}
/**
 * The result of adding a chart to a spreadsheet.
 */
export interface AddChartResponse {
  /**
   * The newly added chart.
   */
  chart?: EmbeddedChart;
}
/**
 * Adds a new conditional format rule at the given index. All subsequent rules&#39; indexes are incremented.
 */
export interface AddConditionalFormatRuleRequest {
  /**
   * The zero-based index where the rule should be inserted.
   */
  index?: number | null;
  /**
   * The rule to add.
   */
  rule?: ConditionalFormatRule;
}
/**
 * Adds a data source. After the data source is added successfully, an associated DATA_SOURCE sheet is created and an execution is triggered to refresh the sheet to read data from the data source. The request requires an additional `bigquery.readonly` OAuth scope.
 */
export interface AddDataSourceRequest {
  /**
   * The data source to add.
   */
  dataSource?: DataSource;
}
/**
 * The result of adding a data source.
 */
export interface AddDataSourceResponse {
  /**
   * The data execution status.
   */
  dataExecutionStatus?: DataExecutionStatus;
  /**
   * The data source that was created.
   */
  dataSource?: DataSource;
}
/**
 * Creates a group over the specified range. If the requested range is a superset of the range of an existing group G, then the depth of G is incremented and this new group G&#39; has the depth of that group. For example, a group [C:D, depth 1] + [B:E] results in groups [B:E, depth 1] and [C:D, depth 2]. If the requested range is a subset of the range of an existing group G, then the depth of the new group G&#39; becomes one greater than the depth of G. For example, a group [B:E, depth 1] + [C:D] results in groups [B:E, depth 1] and [C:D, depth 2]. If the requested range starts before and ends within, or starts within and ends after, the range of an existing group G, then the range of the existing group G becomes the union of the ranges, and the new group G&#39; has depth one greater than the depth of G and range as the intersection of the ranges. For example, a group [B:D, depth 1] + [C:E] results in groups [B:E, depth 1] and [C:D, depth 2].
 */
export interface AddDimensionGroupRequest {
  /**
   * The range over which to create a group.
   */
  range?: DimensionRange;
}
/**
 * The result of adding a group.
 */
export interface AddDimensionGroupResponse {
  /**
   * All groups of a dimension after adding a group to that dimension.
   */
  dimensionGroups?: DimensionGroup[] | null;
}
/**
 * Adds a filter view.
 */
export interface AddFilterViewRequest {
  /**
   * The filter to add. The filterViewId field is optional; if one is not set, an id will be randomly generated. (It is an error to specify the ID of a filter that already exists.)
   */
  filter?: FilterView;
}
/**
 * The result of adding a filter view.
 */
export interface AddFilterViewResponse {
  /**
   * The newly added filter view.
   */
  filter?: FilterView;
}
/**
 * Adds a named range to the spreadsheet.
 */
export interface AddNamedRangeRequest {
  /**
   * The named range to add. The namedRangeId field is optional; if one is not set, an id will be randomly generated. (It is an error to specify the ID of a range that already exists.)
   */
  namedRange?: NamedRange;
}
/**
 * The result of adding a named range.
 */
export interface AddNamedRangeResponse {
  /**
   * The named range to add.
   */
  namedRange?: NamedRange;
}
/**
 * Adds a new protected range.
 */
export interface AddProtectedRangeRequest {
  /**
   * The protected range to be added. The protectedRangeId field is optional; if one is not set, an id will be randomly generated. (It is an error to specify the ID of a range that already exists.)
   */
  protectedRange?: ProtectedRange;
}
/**
 * The result of adding a new protected range.
 */
export interface AddProtectedRangeResponse {
  /**
   * The newly added protected range.
   */
  protectedRange?: ProtectedRange;
}
/**
 * Adds a new sheet. When a sheet is added at a given index, all subsequent sheets&#39; indexes are incremented. To add an object sheet, use AddChartRequest instead and specify EmbeddedObjectPosition.sheetId or EmbeddedObjectPosition.newSheet.
 */
export interface AddSheetRequest {
  /**
   * The properties the new sheet should have. All properties are optional. The sheetId field is optional; if one is not set, an id will be randomly generated. (It is an error to specify the ID of a sheet that already exists.)
   */
  properties?: SheetProperties;
}
/**
 * The result of adding a sheet.
 */
export interface AddSheetResponse {
  /**
   * The properties of the newly added sheet.
   */
  properties?: SheetProperties;
}
/**
 * Adds a slicer to a sheet in the spreadsheet.
 */
export interface AddSlicerRequest {
  /**
   * The slicer that should be added to the spreadsheet, including the position where it should be placed. The slicerId field is optional; if one is not set, an id will be randomly generated. (It is an error to specify the ID of a slicer that already exists.)
   */
  slicer?: Slicer;
}
/**
 * The result of adding a slicer to a spreadsheet.
 */
export interface AddSlicerResponse {
  /**
   * The newly added slicer.
   */
  slicer?: Slicer;
}
/**
 * Adds new cells after the last row with data in a sheet, inserting new rows into the sheet if necessary.
 */
export interface AppendCellsRequest {
  /**
   * The fields of CellData that should be updated. At least one field must be specified. The root is the CellData; 'row.values.' should not be specified. A single `"*"` can be used as short-hand for listing every field.
   */
  fields?: string | null;
  /**
   * The data to append.
   */
  rows?: RowData[] | null;
  /**
   * The sheet ID to append the data to.
   */
  sheetId?: number | null;
}
/**
 * Appends rows or columns to the end of a sheet.
 */
export interface AppendDimensionRequest {
  /**
   * Whether rows or columns should be appended.
   *
   * Enumerated Values:
   * - DIMENSION_UNSPECIFIED: The default value, do not use.
   * - ROWS: Operates on the rows of a sheet.
   * - COLUMNS: Operates on the columns of a sheet.
   */
  dimension?: ("DIMENSION_UNSPECIFIED" | "ROWS" | "COLUMNS") | null;
  /**
   * The number of rows or columns to append.
   */
  length?: number | null;
  /**
   * The sheet to append rows or columns to.
   */
  sheetId?: number | null;
}
/**
 * The response when updating a range of values in a spreadsheet.
 */
export interface AppendValuesResponse {
  /**
   * The spreadsheet the updates were applied to.
   */
  spreadsheetId?: string | null;
  /**
   * The range (in A1 notation) of the table that values are being appended to (before the values were appended). Empty if no table was found.
   */
  tableRange?: string | null;
  /**
   * Information about the updates that were applied.
   */
  updates?: UpdateValuesResponse;
}
/**
 * Fills in more data based on existing data.
 */
export interface AutoFillRequest {
  /**
   * The range to autofill. This will examine the range and detect the location that has data and automatically fill that data in to the rest of the range.
   */
  range?: GridRange;
  /**
   * The source and destination areas to autofill. This explicitly lists the source of the autofill and where to extend that data.
   */
  sourceAndDestination?: SourceAndDestination;
  /**
   * True if we should generate data with the "alternate" series. This differs based on the type and amount of source data.
   */
  useAlternateSeries?: boolean | null;
}
/**
 * Automatically resizes one or more dimensions based on the contents of the cells in that dimension.
 */
export interface AutoResizeDimensionsRequest {
  /**
   * The dimensions on a data source sheet to automatically resize.
   */
  dataSourceSheetDimensions?: DataSourceSheetDimensionRange;
  /**
   * The dimensions to automatically resize.
   */
  dimensions?: DimensionRange;
}
/**
 * A banded (alternating colors) range in a sheet.
 */
export interface BandedRange {
  /**
   * The ID of the banded range.
   */
  bandedRangeId?: number | null;
  /**
   * Properties for column bands. These properties are applied on a column- by-column basis throughout all the columns in the range. At least one of row_properties or column_properties must be specified.
   */
  columnProperties?: BandingProperties;
  /**
   * The range over which these properties are applied.
   */
  range?: GridRange;
  /**
   * Properties for row bands. These properties are applied on a row-by-row basis throughout all the rows in the range. At least one of row_properties or column_properties must be specified.
   */
  rowProperties?: BandingProperties;
}
/**
 * Properties referring a single dimension (either row or column). If both BandedRange.row_properties and BandedRange.column_properties are set, the fill colors are applied to cells according to the following rules: * header_color and footer_color take priority over band colors. * first_band_color takes priority over second_band_color. * row_properties takes priority over column_properties. For example, the first row color takes priority over the first column color, but the first column color takes priority over the second row color. Similarly, the row header takes priority over the column header in the top left cell, but the column header takes priority over the first row color if the row header is not set.
 */
export interface BandingProperties {
  /**
   * The first color that is alternating. (Required) Deprecated: Use first_band_color_style.
   *
   * @deprecated
   */
  firstBandColor?: Color;
  /**
   * The first color that is alternating. (Required) If first_band_color is also set, this field takes precedence.
   */
  firstBandColorStyle?: ColorStyle;
  /**
   * The color of the last row or column. If this field is not set, the last row or column is filled with either first_band_color or second_band_color, depending on the color of the previous row or column. Deprecated: Use footer_color_style.
   *
   * @deprecated
   */
  footerColor?: Color;
  /**
   * The color of the last row or column. If this field is not set, the last row or column is filled with either first_band_color or second_band_color, depending on the color of the previous row or column. If footer_color is also set, this field takes precedence.
   */
  footerColorStyle?: ColorStyle;
  /**
   * The color of the first row or column. If this field is set, the first row or column is filled with this color and the colors alternate between first_band_color and second_band_color starting from the second row or column. Otherwise, the first row or column is filled with first_band_color and the colors proceed to alternate as they normally would. Deprecated: Use header_color_style.
   *
   * @deprecated
   */
  headerColor?: Color;
  /**
   * The color of the first row or column. If this field is set, the first row or column is filled with this color and the colors alternate between first_band_color and second_band_color starting from the second row or column. Otherwise, the first row or column is filled with first_band_color and the colors proceed to alternate as they normally would. If header_color is also set, this field takes precedence.
   */
  headerColorStyle?: ColorStyle;
  /**
   * The second color that is alternating. (Required) Deprecated: Use second_band_color_style.
   *
   * @deprecated
   */
  secondBandColor?: Color;
  /**
   * The second color that is alternating. (Required) If second_band_color is also set, this field takes precedence.
   */
  secondBandColorStyle?: ColorStyle;
}
/**
 * Formatting options for baseline value.
 */
export interface BaselineValueFormat {
  /**
   * The comparison type of key value with baseline value.
   *
   * Enumerated Values:
   * - COMPARISON_TYPE_UNDEFINED: Default value, do not use.
   * - ABSOLUTE_DIFFERENCE: Use absolute difference between key and baseline value.
   * - PERCENTAGE_DIFFERENCE: Use percentage difference between key and baseline value.
   */
  comparisonType?: ("COMPARISON_TYPE_UNDEFINED" | "ABSOLUTE_DIFFERENCE" | "PERCENTAGE_DIFFERENCE") | null;
  /**
   * Description which is appended after the baseline value. This field is optional.
   */
  description?: string | null;
  /**
   * Color to be used, in case baseline value represents a negative change for key value. This field is optional. Deprecated: Use negative_color_style.
   *
   * @deprecated
   */
  negativeColor?: Color;
  /**
   * Color to be used, in case baseline value represents a negative change for key value. This field is optional. If negative_color is also set, this field takes precedence.
   */
  negativeColorStyle?: ColorStyle;
  /**
   * Specifies the horizontal text positioning of baseline value. This field is optional. If not specified, default positioning is used.
   */
  position?: TextPosition;
  /**
   * Color to be used, in case baseline value represents a positive change for key value. This field is optional. Deprecated: Use positive_color_style.
   *
   * @deprecated
   */
  positiveColor?: Color;
  /**
   * Color to be used, in case baseline value represents a positive change for key value. This field is optional. If positive_color is also set, this field takes precedence.
   */
  positiveColorStyle?: ColorStyle;
  /**
   * Text formatting options for baseline value. The link field is not supported.
   */
  textFormat?: TextFormat;
}
/**
 * An axis of the chart. A chart may not have more than one axis per axis position.
 */
export interface BasicChartAxis {
  /**
   * The format of the title. Only valid if the axis is not associated with the domain. The link field is not supported.
   */
  format?: TextFormat;
  /**
   * The position of this axis.
   *
   * Enumerated Values:
   * - BASIC_CHART_AXIS_POSITION_UNSPECIFIED: Default value, do not use.
   * - BOTTOM_AXIS: The axis rendered at the bottom of a chart. For most charts, this is the standard major axis. For bar charts, this is a minor axis.
   * - LEFT_AXIS: The axis rendered at the left of a chart. For most charts, this is a minor axis. For bar charts, this is the standard major axis.
   * - RIGHT_AXIS: The axis rendered at the right of a chart. For most charts, this is a minor axis. For bar charts, this is an unusual major axis.
   */
  position?: ("BASIC_CHART_AXIS_POSITION_UNSPECIFIED" | "BOTTOM_AXIS" | "LEFT_AXIS" | "RIGHT_AXIS") | null;
  /**
   * The title of this axis. If set, this overrides any title inferred from headers of the data.
   */
  title?: string | null;
  /**
   * The axis title text position.
   */
  titleTextPosition?: TextPosition;
  /**
   * The view window options for this axis.
   */
  viewWindowOptions?: ChartAxisViewWindowOptions;
}
/**
 * The domain of a chart. For example, if charting stock prices over time, this would be the date.
 */
export interface BasicChartDomain {
  /**
   * The data of the domain. For example, if charting stock prices over time, this is the data representing the dates.
   */
  domain?: ChartData;
  /**
   * True to reverse the order of the domain values (horizontal axis).
   */
  reversed?: boolean | null;
}
/**
 * A single series of data in a chart. For example, if charting stock prices over time, multiple series may exist, one for the &quot;Open Price&quot;, &quot;High Price&quot;, &quot;Low Price&quot; and &quot;Close Price&quot;.
 */
export interface BasicChartSeries {
  /**
   * The color for elements (such as bars, lines, and points) associated with this series. If empty, a default color is used. Deprecated: Use color_style.
   *
   * @deprecated
   */
  color?: Color;
  /**
   * The color for elements (such as bars, lines, and points) associated with this series. If empty, a default color is used. If color is also set, this field takes precedence.
   */
  colorStyle?: ColorStyle;
  /**
   * Information about the data labels for this series.
   */
  dataLabel?: DataLabel;
  /**
   * The line style of this series. Valid only if the chartType is AREA, LINE, or SCATTER. COMBO charts are also supported if the series chart type is AREA or LINE.
   */
  lineStyle?: LineStyle;
  /**
   * The style for points associated with this series. Valid only if the chartType is AREA, LINE, or SCATTER. COMBO charts are also supported if the series chart type is AREA, LINE, or SCATTER. If empty, a default point style is used.
   */
  pointStyle?: PointStyle;
  /**
   * The data being visualized in this chart series.
   */
  series?: ChartData;
  /**
   * Style override settings for series data points.
   */
  styleOverrides?: BasicSeriesDataPointStyleOverride[] | null;
  /**
   * The minor axis that will specify the range of values for this series. For example, if charting stocks over time, the "Volume" series may want to be pinned to the right with the prices pinned to the left, because the scale of trading volume is different than the scale of prices. It is an error to specify an axis that isn't a valid minor axis for the chart's type.
   *
   * Enumerated Values:
   * - BASIC_CHART_AXIS_POSITION_UNSPECIFIED: Default value, do not use.
   * - BOTTOM_AXIS: The axis rendered at the bottom of a chart. For most charts, this is the standard major axis. For bar charts, this is a minor axis.
   * - LEFT_AXIS: The axis rendered at the left of a chart. For most charts, this is a minor axis. For bar charts, this is the standard major axis.
   * - RIGHT_AXIS: The axis rendered at the right of a chart. For most charts, this is a minor axis. For bar charts, this is an unusual major axis.
   */
  targetAxis?: ("BASIC_CHART_AXIS_POSITION_UNSPECIFIED" | "BOTTOM_AXIS" | "LEFT_AXIS" | "RIGHT_AXIS") | null;
  /**
   * The type of this series. Valid only if the chartType is COMBO. Different types will change the way the series is visualized. Only LINE, AREA, and COLUMN are supported.
   *
   * Enumerated Values:
   * - BASIC_CHART_TYPE_UNSPECIFIED: Default value, do not use.
   * - BAR: A bar chart.
   * - LINE: A line chart.
   * - AREA: An area chart.
   * - COLUMN: A column chart.
   * - SCATTER: A scatter chart.
   * - COMBO: A combo chart.
   * - STEPPED_AREA: A stepped area chart.
   */
  type?:
    | ("BASIC_CHART_TYPE_UNSPECIFIED" | "BAR" | "LINE" | "AREA" | "COLUMN" | "SCATTER" | "COMBO" | "STEPPED_AREA")
    | null;
}
/**
 * The specification for a basic chart. See BasicChartType for the list of charts this supports.
 */
export interface BasicChartSpec {
  /**
   * The axis on the chart.
   */
  axis?: BasicChartAxis[] | null;
  /**
   * The type of the chart.
   *
   * Enumerated Values:
   * - BASIC_CHART_TYPE_UNSPECIFIED: Default value, do not use.
   * - BAR: A bar chart.
   * - LINE: A line chart.
   * - AREA: An area chart.
   * - COLUMN: A column chart.
   * - SCATTER: A scatter chart.
   * - COMBO: A combo chart.
   * - STEPPED_AREA: A stepped area chart.
   */
  chartType?:
    | ("BASIC_CHART_TYPE_UNSPECIFIED" | "BAR" | "LINE" | "AREA" | "COLUMN" | "SCATTER" | "COMBO" | "STEPPED_AREA")
    | null;
  /**
   * The behavior of tooltips and data highlighting when hovering on data and chart area.
   *
   * Enumerated Values:
   * - BASIC_CHART_COMPARE_MODE_UNSPECIFIED: Default value, do not use.
   * - DATUM: Only the focused data element is highlighted and shown in the tooltip.
   * - CATEGORY: All data elements with the same category (e.g., domain value) are highlighted and shown in the tooltip.
   */
  compareMode?: ("BASIC_CHART_COMPARE_MODE_UNSPECIFIED" | "DATUM" | "CATEGORY") | null;
  /**
   * The domain of data this is charting. Only a single domain is supported.
   */
  domains?: BasicChartDomain[] | null;
  /**
   * The number of rows or columns in the data that are "headers". If not set, Google Sheets will guess how many rows are headers based on the data. (Note that BasicChartAxis.title may override the axis title inferred from the header values.)
   */
  headerCount?: number | null;
  /**
   * If some values in a series are missing, gaps may appear in the chart (e.g, segments of lines in a line chart will be missing). To eliminate these gaps set this to true. Applies to Line, Area, and Combo charts.
   */
  interpolateNulls?: boolean | null;
  /**
   * The position of the chart legend.
   *
   * Enumerated Values:
   * - BASIC_CHART_LEGEND_POSITION_UNSPECIFIED: Default value, do not use.
   * - BOTTOM_LEGEND: The legend is rendered on the bottom of the chart.
   * - LEFT_LEGEND: The legend is rendered on the left of the chart.
   * - RIGHT_LEGEND: The legend is rendered on the right of the chart.
   * - TOP_LEGEND: The legend is rendered on the top of the chart.
   * - NO_LEGEND: No legend is rendered.
   */
  legendPosition?:
    | (
        | "BASIC_CHART_LEGEND_POSITION_UNSPECIFIED"
        | "BOTTOM_LEGEND"
        | "LEFT_LEGEND"
        | "RIGHT_LEGEND"
        | "TOP_LEGEND"
        | "NO_LEGEND"
      )
    | null;
  /**
   * Gets whether all lines should be rendered smooth or straight by default. Applies to Line charts.
   */
  lineSmoothing?: boolean | null;
  /**
   * The data this chart is visualizing.
   */
  series?: BasicChartSeries[] | null;
  /**
   * The stacked type for charts that support vertical stacking. Applies to Area, Bar, Column, Combo, and Stepped Area charts.
   *
   * Enumerated Values:
   * - BASIC_CHART_STACKED_TYPE_UNSPECIFIED: Default value, do not use.
   * - NOT_STACKED: Series are not stacked.
   * - STACKED: Series values are stacked, each value is rendered vertically beginning from the top of the value below it.
   * - PERCENT_STACKED: Vertical stacks are stretched to reach the top of the chart, with values laid out as percentages of each other.
   */
  stackedType?: ("BASIC_CHART_STACKED_TYPE_UNSPECIFIED" | "NOT_STACKED" | "STACKED" | "PERCENT_STACKED") | null;
  /**
   * True to make the chart 3D. Applies to Bar and Column charts.
   */
  threeDimensional?: boolean | null;
  /**
   * Controls whether to display additional data labels on stacked charts which sum the total value of all stacked values at each value along the domain axis. These data labels can only be set when chart_type is one of AREA, BAR, COLUMN, COMBO or STEPPED_AREA and stacked_type is either STACKED or PERCENT_STACKED. In addition, for COMBO, this will only be supported if there is only one type of stackable series type or one type has more series than the others and each of the other types have no more than one series. For example, if a chart has two stacked bar series and one area series, the total data labels will be supported. If it has three bar series and two area series, total data labels are not allowed. Neither CUSTOM nor placement can be set on the total_data_label.
   */
  totalDataLabel?: DataLabel;
}
/**
 * The default filter associated with a sheet.
 */
export interface BasicFilter {
  /**
   * The criteria for showing/hiding values per column. The map's key is the column index, and the value is the criteria for that column. This field is deprecated in favor of filter_specs.
   *
   * @deprecated
   */
  criteria?: { [key: string]: FilterCriteria } | null;
  /**
   * The filter criteria per column. Both criteria and filter_specs are populated in responses. If both fields are specified in an update request, this field takes precedence.
   */
  filterSpecs?: FilterSpec[] | null;
  /**
   * The range the filter covers.
   */
  range?: GridRange;
  /**
   * The sort order per column. Later specifications are used when values are equal in the earlier specifications.
   */
  sortSpecs?: SortSpec[] | null;
}
/**
 * Style override settings for a single series data point.
 */
export interface BasicSeriesDataPointStyleOverride {
  /**
   * Color of the series data point. If empty, the series default is used. Deprecated: Use color_style.
   *
   * @deprecated
   */
  color?: Color;
  /**
   * Color of the series data point. If empty, the series default is used. If color is also set, this field takes precedence.
   */
  colorStyle?: ColorStyle;
  /**
   * The zero-based index of the series data point.
   */
  index?: number | null;
  /**
   * Point style of the series data point. Valid only if the chartType is AREA, LINE, or SCATTER. COMBO charts are also supported if the series chart type is AREA, LINE, or SCATTER. If empty, the series default is used.
   */
  pointStyle?: PointStyle;
}
/**
 * The request for clearing more than one range selected by a DataFilter in a spreadsheet.
 */
export interface BatchClearValuesByDataFilterRequest {
  /**
   * The DataFilters used to determine which ranges to clear.
   */
  dataFilters?: DataFilter[] | null;
}
/**
 * The response when clearing a range of values selected with DataFilters in a spreadsheet.
 */
export interface BatchClearValuesByDataFilterResponse {
  /**
   * The ranges that were cleared, in [A1 notation](/sheets/api/guides/concepts#cell). If the requests are for an unbounded range or a ranger larger than the bounds of the sheet, this is the actual ranges that were cleared, bounded to the sheet's limits.
   */
  clearedRanges?: string[] | null;
  /**
   * The spreadsheet the updates were applied to.
   */
  spreadsheetId?: string | null;
}
/**
 * The request for clearing more than one range of values in a spreadsheet.
 */
export interface BatchClearValuesRequest {
  /**
   * The ranges to clear, in [A1 notation or R1C1 notation](/sheets/api/guides/concepts#cell).
   */
  ranges?: string[] | null;
}
/**
 * The response when clearing a range of values in a spreadsheet.
 */
export interface BatchClearValuesResponse {
  /**
   * The ranges that were cleared, in A1 notation. If the requests are for an unbounded range or a ranger larger than the bounds of the sheet, this is the actual ranges that were cleared, bounded to the sheet's limits.
   */
  clearedRanges?: string[] | null;
  /**
   * The spreadsheet the updates were applied to.
   */
  spreadsheetId?: string | null;
}
/**
 * The request for retrieving a range of values in a spreadsheet selected by a set of DataFilters.
 */
export interface BatchGetValuesByDataFilterRequest {
  /**
   * The data filters used to match the ranges of values to retrieve. Ranges that match any of the specified data filters are included in the response.
   */
  dataFilters?: DataFilter[] | null;
  /**
   * How dates, times, and durations should be represented in the output. This is ignored if value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER.
   *
   * Enumerated Values:
   * - SERIAL_NUMBER: Instructs date, time, datetime, and duration fields to be output as doubles in "serial number" format, as popularized by Lotus 1-2-3. The whole number portion of the value (left of the decimal) counts the days since December 30th 1899. The fractional portion (right of the decimal) counts the time as a fraction of the day. For example, January 1st 1900 at noon would be 2.5, 2 because it's 2 days after December 30th 1899, and .5 because noon is half a day. February 1st 1900 at 3pm would be 33.625. This correctly treats the year 1900 as not a leap year.
   * - FORMATTED_STRING: Instructs date, time, datetime, and duration fields to be output as strings in their given number format (which depends on the spreadsheet locale).
   */
  dateTimeRenderOption?: ("SERIAL_NUMBER" | "FORMATTED_STRING") | null;
  /**
   * The major dimension that results should use. For example, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then a request that selects that range and sets `majorDimension=ROWS` returns `[[1,2],[3,4]]`, whereas a request that sets `majorDimension=COLUMNS` returns `[[1,3],[2,4]]`.
   *
   * Enumerated Values:
   * - DIMENSION_UNSPECIFIED: The default value, do not use.
   * - ROWS: Operates on the rows of a sheet.
   * - COLUMNS: Operates on the columns of a sheet.
   */
  majorDimension?: ("DIMENSION_UNSPECIFIED" | "ROWS" | "COLUMNS") | null;
  /**
   * How values should be represented in the output. The default render option is FORMATTED_VALUE.
   *
   * Enumerated Values:
   * - FORMATTED_VALUE: Values will be calculated & formatted in the response according to the cell's formatting. Formatting is based on the spreadsheet's locale, not the requesting user's locale. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return `"$1.23"`.
   * - UNFORMATTED_VALUE: Values will be calculated, but not formatted in the reply. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return the number `1.23`.
   * - FORMULA: Values will not be calculated. The reply will include the formulas. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then A2 would return `"=A1"`. Sheets treats date and time values as decimal values. This lets you perform arithmetic on them in formulas. For more information on interpreting date and time values, see [About date & time values](https://developers.google.com/sheets/api/guides/formats#about_date_time_values).
   */
  valueRenderOption?: ("FORMATTED_VALUE" | "UNFORMATTED_VALUE" | "FORMULA") | null;
}
/**
 * The response when retrieving more than one range of values in a spreadsheet selected by DataFilters.
 */
export interface BatchGetValuesByDataFilterResponse {
  /**
   * The ID of the spreadsheet the data was retrieved from.
   */
  spreadsheetId?: string | null;
  /**
   * The requested values with the list of data filters that matched them.
   */
  valueRanges?: MatchedValueRange[] | null;
}
/**
 * The response when retrieving more than one range of values in a spreadsheet.
 */
export interface BatchGetValuesResponse {
  /**
   * The ID of the spreadsheet the data was retrieved from.
   */
  spreadsheetId?: string | null;
  /**
   * The requested values. The order of the ValueRanges is the same as the order of the requested ranges.
   */
  valueRanges?: ValueRange[] | null;
}
/**
 * The request for updating any aspect of a spreadsheet.
 */
export interface BatchUpdateSpreadsheetRequest {
  /**
   * Determines if the update response should include the spreadsheet resource.
   */
  includeSpreadsheetInResponse?: boolean | null;
  /**
   * A list of updates to apply to the spreadsheet. Requests will be applied in the order they are specified. If any request is not valid, no requests will be applied.
   */
  requests?: Request[] | null;
  /**
   * True if grid data should be returned. Meaningful only if include_spreadsheet_in_response is 'true'. This parameter is ignored if a field mask was set in the request.
   */
  responseIncludeGridData?: boolean | null;
  /**
   * Limits the ranges included in the response spreadsheet. Meaningful only if include_spreadsheet_in_response is 'true'.
   */
  responseRanges?: string[] | null;
}
/**
 * The reply for batch updating a spreadsheet.
 */
export interface BatchUpdateSpreadsheetResponse {
  /**
   * The reply of the updates. This maps 1:1 with the updates, although replies to some requests may be empty.
   */
  replies?: Response[] | null;
  /**
   * The spreadsheet the updates were applied to.
   */
  spreadsheetId?: string | null;
  /**
   * The spreadsheet after updates were applied. This is only set if BatchUpdateSpreadsheetRequest.include_spreadsheet_in_response is `true`.
   */
  updatedSpreadsheet?: Spreadsheet;
}
/**
 * The request for updating more than one range of values in a spreadsheet.
 */
export interface BatchUpdateValuesByDataFilterRequest {
  /**
   * The new values to apply to the spreadsheet. If more than one range is matched by the specified DataFilter the specified values are applied to all of those ranges.
   */
  data?: DataFilterValueRange[] | null;
  /**
   * Determines if the update response should include the values of the cells that were updated. By default, responses do not include the updated values. The `updatedData` field within each of the BatchUpdateValuesResponse.responses contains the updated values. If the range to write was larger than the range actually written, the response includes all values in the requested range (excluding trailing empty rows and columns).
   */
  includeValuesInResponse?: boolean | null;
  /**
   * Determines how dates, times, and durations in the response should be rendered. This is ignored if response_value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER.
   *
   * Enumerated Values:
   * - SERIAL_NUMBER: Instructs date, time, datetime, and duration fields to be output as doubles in "serial number" format, as popularized by Lotus 1-2-3. The whole number portion of the value (left of the decimal) counts the days since December 30th 1899. The fractional portion (right of the decimal) counts the time as a fraction of the day. For example, January 1st 1900 at noon would be 2.5, 2 because it's 2 days after December 30th 1899, and .5 because noon is half a day. February 1st 1900 at 3pm would be 33.625. This correctly treats the year 1900 as not a leap year.
   * - FORMATTED_STRING: Instructs date, time, datetime, and duration fields to be output as strings in their given number format (which depends on the spreadsheet locale).
   */
  responseDateTimeRenderOption?: ("SERIAL_NUMBER" | "FORMATTED_STRING") | null;
  /**
   * Determines how values in the response should be rendered. The default render option is FORMATTED_VALUE.
   *
   * Enumerated Values:
   * - FORMATTED_VALUE: Values will be calculated & formatted in the response according to the cell's formatting. Formatting is based on the spreadsheet's locale, not the requesting user's locale. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return `"$1.23"`.
   * - UNFORMATTED_VALUE: Values will be calculated, but not formatted in the reply. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return the number `1.23`.
   * - FORMULA: Values will not be calculated. The reply will include the formulas. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then A2 would return `"=A1"`. Sheets treats date and time values as decimal values. This lets you perform arithmetic on them in formulas. For more information on interpreting date and time values, see [About date & time values](https://developers.google.com/sheets/api/guides/formats#about_date_time_values).
   */
  responseValueRenderOption?: ("FORMATTED_VALUE" | "UNFORMATTED_VALUE" | "FORMULA") | null;
  /**
   * How the input data should be interpreted.
   *
   * Enumerated Values:
   * - INPUT_VALUE_OPTION_UNSPECIFIED: Default input value. This value must not be used.
   * - RAW: The values the user has entered will not be parsed and will be stored as-is.
   * - USER_ENTERED: The values will be parsed as if the user typed them into the UI. Numbers will stay as numbers, but strings may be converted to numbers, dates, etc. following the same rules that are applied when entering text into a cell via the Google Sheets UI.
   */
  valueInputOption?: ("INPUT_VALUE_OPTION_UNSPECIFIED" | "RAW" | "USER_ENTERED") | null;
}
/**
 * The response when updating a range of values in a spreadsheet.
 */
export interface BatchUpdateValuesByDataFilterResponse {
  /**
   * The response for each range updated.
   */
  responses?: UpdateValuesByDataFilterResponse[] | null;
  /**
   * The spreadsheet the updates were applied to.
   */
  spreadsheetId?: string | null;
  /**
   * The total number of cells updated.
   */
  totalUpdatedCells?: number | null;
  /**
   * The total number of columns where at least one cell in the column was updated.
   */
  totalUpdatedColumns?: number | null;
  /**
   * The total number of rows where at least one cell in the row was updated.
   */
  totalUpdatedRows?: number | null;
  /**
   * The total number of sheets where at least one cell in the sheet was updated.
   */
  totalUpdatedSheets?: number | null;
}
/**
 * The request for updating more than one range of values in a spreadsheet.
 */
export interface BatchUpdateValuesRequest {
  /**
   * The new values to apply to the spreadsheet.
   */
  data?: ValueRange[] | null;
  /**
   * Determines if the update response should include the values of the cells that were updated. By default, responses do not include the updated values. The `updatedData` field within each of the BatchUpdateValuesResponse.responses contains the updated values. If the range to write was larger than the range actually written, the response includes all values in the requested range (excluding trailing empty rows and columns).
   */
  includeValuesInResponse?: boolean | null;
  /**
   * Determines how dates, times, and durations in the response should be rendered. This is ignored if response_value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER.
   *
   * Enumerated Values:
   * - SERIAL_NUMBER: Instructs date, time, datetime, and duration fields to be output as doubles in "serial number" format, as popularized by Lotus 1-2-3. The whole number portion of the value (left of the decimal) counts the days since December 30th 1899. The fractional portion (right of the decimal) counts the time as a fraction of the day. For example, January 1st 1900 at noon would be 2.5, 2 because it's 2 days after December 30th 1899, and .5 because noon is half a day. February 1st 1900 at 3pm would be 33.625. This correctly treats the year 1900 as not a leap year.
   * - FORMATTED_STRING: Instructs date, time, datetime, and duration fields to be output as strings in their given number format (which depends on the spreadsheet locale).
   */
  responseDateTimeRenderOption?: ("SERIAL_NUMBER" | "FORMATTED_STRING") | null;
  /**
   * Determines how values in the response should be rendered. The default render option is FORMATTED_VALUE.
   *
   * Enumerated Values:
   * - FORMATTED_VALUE: Values will be calculated & formatted in the response according to the cell's formatting. Formatting is based on the spreadsheet's locale, not the requesting user's locale. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return `"$1.23"`.
   * - UNFORMATTED_VALUE: Values will be calculated, but not formatted in the reply. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return the number `1.23`.
   * - FORMULA: Values will not be calculated. The reply will include the formulas. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then A2 would return `"=A1"`. Sheets treats date and time values as decimal values. This lets you perform arithmetic on them in formulas. For more information on interpreting date and time values, see [About date & time values](https://developers.google.com/sheets/api/guides/formats#about_date_time_values).
   */
  responseValueRenderOption?: ("FORMATTED_VALUE" | "UNFORMATTED_VALUE" | "FORMULA") | null;
  /**
   * How the input data should be interpreted.
   *
   * Enumerated Values:
   * - INPUT_VALUE_OPTION_UNSPECIFIED: Default input value. This value must not be used.
   * - RAW: The values the user has entered will not be parsed and will be stored as-is.
   * - USER_ENTERED: The values will be parsed as if the user typed them into the UI. Numbers will stay as numbers, but strings may be converted to numbers, dates, etc. following the same rules that are applied when entering text into a cell via the Google Sheets UI.
   */
  valueInputOption?: ("INPUT_VALUE_OPTION_UNSPECIFIED" | "RAW" | "USER_ENTERED") | null;
}
/**
 * The response when updating a range of values in a spreadsheet.
 */
export interface BatchUpdateValuesResponse {
  /**
   * One UpdateValuesResponse per requested range, in the same order as the requests appeared.
   */
  responses?: UpdateValuesResponse[] | null;
  /**
   * The spreadsheet the updates were applied to.
   */
  spreadsheetId?: string | null;
  /**
   * The total number of cells updated.
   */
  totalUpdatedCells?: number | null;
  /**
   * The total number of columns where at least one cell in the column was updated.
   */
  totalUpdatedColumns?: number | null;
  /**
   * The total number of rows where at least one cell in the row was updated.
   */
  totalUpdatedRows?: number | null;
  /**
   * The total number of sheets where at least one cell in the sheet was updated.
   */
  totalUpdatedSheets?: number | null;
}
/**
 * The specification of a BigQuery data source that&#39;s connected to a sheet.
 */
export interface BigQueryDataSourceSpec {
  /**
   * The ID of a BigQuery enabled Google Cloud project with a billing account attached. For any queries executed against the data source, the project is charged.
   */
  projectId?: string | null;
  /**
   * A BigQueryQuerySpec.
   */
  querySpec?: BigQueryQuerySpec;
  /**
   * A BigQueryTableSpec.
   */
  tableSpec?: BigQueryTableSpec;
}
/**
 * Specifies a custom BigQuery query.
 */
export interface BigQueryQuerySpec {
  /**
   * The raw query string.
   */
  rawQuery?: string | null;
}
/**
 * Specifies a BigQuery table definition. Only [native tables](https://cloud.google.com/bigquery/docs/tables-intro) are allowed.
 */
export interface BigQueryTableSpec {
  /**
   * The BigQuery dataset id.
   */
  datasetId?: string | null;
  /**
   * The BigQuery table id.
   */
  tableId?: string | null;
  /**
   * The ID of a BigQuery project the table belongs to. If not specified, the project_id is assumed.
   */
  tableProjectId?: string | null;
}
/**
 * A condition that can evaluate to true or false. BooleanConditions are used by conditional formatting, data validation, and the criteria in filters.
 */
export interface BooleanCondition {
  /**
   * The type of condition.
   *
   * Enumerated Values:
   * - CONDITION_TYPE_UNSPECIFIED: The default value, do not use.
   * - NUMBER_GREATER: The cell's value must be greater than the condition's value. Supported by data validation, conditional formatting and filters. Requires a single ConditionValue.
   * - NUMBER_GREATER_THAN_EQ: The cell's value must be greater than or equal to the condition's value. Supported by data validation, conditional formatting and filters. Requires a single ConditionValue.
   * - NUMBER_LESS: The cell's value must be less than the condition's value. Supported by data validation, conditional formatting and filters. Requires a single ConditionValue.
   * - NUMBER_LESS_THAN_EQ: The cell's value must be less than or equal to the condition's value. Supported by data validation, conditional formatting and filters. Requires a single ConditionValue.
   * - NUMBER_EQ: The cell's value must be equal to the condition's value. Supported by data validation, conditional formatting and filters. Requires a single ConditionValue for data validation, conditional formatting, and filters on non-data source objects and at least one ConditionValue for filters on data source objects.
   * - NUMBER_NOT_EQ: The cell's value must be not equal to the condition's value. Supported by data validation, conditional formatting and filters. Requires a single ConditionValue for data validation, conditional formatting, and filters on non-data source objects and at least one ConditionValue for filters on data source objects.
   * - NUMBER_BETWEEN: The cell's value must be between the two condition values. Supported by data validation, conditional formatting and filters. Requires exactly two ConditionValues.
   * - NUMBER_NOT_BETWEEN: The cell's value must not be between the two condition values. Supported by data validation, conditional formatting and filters. Requires exactly two ConditionValues.
   * - TEXT_CONTAINS: The cell's value must contain the condition's value. Supported by data validation, conditional formatting and filters. Requires a single ConditionValue.
   * - TEXT_NOT_CONTAINS: The cell's value must not contain the condition's value. Supported by data validation, conditional formatting and filters. Requires a single ConditionValue.
   * - TEXT_STARTS_WITH: The cell's value must start with the condition's value. Supported by conditional formatting and filters. Requires a single ConditionValue.
   * - TEXT_ENDS_WITH: The cell's value must end with the condition's value. Supported by conditional formatting and filters. Requires a single ConditionValue.
   * - TEXT_EQ: The cell's value must be exactly the condition's value. Supported by data validation, conditional formatting and filters. Requires a single ConditionValue for data validation, conditional formatting, and filters on non-data source objects and at least one ConditionValue for filters on data source objects.
   * - TEXT_IS_EMAIL: The cell's value must be a valid email address. Supported by data validation. Requires no ConditionValues.
   * - TEXT_IS_URL: The cell's value must be a valid URL. Supported by data validation. Requires no ConditionValues.
   * - DATE_EQ: The cell's value must be the same date as the condition's value. Supported by data validation, conditional formatting and filters. Requires a single ConditionValue for data validation, conditional formatting, and filters on non-data source objects and at least one ConditionValue for filters on data source objects.
   * - DATE_BEFORE: The cell's value must be before the date of the condition's value. Supported by data validation, conditional formatting and filters. Requires a single ConditionValue that may be a relative date.
   * - DATE_AFTER: The cell's value must be after the date of the condition's value. Supported by data validation, conditional formatting and filters. Requires a single ConditionValue that may be a relative date.
   * - DATE_ON_OR_BEFORE: The cell's value must be on or before the date of the condition's value. Supported by data validation. Requires a single ConditionValue that may be a relative date.
   * - DATE_ON_OR_AFTER: The cell's value must be on or after the date of the condition's value. Supported by data validation. Requires a single ConditionValue that may be a relative date.
   * - DATE_BETWEEN: The cell's value must be between the dates of the two condition values. Supported by data validation. Requires exactly two ConditionValues.
   * - DATE_NOT_BETWEEN: The cell's value must be outside the dates of the two condition values. Supported by data validation. Requires exactly two ConditionValues.
   * - DATE_IS_VALID: The cell's value must be a date. Supported by data validation. Requires no ConditionValues.
   * - ONE_OF_RANGE: The cell's value must be listed in the grid in condition value's range. Supported by data validation. Requires a single ConditionValue, and the value must be a valid range in A1 notation.
   * - ONE_OF_LIST: The cell's value must be in the list of condition values. Supported by data validation. Supports any number of condition values, one per item in the list. Formulas are not supported in the values.
   * - BLANK: The cell's value must be empty. Supported by conditional formatting and filters. Requires no ConditionValues.
   * - NOT_BLANK: The cell's value must not be empty. Supported by conditional formatting and filters. Requires no ConditionValues.
   * - CUSTOM_FORMULA: The condition's formula must evaluate to true. Supported by data validation, conditional formatting and filters. Not supported by data source sheet filters. Requires a single ConditionValue.
   * - BOOLEAN: The cell's value must be TRUE/FALSE or in the list of condition values. Supported by data validation. Renders as a cell checkbox. Supports zero, one or two ConditionValues. No values indicates the cell must be TRUE or FALSE, where TRUE renders as checked and FALSE renders as unchecked. One value indicates the cell will render as checked when it contains that value and unchecked when it is blank. Two values indicate that the cell will render as checked when it contains the first value and unchecked when it contains the second value. For example, ["Yes","No"] indicates that the cell will render a checked box when it has the value "Yes" and an unchecked box when it has the value "No".
   * - TEXT_NOT_EQ: The cell's value must be exactly not the condition's value. Supported by filters on data source objects. Requires at least one ConditionValue.
   * - DATE_NOT_EQ: The cell's value must be exactly not the condition's value. Supported by filters on data source objects. Requires at least one ConditionValue.
   * - FILTER_EXPRESSION: The cell's value must follow the pattern specified. Requires a single ConditionValue.
   */
  type?:
    | (
        | "CONDITION_TYPE_UNSPECIFIED"
        | "NUMBER_GREATER"
        | "NUMBER_GREATER_THAN_EQ"
        | "NUMBER_LESS"
        | "NUMBER_LESS_THAN_EQ"
        | "NUMBER_EQ"
        | "NUMBER_NOT_EQ"
        | "NUMBER_BETWEEN"
        | "NUMBER_NOT_BETWEEN"
        | "TEXT_CONTAINS"
        | "TEXT_NOT_CONTAINS"
        | "TEXT_STARTS_WITH"
        | "TEXT_ENDS_WITH"
        | "TEXT_EQ"
        | "TEXT_IS_EMAIL"
        | "TEXT_IS_URL"
        | "DATE_EQ"
        | "DATE_BEFORE"
        | "DATE_AFTER"
        | "DATE_ON_OR_BEFORE"
        | "DATE_ON_OR_AFTER"
        | "DATE_BETWEEN"
        | "DATE_NOT_BETWEEN"
        | "DATE_IS_VALID"
        | "ONE_OF_RANGE"
        | "ONE_OF_LIST"
        | "BLANK"
        | "NOT_BLANK"
        | "CUSTOM_FORMULA"
        | "BOOLEAN"
        | "TEXT_NOT_EQ"
        | "DATE_NOT_EQ"
        | "FILTER_EXPRESSION"
      )
    | null;
  /**
   * The values of the condition. The number of supported values depends on the condition type. Some support zero values, others one or two values, and ConditionType.ONE_OF_LIST supports an arbitrary number of values.
   */
  values?: ConditionValue[] | null;
}
/**
 * A rule that may or may not match, depending on the condition.
 */
export interface BooleanRule {
  /**
   * The condition of the rule. If the condition evaluates to true, the format is applied.
   */
  condition?: BooleanCondition;
  /**
   * The format to apply. Conditional formatting can only apply a subset of formatting: bold, italic, strikethrough, foreground color and, background color.
   */
  format?: CellFormat;
}
/**
 * A border along a cell.
 */
export interface Border {
  /**
   * The color of the border. Deprecated: Use color_style.
   *
   * @deprecated
   */
  color?: Color;
  /**
   * The color of the border. If color is also set, this field takes precedence.
   */
  colorStyle?: ColorStyle;
  /**
   * The style of the border.
   *
   * Enumerated Values:
   * - STYLE_UNSPECIFIED: The style is not specified. Do not use this.
   * - DOTTED: The border is dotted.
   * - DASHED: The border is dashed.
   * - SOLID: The border is a thin solid line.
   * - SOLID_MEDIUM: The border is a medium solid line.
   * - SOLID_THICK: The border is a thick solid line.
   * - NONE: No border. Used only when updating a border in order to erase it.
   * - DOUBLE: The border is two solid lines.
   */
  style?:
    | ("STYLE_UNSPECIFIED" | "DOTTED" | "DASHED" | "SOLID" | "SOLID_MEDIUM" | "SOLID_THICK" | "NONE" | "DOUBLE")
    | null;
  /**
   * The width of the border, in pixels. Deprecated; the width is determined by the "style" field.
   *
   * @deprecated
   */
  width?: number | null;
}
/**
 * The borders of the cell.
 */
export interface Borders {
  /**
   * The bottom border of the cell.
   */
  bottom?: Border;
  /**
   * The left border of the cell.
   */
  left?: Border;
  /**
   * The right border of the cell.
   */
  right?: Border;
  /**
   * The top border of the cell.
   */
  top?: Border;
}
/**
 * A bubble chart.
 */
export interface BubbleChartSpec {
  /**
   * The bubble border color. Deprecated: Use bubble_border_color_style.
   *
   * @deprecated
   */
  bubbleBorderColor?: Color;
  /**
   * The bubble border color. If bubble_border_color is also set, this field takes precedence.
   */
  bubbleBorderColorStyle?: ColorStyle;
  /**
   * The data containing the bubble labels. These do not need to be unique.
   */
  bubbleLabels?: ChartData;
  /**
   * The max radius size of the bubbles, in pixels. If specified, the field must be a positive value.
   */
  bubbleMaxRadiusSize?: number | null;
  /**
   * The minimum radius size of the bubbles, in pixels. If specific, the field must be a positive value.
   */
  bubbleMinRadiusSize?: number | null;
  /**
   * The opacity of the bubbles between 0 and 1.0. 0 is fully transparent and 1 is fully opaque.
   */
  bubbleOpacity?: number | null;
  /**
   * The data containing the bubble sizes. Bubble sizes are used to draw the bubbles at different sizes relative to each other. If specified, group_ids must also be specified. This field is optional.
   */
  bubbleSizes?: ChartData;
  /**
   * The format of the text inside the bubbles. Strikethrough, underline, and link are not supported.
   */
  bubbleTextStyle?: TextFormat;
  /**
   * The data containing the bubble x-values. These values locate the bubbles in the chart horizontally.
   */
  domain?: ChartData;
  /**
   * The data containing the bubble group IDs. All bubbles with the same group ID are drawn in the same color. If bubble_sizes is specified then this field must also be specified but may contain blank values. This field is optional.
   */
  groupIds?: ChartData;
  /**
   * Where the legend of the chart should be drawn.
   *
   * Enumerated Values:
   * - BUBBLE_CHART_LEGEND_POSITION_UNSPECIFIED: Default value, do not use.
   * - BOTTOM_LEGEND: The legend is rendered on the bottom of the chart.
   * - LEFT_LEGEND: The legend is rendered on the left of the chart.
   * - RIGHT_LEGEND: The legend is rendered on the right of the chart.
   * - TOP_LEGEND: The legend is rendered on the top of the chart.
   * - NO_LEGEND: No legend is rendered.
   * - INSIDE_LEGEND: The legend is rendered inside the chart area.
   */
  legendPosition?:
    | (
        | "BUBBLE_CHART_LEGEND_POSITION_UNSPECIFIED"
        | "BOTTOM_LEGEND"
        | "LEFT_LEGEND"
        | "RIGHT_LEGEND"
        | "TOP_LEGEND"
        | "NO_LEGEND"
        | "INSIDE_LEGEND"
      )
    | null;
  /**
   * The data containing the bubble y-values. These values locate the bubbles in the chart vertically.
   */
  series?: ChartData;
}
/**
 * A candlestick chart.
 */
export interface CandlestickChartSpec {
  /**
   * The Candlestick chart data. Only one CandlestickData is supported.
   */
  data?: CandlestickData[] | null;
  /**
   * The domain data (horizontal axis) for the candlestick chart. String data will be treated as discrete labels, other data will be treated as continuous values.
   */
  domain?: CandlestickDomain;
}
/**
 * The Candlestick chart data, each containing the low, open, close, and high values for a series.
 */
export interface CandlestickData {
  /**
   * The range data (vertical axis) for the close/final value for each candle. This is the top of the candle body. If greater than the open value the candle will be filled. Otherwise the candle will be hollow.
   */
  closeSeries?: CandlestickSeries;
  /**
   * The range data (vertical axis) for the high/maximum value for each candle. This is the top of the candle's center line.
   */
  highSeries?: CandlestickSeries;
  /**
   * The range data (vertical axis) for the low/minimum value for each candle. This is the bottom of the candle's center line.
   */
  lowSeries?: CandlestickSeries;
  /**
   * The range data (vertical axis) for the open/initial value for each candle. This is the bottom of the candle body. If less than the close value the candle will be filled. Otherwise the candle will be hollow.
   */
  openSeries?: CandlestickSeries;
}
/**
 * The domain of a CandlestickChart.
 */
export interface CandlestickDomain {
  /**
   * The data of the CandlestickDomain.
   */
  data?: ChartData;
  /**
   * True to reverse the order of the domain values (horizontal axis).
   */
  reversed?: boolean | null;
}
/**
 * The series of a CandlestickData.
 */
export interface CandlestickSeries {
  /**
   * The data of the CandlestickSeries.
   */
  data?: ChartData;
}
/**
 * Data about a specific cell.
 */
export interface CellData {
  /**
   * Output only. Information about a data source formula on the cell. The field is set if user_entered_value is a formula referencing some DATA_SOURCE sheet, e.g. `=SUM(DataSheet!Column)`.
   */
  dataSourceFormula?: DataSourceFormula;
  /**
   * A data source table anchored at this cell. The size of data source table itself is computed dynamically based on its configuration. Only the first cell of the data source table contains the data source table definition. The other cells will contain the display values of the data source table result in their effective_value fields.
   */
  dataSourceTable?: DataSourceTable;
  /**
   * A data validation rule on the cell, if any. When writing, the new data validation rule will overwrite any prior rule.
   */
  dataValidation?: DataValidationRule;
  /**
   * The effective format being used by the cell. This includes the results of applying any conditional formatting and, if the cell contains a formula, the computed number format. If the effective format is the default format, effective format will not be written. This field is read-only.
   */
  effectiveFormat?: CellFormat;
  /**
   * The effective value of the cell. For cells with formulas, this is the calculated value. For cells with literals, this is the same as the user_entered_value. This field is read-only.
   */
  effectiveValue?: ExtendedValue;
  /**
   * The formatted value of the cell. This is the value as it's shown to the user. This field is read-only.
   */
  formattedValue?: string | null;
  /**
   * A hyperlink this cell points to, if any. If the cell contains multiple hyperlinks, this field will be empty. This field is read-only. To set it, use a `=HYPERLINK` formula in the userEnteredValue.formulaValue field. A cell-level link can also be set from the userEnteredFormat.textFormat field. Alternatively, set a hyperlink in the textFormatRun.format.link field that spans the entire cell.
   */
  hyperlink?: string | null;
  /**
   * Any note on the cell.
   */
  note?: string | null;
  /**
   * A pivot table anchored at this cell. The size of pivot table itself is computed dynamically based on its data, grouping, filters, values, etc. Only the top-left cell of the pivot table contains the pivot table definition. The other cells will contain the calculated values of the results of the pivot in their effective_value fields.
   */
  pivotTable?: PivotTable;
  /**
   * Runs of rich text applied to subsections of the cell. Runs are only valid on user entered strings, not formulas, bools, or numbers. Properties of a run start at a specific index in the text and continue until the next run. Runs will inherit the properties of the cell unless explicitly changed. When writing, the new runs will overwrite any prior runs. When writing a new user_entered_value, previous runs are erased.
   */
  textFormatRuns?: TextFormatRun[] | null;
  /**
   * The format the user entered for the cell. When writing, the new format will be merged with the existing format.
   */
  userEnteredFormat?: CellFormat;
  /**
   * The value the user entered in the cell. e.g., `1234`, `'Hello'`, or `=NOW()` Note: Dates, Times and DateTimes are represented as doubles in serial number format.
   */
  userEnteredValue?: ExtendedValue;
}
/**
 * The format of a cell.
 */
export interface CellFormat {
  /**
   * The background color of the cell. Deprecated: Use background_color_style.
   *
   * @deprecated
   */
  backgroundColor?: Color;
  /**
   * The background color of the cell. If background_color is also set, this field takes precedence.
   */
  backgroundColorStyle?: ColorStyle;
  /**
   * The borders of the cell.
   */
  borders?: Borders;
  /**
   * The horizontal alignment of the value in the cell.
   *
   * Enumerated Values:
   * - HORIZONTAL_ALIGN_UNSPECIFIED: The horizontal alignment is not specified. Do not use this.
   * - LEFT: The text is explicitly aligned to the left of the cell.
   * - CENTER: The text is explicitly aligned to the center of the cell.
   * - RIGHT: The text is explicitly aligned to the right of the cell.
   */
  horizontalAlignment?: ("HORIZONTAL_ALIGN_UNSPECIFIED" | "LEFT" | "CENTER" | "RIGHT") | null;
  /**
   * If one exists, how a hyperlink should be displayed in the cell.
   *
   * Enumerated Values:
   * - HYPERLINK_DISPLAY_TYPE_UNSPECIFIED: The default value: the hyperlink is rendered. Do not use this.
   * - LINKED: A hyperlink should be explicitly rendered.
   * - PLAIN_TEXT: A hyperlink should not be rendered.
   */
  hyperlinkDisplayType?: ("HYPERLINK_DISPLAY_TYPE_UNSPECIFIED" | "LINKED" | "PLAIN_TEXT") | null;
  /**
   * A format describing how number values should be represented to the user.
   */
  numberFormat?: NumberFormat;
  /**
   * The padding of the cell.
   */
  padding?: Padding;
  /**
   * The direction of the text in the cell.
   *
   * Enumerated Values:
   * - TEXT_DIRECTION_UNSPECIFIED: The text direction is not specified. Do not use this.
   * - LEFT_TO_RIGHT: The text direction of left-to-right was set by the user.
   * - RIGHT_TO_LEFT: The text direction of right-to-left was set by the user.
   */
  textDirection?: ("TEXT_DIRECTION_UNSPECIFIED" | "LEFT_TO_RIGHT" | "RIGHT_TO_LEFT") | null;
  /**
   * The format of the text in the cell (unless overridden by a format run). Setting a cell-level link here clears the cell's existing links. Setting the link field in a TextFormatRun takes precedence over the cell-level link.
   */
  textFormat?: TextFormat;
  /**
   * The rotation applied to text in the cell.
   */
  textRotation?: TextRotation;
  /**
   * The vertical alignment of the value in the cell.
   *
   * Enumerated Values:
   * - VERTICAL_ALIGN_UNSPECIFIED: The vertical alignment is not specified. Do not use this.
   * - TOP: The text is explicitly aligned to the top of the cell.
   * - MIDDLE: The text is explicitly aligned to the middle of the cell.
   * - BOTTOM: The text is explicitly aligned to the bottom of the cell.
   */
  verticalAlignment?: ("VERTICAL_ALIGN_UNSPECIFIED" | "TOP" | "MIDDLE" | "BOTTOM") | null;
  /**
   * The wrap strategy for the value in the cell.
   *
   * Enumerated Values:
   * - WRAP_STRATEGY_UNSPECIFIED: The default value, do not use.
   * - OVERFLOW_CELL: Lines that are longer than the cell width will be written in the next cell over, so long as that cell is empty. If the next cell over is non-empty, this behaves the same as `CLIP`. The text will never wrap to the next line unless the user manually inserts a new line. Example: | First sentence. | | Manual newline that is very long. <- Text continues into next cell | Next newline. |
   * - LEGACY_WRAP: This wrap strategy represents the old Google Sheets wrap strategy where words that are longer than a line are clipped rather than broken. This strategy is not supported on all platforms and is being phased out. Example: | Cell has a | | loooooooooo| <- Word is clipped. | word. |
   * - CLIP: Lines that are longer than the cell width will be clipped. The text will never wrap to the next line unless the user manually inserts a new line. Example: | First sentence. | | Manual newline t| <- Text is clipped | Next newline. |
   * - WRAP: Words that are longer than a line are wrapped at the character level rather than clipped. Example: | Cell has a | | loooooooooo| <- Word is broken. | ong word. |
   */
  wrapStrategy?: ("WRAP_STRATEGY_UNSPECIFIED" | "OVERFLOW_CELL" | "LEGACY_WRAP" | "CLIP" | "WRAP") | null;
}
/**
 * The options that define a &quot;view window&quot; for a chart (such as the visible values in an axis).
 */
export interface ChartAxisViewWindowOptions {
  /**
   * The maximum numeric value to be shown in this view window. If unset, will automatically determine a maximum value that looks good for the data.
   */
  viewWindowMax?: number | null;
  /**
   * The minimum numeric value to be shown in this view window. If unset, will automatically determine a minimum value that looks good for the data.
   */
  viewWindowMin?: number | null;
  /**
   * The view window's mode.
   *
   * Enumerated Values:
   * - DEFAULT_VIEW_WINDOW_MODE: The default view window mode used in the Sheets editor for this chart type. In most cases, if set, the default mode is equivalent to `PRETTY`.
   * - VIEW_WINDOW_MODE_UNSUPPORTED: Do not use. Represents that the currently set mode is not supported by the API.
   * - EXPLICIT: Follows the min and max exactly if specified. If a value is unspecified, it will fall back to the `PRETTY` value.
   * - PRETTY: Chooses a min and max that make the chart look good. Both min and max are ignored in this mode.
   */
  viewWindowMode?: ("DEFAULT_VIEW_WINDOW_MODE" | "VIEW_WINDOW_MODE_UNSUPPORTED" | "EXPLICIT" | "PRETTY") | null;
}
/**
 * Custom number formatting options for chart attributes.
 */
export interface ChartCustomNumberFormatOptions {
  /**
   * Custom prefix to be prepended to the chart attribute. This field is optional.
   */
  prefix?: string | null;
  /**
   * Custom suffix to be appended to the chart attribute. This field is optional.
   */
  suffix?: string | null;
}
/**
 * The data included in a domain or series.
 */
export interface ChartData {
  /**
   * The aggregation type for the series of a data source chart. Only supported for data source charts.
   *
   * Enumerated Values:
   * - CHART_AGGREGATE_TYPE_UNSPECIFIED: Default value, do not use.
   * - AVERAGE: Average aggregate function.
   * - COUNT: Count aggregate function.
   * - MAX: Maximum aggregate function.
   * - MEDIAN: Median aggregate function.
   * - MIN: Minimum aggregate function.
   * - SUM: Sum aggregate function.
   */
  aggregateType?: ("CHART_AGGREGATE_TYPE_UNSPECIFIED" | "AVERAGE" | "COUNT" | "MAX" | "MEDIAN" | "MIN" | "SUM") | null;
  /**
   * The reference to the data source column that the data reads from.
   */
  columnReference?: DataSourceColumnReference;
  /**
   * The rule to group the data by if the ChartData backs the domain of a data source chart. Only supported for data source charts.
   */
  groupRule?: ChartGroupRule;
  /**
   * The source ranges of the data.
   */
  sourceRange?: ChartSourceRange;
}
/**
 * Allows you to organize the date-time values in a source data column into buckets based on selected parts of their date or time values.
 */
export interface ChartDateTimeRule {
  /**
   * The type of date-time grouping to apply.
   *
   * Enumerated Values:
   * - CHART_DATE_TIME_RULE_TYPE_UNSPECIFIED: The default type, do not use.
   * - SECOND: Group dates by second, from 0 to 59.
   * - MINUTE: Group dates by minute, from 0 to 59.
   * - HOUR: Group dates by hour using a 24-hour system, from 0 to 23.
   * - HOUR_MINUTE: Group dates by hour and minute using a 24-hour system, for example 19:45.
   * - HOUR_MINUTE_AMPM: Group dates by hour and minute using a 12-hour system, for example 7:45 PM. The AM/PM designation is translated based on the spreadsheet locale.
   * - DAY_OF_WEEK: Group dates by day of week, for example Sunday. The days of the week will be translated based on the spreadsheet locale.
   * - DAY_OF_YEAR: Group dates by day of year, from 1 to 366. Note that dates after Feb. 29 fall in different buckets in leap years than in non-leap years.
   * - DAY_OF_MONTH: Group dates by day of month, from 1 to 31.
   * - DAY_MONTH: Group dates by day and month, for example 22-Nov. The month is translated based on the spreadsheet locale.
   * - MONTH: Group dates by month, for example Nov. The month is translated based on the spreadsheet locale.
   * - QUARTER: Group dates by quarter, for example Q1 (which represents Jan-Mar).
   * - YEAR: Group dates by year, for example 2008.
   * - YEAR_MONTH: Group dates by year and month, for example 2008-Nov. The month is translated based on the spreadsheet locale.
   * - YEAR_QUARTER: Group dates by year and quarter, for example 2008 Q4.
   * - YEAR_MONTH_DAY: Group dates by year, month, and day, for example 2008-11-22.
   */
  type?:
    | (
        | "CHART_DATE_TIME_RULE_TYPE_UNSPECIFIED"
        | "SECOND"
        | "MINUTE"
        | "HOUR"
        | "HOUR_MINUTE"
        | "HOUR_MINUTE_AMPM"
        | "DAY_OF_WEEK"
        | "DAY_OF_YEAR"
        | "DAY_OF_MONTH"
        | "DAY_MONTH"
        | "MONTH"
        | "QUARTER"
        | "YEAR"
        | "YEAR_MONTH"
        | "YEAR_QUARTER"
        | "YEAR_MONTH_DAY"
      )
    | null;
}
/**
 * An optional setting on the ChartData of the domain of a data source chart that defines buckets for the values in the domain rather than breaking out each individual value. For example, when plotting a data source chart, you can specify a histogram rule on the domain (it should only contain numeric values), grouping its values into buckets. Any values of a chart series that fall into the same bucket are aggregated based on the aggregate_type.
 */
export interface ChartGroupRule {
  /**
   * A ChartDateTimeRule.
   */
  dateTimeRule?: ChartDateTimeRule;
  /**
   * A ChartHistogramRule
   */
  histogramRule?: ChartHistogramRule;
}
/**
 * Allows you to organize numeric values in a source data column into buckets of constant size.
 */
export interface ChartHistogramRule {
  /**
   * The size of the buckets that are created. Must be positive.
   */
  intervalSize?: number | null;
  /**
   * The maximum value at which items are placed into buckets. Values greater than the maximum are grouped into a single bucket. If omitted, it is determined by the maximum item value.
   */
  maxValue?: number | null;
  /**
   * The minimum value at which items are placed into buckets. Values that are less than the minimum are grouped into a single bucket. If omitted, it is determined by the minimum item value.
   */
  minValue?: number | null;
}
/**
 * Source ranges for a chart.
 */
export interface ChartSourceRange {
  /**
   * The ranges of data for a series or domain. Exactly one dimension must have a length of 1, and all sources in the list must have the same dimension with length 1. The domain (if it exists) & all series must have the same number of source ranges. If using more than one source range, then the source range at a given offset must be in order and contiguous across the domain and series. For example, these are valid configurations: domain sources: A1:A5 series1 sources: B1:B5 series2 sources: D6:D10 domain sources: A1:A5, C10:C12 series1 sources: B1:B5, D10:D12 series2 sources: C1:C5, E10:E12
   */
  sources?: GridRange[] | null;
}
/**
 * The specifications of a chart.
 */
export interface ChartSpec {
  /**
   * The alternative text that describes the chart. This is often used for accessibility.
   */
  altText?: string | null;
  /**
   * The background color of the entire chart. Not applicable to Org charts. Deprecated: Use background_color_style.
   *
   * @deprecated
   */
  backgroundColor?: Color;
  /**
   * The background color of the entire chart. Not applicable to Org charts. If background_color is also set, this field takes precedence.
   */
  backgroundColorStyle?: ColorStyle;
  /**
   * A basic chart specification, can be one of many kinds of charts. See BasicChartType for the list of all charts this supports.
   */
  basicChart?: BasicChartSpec;
  /**
   * A bubble chart specification.
   */
  bubbleChart?: BubbleChartSpec;
  /**
   * A candlestick chart specification.
   */
  candlestickChart?: CandlestickChartSpec;
  /**
   * If present, the field contains data source chart specific properties.
   */
  dataSourceChartProperties?: DataSourceChartProperties;
  /**
   * The filters applied to the source data of the chart. Only supported for data source charts.
   */
  filterSpecs?: FilterSpec[] | null;
  /**
   * The name of the font to use by default for all chart text (e.g. title, axis labels, legend). If a font is specified for a specific part of the chart it will override this font name.
   */
  fontName?: string | null;
  /**
   * Determines how the charts will use hidden rows or columns.
   *
   * Enumerated Values:
   * - CHART_HIDDEN_DIMENSION_STRATEGY_UNSPECIFIED: Default value, do not use.
   * - SKIP_HIDDEN_ROWS_AND_COLUMNS: Charts will skip hidden rows and columns.
   * - SKIP_HIDDEN_ROWS: Charts will skip hidden rows only.
   * - SKIP_HIDDEN_COLUMNS: Charts will skip hidden columns only.
   * - SHOW_ALL: Charts will not skip any hidden rows or columns.
   */
  hiddenDimensionStrategy?:
    | (
        | "CHART_HIDDEN_DIMENSION_STRATEGY_UNSPECIFIED"
        | "SKIP_HIDDEN_ROWS_AND_COLUMNS"
        | "SKIP_HIDDEN_ROWS"
        | "SKIP_HIDDEN_COLUMNS"
        | "SHOW_ALL"
      )
    | null;
  /**
   * A histogram chart specification.
   */
  histogramChart?: HistogramChartSpec;
  /**
   * True to make a chart fill the entire space in which it's rendered with minimum padding. False to use the default padding. (Not applicable to Geo and Org charts.)
   */
  maximized?: boolean | null;
  /**
   * An org chart specification.
   */
  orgChart?: OrgChartSpec;
  /**
   * A pie chart specification.
   */
  pieChart?: PieChartSpec;
  /**
   * A scorecard chart specification.
   */
  scorecardChart?: ScorecardChartSpec;
  /**
   * The order to sort the chart data by. Only a single sort spec is supported. Only supported for data source charts.
   */
  sortSpecs?: SortSpec[] | null;
  /**
   * The subtitle of the chart.
   */
  subtitle?: string | null;
  /**
   * The subtitle text format. Strikethrough, underline, and link are not supported.
   */
  subtitleTextFormat?: TextFormat;
  /**
   * The subtitle text position. This field is optional.
   */
  subtitleTextPosition?: TextPosition;
  /**
   * The title of the chart.
   */
  title?: string | null;
  /**
   * The title text format. Strikethrough, underline, and link are not supported.
   */
  titleTextFormat?: TextFormat;
  /**
   * The title text position. This field is optional.
   */
  titleTextPosition?: TextPosition;
  /**
   * A treemap chart specification.
   */
  treemapChart?: TreemapChartSpec;
  /**
   * A waterfall chart specification.
   */
  waterfallChart?: WaterfallChartSpec;
}
/**
 * Clears the basic filter, if any exists on the sheet.
 */
export interface ClearBasicFilterRequest {
  /**
   * The sheet ID on which the basic filter should be cleared.
   */
  sheetId?: number | null;
}
/**
 * The request for clearing a range of values in a spreadsheet.
 */
export type ClearValuesRequest = Record<string, never>;
/**
 * The response when clearing a range of values in a spreadsheet.
 */
export interface ClearValuesResponse {
  /**
   * The range (in A1 notation) that was cleared. (If the request was for an unbounded range or a ranger larger than the bounds of the sheet, this will be the actual range that was cleared, bounded to the sheet's limits.)
   */
  clearedRange?: string | null;
  /**
   * The spreadsheet the updates were applied to.
   */
  spreadsheetId?: string | null;
}
/**
 * Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor&#39;s `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn&#39;t have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; // ... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha() ? protocolor.getAlpha().getValue() : 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); &#92;} public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color .newBuilder() .setRed(red / denominator) .setGreen(green / denominator) .setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha != 255) { result.setAlpha( FloatValue .newBuilder() .setValue(((float) alpha) / denominator) .build()); &#92;} return resultBuilder.build(); &#92;} // ... Example (iOS / Obj-C): // ... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper != nil) { alpha = [alpha_wrapper value]; &#92;} return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; &#92;} static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&amp;red green:&amp;green blue:&amp;blue alpha:&amp;alpha]) { return nil; &#92;} Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha &lt;= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; &#92;} [result autorelease]; return result; &#92;} // ... Example (JavaScript): // ... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!(&#39;alpha&#39; in rgb_color)) { return rgbToCssColor(red, green, blue); &#92;} var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(&#39;,&#39;); return [&#39;rgba(&#39;, rgbParams, &#39;,&#39;, alphaFrac, &#39;)&#39;].join(&#39;&#39;); &#92;}; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red &lt;&lt; 16) | (green &lt;&lt; 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = [&#39;#&#39;]; for (var i = 0; i &lt; missingZeros; i++) { resultBuilder.push(&#39;0&#39;); &#92;} resultBuilder.push(hexString); return resultBuilder.join(&#39;&#39;); &#92;}; // ...
 */
export interface Color {
  /**
   * The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).
   */
  alpha?: number | null;
  /**
   * The amount of blue in the color as a value in the interval [0, 1].
   */
  blue?: number | null;
  /**
   * The amount of green in the color as a value in the interval [0, 1].
   */
  green?: number | null;
  /**
   * The amount of red in the color as a value in the interval [0, 1].
   */
  red?: number | null;
}
/**
 * A color value.
 */
export interface ColorStyle {
  /**
   * RGB color. The [`alpha`](/sheets/api/reference/rest/v4/spreadsheets/other#Color.FIELDS.alpha) value in the [`Color`](/sheets/api/reference/rest/v4/spreadsheets/other#color) object isn't generally supported.
   */
  rgbColor?: Color;
  /**
   * Theme color.
   *
   * Enumerated Values:
   * - THEME_COLOR_TYPE_UNSPECIFIED: Unspecified theme color
   * - TEXT: Represents the primary text color
   * - BACKGROUND: Represents the primary background color
   * - ACCENT1: Represents the first accent color
   * - ACCENT2: Represents the second accent color
   * - ACCENT3: Represents the third accent color
   * - ACCENT4: Represents the fourth accent color
   * - ACCENT5: Represents the fifth accent color
   * - ACCENT6: Represents the sixth accent color
   * - LINK: Represents the color to use for hyperlinks
   */
  themeColor?:
    | (
        | "THEME_COLOR_TYPE_UNSPECIFIED"
        | "TEXT"
        | "BACKGROUND"
        | "ACCENT1"
        | "ACCENT2"
        | "ACCENT3"
        | "ACCENT4"
        | "ACCENT5"
        | "ACCENT6"
        | "LINK"
      )
    | null;
}
/**
 * A rule describing a conditional format.
 */
export interface ConditionalFormatRule {
  /**
   * The formatting is either "on" or "off" according to the rule.
   */
  booleanRule?: BooleanRule;
  /**
   * The formatting will vary based on the gradients in the rule.
   */
  gradientRule?: GradientRule;
  /**
   * The ranges that are formatted if the condition is true. All the ranges must be on the same grid.
   */
  ranges?: GridRange[] | null;
}
/**
 * The value of the condition.
 */
export interface ConditionValue {
  /**
   * A relative date (based on the current date). Valid only if the type is DATE_BEFORE, DATE_AFTER, DATE_ON_OR_BEFORE or DATE_ON_OR_AFTER. Relative dates are not supported in data validation. They are supported only in conditional formatting and conditional filters.
   *
   * Enumerated Values:
   * - RELATIVE_DATE_UNSPECIFIED: Default value, do not use.
   * - PAST_YEAR: The value is one year before today.
   * - PAST_MONTH: The value is one month before today.
   * - PAST_WEEK: The value is one week before today.
   * - YESTERDAY: The value is yesterday.
   * - TODAY: The value is today.
   * - TOMORROW: The value is tomorrow.
   */
  relativeDate?:
    | ("RELATIVE_DATE_UNSPECIFIED" | "PAST_YEAR" | "PAST_MONTH" | "PAST_WEEK" | "YESTERDAY" | "TODAY" | "TOMORROW")
    | null;
  /**
   * A value the condition is based on. The value is parsed as if the user typed into a cell. Formulas are supported (and must begin with an `=` or a '+').
   */
  userEnteredValue?: string | null;
}
/**
 * Copies data from the source to the destination.
 */
export interface CopyPasteRequest {
  /**
   * The location to paste to. If the range covers a span that's a multiple of the source's height or width, then the data will be repeated to fill in the destination range. If the range is smaller than the source range, the entire source data will still be copied (beyond the end of the destination range).
   */
  destination?: GridRange;
  /**
   * How that data should be oriented when pasting.
   *
   * Enumerated Values:
   * - NORMAL: Paste normally.
   * - TRANSPOSE: Paste transposed, where all rows become columns and vice versa.
   */
  pasteOrientation?: ("NORMAL" | "TRANSPOSE") | null;
  /**
   * What kind of data to paste.
   *
   * Enumerated Values:
   * - PASTE_NORMAL: Paste values, formulas, formats, and merges.
   * - PASTE_VALUES: Paste the values ONLY without formats, formulas, or merges.
   * - PASTE_FORMAT: Paste the format and data validation only.
   * - PASTE_NO_BORDERS: Like `PASTE_NORMAL` but without borders.
   * - PASTE_FORMULA: Paste the formulas only.
   * - PASTE_DATA_VALIDATION: Paste the data validation only.
   * - PASTE_CONDITIONAL_FORMATTING: Paste the conditional formatting rules only.
   */
  pasteType?:
    | (
        | "PASTE_NORMAL"
        | "PASTE_VALUES"
        | "PASTE_FORMAT"
        | "PASTE_NO_BORDERS"
        | "PASTE_FORMULA"
        | "PASTE_DATA_VALIDATION"
        | "PASTE_CONDITIONAL_FORMATTING"
      )
    | null;
  /**
   * The source range to copy.
   */
  source?: GridRange;
}
/**
 * The request to copy a sheet across spreadsheets.
 */
export interface CopySheetToAnotherSpreadsheetRequest {
  /**
   * The ID of the spreadsheet to copy the sheet to.
   */
  destinationSpreadsheetId?: string | null;
}
/**
 * A request to create developer metadata.
 */
export interface CreateDeveloperMetadataRequest {
  /**
   * The developer metadata to create.
   */
  developerMetadata?: DeveloperMetadata;
}
/**
 * The response from creating developer metadata.
 */
export interface CreateDeveloperMetadataResponse {
  /**
   * The developer metadata that was created.
   */
  developerMetadata?: DeveloperMetadata;
}
/**
 * Moves data from the source to the destination.
 */
export interface CutPasteRequest {
  /**
   * The top-left coordinate where the data should be pasted.
   */
  destination?: GridCoordinate;
  /**
   * What kind of data to paste. All the source data will be cut, regardless of what is pasted.
   *
   * Enumerated Values:
   * - PASTE_NORMAL: Paste values, formulas, formats, and merges.
   * - PASTE_VALUES: Paste the values ONLY without formats, formulas, or merges.
   * - PASTE_FORMAT: Paste the format and data validation only.
   * - PASTE_NO_BORDERS: Like `PASTE_NORMAL` but without borders.
   * - PASTE_FORMULA: Paste the formulas only.
   * - PASTE_DATA_VALIDATION: Paste the data validation only.
   * - PASTE_CONDITIONAL_FORMATTING: Paste the conditional formatting rules only.
   */
  pasteType?:
    | (
        | "PASTE_NORMAL"
        | "PASTE_VALUES"
        | "PASTE_FORMAT"
        | "PASTE_NO_BORDERS"
        | "PASTE_FORMULA"
        | "PASTE_DATA_VALIDATION"
        | "PASTE_CONDITIONAL_FORMATTING"
      )
    | null;
  /**
   * The source data to cut.
   */
  source?: GridRange;
}
/**
 * The data execution status. A data execution is created to sync a data source object with the latest data from a DataSource. It is usually scheduled to run at background, you can check its state to tell if an execution completes There are several scenarios where a data execution is triggered to run: * Adding a data source creates an associated data source sheet as well as a data execution to sync the data from the data source to the sheet. * Updating a data source creates a data execution to refresh the associated data source sheet similarly. * You can send refresh request to explicitly refresh one or multiple data source objects.
 */
export interface DataExecutionStatus {
  /**
   * The error code.
   *
   * Enumerated Values:
   * - DATA_EXECUTION_ERROR_CODE_UNSPECIFIED: Default value, do not use.
   * - TIMED_OUT: The data execution timed out.
   * - TOO_MANY_ROWS: The data execution returns more rows than the limit.
   * - TOO_MANY_COLUMNS: The data execution returns more columns than the limit.
   * - TOO_MANY_CELLS: The data execution returns more cells than the limit.
   * - ENGINE: Error is received from the backend data execution engine (e.g. BigQuery). Check error_message for details.
   * - PARAMETER_INVALID: One or some of the provided data source parameters are invalid.
   * - UNSUPPORTED_DATA_TYPE: The data execution returns an unsupported data type.
   * - DUPLICATE_COLUMN_NAMES: The data execution returns duplicate column names or aliases.
   * - INTERRUPTED: The data execution is interrupted. Please refresh later.
   * - CONCURRENT_QUERY: The data execution is currently in progress, can not be refreshed until it completes.
   * - OTHER: Other errors.
   * - TOO_MANY_CHARS_PER_CELL: The data execution returns values that exceed the maximum characters allowed in a single cell.
   * - DATA_NOT_FOUND: The database referenced by the data source is not found. x/
   * - PERMISSION_DENIED: The user does not have access to the database referenced by the data source.
   * - MISSING_COLUMN_ALIAS: The data execution returns columns with missing aliases.
   * - OBJECT_NOT_FOUND: The data source object does not exist.
   * - OBJECT_IN_ERROR_STATE: The data source object is currently in error state. To force refresh, set force in RefreshDataSourceRequest.
   * - OBJECT_SPEC_INVALID: The data source object specification is invalid.
   */
  errorCode?:
    | (
        | "DATA_EXECUTION_ERROR_CODE_UNSPECIFIED"
        | "TIMED_OUT"
        | "TOO_MANY_ROWS"
        | "TOO_MANY_COLUMNS"
        | "TOO_MANY_CELLS"
        | "ENGINE"
        | "PARAMETER_INVALID"
        | "UNSUPPORTED_DATA_TYPE"
        | "DUPLICATE_COLUMN_NAMES"
        | "INTERRUPTED"
        | "CONCURRENT_QUERY"
        | "OTHER"
        | "TOO_MANY_CHARS_PER_CELL"
        | "DATA_NOT_FOUND"
        | "PERMISSION_DENIED"
        | "MISSING_COLUMN_ALIAS"
        | "OBJECT_NOT_FOUND"
        | "OBJECT_IN_ERROR_STATE"
        | "OBJECT_SPEC_INVALID"
      )
    | null;
  /**
   * The error message, which may be empty.
   */
  errorMessage?: string | null;
  /**
   * Gets the time the data last successfully refreshed.
   */
  lastRefreshTime?: string | null;
  /**
   * The state of the data execution.
   *
   * Enumerated Values:
   * - DATA_EXECUTION_STATE_UNSPECIFIED: Default value, do not use.
   * - NOT_STARTED: The data execution has not started.
   * - RUNNING: The data execution has started and is running.
   * - SUCCEEDED: The data execution has completed successfully.
   * - FAILED: The data execution has completed with errors.
   */
  state?: ("DATA_EXECUTION_STATE_UNSPECIFIED" | "NOT_STARTED" | "RUNNING" | "SUCCEEDED" | "FAILED") | null;
}
/**
 * Filter that describes what data should be selected or returned from a request.
 */
export interface DataFilter {
  /**
   * Selects data that matches the specified A1 range.
   */
  a1Range?: string | null;
  /**
   * Selects data associated with the developer metadata matching the criteria described by this DeveloperMetadataLookup.
   */
  developerMetadataLookup?: DeveloperMetadataLookup;
  /**
   * Selects data that matches the range described by the GridRange.
   */
  gridRange?: GridRange;
}
/**
 * A range of values whose location is specified by a DataFilter.
 */
export interface DataFilterValueRange {
  /**
   * The data filter describing the location of the values in the spreadsheet.
   */
  dataFilter?: DataFilter;
  /**
   * The major dimension of the values.
   *
   * Enumerated Values:
   * - DIMENSION_UNSPECIFIED: The default value, do not use.
   * - ROWS: Operates on the rows of a sheet.
   * - COLUMNS: Operates on the columns of a sheet.
   */
  majorDimension?: ("DIMENSION_UNSPECIFIED" | "ROWS" | "COLUMNS") | null;
  /**
   * The data to be written. If the provided values exceed any of the ranges matched by the data filter then the request fails. If the provided values are less than the matched ranges only the specified values are written, existing values in the matched ranges remain unaffected.
   */
  values?: unknown[][] | null;
}
/**
 * Settings for one set of data labels. Data labels are annotations that appear next to a set of data, such as the points on a line chart, and provide additional information about what the data represents, such as a text representation of the value behind that point on the graph.
 */
export interface DataLabel {
  /**
   * Data to use for custom labels. Only used if type is set to CUSTOM. This data must be the same length as the series or other element this data label is applied to. In addition, if the series is split into multiple source ranges, this source data must come from the next column in the source data. For example, if the series is B2:B4,E6:E8 then this data must come from C2:C4,F6:F8.
   */
  customLabelData?: ChartData;
  /**
   * The placement of the data label relative to the labeled data.
   *
   * Enumerated Values:
   * - DATA_LABEL_PLACEMENT_UNSPECIFIED: The positioning is determined automatically by the renderer.
   * - CENTER: Center within a bar or column, both horizontally and vertically.
   * - LEFT: To the left of a data point.
   * - RIGHT: To the right of a data point.
   * - ABOVE: Above a data point.
   * - BELOW: Below a data point.
   * - INSIDE_END: Inside a bar or column at the end (top if positive, bottom if negative).
   * - INSIDE_BASE: Inside a bar or column at the base.
   * - OUTSIDE_END: Outside a bar or column at the end.
   */
  placement?:
    | (
        | "DATA_LABEL_PLACEMENT_UNSPECIFIED"
        | "CENTER"
        | "LEFT"
        | "RIGHT"
        | "ABOVE"
        | "BELOW"
        | "INSIDE_END"
        | "INSIDE_BASE"
        | "OUTSIDE_END"
      )
    | null;
  /**
   * The text format used for the data label. The link field is not supported.
   */
  textFormat?: TextFormat;
  /**
   * The type of the data label.
   *
   * Enumerated Values:
   * - DATA_LABEL_TYPE_UNSPECIFIED: The data label type is not specified and will be interpreted depending on the context of the data label within the chart.
   * - NONE: The data label is not displayed.
   * - DATA: The data label is displayed using values from the series data.
   * - CUSTOM: The data label is displayed using values from a custom data source indicated by customLabelData.
   */
  type?: ("DATA_LABEL_TYPE_UNSPECIFIED" | "NONE" | "DATA" | "CUSTOM") | null;
}
/**
 * Information about an external data source in the spreadsheet.
 */
export interface DataSource {
  /**
   * All calculated columns in the data source.
   */
  calculatedColumns?: DataSourceColumn[] | null;
  /**
   * The spreadsheet-scoped unique ID that identifies the data source. Example: 1080547365.
   */
  dataSourceId?: string | null;
  /**
   * The ID of the Sheet connected with the data source. The field cannot be changed once set. When creating a data source, an associated DATA_SOURCE sheet is also created, if the field is not specified, the ID of the created sheet will be randomly generated.
   */
  sheetId?: number | null;
  /**
   * The DataSourceSpec for the data source connected with this spreadsheet.
   */
  spec?: DataSourceSpec;
}
/**
 * Properties of a data source chart.
 */
export interface DataSourceChartProperties {
  /**
   * Output only. The data execution status.
   */
  dataExecutionStatus?: DataExecutionStatus;
  /**
   * ID of the data source that the chart is associated with.
   */
  dataSourceId?: string | null;
}
/**
 * A column in a data source.
 */
export interface DataSourceColumn {
  /**
   * The formula of the calculated column.
   */
  formula?: string | null;
  /**
   * The column reference.
   */
  reference?: DataSourceColumnReference;
}
/**
 * An unique identifier that references a data source column.
 */
export interface DataSourceColumnReference {
  /**
   * The display name of the column. It should be unique within a data source.
   */
  name?: string | null;
}
/**
 * A data source formula.
 */
export interface DataSourceFormula {
  /**
   * Output only. The data execution status.
   */
  dataExecutionStatus?: DataExecutionStatus;
  /**
   * The ID of the data source the formula is associated with.
   */
  dataSourceId?: string | null;
}
/**
 * Reference to a data source object.
 */
export interface DataSourceObjectReference {
  /**
   * References to a data source chart.
   */
  chartId?: number | null;
  /**
   * References to a cell containing DataSourceFormula.
   */
  dataSourceFormulaCell?: GridCoordinate;
  /**
   * References to a data source PivotTable anchored at the cell.
   */
  dataSourcePivotTableAnchorCell?: GridCoordinate;
  /**
   * References to a DataSourceTable anchored at the cell.
   */
  dataSourceTableAnchorCell?: GridCoordinate;
  /**
   * References to a DATA_SOURCE sheet.
   */
  sheetId?: string | null;
}
/**
 * A list of references to data source objects.
 */
export interface DataSourceObjectReferences {
  /**
   * The references.
   */
  references?: DataSourceObjectReference[] | null;
}
/**
 * A parameter in a data source&#39;s query. The parameter allows the user to pass in values from the spreadsheet into a query.
 */
export interface DataSourceParameter {
  /**
   * Named parameter. Must be a legitimate identifier for the DataSource that supports it. For example, [BigQuery identifier](https://cloud.google.com/bigquery/docs/reference/standard-sql/lexical#identifiers).
   */
  name?: string | null;
  /**
   * ID of a NamedRange. Its size must be 1x1.
   */
  namedRangeId?: string | null;
  /**
   * A range that contains the value of the parameter. Its size must be 1x1.
   */
  range?: GridRange;
}
/**
 * A schedule for data to refresh every day in a given time interval.
 */
export interface DataSourceRefreshDailySchedule {
  /**
   * The start time of a time interval in which a data source refresh is scheduled. Only `hours` part is used. The time interval size defaults to that in the Sheets editor.
   */
  startTime?: TimeOfDay;
}
/**
 * A monthly schedule for data to refresh on specific days in the month in a given time interval.
 */
export interface DataSourceRefreshMonthlySchedule {
  /**
   * Days of the month to refresh. Only 1-28 are supported, mapping to the 1st to the 28th day. At least one day must be specified.
   */
  daysOfMonth?: number[] | null;
  /**
   * The start time of a time interval in which a data source refresh is scheduled. Only `hours` part is used. The time interval size defaults to that in the Sheets editor.
   */
  startTime?: TimeOfDay;
}
/**
 * Schedule for refreshing the data source. Data sources in the spreadsheet are refreshed within a time interval. You can specify the start time by clicking the Scheduled Refresh button in the Sheets editor, but the interval is fixed at 4 hours. For example, if you specify a start time of 8 AM , the refresh will take place between 8 AM and 12 PM every day.
 */
export interface DataSourceRefreshSchedule {
  /**
   * Daily refresh schedule.
   */
  dailySchedule?: DataSourceRefreshDailySchedule;
  /**
   * True if the refresh schedule is enabled, or false otherwise.
   */
  enabled?: boolean | null;
  /**
   * Monthly refresh schedule.
   */
  monthlySchedule?: DataSourceRefreshMonthlySchedule;
  /**
   * Output only. The time interval of the next run.
   */
  nextRun?: Interval;
  /**
   * The scope of the refresh. Must be ALL_DATA_SOURCES.
   *
   * Enumerated Values:
   * - DATA_SOURCE_REFRESH_SCOPE_UNSPECIFIED: Default value, do not use.
   * - ALL_DATA_SOURCES: Refreshes all data sources and their associated data source objects in the spreadsheet.
   */
  refreshScope?: ("DATA_SOURCE_REFRESH_SCOPE_UNSPECIFIED" | "ALL_DATA_SOURCES") | null;
  /**
   * Weekly refresh schedule.
   */
  weeklySchedule?: DataSourceRefreshWeeklySchedule;
}
/**
 * A weekly schedule for data to refresh on specific days in a given time interval.
 */
export interface DataSourceRefreshWeeklySchedule {
  /**
   * Days of the week to refresh. At least one day must be specified.
   *
   * Enumerated Values in Array:
   * - DAY_OF_WEEK_UNSPECIFIED: The day of the week is unspecified.
   * - MONDAY: Monday
   * - TUESDAY: Tuesday
   * - WEDNESDAY: Wednesday
   * - THURSDAY: Thursday
   * - FRIDAY: Friday
   * - SATURDAY: Saturday
   * - SUNDAY: Sunday
   */
  daysOfWeek?:
    | ("DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[]
    | null;
  /**
   * The start time of a time interval in which a data source refresh is scheduled. Only `hours` part is used. The time interval size defaults to that in the Sheets editor.
   */
  startTime?: TimeOfDay;
}
/**
 * A range along a single dimension on a DATA_SOURCE sheet.
 */
export interface DataSourceSheetDimensionRange {
  /**
   * The columns on the data source sheet.
   */
  columnReferences?: DataSourceColumnReference[] | null;
  /**
   * The ID of the data source sheet the range is on.
   */
  sheetId?: number | null;
}
/**
 * Additional properties of a DATA_SOURCE sheet.
 */
export interface DataSourceSheetProperties {
  /**
   * The columns displayed on the sheet, corresponding to the values in RowData.
   */
  columns?: DataSourceColumn[] | null;
  /**
   * The data execution status.
   */
  dataExecutionStatus?: DataExecutionStatus;
  /**
   * ID of the DataSource the sheet is connected to.
   */
  dataSourceId?: string | null;
}
/**
 * This specifies the details of the data source. For example, for BigQuery, this specifies information about the BigQuery source.
 */
export interface DataSourceSpec {
  /**
   * A BigQueryDataSourceSpec.
   */
  bigQuery?: BigQueryDataSourceSpec;
  /**
   * The parameters of the data source, used when querying the data source.
   */
  parameters?: DataSourceParameter[] | null;
}
/**
 * A data source table, which allows the user to import a static table of data from the DataSource into Sheets. This is also known as &quot;Extract&quot; in the Sheets editor.
 */
export interface DataSourceTable {
  /**
   * Columns selected for the data source table. The column_selection_type must be SELECTED.
   */
  columns?: DataSourceColumnReference[] | null;
  /**
   * The type to select columns for the data source table. Defaults to SELECTED.
   *
   * Enumerated Values:
   * - DATA_SOURCE_TABLE_COLUMN_SELECTION_TYPE_UNSPECIFIED: The default column selection type, do not use.
   * - SELECTED: Select columns specified by columns field.
   * - SYNC_ALL: Sync all current and future columns in the data source. If set, the data source table fetches all the columns in the data source at the time of refresh.
   */
  columnSelectionType?: ("DATA_SOURCE_TABLE_COLUMN_SELECTION_TYPE_UNSPECIFIED" | "SELECTED" | "SYNC_ALL") | null;
  /**
   * Output only. The data execution status.
   */
  dataExecutionStatus?: DataExecutionStatus;
  /**
   * The ID of the data source the data source table is associated with.
   */
  dataSourceId?: string | null;
  /**
   * Filter specifications in the data source table.
   */
  filterSpecs?: FilterSpec[] | null;
  /**
   * The limit of rows to return. If not set, a default limit is applied. Please refer to the Sheets editor for the default and max limit.
   */
  rowLimit?: number | null;
  /**
   * Sort specifications in the data source table. The result of the data source table is sorted based on the sort specifications in order.
   */
  sortSpecs?: SortSpec[] | null;
}
/**
 * A data validation rule.
 */
export interface DataValidationRule {
  /**
   * The condition that data in the cell must match.
   */
  condition?: BooleanCondition;
  /**
   * A message to show the user when adding data to the cell.
   */
  inputMessage?: string | null;
  /**
   * True if the UI should be customized based on the kind of condition. If true, "List" conditions will show a dropdown.
   */
  showCustomUi?: boolean | null;
  /**
   * True if invalid data should be rejected.
   */
  strict?: boolean | null;
}
/**
 * Allows you to organize the date-time values in a source data column into buckets based on selected parts of their date or time values. For example, consider a pivot table showing sales transactions by date: +----------+--------------+ | Date | SUM of Sales | +----------+--------------+ | 1/1/2017 | $621.14 | | 2/3/2017 | $708.84 | | 5/8/2017 | $326.84 | ... +----------+--------------+ Applying a date-time group rule with a DateTimeRuleType of YEAR_MONTH results in the following pivot table. +--------------+--------------+ | Grouped Date | SUM of Sales | +--------------+--------------+ | 2017-Jan | $53,731.78 | | 2017-Feb | $83,475.32 | | 2017-Mar | $94,385.05 | ... +--------------+--------------+
 */
export interface DateTimeRule {
  /**
   * The type of date-time grouping to apply.
   *
   * Enumerated Values:
   * - DATE_TIME_RULE_TYPE_UNSPECIFIED: The default type, do not use.
   * - SECOND: Group dates by second, from 0 to 59.
   * - MINUTE: Group dates by minute, from 0 to 59.
   * - HOUR: Group dates by hour using a 24-hour system, from 0 to 23.
   * - HOUR_MINUTE: Group dates by hour and minute using a 24-hour system, for example 19:45.
   * - HOUR_MINUTE_AMPM: Group dates by hour and minute using a 12-hour system, for example 7:45 PM. The AM/PM designation is translated based on the spreadsheet locale.
   * - DAY_OF_WEEK: Group dates by day of week, for example Sunday. The days of the week will be translated based on the spreadsheet locale.
   * - DAY_OF_YEAR: Group dates by day of year, from 1 to 366. Note that dates after Feb. 29 fall in different buckets in leap years than in non-leap years.
   * - DAY_OF_MONTH: Group dates by day of month, from 1 to 31.
   * - DAY_MONTH: Group dates by day and month, for example 22-Nov. The month is translated based on the spreadsheet locale.
   * - MONTH: Group dates by month, for example Nov. The month is translated based on the spreadsheet locale.
   * - QUARTER: Group dates by quarter, for example Q1 (which represents Jan-Mar).
   * - YEAR: Group dates by year, for example 2008.
   * - YEAR_MONTH: Group dates by year and month, for example 2008-Nov. The month is translated based on the spreadsheet locale.
   * - YEAR_QUARTER: Group dates by year and quarter, for example 2008 Q4.
   * - YEAR_MONTH_DAY: Group dates by year, month, and day, for example 2008-11-22.
   */
  type?:
    | (
        | "DATE_TIME_RULE_TYPE_UNSPECIFIED"
        | "SECOND"
        | "MINUTE"
        | "HOUR"
        | "HOUR_MINUTE"
        | "HOUR_MINUTE_AMPM"
        | "DAY_OF_WEEK"
        | "DAY_OF_YEAR"
        | "DAY_OF_MONTH"
        | "DAY_MONTH"
        | "MONTH"
        | "QUARTER"
        | "YEAR"
        | "YEAR_MONTH"
        | "YEAR_QUARTER"
        | "YEAR_MONTH_DAY"
      )
    | null;
}
/**
 * Removes the banded range with the given ID from the spreadsheet.
 */
export interface DeleteBandingRequest {
  /**
   * The ID of the banded range to delete.
   */
  bandedRangeId?: number | null;
}
/**
 * Deletes a conditional format rule at the given index. All subsequent rules&#39; indexes are decremented.
 */
export interface DeleteConditionalFormatRuleRequest {
  /**
   * The zero-based index of the rule to be deleted.
   */
  index?: number | null;
  /**
   * The sheet the rule is being deleted from.
   */
  sheetId?: number | null;
}
/**
 * The result of deleting a conditional format rule.
 */
export interface DeleteConditionalFormatRuleResponse {
  /**
   * The rule that was deleted.
   */
  rule?: ConditionalFormatRule;
}
/**
 * Deletes a data source. The request also deletes the associated data source sheet, and unlinks all associated data source objects.
 */
export interface DeleteDataSourceRequest {
  /**
   * The ID of the data source to delete.
   */
  dataSourceId?: string | null;
}
/**
 * A request to delete developer metadata.
 */
export interface DeleteDeveloperMetadataRequest {
  /**
   * The data filter describing the criteria used to select which developer metadata entry to delete.
   */
  dataFilter?: DataFilter;
}
/**
 * The response from deleting developer metadata.
 */
export interface DeleteDeveloperMetadataResponse {
  /**
   * The metadata that was deleted.
   */
  deletedDeveloperMetadata?: DeveloperMetadata[] | null;
}
/**
 * Deletes a group over the specified range by decrementing the depth of the dimensions in the range. For example, assume the sheet has a depth-1 group over B:E and a depth-2 group over C:D. Deleting a group over D:E leaves the sheet with a depth-1 group over B:D and a depth-2 group over C:C.
 */
export interface DeleteDimensionGroupRequest {
  /**
   * The range of the group to be deleted.
   */
  range?: DimensionRange;
}
/**
 * The result of deleting a group.
 */
export interface DeleteDimensionGroupResponse {
  /**
   * All groups of a dimension after deleting a group from that dimension.
   */
  dimensionGroups?: DimensionGroup[] | null;
}
/**
 * Deletes the dimensions from the sheet.
 */
export interface DeleteDimensionRequest {
  /**
   * The dimensions to delete from the sheet.
   */
  range?: DimensionRange;
}
/**
 * Removes rows within this range that contain values in the specified columns that are duplicates of values in any previous row. Rows with identical values but different letter cases, formatting, or formulas are considered to be duplicates. This request also removes duplicate rows hidden from view (for example, due to a filter). When removing duplicates, the first instance of each duplicate row scanning from the top downwards is kept in the resulting range. Content outside of the specified range isn&#39;t removed, and rows considered duplicates do not have to be adjacent to each other in the range.
 */
export interface DeleteDuplicatesRequest {
  /**
   * The columns in the range to analyze for duplicate values. If no columns are selected then all columns are analyzed for duplicates.
   */
  comparisonColumns?: DimensionRange[] | null;
  /**
   * The range to remove duplicates rows from.
   */
  range?: GridRange;
}
/**
 * The result of removing duplicates in a range.
 */
export interface DeleteDuplicatesResponse {
  /**
   * The number of duplicate rows removed.
   */
  duplicatesRemovedCount?: number | null;
}
/**
 * Deletes the embedded object with the given ID.
 */
export interface DeleteEmbeddedObjectRequest {
  /**
   * The ID of the embedded object to delete.
   */
  objectId?: number | null;
}
/**
 * Deletes a particular filter view.
 */
export interface DeleteFilterViewRequest {
  /**
   * The ID of the filter to delete.
   */
  filterId?: number | null;
}
/**
 * Removes the named range with the given ID from the spreadsheet.
 */
export interface DeleteNamedRangeRequest {
  /**
   * The ID of the named range to delete.
   */
  namedRangeId?: string | null;
}
/**
 * Deletes the protected range with the given ID.
 */
export interface DeleteProtectedRangeRequest {
  /**
   * The ID of the protected range to delete.
   */
  protectedRangeId?: number | null;
}
/**
 * Deletes a range of cells, shifting other cells into the deleted area.
 */
export interface DeleteRangeRequest {
  /**
   * The range of cells to delete.
   */
  range?: GridRange;
  /**
   * The dimension from which deleted cells will be replaced with. If ROWS, existing cells will be shifted upward to replace the deleted cells. If COLUMNS, existing cells will be shifted left to replace the deleted cells.
   *
   * Enumerated Values:
   * - DIMENSION_UNSPECIFIED: The default value, do not use.
   * - ROWS: Operates on the rows of a sheet.
   * - COLUMNS: Operates on the columns of a sheet.
   */
  shiftDimension?: ("DIMENSION_UNSPECIFIED" | "ROWS" | "COLUMNS") | null;
}
/**
 * Deletes the requested sheet.
 */
export interface DeleteSheetRequest {
  /**
   * The ID of the sheet to delete. If the sheet is of DATA_SOURCE type, the associated DataSource is also deleted.
   */
  sheetId?: number | null;
}
/**
 * Developer metadata associated with a location or object in a spreadsheet. Developer metadata may be used to associate arbitrary data with various parts of a spreadsheet and will remain associated at those locations as they move around and the spreadsheet is edited. For example, if developer metadata is associated with row 5 and another row is then subsequently inserted above row 5, that original metadata will still be associated with the row it was first associated with (what is now row 6). If the associated object is deleted its metadata is deleted too.
 */
export interface DeveloperMetadata {
  /**
   * The location where the metadata is associated.
   */
  location?: DeveloperMetadataLocation;
  /**
   * The spreadsheet-scoped unique ID that identifies the metadata. IDs may be specified when metadata is created, otherwise one will be randomly generated and assigned. Must be positive.
   */
  metadataId?: number | null;
  /**
   * The metadata key. There may be multiple metadata in a spreadsheet with the same key. Developer metadata must always have a key specified.
   */
  metadataKey?: string | null;
  /**
   * Data associated with the metadata's key.
   */
  metadataValue?: string | null;
  /**
   * The metadata visibility. Developer metadata must always have a visibility specified.
   *
   * Enumerated Values:
   * - DEVELOPER_METADATA_VISIBILITY_UNSPECIFIED: Default value.
   * - DOCUMENT: Document-visible metadata is accessible from any developer project with access to the document.
   * - PROJECT: Project-visible metadata is only visible to and accessible by the developer project that created the metadata.
   */
  visibility?: ("DEVELOPER_METADATA_VISIBILITY_UNSPECIFIED" | "DOCUMENT" | "PROJECT") | null;
}
/**
 * A location where metadata may be associated in a spreadsheet.
 */
export interface DeveloperMetadataLocation {
  /**
   * Represents the row or column when metadata is associated with a dimension. The specified DimensionRange must represent a single row or column; it cannot be unbounded or span multiple rows or columns.
   */
  dimensionRange?: DimensionRange;
  /**
   * The type of location this object represents. This field is read-only.
   *
   * Enumerated Values:
   * - DEVELOPER_METADATA_LOCATION_TYPE_UNSPECIFIED: Default value.
   * - ROW: Developer metadata associated on an entire row dimension.
   * - COLUMN: Developer metadata associated on an entire column dimension.
   * - SHEET: Developer metadata associated on an entire sheet.
   * - SPREADSHEET: Developer metadata associated on the entire spreadsheet.
   */
  locationType?: ("DEVELOPER_METADATA_LOCATION_TYPE_UNSPECIFIED" | "ROW" | "COLUMN" | "SHEET" | "SPREADSHEET") | null;
  /**
   * The ID of the sheet when metadata is associated with an entire sheet.
   */
  sheetId?: number | null;
  /**
   * True when metadata is associated with an entire spreadsheet.
   */
  spreadsheet?: boolean | null;
}
/**
 * Selects DeveloperMetadata that matches all of the specified fields. For example, if only a metadata ID is specified this considers the DeveloperMetadata with that particular unique ID. If a metadata key is specified, this considers all developer metadata with that key. If a key, visibility, and location type are all specified, this considers all developer metadata with that key and visibility that are associated with a location of that type. In general, this selects all DeveloperMetadata that matches the intersection of all the specified fields; any field or combination of fields may be specified.
 */
export interface DeveloperMetadataLookup {
  /**
   * Determines how this lookup matches the location. If this field is specified as EXACT, only developer metadata associated on the exact location specified is matched. If this field is specified to INTERSECTING, developer metadata associated on intersecting locations is also matched. If left unspecified, this field assumes a default value of INTERSECTING. If this field is specified, a metadataLocation must also be specified.
   *
   * Enumerated Values:
   * - DEVELOPER_METADATA_LOCATION_MATCHING_STRATEGY_UNSPECIFIED: Default value. This value must not be used.
   * - EXACT_LOCATION: Indicates that a specified location should be matched exactly. For example, if row three were specified as a location this matching strategy would only match developer metadata also associated on row three. Metadata associated on other locations would not be considered.
   * - INTERSECTING_LOCATION: Indicates that a specified location should match that exact location as well as any intersecting locations. For example, if row three were specified as a location this matching strategy would match developer metadata associated on row three as well as metadata associated on locations that intersect row three. If, for instance, there was developer metadata associated on column B, this matching strategy would also match that location because column B intersects row three.
   */
  locationMatchingStrategy?:
    | ("DEVELOPER_METADATA_LOCATION_MATCHING_STRATEGY_UNSPECIFIED" | "EXACT_LOCATION" | "INTERSECTING_LOCATION")
    | null;
  /**
   * Limits the selected developer metadata to those entries which are associated with locations of the specified type. For example, when this field is specified as ROW this lookup only considers developer metadata associated on rows. If the field is left unspecified, all location types are considered. This field cannot be specified as SPREADSHEET when the locationMatchingStrategy is specified as INTERSECTING or when the metadataLocation is specified as a non-spreadsheet location: spreadsheet metadata cannot intersect any other developer metadata location. This field also must be left unspecified when the locationMatchingStrategy is specified as EXACT.
   *
   * Enumerated Values:
   * - DEVELOPER_METADATA_LOCATION_TYPE_UNSPECIFIED: Default value.
   * - ROW: Developer metadata associated on an entire row dimension.
   * - COLUMN: Developer metadata associated on an entire column dimension.
   * - SHEET: Developer metadata associated on an entire sheet.
   * - SPREADSHEET: Developer metadata associated on the entire spreadsheet.
   */
  locationType?: ("DEVELOPER_METADATA_LOCATION_TYPE_UNSPECIFIED" | "ROW" | "COLUMN" | "SHEET" | "SPREADSHEET") | null;
  /**
   * Limits the selected developer metadata to that which has a matching DeveloperMetadata.metadata_id.
   */
  metadataId?: number | null;
  /**
   * Limits the selected developer metadata to that which has a matching DeveloperMetadata.metadata_key.
   */
  metadataKey?: string | null;
  /**
   * Limits the selected developer metadata to those entries associated with the specified location. This field either matches exact locations or all intersecting locations according the specified locationMatchingStrategy.
   */
  metadataLocation?: DeveloperMetadataLocation;
  /**
   * Limits the selected developer metadata to that which has a matching DeveloperMetadata.metadata_value.
   */
  metadataValue?: string | null;
  /**
   * Limits the selected developer metadata to that which has a matching DeveloperMetadata.visibility. If left unspecified, all developer metadata visibile to the requesting project is considered.
   *
   * Enumerated Values:
   * - DEVELOPER_METADATA_VISIBILITY_UNSPECIFIED: Default value.
   * - DOCUMENT: Document-visible metadata is accessible from any developer project with access to the document.
   * - PROJECT: Project-visible metadata is only visible to and accessible by the developer project that created the metadata.
   */
  visibility?: ("DEVELOPER_METADATA_VISIBILITY_UNSPECIFIED" | "DOCUMENT" | "PROJECT") | null;
}
/**
 * A group over an interval of rows or columns on a sheet, which can contain or be contained within other groups. A group can be collapsed or expanded as a unit on the sheet.
 */
export interface DimensionGroup {
  /**
   * This field is true if this group is collapsed. A collapsed group remains collapsed if an overlapping group at a shallower depth is expanded. A true value does not imply that all dimensions within the group are hidden, since a dimension's visibility can change independently from this group property. However, when this property is updated, all dimensions within it are set to hidden if this field is true, or set to visible if this field is false.
   */
  collapsed?: boolean | null;
  /**
   * The depth of the group, representing how many groups have a range that wholly contains the range of this group.
   */
  depth?: number | null;
  /**
   * The range over which this group exists.
   */
  range?: DimensionRange;
}
/**
 * Properties about a dimension.
 */
export interface DimensionProperties {
  /**
   * Output only. If set, this is a column in a data source sheet.
   */
  dataSourceColumnReference?: DataSourceColumnReference;
  /**
   * The developer metadata associated with a single row or column.
   */
  developerMetadata?: DeveloperMetadata[] | null;
  /**
   * True if this dimension is being filtered. This field is read-only.
   */
  hiddenByFilter?: boolean | null;
  /**
   * True if this dimension is explicitly hidden.
   */
  hiddenByUser?: boolean | null;
  /**
   * The height (if a row) or width (if a column) of the dimension in pixels.
   */
  pixelSize?: number | null;
}
/**
 * A range along a single dimension on a sheet. All indexes are zero-based. Indexes are half open: the start index is inclusive and the end index is exclusive. Missing indexes indicate the range is unbounded on that side.
 */
export interface DimensionRange {
  /**
   * The dimension of the span.
   *
   * Enumerated Values:
   * - DIMENSION_UNSPECIFIED: The default value, do not use.
   * - ROWS: Operates on the rows of a sheet.
   * - COLUMNS: Operates on the columns of a sheet.
   */
  dimension?: ("DIMENSION_UNSPECIFIED" | "ROWS" | "COLUMNS") | null;
  /**
   * The end (exclusive) of the span, or not set if unbounded.
   */
  endIndex?: number | null;
  /**
   * The sheet this span is on.
   */
  sheetId?: number | null;
  /**
   * The start (inclusive) of the span, or not set if unbounded.
   */
  startIndex?: number | null;
}
/**
 * Duplicates a particular filter view.
 */
export interface DuplicateFilterViewRequest {
  /**
   * The ID of the filter being duplicated.
   */
  filterId?: number | null;
}
/**
 * The result of a filter view being duplicated.
 */
export interface DuplicateFilterViewResponse {
  /**
   * The newly created filter.
   */
  filter?: FilterView;
}
/**
 * Duplicates the contents of a sheet.
 */
export interface DuplicateSheetRequest {
  /**
   * The zero-based index where the new sheet should be inserted. The index of all sheets after this are incremented.
   */
  insertSheetIndex?: number | null;
  /**
   * If set, the ID of the new sheet. If not set, an ID is chosen. If set, the ID must not conflict with any existing sheet ID. If set, it must be non-negative.
   */
  newSheetId?: number | null;
  /**
   * The name of the new sheet. If empty, a new name is chosen for you.
   */
  newSheetName?: string | null;
  /**
   * The sheet to duplicate. If the source sheet is of DATA_SOURCE type, its backing DataSource is also duplicated and associated with the new copy of the sheet. No data execution is triggered, the grid data of this sheet is also copied over but only available after the batch request completes.
   */
  sourceSheetId?: number | null;
}
/**
 * The result of duplicating a sheet.
 */
export interface DuplicateSheetResponse {
  /**
   * The properties of the duplicate sheet.
   */
  properties?: SheetProperties;
}
/**
 * The editors of a protected range.
 */
export interface Editors {
  /**
   * True if anyone in the document's domain has edit access to the protected range. Domain protection is only supported on documents within a domain.
   */
  domainUsersCanEdit?: boolean | null;
  /**
   * The email addresses of groups with edit access to the protected range.
   */
  groups?: string[] | null;
  /**
   * The email addresses of users with edit access to the protected range.
   */
  users?: string[] | null;
}
/**
 * A chart embedded in a sheet.
 */
export interface EmbeddedChart {
  /**
   * The border of the chart.
   */
  border?: EmbeddedObjectBorder;
  /**
   * The ID of the chart.
   */
  chartId?: number | null;
  /**
   * The position of the chart.
   */
  position?: EmbeddedObjectPosition;
  /**
   * The specification of the chart.
   */
  spec?: ChartSpec;
}
/**
 * A border along an embedded object.
 */
export interface EmbeddedObjectBorder {
  /**
   * The color of the border. Deprecated: Use color_style.
   *
   * @deprecated
   */
  color?: Color;
  /**
   * The color of the border. If color is also set, this field takes precedence.
   */
  colorStyle?: ColorStyle;
}
/**
 * The position of an embedded object such as a chart.
 */
export interface EmbeddedObjectPosition {
  /**
   * If true, the embedded object is put on a new sheet whose ID is chosen for you. Used only when writing.
   */
  newSheet?: boolean | null;
  /**
   * The position at which the object is overlaid on top of a grid.
   */
  overlayPosition?: OverlayPosition;
  /**
   * The sheet this is on. Set only if the embedded object is on its own sheet. Must be non-negative.
   */
  sheetId?: number | null;
}
/**
 * An error in a cell.
 */
export interface ErrorValue {
  /**
   * A message with more information about the error (in the spreadsheet's locale).
   */
  message?: string | null;
  /**
   * The type of error.
   *
   * Enumerated Values:
   * - ERROR_TYPE_UNSPECIFIED: The default error type, do not use this.
   * - ERROR: Corresponds to the `#ERROR!` error.
   * - NULL_VALUE: Corresponds to the `#NULL!` error.
   * - DIVIDE_BY_ZERO: Corresponds to the `#DIV/0` error.
   * - VALUE: Corresponds to the `#VALUE!` error.
   * - REF: Corresponds to the `#REF!` error.
   * - NAME: Corresponds to the `#NAME?` error.
   * - NUM: Corresponds to the `#NUM!` error.
   * - N_A: Corresponds to the `#N/A` error.
   * - LOADING: Corresponds to the `Loading...` state.
   */
  type?:
    | (
        | "ERROR_TYPE_UNSPECIFIED"
        | "ERROR"
        | "NULL_VALUE"
        | "DIVIDE_BY_ZERO"
        | "VALUE"
        | "REF"
        | "NAME"
        | "NUM"
        | "N_A"
        | "LOADING"
      )
    | null;
}
/**
 * The kinds of value that a cell in a spreadsheet can have.
 */
export interface ExtendedValue {
  /**
   * Represents a boolean value.
   */
  boolValue?: boolean | null;
  /**
   * Represents an error. This field is read-only.
   */
  errorValue?: ErrorValue;
  /**
   * Represents a formula.
   */
  formulaValue?: string | null;
  /**
   * Represents a double value. Note: Dates, Times and DateTimes are represented as doubles in SERIAL_NUMBER format.
   */
  numberValue?: number | null;
  /**
   * Represents a string value. Leading single quotes are not included. For example, if the user typed `'123` into the UI, this would be represented as a `stringValue` of `"123"`.
   */
  stringValue?: string | null;
}
/**
 * Criteria for showing/hiding rows in a filter or filter view.
 */
export interface FilterCriteria {
  /**
   * A condition that must be true for values to be shown. (This does not override hidden_values -- if a value is listed there, it will still be hidden.)
   */
  condition?: BooleanCondition;
  /**
   * Values that should be hidden.
   */
  hiddenValues?: string[] | null;
  /**
   * The background fill color to filter by; only cells with this fill color are shown. Mutually exclusive with visible_foreground_color. Deprecated: Use visible_background_color_style.
   *
   * @deprecated
   */
  visibleBackgroundColor?: Color;
  /**
   * The background fill color to filter by; only cells with this fill color are shown. This field is mutually exclusive with visible_foreground_color, and must be set to an RGB-type color. If visible_background_color is also set, this field takes precedence.
   */
  visibleBackgroundColorStyle?: ColorStyle;
  /**
   * The foreground color to filter by; only cells with this foreground color are shown. Mutually exclusive with visible_background_color. Deprecated: Use visible_foreground_color_style.
   *
   * @deprecated
   */
  visibleForegroundColor?: Color;
  /**
   * The foreground color to filter by; only cells with this foreground color are shown. This field is mutually exclusive with visible_background_color, and must be set to an RGB-type color. If visible_foreground_color is also set, this field takes precedence.
   */
  visibleForegroundColorStyle?: ColorStyle;
}
/**
 * The filter criteria associated with a specific column.
 */
export interface FilterSpec {
  /**
   * The zero-based column index.
   */
  columnIndex?: number | null;
  /**
   * Reference to a data source column.
   */
  dataSourceColumnReference?: DataSourceColumnReference;
  /**
   * The criteria for the column.
   */
  filterCriteria?: FilterCriteria;
}
/**
 * A filter view.
 */
export interface FilterView {
  /**
   * The criteria for showing/hiding values per column. The map's key is the column index, and the value is the criteria for that column. This field is deprecated in favor of filter_specs.
   *
   * @deprecated
   */
  criteria?: { [key: string]: FilterCriteria } | null;
  /**
   * The filter criteria for showing/hiding values per column. Both criteria and filter_specs are populated in responses. If both fields are specified in an update request, this field takes precedence.
   */
  filterSpecs?: FilterSpec[] | null;
  /**
   * The ID of the filter view.
   */
  filterViewId?: number | null;
  /**
   * The named range this filter view is backed by, if any. When writing, only one of range or named_range_id may be set.
   */
  namedRangeId?: string | null;
  /**
   * The range this filter view covers. When writing, only one of range or named_range_id may be set.
   */
  range?: GridRange;
  /**
   * The sort order per column. Later specifications are used when values are equal in the earlier specifications.
   */
  sortSpecs?: SortSpec[] | null;
  /**
   * The name of the filter view.
   */
  title?: string | null;
}
/**
 * Finds and replaces data in cells over a range, sheet, or all sheets.
 */
export interface FindReplaceRequest {
  /**
   * True to find/replace over all sheets.
   */
  allSheets?: boolean | null;
  /**
   * The value to search.
   */
  find?: string | null;
  /**
   * True if the search should include cells with formulas. False to skip cells with formulas.
   */
  includeFormulas?: boolean | null;
  /**
   * True if the search is case sensitive.
   */
  matchCase?: boolean | null;
  /**
   * True if the find value should match the entire cell.
   */
  matchEntireCell?: boolean | null;
  /**
   * The range to find/replace over.
   */
  range?: GridRange;
  /**
   * The value to use as the replacement.
   */
  replacement?: string | null;
  /**
   * True if the find value is a regex. The regular expression and replacement should follow Java regex rules at https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html. The replacement string is allowed to refer to capturing groups. For example, if one cell has the contents `"Google Sheets"` and another has `"Google Docs"`, then searching for `"o.* (.*)"` with a replacement of `"$1 Rocks"` would change the contents of the cells to `"GSheets Rocks"` and `"GDocs Rocks"` respectively.
   */
  searchByRegex?: boolean | null;
  /**
   * The sheet to find/replace over.
   */
  sheetId?: number | null;
}
/**
 * The result of the find/replace.
 */
export interface FindReplaceResponse {
  /**
   * The number of formula cells changed.
   */
  formulasChanged?: number | null;
  /**
   * The number of occurrences (possibly multiple within a cell) changed. For example, if replacing `"e"` with `"o"` in `"Google Sheets"`, this would be `"3"` because `"Google Sheets"` -\> `"Googlo Shoots"`.
   */
  occurrencesChanged?: number | null;
  /**
   * The number of rows changed.
   */
  rowsChanged?: number | null;
  /**
   * The number of sheets changed.
   */
  sheetsChanged?: number | null;
  /**
   * The number of non-formula cells changed.
   */
  valuesChanged?: number | null;
}
/**
 * The request for retrieving a Spreadsheet.
 */
export interface GetSpreadsheetByDataFilterRequest {
  /**
   * The DataFilters used to select which ranges to retrieve from the spreadsheet.
   */
  dataFilters?: DataFilter[] | null;
  /**
   * True if grid data should be returned. This parameter is ignored if a field mask was set in the request.
   */
  includeGridData?: boolean | null;
}
/**
 * A rule that applies a gradient color scale format, based on the interpolation points listed. The format of a cell will vary based on its contents as compared to the values of the interpolation points.
 */
export interface GradientRule {
  /**
   * The final interpolation point.
   */
  maxpoint?: InterpolationPoint;
  /**
   * An optional midway interpolation point.
   */
  midpoint?: InterpolationPoint;
  /**
   * The starting interpolation point.
   */
  minpoint?: InterpolationPoint;
}
/**
 * A coordinate in a sheet. All indexes are zero-based.
 */
export interface GridCoordinate {
  /**
   * The column index of the coordinate.
   */
  columnIndex?: number | null;
  /**
   * The row index of the coordinate.
   */
  rowIndex?: number | null;
  /**
   * The sheet this coordinate is on.
   */
  sheetId?: number | null;
}
/**
 * Data in the grid, as well as metadata about the dimensions.
 */
export interface GridData {
  /**
   * Metadata about the requested columns in the grid, starting with the column in start_column.
   */
  columnMetadata?: DimensionProperties[] | null;
  /**
   * The data in the grid, one entry per row, starting with the row in startRow. The values in RowData will correspond to columns starting at start_column.
   */
  rowData?: RowData[] | null;
  /**
   * Metadata about the requested rows in the grid, starting with the row in start_row.
   */
  rowMetadata?: DimensionProperties[] | null;
  /**
   * The first column this GridData refers to, zero-based.
   */
  startColumn?: number | null;
  /**
   * The first row this GridData refers to, zero-based.
   */
  startRow?: number | null;
}
/**
 * Properties of a grid.
 */
export interface GridProperties {
  /**
   * The number of columns in the grid.
   */
  columnCount?: number | null;
  /**
   * True if the column grouping control toggle is shown after the group.
   */
  columnGroupControlAfter?: boolean | null;
  /**
   * The number of columns that are frozen in the grid.
   */
  frozenColumnCount?: number | null;
  /**
   * The number of rows that are frozen in the grid.
   */
  frozenRowCount?: number | null;
  /**
   * True if the grid isn't showing gridlines in the UI.
   */
  hideGridlines?: boolean | null;
  /**
   * The number of rows in the grid.
   */
  rowCount?: number | null;
  /**
   * True if the row grouping control toggle is shown after the group.
   */
  rowGroupControlAfter?: boolean | null;
}
/**
 * A range on a sheet. All indexes are zero-based. Indexes are half open, i.e. the start index is inclusive and the end index is exclusive -- [start_index, end_index). Missing indexes indicate the range is unbounded on that side. For example, if `&quot;Sheet1&quot;` is sheet ID 123456, then: `Sheet1!A1:A1 == sheet_id: 123456, start_row_index: 0, end_row_index: 1, start_column_index: 0, end_column_index: 1` `Sheet1!A3:B4 == sheet_id: 123456, start_row_index: 2, end_row_index: 4, start_column_index: 0, end_column_index: 2` `Sheet1!A:B == sheet_id: 123456, start_column_index: 0, end_column_index: 2` `Sheet1!A5:B == sheet_id: 123456, start_row_index: 4, start_column_index: 0, end_column_index: 2` `Sheet1 == sheet_id: 123456` The start index must always be less than or equal to the end index. If the start index equals the end index, then the range is empty. Empty ranges are typically not meaningful and are usually rendered in the UI as `#REF!`.
 */
export interface GridRange {
  /**
   * The end column (exclusive) of the range, or not set if unbounded.
   */
  endColumnIndex?: number | null;
  /**
   * The end row (exclusive) of the range, or not set if unbounded.
   */
  endRowIndex?: number | null;
  /**
   * The sheet this range is on.
   */
  sheetId?: number | null;
  /**
   * The start column (inclusive) of the range, or not set if unbounded.
   */
  startColumnIndex?: number | null;
  /**
   * The start row (inclusive) of the range, or not set if unbounded.
   */
  startRowIndex?: number | null;
}
/**
 * A histogram chart. A histogram chart groups data items into bins, displaying each bin as a column of stacked items. Histograms are used to display the distribution of a dataset. Each column of items represents a range into which those items fall. The number of bins can be chosen automatically or specified explicitly.
 */
export interface HistogramChartSpec {
  /**
   * By default the bucket size (the range of values stacked in a single column) is chosen automatically, but it may be overridden here. E.g., A bucket size of 1.5 results in buckets from 0 - 1.5, 1.5 - 3.0, etc. Cannot be negative. This field is optional.
   */
  bucketSize?: number | null;
  /**
   * The position of the chart legend.
   *
   * Enumerated Values:
   * - HISTOGRAM_CHART_LEGEND_POSITION_UNSPECIFIED: Default value, do not use.
   * - BOTTOM_LEGEND: The legend is rendered on the bottom of the chart.
   * - LEFT_LEGEND: The legend is rendered on the left of the chart.
   * - RIGHT_LEGEND: The legend is rendered on the right of the chart.
   * - TOP_LEGEND: The legend is rendered on the top of the chart.
   * - NO_LEGEND: No legend is rendered.
   * - INSIDE_LEGEND: The legend is rendered inside the chart area.
   */
  legendPosition?:
    | (
        | "HISTOGRAM_CHART_LEGEND_POSITION_UNSPECIFIED"
        | "BOTTOM_LEGEND"
        | "LEFT_LEGEND"
        | "RIGHT_LEGEND"
        | "TOP_LEGEND"
        | "NO_LEGEND"
        | "INSIDE_LEGEND"
      )
    | null;
  /**
   * The outlier percentile is used to ensure that outliers do not adversely affect the calculation of bucket sizes. For example, setting an outlier percentile of 0.05 indicates that the top and bottom 5% of values when calculating buckets. The values are still included in the chart, they will be added to the first or last buckets instead of their own buckets. Must be between 0.0 and 0.5.
   */
  outlierPercentile?: number | null;
  /**
   * The series for a histogram may be either a single series of values to be bucketed or multiple series, each of the same length, containing the name of the series followed by the values to be bucketed for that series.
   */
  series?: HistogramSeries[] | null;
  /**
   * Whether horizontal divider lines should be displayed between items in each column.
   */
  showItemDividers?: boolean | null;
}
/**
 * Allows you to organize the numeric values in a source data column into buckets of a constant size. All values from HistogramRule.start to HistogramRule.end are placed into groups of size HistogramRule.interval. In addition, all values below HistogramRule.start are placed in one group, and all values above HistogramRule.end are placed in another. Only HistogramRule.interval is required, though if HistogramRule.start and HistogramRule.end are both provided, HistogramRule.start must be less than HistogramRule.end. For example, a pivot table showing average purchase amount by age that has 50+ rows: +-----+-------------------+ | Age | AVERAGE of Amount | +-----+-------------------+ | 16 | $27.13 | | 17 | $5.24 | | 18 | $20.15 | ... +-----+-------------------+ could be turned into a pivot table that looks like the one below by applying a histogram group rule with a HistogramRule.start of 25, an HistogramRule.interval of 20, and an HistogramRule.end of 65. +-------------+-------------------+ | Grouped Age | AVERAGE of Amount | +-------------+-------------------+ | &lt; 25 | $19.34 | | 25-45 | $31.43 | | 45-65 | $35.87 | | &#92;&gt; 65 | $27.55 | +-------------+-------------------+ | Grand Total | $29.12 | +-------------+-------------------+
 */
export interface HistogramRule {
  /**
   * The maximum value at which items are placed into buckets of constant size. Values above end are lumped into a single bucket. This field is optional.
   */
  end?: number | null;
  /**
   * The size of the buckets that are created. Must be positive.
   */
  interval?: number | null;
  /**
   * The minimum value at which items are placed into buckets of constant size. Values below start are lumped into a single bucket. This field is optional.
   */
  start?: number | null;
}
/**
 * A histogram series containing the series color and data.
 */
export interface HistogramSeries {
  /**
   * The color of the column representing this series in each bucket. This field is optional. Deprecated: Use bar_color_style.
   *
   * @deprecated
   */
  barColor?: Color;
  /**
   * The color of the column representing this series in each bucket. This field is optional. If bar_color is also set, this field takes precedence.
   */
  barColorStyle?: ColorStyle;
  /**
   * The data for this histogram series.
   */
  data?: ChartData;
}
/**
 * Inserts rows or columns in a sheet at a particular index.
 */
export interface InsertDimensionRequest {
  /**
   * Whether dimension properties should be extended from the dimensions before or after the newly inserted dimensions. True to inherit from the dimensions before (in which case the start index must be greater than 0), and false to inherit from the dimensions after. For example, if row index 0 has red background and row index 1 has a green background, then inserting 2 rows at index 1 can inherit either the green or red background. If `inheritFromBefore` is true, the two new rows will be red (because the row before the insertion point was red), whereas if `inheritFromBefore` is false, the two new rows will be green (because the row after the insertion point was green).
   */
  inheritFromBefore?: boolean | null;
  /**
   * The dimensions to insert. Both the start and end indexes must be bounded.
   */
  range?: DimensionRange;
}
/**
 * Inserts cells into a range, shifting the existing cells over or down.
 */
export interface InsertRangeRequest {
  /**
   * The range to insert new cells into.
   */
  range?: GridRange;
  /**
   * The dimension which will be shifted when inserting cells. If ROWS, existing cells will be shifted down. If COLUMNS, existing cells will be shifted right.
   *
   * Enumerated Values:
   * - DIMENSION_UNSPECIFIED: The default value, do not use.
   * - ROWS: Operates on the rows of a sheet.
   * - COLUMNS: Operates on the columns of a sheet.
   */
  shiftDimension?: ("DIMENSION_UNSPECIFIED" | "ROWS" | "COLUMNS") | null;
}
/**
 * A single interpolation point on a gradient conditional format. These pin the gradient color scale according to the color, type and value chosen.
 */
export interface InterpolationPoint {
  /**
   * The color this interpolation point should use. Deprecated: Use color_style.
   *
   * @deprecated
   */
  color?: Color;
  /**
   * The color this interpolation point should use. If color is also set, this field takes precedence.
   */
  colorStyle?: ColorStyle;
  /**
   * How the value should be interpreted.
   *
   * Enumerated Values:
   * - INTERPOLATION_POINT_TYPE_UNSPECIFIED: The default value, do not use.
   * - MIN: The interpolation point uses the minimum value in the cells over the range of the conditional format.
   * - MAX: The interpolation point uses the maximum value in the cells over the range of the conditional format.
   * - NUMBER: The interpolation point uses exactly the value in InterpolationPoint.value.
   * - PERCENT: The interpolation point is the given percentage over all the cells in the range of the conditional format. This is equivalent to `NUMBER` if the value was: `=(MAX(FLATTEN(range)) * (value / 100)) + (MIN(FLATTEN(range)) * (1 - (value / 100)))` (where errors in the range are ignored when flattening).
   * - PERCENTILE: The interpolation point is the given percentile over all the cells in the range of the conditional format. This is equivalent to `NUMBER` if the value was: `=PERCENTILE(FLATTEN(range), value / 100)` (where errors in the range are ignored when flattening).
   */
  type?: ("INTERPOLATION_POINT_TYPE_UNSPECIFIED" | "MIN" | "MAX" | "NUMBER" | "PERCENT" | "PERCENTILE") | null;
  /**
   * The value this interpolation point uses. May be a formula. Unused if type is MIN or MAX.
   */
  value?: string | null;
}
/**
 * Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive). The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.
 */
export interface Interval {
  /**
   * Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end.
   */
  endTime?: string | null;
  /**
   * Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start.
   */
  startTime?: string | null;
}
/**
 * Settings to control how circular dependencies are resolved with iterative calculation.
 */
export interface IterativeCalculationSettings {
  /**
   * When iterative calculation is enabled and successive results differ by less than this threshold value, the calculation rounds stop.
   */
  convergenceThreshold?: number | null;
  /**
   * When iterative calculation is enabled, the maximum number of calculation rounds to perform.
   */
  maxIterations?: number | null;
}
/**
 * Formatting options for key value.
 */
export interface KeyValueFormat {
  /**
   * Specifies the horizontal text positioning of key value. This field is optional. If not specified, default positioning is used.
   */
  position?: TextPosition;
  /**
   * Text formatting options for key value. The link field is not supported.
   */
  textFormat?: TextFormat;
}
/**
 * Properties that describe the style of a line.
 */
export interface LineStyle {
  /**
   * The dash type of the line.
   *
   * Enumerated Values:
   * - LINE_DASH_TYPE_UNSPECIFIED: Default value, do not use.
   * - INVISIBLE: No dash type, which is equivalent to a non-visible line.
   * - CUSTOM: A custom dash for a line. Modifying the exact custom dash style is currently unsupported.
   * - SOLID: A solid line.
   * - DOTTED: A dotted line.
   * - MEDIUM_DASHED: A dashed line where the dashes have "medium" length.
   * - MEDIUM_DASHED_DOTTED: A line that alternates between a "medium" dash and a dot.
   * - LONG_DASHED: A dashed line where the dashes have "long" length.
   * - LONG_DASHED_DOTTED: A line that alternates between a "long" dash and a dot.
   */
  type?:
    | (
        | "LINE_DASH_TYPE_UNSPECIFIED"
        | "INVISIBLE"
        | "CUSTOM"
        | "SOLID"
        | "DOTTED"
        | "MEDIUM_DASHED"
        | "MEDIUM_DASHED_DOTTED"
        | "LONG_DASHED"
        | "LONG_DASHED_DOTTED"
      )
    | null;
  /**
   * The thickness of the line, in px.
   */
  width?: number | null;
}
/**
 * An external or local reference.
 */
export interface Link {
  /**
   * The link identifier.
   */
  uri?: string | null;
}
/**
 * Allows you to manually organize the values in a source data column into buckets with names of your choosing. For example, a pivot table that aggregates population by state: +-------+-------------------+ | State | SUM of Population | +-------+-------------------+ | AK | 0.7 | | AL | 4.8 | | AR | 2.9 | ... +-------+-------------------+ could be turned into a pivot table that aggregates population by time zone by providing a list of groups (for example, groupName = &#39;Central&#39;, items = [&#39;AL&#39;, &#39;AR&#39;, &#39;IA&#39;, ...]) to a manual group rule. Note that a similar effect could be achieved by adding a time zone column to the source data and adjusting the pivot table. +-----------+-------------------+ | Time Zone | SUM of Population | +-----------+-------------------+ | Central | 106.3 | | Eastern | 151.9 | | Mountain | 17.4 | ... +-----------+-------------------+
 */
export interface ManualRule {
  /**
   * The list of group names and the corresponding items from the source data that map to each group name.
   */
  groups?: ManualRuleGroup[] | null;
}
/**
 * A group name and a list of items from the source data that should be placed in the group with this name.
 */
export interface ManualRuleGroup {
  /**
   * The group name, which must be a string. Each group in a given ManualRule must have a unique group name.
   */
  groupName?: ExtendedValue;
  /**
   * The items in the source data that should be placed into this group. Each item may be a string, number, or boolean. Items may appear in at most one group within a given ManualRule. Items that do not appear in any group will appear on their own.
   */
  items?: ExtendedValue[] | null;
}
/**
 * A developer metadata entry and the data filters specified in the original request that matched it.
 */
export interface MatchedDeveloperMetadata {
  /**
   * All filters matching the returned developer metadata.
   */
  dataFilters?: DataFilter[] | null;
  /**
   * The developer metadata matching the specified filters.
   */
  developerMetadata?: DeveloperMetadata;
}
/**
 * A value range that was matched by one or more data filers.
 */
export interface MatchedValueRange {
  /**
   * The DataFilters from the request that matched the range of values.
   */
  dataFilters?: DataFilter[] | null;
  /**
   * The values matched by the DataFilter.
   */
  valueRange?: ValueRange;
}
/**
 * Merges all cells in the range.
 */
export interface MergeCellsRequest {
  /**
   * How the cells should be merged.
   *
   * Enumerated Values:
   * - MERGE_ALL: Create a single merge from the range
   * - MERGE_COLUMNS: Create a merge for each column in the range
   * - MERGE_ROWS: Create a merge for each row in the range
   */
  mergeType?: ("MERGE_ALL" | "MERGE_COLUMNS" | "MERGE_ROWS") | null;
  /**
   * The range of cells to merge.
   */
  range?: GridRange;
}
/**
 * Moves one or more rows or columns.
 */
export interface MoveDimensionRequest {
  /**
   * The zero-based start index of where to move the source data to, based on the coordinates *before* the source data is removed from the grid. Existing data will be shifted down or right (depending on the dimension) to make room for the moved dimensions. The source dimensions are removed from the grid, so the the data may end up in a different index than specified. For example, given `A1..A5` of `0, 1, 2, 3, 4` and wanting to move `"1"` and `"2"` to between `"3"` and `"4"`, the source would be `ROWS [1..3)`,and the destination index would be `"4"` (the zero-based index of row 5). The end result would be `A1..A5` of `0, 3, 1, 2, 4`.
   */
  destinationIndex?: number | null;
  /**
   * The source dimensions to move.
   */
  source?: DimensionRange;
}
/**
 * A named range.
 */
export interface NamedRange {
  /**
   * The name of the named range.
   */
  name?: string | null;
  /**
   * The ID of the named range.
   */
  namedRangeId?: string | null;
  /**
   * The range this represents.
   */
  range?: GridRange;
}
/**
 * The number format of a cell.
 */
export interface NumberFormat {
  /**
   * Pattern string used for formatting. If not set, a default pattern based on the user's locale will be used if necessary for the given type. See the [Date and Number Formats guide](/sheets/api/guides/formats) for more information about the supported patterns.
   */
  pattern?: string | null;
  /**
   * The type of the number format. When writing, this field must be set.
   *
   * Enumerated Values:
   * - NUMBER_FORMAT_TYPE_UNSPECIFIED: The number format is not specified and is based on the contents of the cell. Do not explicitly use this.
   * - TEXT: Text formatting, e.g `1000.12`
   * - NUMBER: Number formatting, e.g, `1,000.12`
   * - PERCENT: Percent formatting, e.g `10.12%`
   * - CURRENCY: Currency formatting, e.g `$1,000.12`
   * - DATE: Date formatting, e.g `9/26/2008`
   * - TIME: Time formatting, e.g `3:59:00 PM`
   * - DATE_TIME: Date+Time formatting, e.g `9/26/08 15:59:00`
   * - SCIENTIFIC: Scientific number formatting, e.g `1.01E+03`
   */
  type?:
    | (
        | "NUMBER_FORMAT_TYPE_UNSPECIFIED"
        | "TEXT"
        | "NUMBER"
        | "PERCENT"
        | "CURRENCY"
        | "DATE"
        | "TIME"
        | "DATE_TIME"
        | "SCIENTIFIC"
      )
    | null;
}
/**
 * An org chart. Org charts require a unique set of labels in labels and may optionally include parent_labels and tooltips. parent_labels contain, for each node, the label identifying the parent node. tooltips contain, for each node, an optional tooltip. For example, to describe an OrgChart with Alice as the CEO, Bob as the President (reporting to Alice) and Cathy as VP of Sales (also reporting to Alice), have labels contain &quot;Alice&quot;, &quot;Bob&quot;, &quot;Cathy&quot;, parent_labels contain &quot;&quot;, &quot;Alice&quot;, &quot;Alice&quot; and tooltips contain &quot;CEO&quot;, &quot;President&quot;, &quot;VP Sales&quot;.
 */
export interface OrgChartSpec {
  /**
   * The data containing the labels for all the nodes in the chart. Labels must be unique.
   */
  labels?: ChartData;
  /**
   * The color of the org chart nodes. Deprecated: Use node_color_style.
   *
   * @deprecated
   */
  nodeColor?: Color;
  /**
   * The color of the org chart nodes. If node_color is also set, this field takes precedence.
   */
  nodeColorStyle?: ColorStyle;
  /**
   * The size of the org chart nodes.
   *
   * Enumerated Values:
   * - ORG_CHART_LABEL_SIZE_UNSPECIFIED: Default value, do not use.
   * - SMALL: The small org chart node size.
   * - MEDIUM: The medium org chart node size.
   * - LARGE: The large org chart node size.
   */
  nodeSize?: ("ORG_CHART_LABEL_SIZE_UNSPECIFIED" | "SMALL" | "MEDIUM" | "LARGE") | null;
  /**
   * The data containing the label of the parent for the corresponding node. A blank value indicates that the node has no parent and is a top-level node. This field is optional.
   */
  parentLabels?: ChartData;
  /**
   * The color of the selected org chart nodes. Deprecated: Use selected_node_color_style.
   *
   * @deprecated
   */
  selectedNodeColor?: Color;
  /**
   * The color of the selected org chart nodes. If selected_node_color is also set, this field takes precedence.
   */
  selectedNodeColorStyle?: ColorStyle;
  /**
   * The data containing the tooltip for the corresponding node. A blank value results in no tooltip being displayed for the node. This field is optional.
   */
  tooltips?: ChartData;
}
/**
 * The location an object is overlaid on top of a grid.
 */
export interface OverlayPosition {
  /**
   * The cell the object is anchored to.
   */
  anchorCell?: GridCoordinate;
  /**
   * The height of the object, in pixels. Defaults to 371.
   */
  heightPixels?: number | null;
  /**
   * The horizontal offset, in pixels, that the object is offset from the anchor cell.
   */
  offsetXPixels?: number | null;
  /**
   * The vertical offset, in pixels, that the object is offset from the anchor cell.
   */
  offsetYPixels?: number | null;
  /**
   * The width of the object, in pixels. Defaults to 600.
   */
  widthPixels?: number | null;
}
/**
 * The amount of padding around the cell, in pixels. When updating padding, every field must be specified.
 */
export interface Padding {
  /**
   * The bottom padding of the cell.
   */
  bottom?: number | null;
  /**
   * The left padding of the cell.
   */
  left?: number | null;
  /**
   * The right padding of the cell.
   */
  right?: number | null;
  /**
   * The top padding of the cell.
   */
  top?: number | null;
}
/**
 * Inserts data into the spreadsheet starting at the specified coordinate.
 */
export interface PasteDataRequest {
  /**
   * The coordinate at which the data should start being inserted.
   */
  coordinate?: GridCoordinate;
  /**
   * The data to insert.
   */
  data?: string | null;
  /**
   * The delimiter in the data.
   */
  delimiter?: string | null;
  /**
   * True if the data is HTML.
   */
  html?: boolean | null;
  /**
   * How the data should be pasted.
   *
   * Enumerated Values:
   * - PASTE_NORMAL: Paste values, formulas, formats, and merges.
   * - PASTE_VALUES: Paste the values ONLY without formats, formulas, or merges.
   * - PASTE_FORMAT: Paste the format and data validation only.
   * - PASTE_NO_BORDERS: Like `PASTE_NORMAL` but without borders.
   * - PASTE_FORMULA: Paste the formulas only.
   * - PASTE_DATA_VALIDATION: Paste the data validation only.
   * - PASTE_CONDITIONAL_FORMATTING: Paste the conditional formatting rules only.
   */
  type?:
    | (
        | "PASTE_NORMAL"
        | "PASTE_VALUES"
        | "PASTE_FORMAT"
        | "PASTE_NO_BORDERS"
        | "PASTE_FORMULA"
        | "PASTE_DATA_VALIDATION"
        | "PASTE_CONDITIONAL_FORMATTING"
      )
    | null;
}
/**
 * A pie chart.
 */
export interface PieChartSpec {
  /**
   * The data that covers the domain of the pie chart.
   */
  domain?: ChartData;
  /**
   * Where the legend of the pie chart should be drawn.
   *
   * Enumerated Values:
   * - PIE_CHART_LEGEND_POSITION_UNSPECIFIED: Default value, do not use.
   * - BOTTOM_LEGEND: The legend is rendered on the bottom of the chart.
   * - LEFT_LEGEND: The legend is rendered on the left of the chart.
   * - RIGHT_LEGEND: The legend is rendered on the right of the chart.
   * - TOP_LEGEND: The legend is rendered on the top of the chart.
   * - NO_LEGEND: No legend is rendered.
   * - LABELED_LEGEND: Each pie slice has a label attached to it.
   */
  legendPosition?:
    | (
        | "PIE_CHART_LEGEND_POSITION_UNSPECIFIED"
        | "BOTTOM_LEGEND"
        | "LEFT_LEGEND"
        | "RIGHT_LEGEND"
        | "TOP_LEGEND"
        | "NO_LEGEND"
        | "LABELED_LEGEND"
      )
    | null;
  /**
   * The size of the hole in the pie chart.
   */
  pieHole?: number | null;
  /**
   * The data that covers the one and only series of the pie chart.
   */
  series?: ChartData;
  /**
   * True if the pie is three dimensional.
   */
  threeDimensional?: boolean | null;
}
/**
 * Criteria for showing/hiding rows in a pivot table.
 */
export interface PivotFilterCriteria {
  /**
   * A condition that must be true for values to be shown. (`visibleValues` does not override this -- even if a value is listed there, it is still hidden if it does not meet the condition.) Condition values that refer to ranges in A1-notation are evaluated relative to the pivot table sheet. References are treated absolutely, so are not filled down the pivot table. For example, a condition value of `=A1` on "Pivot Table 1" is treated as `'Pivot Table 1'!$A$1`. The source data of the pivot table can be referenced by column header name. For example, if the source data has columns named "Revenue" and "Cost" and a condition is applied to the "Revenue" column with type `NUMBER_GREATER` and value `=Cost`, then only columns where "Revenue" \> "Cost" are included.
   */
  condition?: BooleanCondition;
  /**
   * Whether values are visible by default. If true, the visible_values are ignored, all values that meet condition (if specified) are shown. If false, values that are both in visible_values and meet condition are shown.
   */
  visibleByDefault?: boolean | null;
  /**
   * Values that should be included. Values not listed here are excluded.
   */
  visibleValues?: string[] | null;
}
/**
 * The pivot table filter criteria associated with a specific source column offset.
 */
export interface PivotFilterSpec {
  /**
   * The zero-based column offset of the source range.
   */
  columnOffsetIndex?: number | null;
  /**
   * The reference to the data source column.
   */
  dataSourceColumnReference?: DataSourceColumnReference;
  /**
   * The criteria for the column.
   */
  filterCriteria?: PivotFilterCriteria;
}
/**
 * A single grouping (either row or column) in a pivot table.
 */
export interface PivotGroup {
  /**
   * The reference to the data source column this grouping is based on.
   */
  dataSourceColumnReference?: DataSourceColumnReference;
  /**
   * The count limit on rows or columns to apply to this pivot group.
   */
  groupLimit?: PivotGroupLimit;
  /**
   * The group rule to apply to this row/column group.
   */
  groupRule?: PivotGroupRule;
  /**
   * The labels to use for the row/column groups which can be customized. For example, in the following pivot table, the row label is `Region` (which could be renamed to `State`) and the column label is `Product` (which could be renamed `Item`). Pivot tables created before December 2017 do not have header labels. If you'd like to add header labels to an existing pivot table, please delete the existing pivot table and then create a new pivot table with same parameters. +--------------+---------+-------+ | SUM of Units | Product | | | Region | Pen | Paper | +--------------+---------+-------+ | New York | 345 | 98 | | Oregon | 234 | 123 | | Tennessee | 531 | 415 | +--------------+---------+-------+ | Grand Total | 1110 | 636 | +--------------+---------+-------+
   */
  label?: string | null;
  /**
   * True if the headings in this pivot group should be repeated. This is only valid for row groupings and is ignored by columns. By default, we minimize repetition of headings by not showing higher level headings where they are the same. For example, even though the third row below corresponds to "Q1 Mar", "Q1" is not shown because it is redundant with previous rows. Setting repeat_headings to true would cause "Q1" to be repeated for "Feb" and "Mar". +--------------+ | Q1 | Jan | | | Feb | | | Mar | +--------+-----+ | Q1 Total | +--------------+
   */
  repeatHeadings?: boolean | null;
  /**
   * True if the pivot table should include the totals for this grouping.
   */
  showTotals?: boolean | null;
  /**
   * The order the values in this group should be sorted.
   *
   * Enumerated Values:
   * - SORT_ORDER_UNSPECIFIED: Default value, do not use this.
   * - ASCENDING: Sort ascending.
   * - DESCENDING: Sort descending.
   */
  sortOrder?: ("SORT_ORDER_UNSPECIFIED" | "ASCENDING" | "DESCENDING") | null;
  /**
   * The column offset of the source range that this grouping is based on. For example, if the source was `C10:E15`, a `sourceColumnOffset` of `0` means this group refers to column `C`, whereas the offset `1` would refer to column `D`.
   */
  sourceColumnOffset?: number | null;
  /**
   * The bucket of the opposite pivot group to sort by. If not specified, sorting is alphabetical by this group's values.
   */
  valueBucket?: PivotGroupSortValueBucket;
  /**
   * Metadata about values in the grouping.
   */
  valueMetadata?: PivotGroupValueMetadata[] | null;
}
/**
 * The count limit on rows or columns in the pivot group.
 */
export interface PivotGroupLimit {
  /**
   * The order in which the group limit is applied to the pivot table. Pivot group limits are applied from lower to higher order number. Order numbers are normalized to consecutive integers from 0. For write request, to fully customize the applying orders, all pivot group limits should have this field set with an unique number. Otherwise, the order is determined by the index in the PivotTable.rows list and then the PivotTable.columns list.
   */
  applyOrder?: number | null;
  /**
   * The count limit.
   */
  countLimit?: number | null;
}
/**
 * An optional setting on a PivotGroup that defines buckets for the values in the source data column rather than breaking out each individual value. Only one PivotGroup with a group rule may be added for each column in the source data, though on any given column you may add both a PivotGroup that has a rule and a PivotGroup that does not.
 */
export interface PivotGroupRule {
  /**
   * A DateTimeRule.
   */
  dateTimeRule?: DateTimeRule;
  /**
   * A HistogramRule.
   */
  histogramRule?: HistogramRule;
  /**
   * A ManualRule.
   */
  manualRule?: ManualRule;
}
/**
 * Information about which values in a pivot group should be used for sorting.
 */
export interface PivotGroupSortValueBucket {
  /**
   * Determines the bucket from which values are chosen to sort. For example, in a pivot table with one row group & two column groups, the row group can list up to two values. The first value corresponds to a value within the first column group, and the second value corresponds to a value in the second column group. If no values are listed, this would indicate that the row should be sorted according to the "Grand Total" over the column groups. If a single value is listed, this would correspond to using the "Total" of that bucket.
   */
  buckets?: ExtendedValue[] | null;
  /**
   * The offset in the PivotTable.values list which the values in this grouping should be sorted by.
   */
  valuesIndex?: number | null;
}
/**
 * Metadata about a value in a pivot grouping.
 */
export interface PivotGroupValueMetadata {
  /**
   * True if the data corresponding to the value is collapsed.
   */
  collapsed?: boolean | null;
  /**
   * The calculated value the metadata corresponds to. (Note that formulaValue is not valid, because the values will be calculated.)
   */
  value?: ExtendedValue;
}
/**
 * A pivot table.
 */
export interface PivotTable {
  /**
   * Each column grouping in the pivot table.
   */
  columns?: PivotGroup[] | null;
  /**
   * An optional mapping of filters per source column offset. The filters are applied before aggregating data into the pivot table. The map's key is the column offset of the source range that you want to filter, and the value is the criteria for that column. For example, if the source was `C10:E15`, a key of `0` will have the filter for column `C`, whereas the key `1` is for column `D`. This field is deprecated in favor of filter_specs.
   *
   * @deprecated
   */
  criteria?: { [key: string]: PivotFilterCriteria } | null;
  /**
   * Output only. The data execution status for data source pivot tables.
   */
  dataExecutionStatus?: DataExecutionStatus;
  /**
   * The ID of the data source the pivot table is reading data from.
   */
  dataSourceId?: string | null;
  /**
   * The filters applied to the source columns before aggregating data for the pivot table. Both criteria and filter_specs are populated in responses. If both fields are specified in an update request, this field takes precedence.
   */
  filterSpecs?: PivotFilterSpec[] | null;
  /**
   * Each row grouping in the pivot table.
   */
  rows?: PivotGroup[] | null;
  /**
   * The range the pivot table is reading data from.
   */
  source?: GridRange;
  /**
   * Whether values should be listed horizontally (as columns) or vertically (as rows).
   *
   * Enumerated Values:
   * - HORIZONTAL: Values are laid out horizontally (as columns).
   * - VERTICAL: Values are laid out vertically (as rows).
   */
  valueLayout?: ("HORIZONTAL" | "VERTICAL") | null;
  /**
   * A list of values to include in the pivot table.
   */
  values?: PivotValue[] | null;
}
/**
 * The definition of how a value in a pivot table should be calculated.
 */
export interface PivotValue {
  /**
   * If specified, indicates that pivot values should be displayed as the result of a calculation with another pivot value. For example, if calculated_display_type is specified as PERCENT_OF_GRAND_TOTAL, all the pivot values are displayed as the percentage of the grand total. In the Sheets editor, this is referred to as "Show As" in the value section of a pivot table.
   *
   * Enumerated Values:
   * - PIVOT_VALUE_CALCULATED_DISPLAY_TYPE_UNSPECIFIED: Default value, do not use.
   * - PERCENT_OF_ROW_TOTAL: Shows the pivot values as percentage of the row total values.
   * - PERCENT_OF_COLUMN_TOTAL: Shows the pivot values as percentage of the column total values.
   * - PERCENT_OF_GRAND_TOTAL: Shows the pivot values as percentage of the grand total values.
   */
  calculatedDisplayType?:
    | (
        | "PIVOT_VALUE_CALCULATED_DISPLAY_TYPE_UNSPECIFIED"
        | "PERCENT_OF_ROW_TOTAL"
        | "PERCENT_OF_COLUMN_TOTAL"
        | "PERCENT_OF_GRAND_TOTAL"
      )
    | null;
  /**
   * The reference to the data source column that this value reads from.
   */
  dataSourceColumnReference?: DataSourceColumnReference;
  /**
   * A custom formula to calculate the value. The formula must start with an `=` character.
   */
  formula?: string | null;
  /**
   * A name to use for the value.
   */
  name?: string | null;
  /**
   * The column offset of the source range that this value reads from. For example, if the source was `C10:E15`, a `sourceColumnOffset` of `0` means this value refers to column `C`, whereas the offset `1` would refer to column `D`.
   */
  sourceColumnOffset?: number | null;
  /**
   * A function to summarize the value. If formula is set, the only supported values are SUM and CUSTOM. If sourceColumnOffset is set, then `CUSTOM` is not supported.
   *
   * Enumerated Values:
   * - PIVOT_STANDARD_VALUE_FUNCTION_UNSPECIFIED: The default, do not use.
   * - SUM: Corresponds to the `SUM` function.
   * - COUNTA: Corresponds to the `COUNTA` function.
   * - COUNT: Corresponds to the `COUNT` function.
   * - COUNTUNIQUE: Corresponds to the `COUNTUNIQUE` function.
   * - AVERAGE: Corresponds to the `AVERAGE` function.
   * - MAX: Corresponds to the `MAX` function.
   * - MIN: Corresponds to the `MIN` function.
   * - MEDIAN: Corresponds to the `MEDIAN` function.
   * - PRODUCT: Corresponds to the `PRODUCT` function.
   * - STDEV: Corresponds to the `STDEV` function.
   * - STDEVP: Corresponds to the `STDEVP` function.
   * - VAR: Corresponds to the `VAR` function.
   * - VARP: Corresponds to the `VARP` function.
   * - CUSTOM: Indicates the formula should be used as-is. Only valid if PivotValue.formula was set.
   */
  summarizeFunction?:
    | (
        | "PIVOT_STANDARD_VALUE_FUNCTION_UNSPECIFIED"
        | "SUM"
        | "COUNTA"
        | "COUNT"
        | "COUNTUNIQUE"
        | "AVERAGE"
        | "MAX"
        | "MIN"
        | "MEDIAN"
        | "PRODUCT"
        | "STDEV"
        | "STDEVP"
        | "VAR"
        | "VARP"
        | "CUSTOM"
      )
    | null;
}
/**
 * The style of a point on the chart.
 */
export interface PointStyle {
  /**
   * The point shape. If empty or unspecified, a default shape is used.
   *
   * Enumerated Values:
   * - POINT_SHAPE_UNSPECIFIED: Default value.
   * - CIRCLE: A circle shape.
   * - DIAMOND: A diamond shape.
   * - HEXAGON: A hexagon shape.
   * - PENTAGON: A pentagon shape.
   * - SQUARE: A square shape.
   * - STAR: A star shape.
   * - TRIANGLE: A triangle shape.
   * - X_MARK: An x-mark shape.
   */
  shape?:
    | (
        | "POINT_SHAPE_UNSPECIFIED"
        | "CIRCLE"
        | "DIAMOND"
        | "HEXAGON"
        | "PENTAGON"
        | "SQUARE"
        | "STAR"
        | "TRIANGLE"
        | "X_MARK"
      )
    | null;
  /**
   * The point size. If empty, a default size is used.
   */
  size?: number | null;
}
/**
 * A protected range.
 */
export interface ProtectedRange {
  /**
   * The description of this protected range.
   */
  description?: string | null;
  /**
   * The users and groups with edit access to the protected range. This field is only visible to users with edit access to the protected range and the document. Editors are not supported with warning_only protection.
   */
  editors?: Editors;
  /**
   * The named range this protected range is backed by, if any. When writing, only one of range or named_range_id may be set.
   */
  namedRangeId?: string | null;
  /**
   * The ID of the protected range. This field is read-only.
   */
  protectedRangeId?: number | null;
  /**
   * The range that is being protected. The range may be fully unbounded, in which case this is considered a protected sheet. When writing, only one of range or named_range_id may be set.
   */
  range?: GridRange;
  /**
   * True if the user who requested this protected range can edit the protected area. This field is read-only.
   */
  requestingUserCanEdit?: boolean | null;
  /**
   * The list of unprotected ranges within a protected sheet. Unprotected ranges are only supported on protected sheets.
   */
  unprotectedRanges?: GridRange[] | null;
  /**
   * True if this protected range will show a warning when editing. Warning-based protection means that every user can edit data in the protected range, except editing will prompt a warning asking the user to confirm the edit. When writing: if this field is true, then editors are ignored. Additionally, if this field is changed from true to false and the `editors` field is not set (nor included in the field mask), then the editors will be set to all the editors in the document.
   */
  warningOnly?: boolean | null;
}
/**
 * Randomizes the order of the rows in a range.
 */
export interface RandomizeRangeRequest {
  /**
   * The range to randomize.
   */
  range?: GridRange;
}
/**
 * The execution status of refreshing one data source object.
 */
export interface RefreshDataSourceObjectExecutionStatus {
  /**
   * The data execution status.
   */
  dataExecutionStatus?: DataExecutionStatus;
  /**
   * Reference to a data source object being refreshed.
   */
  reference?: DataSourceObjectReference;
}
/**
 * Refreshes one or multiple data source objects in the spreadsheet by the specified references. The request requires an additional `bigquery.readonly` OAuth scope. If there are multiple refresh requests referencing the same data source objects in one batch, only the last refresh request is processed, and all those requests will have the same response accordingly.
 */
export interface RefreshDataSourceRequest {
  /**
   * Reference to a DataSource. If specified, refreshes all associated data source objects for the data source.
   */
  dataSourceId?: string | null;
  /**
   * Refreshes the data source objects regardless of the current state. If not set and a referenced data source object was in error state, the refresh will fail immediately.
   */
  force?: boolean | null;
  /**
   * Refreshes all existing data source objects in the spreadsheet.
   */
  isAll?: boolean | null;
  /**
   * References to data source objects to refresh.
   */
  references?: DataSourceObjectReferences;
}
/**
 * The response from refreshing one or multiple data source objects.
 */
export interface RefreshDataSourceResponse {
  /**
   * All the refresh status for the data source object references specified in the request. If is_all is specified, the field contains only those in failure status.
   */
  statuses?: RefreshDataSourceObjectExecutionStatus[] | null;
}
/**
 * Updates all cells in the range to the values in the given Cell object. Only the fields listed in the fields field are updated; others are unchanged. If writing a cell with a formula, the formula&#39;s ranges will automatically increment for each field in the range. For example, if writing a cell with formula `=A1` into range B2:C4, B2 would be `=A1`, B3 would be `=A2`, B4 would be `=A3`, C2 would be `=B1`, C3 would be `=B2`, C4 would be `=B3`. To keep the formula&#39;s ranges static, use the `$` indicator. For example, use the formula `=$A$1` to prevent both the row and the column from incrementing.
 */
export interface RepeatCellRequest {
  /**
   * The data to write.
   */
  cell?: CellData;
  /**
   * The fields that should be updated. At least one field must be specified. The root `cell` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field.
   */
  fields?: string | null;
  /**
   * The range to repeat the cell in.
   */
  range?: GridRange;
}
/**
 * A single kind of update to apply to a spreadsheet.
 */
export interface Request {
  /**
   * Adds a new banded range
   */
  addBanding?: AddBandingRequest;
  /**
   * Adds a chart.
   */
  addChart?: AddChartRequest;
  /**
   * Adds a new conditional format rule.
   */
  addConditionalFormatRule?: AddConditionalFormatRuleRequest;
  /**
   * Adds a data source.
   */
  addDataSource?: AddDataSourceRequest;
  /**
   * Creates a group over the specified range.
   */
  addDimensionGroup?: AddDimensionGroupRequest;
  /**
   * Adds a filter view.
   */
  addFilterView?: AddFilterViewRequest;
  /**
   * Adds a named range.
   */
  addNamedRange?: AddNamedRangeRequest;
  /**
   * Adds a protected range.
   */
  addProtectedRange?: AddProtectedRangeRequest;
  /**
   * Adds a sheet.
   */
  addSheet?: AddSheetRequest;
  /**
   * Adds a slicer.
   */
  addSlicer?: AddSlicerRequest;
  /**
   * Appends cells after the last row with data in a sheet.
   */
  appendCells?: AppendCellsRequest;
  /**
   * Appends dimensions to the end of a sheet.
   */
  appendDimension?: AppendDimensionRequest;
  /**
   * Automatically fills in more data based on existing data.
   */
  autoFill?: AutoFillRequest;
  /**
   * Automatically resizes one or more dimensions based on the contents of the cells in that dimension.
   */
  autoResizeDimensions?: AutoResizeDimensionsRequest;
  /**
   * Clears the basic filter on a sheet.
   */
  clearBasicFilter?: ClearBasicFilterRequest;
  /**
   * Copies data from one area and pastes it to another.
   */
  copyPaste?: CopyPasteRequest;
  /**
   * Creates new developer metadata
   */
  createDeveloperMetadata?: CreateDeveloperMetadataRequest;
  /**
   * Cuts data from one area and pastes it to another.
   */
  cutPaste?: CutPasteRequest;
  /**
   * Removes a banded range
   */
  deleteBanding?: DeleteBandingRequest;
  /**
   * Deletes an existing conditional format rule.
   */
  deleteConditionalFormatRule?: DeleteConditionalFormatRuleRequest;
  /**
   * Deletes a data source.
   */
  deleteDataSource?: DeleteDataSourceRequest;
  /**
   * Deletes developer metadata
   */
  deleteDeveloperMetadata?: DeleteDeveloperMetadataRequest;
  /**
   * Deletes rows or columns in a sheet.
   */
  deleteDimension?: DeleteDimensionRequest;
  /**
   * Deletes a group over the specified range.
   */
  deleteDimensionGroup?: DeleteDimensionGroupRequest;
  /**
   * Removes rows containing duplicate values in specified columns of a cell range.
   */
  deleteDuplicates?: DeleteDuplicatesRequest;
  /**
   * Deletes an embedded object (e.g, chart, image) in a sheet.
   */
  deleteEmbeddedObject?: DeleteEmbeddedObjectRequest;
  /**
   * Deletes a filter view from a sheet.
   */
  deleteFilterView?: DeleteFilterViewRequest;
  /**
   * Deletes a named range.
   */
  deleteNamedRange?: DeleteNamedRangeRequest;
  /**
   * Deletes a protected range.
   */
  deleteProtectedRange?: DeleteProtectedRangeRequest;
  /**
   * Deletes a range of cells from a sheet, shifting the remaining cells.
   */
  deleteRange?: DeleteRangeRequest;
  /**
   * Deletes a sheet.
   */
  deleteSheet?: DeleteSheetRequest;
  /**
   * Duplicates a filter view.
   */
  duplicateFilterView?: DuplicateFilterViewRequest;
  /**
   * Duplicates a sheet.
   */
  duplicateSheet?: DuplicateSheetRequest;
  /**
   * Finds and replaces occurrences of some text with other text.
   */
  findReplace?: FindReplaceRequest;
  /**
   * Inserts new rows or columns in a sheet.
   */
  insertDimension?: InsertDimensionRequest;
  /**
   * Inserts new cells in a sheet, shifting the existing cells.
   */
  insertRange?: InsertRangeRequest;
  /**
   * Merges cells together.
   */
  mergeCells?: MergeCellsRequest;
  /**
   * Moves rows or columns to another location in a sheet.
   */
  moveDimension?: MoveDimensionRequest;
  /**
   * Pastes data (HTML or delimited) into a sheet.
   */
  pasteData?: PasteDataRequest;
  /**
   * Randomizes the order of the rows in a range.
   */
  randomizeRange?: RandomizeRangeRequest;
  /**
   * Refreshes one or multiple data sources and associated dbobjects.
   */
  refreshDataSource?: RefreshDataSourceRequest;
  /**
   * Repeats a single cell across a range.
   */
  repeatCell?: RepeatCellRequest;
  /**
   * Sets the basic filter on a sheet.
   */
  setBasicFilter?: SetBasicFilterRequest;
  /**
   * Sets data validation for one or more cells.
   */
  setDataValidation?: SetDataValidationRequest;
  /**
   * Sorts data in a range.
   */
  sortRange?: SortRangeRequest;
  /**
   * Converts a column of text into many columns of text.
   */
  textToColumns?: TextToColumnsRequest;
  /**
   * Trims cells of whitespace (such as spaces, tabs, or new lines).
   */
  trimWhitespace?: TrimWhitespaceRequest;
  /**
   * Unmerges merged cells.
   */
  unmergeCells?: UnmergeCellsRequest;
  /**
   * Updates a banded range
   */
  updateBanding?: UpdateBandingRequest;
  /**
   * Updates the borders in a range of cells.
   */
  updateBorders?: UpdateBordersRequest;
  /**
   * Updates many cells at once.
   */
  updateCells?: UpdateCellsRequest;
  /**
   * Updates a chart's specifications.
   */
  updateChartSpec?: UpdateChartSpecRequest;
  /**
   * Updates an existing conditional format rule.
   */
  updateConditionalFormatRule?: UpdateConditionalFormatRuleRequest;
  /**
   * Updates a data source.
   */
  updateDataSource?: UpdateDataSourceRequest;
  /**
   * Updates an existing developer metadata entry
   */
  updateDeveloperMetadata?: UpdateDeveloperMetadataRequest;
  /**
   * Updates the state of the specified group.
   */
  updateDimensionGroup?: UpdateDimensionGroupRequest;
  /**
   * Updates dimensions' properties.
   */
  updateDimensionProperties?: UpdateDimensionPropertiesRequest;
  /**
   * Updates an embedded object's border.
   */
  updateEmbeddedObjectBorder?: UpdateEmbeddedObjectBorderRequest;
  /**
   * Updates an embedded object's (e.g. chart, image) position.
   */
  updateEmbeddedObjectPosition?: UpdateEmbeddedObjectPositionRequest;
  /**
   * Updates the properties of a filter view.
   */
  updateFilterView?: UpdateFilterViewRequest;
  /**
   * Updates a named range.
   */
  updateNamedRange?: UpdateNamedRangeRequest;
  /**
   * Updates a protected range.
   */
  updateProtectedRange?: UpdateProtectedRangeRequest;
  /**
   * Updates a sheet's properties.
   */
  updateSheetProperties?: UpdateSheetPropertiesRequest;
  /**
   * Updates a slicer's specifications.
   */
  updateSlicerSpec?: UpdateSlicerSpecRequest;
  /**
   * Updates the spreadsheet's properties.
   */
  updateSpreadsheetProperties?: UpdateSpreadsheetPropertiesRequest;
}
/**
 * A single response from an update.
 */
export interface Response {
  /**
   * A reply from adding a banded range.
   */
  addBanding?: AddBandingResponse;
  /**
   * A reply from adding a chart.
   */
  addChart?: AddChartResponse;
  /**
   * A reply from adding a data source.
   */
  addDataSource?: AddDataSourceResponse;
  /**
   * A reply from adding a dimension group.
   */
  addDimensionGroup?: AddDimensionGroupResponse;
  /**
   * A reply from adding a filter view.
   */
  addFilterView?: AddFilterViewResponse;
  /**
   * A reply from adding a named range.
   */
  addNamedRange?: AddNamedRangeResponse;
  /**
   * A reply from adding a protected range.
   */
  addProtectedRange?: AddProtectedRangeResponse;
  /**
   * A reply from adding a sheet.
   */
  addSheet?: AddSheetResponse;
  /**
   * A reply from adding a slicer.
   */
  addSlicer?: AddSlicerResponse;
  /**
   * A reply from creating a developer metadata entry.
   */
  createDeveloperMetadata?: CreateDeveloperMetadataResponse;
  /**
   * A reply from deleting a conditional format rule.
   */
  deleteConditionalFormatRule?: DeleteConditionalFormatRuleResponse;
  /**
   * A reply from deleting a developer metadata entry.
   */
  deleteDeveloperMetadata?: DeleteDeveloperMetadataResponse;
  /**
   * A reply from deleting a dimension group.
   */
  deleteDimensionGroup?: DeleteDimensionGroupResponse;
  /**
   * A reply from removing rows containing duplicate values.
   */
  deleteDuplicates?: DeleteDuplicatesResponse;
  /**
   * A reply from duplicating a filter view.
   */
  duplicateFilterView?: DuplicateFilterViewResponse;
  /**
   * A reply from duplicating a sheet.
   */
  duplicateSheet?: DuplicateSheetResponse;
  /**
   * A reply from doing a find/replace.
   */
  findReplace?: FindReplaceResponse;
  /**
   * A reply from refreshing data source objects.
   */
  refreshDataSource?: RefreshDataSourceResponse;
  /**
   * A reply from trimming whitespace.
   */
  trimWhitespace?: TrimWhitespaceResponse;
  /**
   * A reply from updating a conditional format rule.
   */
  updateConditionalFormatRule?: UpdateConditionalFormatRuleResponse;
  /**
   * A reply from updating a data source.
   */
  updateDataSource?: UpdateDataSourceResponse;
  /**
   * A reply from updating a developer metadata entry.
   */
  updateDeveloperMetadata?: UpdateDeveloperMetadataResponse;
  /**
   * A reply from updating an embedded object's position.
   */
  updateEmbeddedObjectPosition?: UpdateEmbeddedObjectPositionResponse;
}
/**
 * Data about each cell in a row.
 */
export interface RowData {
  /**
   * The values in the row, one per column.
   */
  values?: CellData[] | null;
}
/**
 * A scorecard chart. Scorecard charts are used to highlight key performance indicators, known as KPIs, on the spreadsheet. A scorecard chart can represent things like total sales, average cost, or a top selling item. You can specify a single data value, or aggregate over a range of data. Percentage or absolute difference from a baseline value can be highlighted, like changes over time.
 */
export interface ScorecardChartSpec {
  /**
   * The aggregation type for key and baseline chart data in scorecard chart. This field is not supported for data source charts. Use the ChartData.aggregateType field of the key_value_data or baseline_value_data instead for data source charts. This field is optional.
   *
   * Enumerated Values:
   * - CHART_AGGREGATE_TYPE_UNSPECIFIED: Default value, do not use.
   * - AVERAGE: Average aggregate function.
   * - COUNT: Count aggregate function.
   * - MAX: Maximum aggregate function.
   * - MEDIAN: Median aggregate function.
   * - MIN: Minimum aggregate function.
   * - SUM: Sum aggregate function.
   */
  aggregateType?: ("CHART_AGGREGATE_TYPE_UNSPECIFIED" | "AVERAGE" | "COUNT" | "MAX" | "MEDIAN" | "MIN" | "SUM") | null;
  /**
   * The data for scorecard baseline value. This field is optional.
   */
  baselineValueData?: ChartData;
  /**
   * Formatting options for baseline value. This field is needed only if baseline_value_data is specified.
   */
  baselineValueFormat?: BaselineValueFormat;
  /**
   * Custom formatting options for numeric key/baseline values in scorecard chart. This field is used only when number_format_source is set to CUSTOM. This field is optional.
   */
  customFormatOptions?: ChartCustomNumberFormatOptions;
  /**
   * The data for scorecard key value.
   */
  keyValueData?: ChartData;
  /**
   * Formatting options for key value.
   */
  keyValueFormat?: KeyValueFormat;
  /**
   * The number format source used in the scorecard chart. This field is optional.
   *
   * Enumerated Values:
   * - CHART_NUMBER_FORMAT_SOURCE_UNDEFINED: Default value, do not use.
   * - FROM_DATA: Inherit number formatting from data.
   * - CUSTOM: Apply custom formatting as specified by ChartCustomNumberFormatOptions.
   */
  numberFormatSource?: ("CHART_NUMBER_FORMAT_SOURCE_UNDEFINED" | "FROM_DATA" | "CUSTOM") | null;
  /**
   * Value to scale scorecard key and baseline value. For example, a factor of 10 can be used to divide all values in the chart by 10. This field is optional.
   */
  scaleFactor?: number | null;
}
/**
 * A request to retrieve all developer metadata matching the set of specified criteria.
 */
export interface SearchDeveloperMetadataRequest {
  /**
   * The data filters describing the criteria used to determine which DeveloperMetadata entries to return. DeveloperMetadata matching any of the specified filters are included in the response.
   */
  dataFilters?: DataFilter[] | null;
}
/**
 * A reply to a developer metadata search request.
 */
export interface SearchDeveloperMetadataResponse {
  /**
   * The metadata matching the criteria of the search request.
   */
  matchedDeveloperMetadata?: MatchedDeveloperMetadata[] | null;
}
/**
 * Sets the basic filter associated with a sheet.
 */
export interface SetBasicFilterRequest {
  /**
   * The filter to set.
   */
  filter?: BasicFilter;
}
/**
 * Sets a data validation rule to every cell in the range. To clear validation in a range, call this with no rule specified.
 */
export interface SetDataValidationRequest {
  /**
   * The range the data validation rule should apply to.
   */
  range?: GridRange;
  /**
   * The data validation rule to set on each cell in the range, or empty to clear the data validation in the range.
   */
  rule?: DataValidationRule;
}
/**
 * A sheet in a spreadsheet.
 */
export interface Sheet {
  /**
   * The banded (alternating colors) ranges on this sheet.
   */
  bandedRanges?: BandedRange[] | null;
  /**
   * The filter on this sheet, if any.
   */
  basicFilter?: BasicFilter;
  /**
   * The specifications of every chart on this sheet.
   */
  charts?: EmbeddedChart[] | null;
  /**
   * All column groups on this sheet, ordered by increasing range start index, then by group depth.
   */
  columnGroups?: DimensionGroup[] | null;
  /**
   * The conditional format rules in this sheet.
   */
  conditionalFormats?: ConditionalFormatRule[] | null;
  /**
   * Data in the grid, if this is a grid sheet. The number of GridData objects returned is dependent on the number of ranges requested on this sheet. For example, if this is representing `Sheet1`, and the spreadsheet was requested with ranges `Sheet1!A1:C10` and `Sheet1!D15:E20`, then the first GridData will have a startRow/startColumn of `0`, while the second one will have `startRow 14` (zero-based row 15), and `startColumn 3` (zero-based column D). For a DATA_SOURCE sheet, you can not request a specific range, the GridData contains all the values.
   */
  data?: GridData[] | null;
  /**
   * The developer metadata associated with a sheet.
   */
  developerMetadata?: DeveloperMetadata[] | null;
  /**
   * The filter views in this sheet.
   */
  filterViews?: FilterView[] | null;
  /**
   * The ranges that are merged together.
   */
  merges?: GridRange[] | null;
  /**
   * The properties of the sheet.
   */
  properties?: SheetProperties;
  /**
   * The protected ranges in this sheet.
   */
  protectedRanges?: ProtectedRange[] | null;
  /**
   * All row groups on this sheet, ordered by increasing range start index, then by group depth.
   */
  rowGroups?: DimensionGroup[] | null;
  /**
   * The slicers on this sheet.
   */
  slicers?: Slicer[] | null;
}
/**
 * Properties of a sheet.
 */
export interface SheetProperties {
  /**
   * Output only. If present, the field contains DATA_SOURCE sheet specific properties.
   */
  dataSourceSheetProperties?: DataSourceSheetProperties;
  /**
   * Additional properties of the sheet if this sheet is a grid. (If the sheet is an object sheet, containing a chart or image, then this field will be absent.) When writing it is an error to set any grid properties on non-grid sheets. If this sheet is a DATA_SOURCE sheet, this field is output only but contains the properties that reflect how a data source sheet is rendered in the UI, e.g. row_count.
   */
  gridProperties?: GridProperties;
  /**
   * True if the sheet is hidden in the UI, false if it's visible.
   */
  hidden?: boolean | null;
  /**
   * The index of the sheet within the spreadsheet. When adding or updating sheet properties, if this field is excluded then the sheet is added or moved to the end of the sheet list. When updating sheet indices or inserting sheets, movement is considered in "before the move" indexes. For example, if there were three sheets (S1, S2, S3) in order to move S1 ahead of S2 the index would have to be set to 2. A sheet index update request is ignored if the requested index is identical to the sheets current index or if the requested new index is equal to the current sheet index + 1.
   */
  index?: number | null;
  /**
   * True if the sheet is an RTL sheet instead of an LTR sheet.
   */
  rightToLeft?: boolean | null;
  /**
   * The ID of the sheet. Must be non-negative. This field cannot be changed once set.
   */
  sheetId?: number | null;
  /**
   * The type of sheet. Defaults to GRID. This field cannot be changed once set.
   *
   * Enumerated Values:
   * - SHEET_TYPE_UNSPECIFIED: Default value, do not use.
   * - GRID: The sheet is a grid.
   * - OBJECT: The sheet has no grid and instead has an object like a chart or image.
   * - DATA_SOURCE: The sheet connects with an external DataSource and shows the preview of data.
   */
  sheetType?: ("SHEET_TYPE_UNSPECIFIED" | "GRID" | "OBJECT" | "DATA_SOURCE") | null;
  /**
   * The color of the tab in the UI. Deprecated: Use tab_color_style.
   *
   * @deprecated
   */
  tabColor?: Color;
  /**
   * The color of the tab in the UI. If tab_color is also set, this field takes precedence.
   */
  tabColorStyle?: ColorStyle;
  /**
   * The name of the sheet.
   */
  title?: string | null;
}
/**
 * A slicer in a sheet.
 */
export interface Slicer {
  /**
   * The position of the slicer. Note that slicer can be positioned only on existing sheet. Also, width and height of slicer can be automatically adjusted to keep it within permitted limits.
   */
  position?: EmbeddedObjectPosition;
  /**
   * The ID of the slicer.
   */
  slicerId?: number | null;
  /**
   * The specification of the slicer.
   */
  spec?: SlicerSpec;
}
/**
 * The specifications of a slicer.
 */
export interface SlicerSpec {
  /**
   * True if the filter should apply to pivot tables. If not set, default to `True`.
   */
  applyToPivotTables?: boolean | null;
  /**
   * The background color of the slicer. Deprecated: Use background_color_style.
   *
   * @deprecated
   */
  backgroundColor?: Color;
  /**
   * The background color of the slicer. If background_color is also set, this field takes precedence.
   */
  backgroundColorStyle?: ColorStyle;
  /**
   * The zero-based column index in the data table on which the filter is applied to.
   */
  columnIndex?: number | null;
  /**
   * The data range of the slicer.
   */
  dataRange?: GridRange;
  /**
   * The filtering criteria of the slicer.
   */
  filterCriteria?: FilterCriteria;
  /**
   * The horizontal alignment of title in the slicer. If unspecified, defaults to `LEFT`
   *
   * Enumerated Values:
   * - HORIZONTAL_ALIGN_UNSPECIFIED: The horizontal alignment is not specified. Do not use this.
   * - LEFT: The text is explicitly aligned to the left of the cell.
   * - CENTER: The text is explicitly aligned to the center of the cell.
   * - RIGHT: The text is explicitly aligned to the right of the cell.
   */
  horizontalAlignment?: ("HORIZONTAL_ALIGN_UNSPECIFIED" | "LEFT" | "CENTER" | "RIGHT") | null;
  /**
   * The text format of title in the slicer. The link field is not supported.
   */
  textFormat?: TextFormat;
  /**
   * The title of the slicer.
   */
  title?: string | null;
}
/**
 * Sorts data in rows based on a sort order per column.
 */
export interface SortRangeRequest {
  /**
   * The range to sort.
   */
  range?: GridRange;
  /**
   * The sort order per column. Later specifications are used when values are equal in the earlier specifications.
   */
  sortSpecs?: SortSpec[] | null;
}
/**
 * A sort order associated with a specific column or row.
 */
export interface SortSpec {
  /**
   * The background fill color to sort by; cells with this fill color are sorted to the top. Mutually exclusive with foreground_color. Deprecated: Use background_color_style.
   *
   * @deprecated
   */
  backgroundColor?: Color;
  /**
   * The background fill color to sort by; cells with this fill color are sorted to the top. Mutually exclusive with foreground_color, and must be an RGB-type color. If background_color is also set, this field takes precedence.
   */
  backgroundColorStyle?: ColorStyle;
  /**
   * Reference to a data source column.
   */
  dataSourceColumnReference?: DataSourceColumnReference;
  /**
   * The dimension the sort should be applied to.
   */
  dimensionIndex?: number | null;
  /**
   * The foreground color to sort by; cells with this foreground color are sorted to the top. Mutually exclusive with background_color. Deprecated: Use foreground_color_style.
   *
   * @deprecated
   */
  foregroundColor?: Color;
  /**
   * The foreground color to sort by; cells with this foreground color are sorted to the top. Mutually exclusive with background_color, and must be an RGB-type color. If foreground_color is also set, this field takes precedence.
   */
  foregroundColorStyle?: ColorStyle;
  /**
   * The order data should be sorted.
   *
   * Enumerated Values:
   * - SORT_ORDER_UNSPECIFIED: Default value, do not use this.
   * - ASCENDING: Sort ascending.
   * - DESCENDING: Sort descending.
   */
  sortOrder?: ("SORT_ORDER_UNSPECIFIED" | "ASCENDING" | "DESCENDING") | null;
}
/**
 * A combination of a source range and how to extend that source.
 */
export interface SourceAndDestination {
  /**
   * The dimension that data should be filled into.
   *
   * Enumerated Values:
   * - DIMENSION_UNSPECIFIED: The default value, do not use.
   * - ROWS: Operates on the rows of a sheet.
   * - COLUMNS: Operates on the columns of a sheet.
   */
  dimension?: ("DIMENSION_UNSPECIFIED" | "ROWS" | "COLUMNS") | null;
  /**
   * The number of rows or columns that data should be filled into. Positive numbers expand beyond the last row or last column of the source. Negative numbers expand before the first row or first column of the source.
   */
  fillLength?: number | null;
  /**
   * The location of the data to use as the source of the autofill.
   */
  source?: GridRange;
}
/**
 * Resource that represents a spreadsheet.
 */
export interface Spreadsheet {
  /**
   * A list of external data sources connected with the spreadsheet.
   */
  dataSources?: DataSource[] | null;
  /**
   * Output only. A list of data source refresh schedules.
   */
  dataSourceSchedules?: DataSourceRefreshSchedule[] | null;
  /**
   * The developer metadata associated with a spreadsheet.
   */
  developerMetadata?: DeveloperMetadata[] | null;
  /**
   * The named ranges defined in a spreadsheet.
   */
  namedRanges?: NamedRange[] | null;
  /**
   * Overall properties of a spreadsheet.
   */
  properties?: SpreadsheetProperties;
  /**
   * The sheets that are part of a spreadsheet.
   */
  sheets?: Sheet[] | null;
  /**
   * The ID of the spreadsheet. This field is read-only.
   */
  spreadsheetId?: string | null;
  /**
   * The url of the spreadsheet. This field is read-only.
   */
  spreadsheetUrl?: string | null;
}
/**
 * Properties of a spreadsheet.
 */
export interface SpreadsheetProperties {
  /**
   * The amount of time to wait before volatile functions are recalculated.
   *
   * Enumerated Values:
   * - RECALCULATION_INTERVAL_UNSPECIFIED: Default value. This value must not be used.
   * - ON_CHANGE: Volatile functions are updated on every change.
   * - MINUTE: Volatile functions are updated on every change and every minute.
   * - HOUR: Volatile functions are updated on every change and hourly.
   */
  autoRecalc?: ("RECALCULATION_INTERVAL_UNSPECIFIED" | "ON_CHANGE" | "MINUTE" | "HOUR") | null;
  /**
   * The default format of all cells in the spreadsheet. CellData.effectiveFormat will not be set if the cell's format is equal to this default format. This field is read-only.
   */
  defaultFormat?: CellFormat;
  /**
   * Determines whether and how circular references are resolved with iterative calculation. Absence of this field means that circular references result in calculation errors.
   */
  iterativeCalculationSettings?: IterativeCalculationSettings;
  /**
   * The locale of the spreadsheet in one of the following formats: * an ISO 639-1 language code such as `en` * an ISO 639-2 language code such as `fil`, if no 639-1 code exists * a combination of the ISO language code and country code, such as `en_US` Note: when updating this field, not all locales/languages are supported.
   */
  locale?: string | null;
  /**
   * Theme applied to the spreadsheet.
   */
  spreadsheetTheme?: SpreadsheetTheme;
  /**
   * The time zone of the spreadsheet, in CLDR format such as `America/New_York`. If the time zone isn't recognized, this may be a custom time zone such as `GMT-07:00`.
   */
  timeZone?: string | null;
  /**
   * The title of the spreadsheet.
   */
  title?: string | null;
}
/**
 * Represents spreadsheet theme
 */
export interface SpreadsheetTheme {
  /**
   * Name of the primary font family.
   */
  primaryFontFamily?: string | null;
  /**
   * The spreadsheet theme color pairs. To update you must provide all theme color pairs.
   */
  themeColors?: ThemeColorPair[] | null;
}
/**
 * The format of a run of text in a cell. Absent values indicate that the field isn&#39;t specified.
 */
export interface TextFormat {
  /**
   * True if the text is bold.
   */
  bold?: boolean | null;
  /**
   * The font family.
   */
  fontFamily?: string | null;
  /**
   * The size of the font.
   */
  fontSize?: number | null;
  /**
   * The foreground color of the text. Deprecated: Use foreground_color_style.
   *
   * @deprecated
   */
  foregroundColor?: Color;
  /**
   * The foreground color of the text. If foreground_color is also set, this field takes precedence.
   */
  foregroundColorStyle?: ColorStyle;
  /**
   * True if the text is italicized.
   */
  italic?: boolean | null;
  /**
   * The link destination of the text, if any. Setting the link field in a TextFormatRun will clear the cell's existing links or a cell-level link set in the same request. When a link is set, the text foreground color will be set to the default link color and the text will be underlined. If these fields are modified in the same request, those values will be used instead of the link defaults.
   */
  link?: Link;
  /**
   * True if the text has a strikethrough.
   */
  strikethrough?: boolean | null;
  /**
   * True if the text is underlined.
   */
  underline?: boolean | null;
}
/**
 * A run of a text format. The format of this run continues until the start index of the next run. When updating, all fields must be set.
 */
export interface TextFormatRun {
  /**
   * The format of this run. Absent values inherit the cell's format.
   */
  format?: TextFormat;
  /**
   * The zero-based character index where this run starts, in UTF-16 code units.
   */
  startIndex?: number | null;
}
/**
 * Position settings for text.
 */
export interface TextPosition {
  /**
   * Horizontal alignment setting for the piece of text.
   *
   * Enumerated Values:
   * - HORIZONTAL_ALIGN_UNSPECIFIED: The horizontal alignment is not specified. Do not use this.
   * - LEFT: The text is explicitly aligned to the left of the cell.
   * - CENTER: The text is explicitly aligned to the center of the cell.
   * - RIGHT: The text is explicitly aligned to the right of the cell.
   */
  horizontalAlignment?: ("HORIZONTAL_ALIGN_UNSPECIFIED" | "LEFT" | "CENTER" | "RIGHT") | null;
}
/**
 * The rotation applied to text in a cell.
 */
export interface TextRotation {
  /**
   * The angle between the standard orientation and the desired orientation. Measured in degrees. Valid values are between -90 and 90. Positive angles are angled upwards, negative are angled downwards. Note: For LTR text direction positive angles are in the counterclockwise direction, whereas for RTL they are in the clockwise direction
   */
  angle?: number | null;
  /**
   * If true, text reads top to bottom, but the orientation of individual characters is unchanged. For example: | V | | e | | r | | t | | i | | c | | a | | l |
   */
  vertical?: boolean | null;
}
/**
 * Splits a column of text into multiple columns, based on a delimiter in each cell.
 */
export interface TextToColumnsRequest {
  /**
   * The delimiter to use. Used only if delimiterType is CUSTOM.
   */
  delimiter?: string | null;
  /**
   * The delimiter type to use.
   *
   * Enumerated Values:
   * - DELIMITER_TYPE_UNSPECIFIED: Default value. This value must not be used.
   * - COMMA: ","
   * - SEMICOLON: ";"
   * - PERIOD: "."
   * - SPACE: " "
   * - CUSTOM: A custom value as defined in delimiter.
   * - AUTODETECT: Automatically detect columns.
   */
  delimiterType?:
    | ("DELIMITER_TYPE_UNSPECIFIED" | "COMMA" | "SEMICOLON" | "PERIOD" | "SPACE" | "CUSTOM" | "AUTODETECT")
    | null;
  /**
   * The source data range. This must span exactly one column.
   */
  source?: GridRange;
}
/**
 * A pair mapping a spreadsheet theme color type to the concrete color it represents.
 */
export interface ThemeColorPair {
  /**
   * The concrete color corresponding to the theme color type.
   */
  color?: ColorStyle;
  /**
   * The type of the spreadsheet theme color.
   *
   * Enumerated Values:
   * - THEME_COLOR_TYPE_UNSPECIFIED: Unspecified theme color
   * - TEXT: Represents the primary text color
   * - BACKGROUND: Represents the primary background color
   * - ACCENT1: Represents the first accent color
   * - ACCENT2: Represents the second accent color
   * - ACCENT3: Represents the third accent color
   * - ACCENT4: Represents the fourth accent color
   * - ACCENT5: Represents the fifth accent color
   * - ACCENT6: Represents the sixth accent color
   * - LINK: Represents the color to use for hyperlinks
   */
  colorType?:
    | (
        | "THEME_COLOR_TYPE_UNSPECIFIED"
        | "TEXT"
        | "BACKGROUND"
        | "ACCENT1"
        | "ACCENT2"
        | "ACCENT3"
        | "ACCENT4"
        | "ACCENT5"
        | "ACCENT6"
        | "LINK"
      )
    | null;
}
/**
 * Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.
 */
export interface TimeOfDay {
  /**
   * Hours of day in 24 hour format. Should be from 0 to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.
   */
  hours?: number | null;
  /**
   * Minutes of hour of day. Must be from 0 to 59.
   */
  minutes?: number | null;
  /**
   * Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999.
   */
  nanos?: number | null;
  /**
   * Seconds of minutes of the time. Must normally be from 0 to 59. An API may allow the value 60 if it allows leap-seconds.
   */
  seconds?: number | null;
}
/**
 * A color scale for a treemap chart.
 */
export interface TreemapChartColorScale {
  /**
   * The background color for cells with a color value greater than or equal to maxValue. Defaults to #109618 if not specified. Deprecated: Use max_value_color_style.
   *
   * @deprecated
   */
  maxValueColor?: Color;
  /**
   * The background color for cells with a color value greater than or equal to maxValue. Defaults to #109618 if not specified. If max_value_color is also set, this field takes precedence.
   */
  maxValueColorStyle?: ColorStyle;
  /**
   * The background color for cells with a color value at the midpoint between minValue and maxValue. Defaults to #efe6dc if not specified. Deprecated: Use mid_value_color_style.
   *
   * @deprecated
   */
  midValueColor?: Color;
  /**
   * The background color for cells with a color value at the midpoint between minValue and maxValue. Defaults to #efe6dc if not specified. If mid_value_color is also set, this field takes precedence.
   */
  midValueColorStyle?: ColorStyle;
  /**
   * The background color for cells with a color value less than or equal to minValue. Defaults to #dc3912 if not specified. Deprecated: Use min_value_color_style.
   *
   * @deprecated
   */
  minValueColor?: Color;
  /**
   * The background color for cells with a color value less than or equal to minValue. Defaults to #dc3912 if not specified. If min_value_color is also set, this field takes precedence.
   */
  minValueColorStyle?: ColorStyle;
  /**
   * The background color for cells that have no color data associated with them. Defaults to #000000 if not specified. Deprecated: Use no_data_color_style.
   *
   * @deprecated
   */
  noDataColor?: Color;
  /**
   * The background color for cells that have no color data associated with them. Defaults to #000000 if not specified. If no_data_color is also set, this field takes precedence.
   */
  noDataColorStyle?: ColorStyle;
}
/**
 * A Treemap chart.
 */
export interface TreemapChartSpec {
  /**
   * The data that determines the background color of each treemap data cell. This field is optional. If not specified, size_data is used to determine background colors. If specified, the data is expected to be numeric. color_scale will determine how the values in this data map to data cell background colors.
   */
  colorData?: ChartData;
  /**
   * The color scale for data cells in the treemap chart. Data cells are assigned colors based on their color values. These color values come from color_data, or from size_data if color_data is not specified. Cells with color values less than or equal to min_value will have minValueColor as their background color. Cells with color values greater than or equal to max_value will have maxValueColor as their background color. Cells with color values between min_value and max_value will have background colors on a gradient between minValueColor and maxValueColor, the midpoint of the gradient being midValueColor. Cells with missing or non-numeric color values will have noDataColor as their background color.
   */
  colorScale?: TreemapChartColorScale;
  /**
   * The background color for header cells. Deprecated: Use header_color_style.
   *
   * @deprecated
   */
  headerColor?: Color;
  /**
   * The background color for header cells. If header_color is also set, this field takes precedence.
   */
  headerColorStyle?: ColorStyle;
  /**
   * True to hide tooltips.
   */
  hideTooltips?: boolean | null;
  /**
   * The number of additional data levels beyond the labeled levels to be shown on the treemap chart. These levels are not interactive and are shown without their labels. Defaults to 0 if not specified.
   */
  hintedLevels?: number | null;
  /**
   * The data that contains the treemap cell labels.
   */
  labels?: ChartData;
  /**
   * The number of data levels to show on the treemap chart. These levels are interactive and are shown with their labels. Defaults to 2 if not specified.
   */
  levels?: number | null;
  /**
   * The maximum possible data value. Cells with values greater than this will have the same color as cells with this value. If not specified, defaults to the actual maximum value from color_data, or the maximum value from size_data if color_data is not specified.
   */
  maxValue?: number | null;
  /**
   * The minimum possible data value. Cells with values less than this will have the same color as cells with this value. If not specified, defaults to the actual minimum value from color_data, or the minimum value from size_data if color_data is not specified.
   */
  minValue?: number | null;
  /**
   * The data the contains the treemap cells' parent labels.
   */
  parentLabels?: ChartData;
  /**
   * The data that determines the size of each treemap data cell. This data is expected to be numeric. The cells corresponding to non-numeric or missing data will not be rendered. If color_data is not specified, this data is used to determine data cell background colors as well.
   */
  sizeData?: ChartData;
  /**
   * The text format for all labels on the chart. The link field is not supported.
   */
  textFormat?: TextFormat;
}
/**
 * Trims the whitespace (such as spaces, tabs, or new lines) in every cell in the specified range. This request removes all whitespace from the start and end of each cell&#39;s text, and reduces any subsequence of remaining whitespace characters to a single space. If the resulting trimmed text starts with a &#39;+&#39; or &#39;=&#39; character, the text remains as a string value and isn&#39;t interpreted as a formula.
 */
export interface TrimWhitespaceRequest {
  /**
   * The range whose cells to trim.
   */
  range?: GridRange;
}
/**
 * The result of trimming whitespace in cells.
 */
export interface TrimWhitespaceResponse {
  /**
   * The number of cells that were trimmed of whitespace.
   */
  cellsChangedCount?: number | null;
}
/**
 * Unmerges cells in the given range.
 */
export interface UnmergeCellsRequest {
  /**
   * The range within which all cells should be unmerged. If the range spans multiple merges, all will be unmerged. The range must not partially span any merge.
   */
  range?: GridRange;
}
/**
 * Updates properties of the supplied banded range.
 */
export interface UpdateBandingRequest {
  /**
   * The banded range to update with the new properties.
   */
  bandedRange?: BandedRange;
  /**
   * The fields that should be updated. At least one field must be specified. The root `bandedRange` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field.
   */
  fields?: string | null;
}
/**
 * Updates the borders of a range. If a field is not set in the request, that means the border remains as-is. For example, with two subsequent UpdateBordersRequest: 1. range: A1:A5 `{ top: RED, bottom: WHITE &#92;}` 2. range: A1:A5 `{ left: BLUE &#92;}` That would result in A1:A5 having a borders of `{ top: RED, bottom: WHITE, left: BLUE &#92;}`. If you want to clear a border, explicitly set the style to NONE.
 */
export interface UpdateBordersRequest {
  /**
   * The border to put at the bottom of the range.
   */
  bottom?: Border;
  /**
   * The horizontal border to put within the range.
   */
  innerHorizontal?: Border;
  /**
   * The vertical border to put within the range.
   */
  innerVertical?: Border;
  /**
   * The border to put at the left of the range.
   */
  left?: Border;
  /**
   * The range whose borders should be updated.
   */
  range?: GridRange;
  /**
   * The border to put at the right of the range.
   */
  right?: Border;
  /**
   * The border to put at the top of the range.
   */
  top?: Border;
}
/**
 * Updates all cells in a range with new data.
 */
export interface UpdateCellsRequest {
  /**
   * The fields of CellData that should be updated. At least one field must be specified. The root is the CellData; 'row.values.' should not be specified. A single `"*"` can be used as short-hand for listing every field.
   */
  fields?: string | null;
  /**
   * The range to write data to. If the data in rows does not cover the entire requested range, the fields matching those set in fields will be cleared.
   */
  range?: GridRange;
  /**
   * The data to write.
   */
  rows?: RowData[] | null;
  /**
   * The coordinate to start writing data at. Any number of rows and columns (including a different number of columns per row) may be written.
   */
  start?: GridCoordinate;
}
/**
 * Updates a chart&#39;s specifications. (This does not move or resize a chart. To move or resize a chart, use UpdateEmbeddedObjectPositionRequest.)
 */
export interface UpdateChartSpecRequest {
  /**
   * The ID of the chart to update.
   */
  chartId?: number | null;
  /**
   * The specification to apply to the chart.
   */
  spec?: ChartSpec;
}
/**
 * Updates a conditional format rule at the given index, or moves a conditional format rule to another index.
 */
export interface UpdateConditionalFormatRuleRequest {
  /**
   * The zero-based index of the rule that should be replaced or moved.
   */
  index?: number | null;
  /**
   * The zero-based new index the rule should end up at.
   */
  newIndex?: number | null;
  /**
   * The rule that should replace the rule at the given index.
   */
  rule?: ConditionalFormatRule;
  /**
   * The sheet of the rule to move. Required if new_index is set, unused otherwise.
   */
  sheetId?: number | null;
}
/**
 * The result of updating a conditional format rule.
 */
export interface UpdateConditionalFormatRuleResponse {
  /**
   * The index of the new rule.
   */
  newIndex?: number | null;
  /**
   * The new rule that replaced the old rule (if replacing), or the rule that was moved (if moved)
   */
  newRule?: ConditionalFormatRule;
  /**
   * The old index of the rule. Not set if a rule was replaced (because it is the same as new_index).
   */
  oldIndex?: number | null;
  /**
   * The old (deleted) rule. Not set if a rule was moved (because it is the same as new_rule).
   */
  oldRule?: ConditionalFormatRule;
}
/**
 * Updates a data source. After the data source is updated successfully, an execution is triggered to refresh the associated DATA_SOURCE sheet to read data from the updated data source. The request requires an additional `bigquery.readonly` OAuth scope.
 */
export interface UpdateDataSourceRequest {
  /**
   * The data source to update.
   */
  dataSource?: DataSource;
  /**
   * The fields that should be updated. At least one field must be specified. The root `dataSource` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field.
   */
  fields?: string | null;
}
/**
 * The response from updating data source.
 */
export interface UpdateDataSourceResponse {
  /**
   * The data execution status.
   */
  dataExecutionStatus?: DataExecutionStatus;
  /**
   * The updated data source.
   */
  dataSource?: DataSource;
}
/**
 * A request to update properties of developer metadata. Updates the properties of the developer metadata selected by the filters to the values provided in the DeveloperMetadata resource. Callers must specify the properties they wish to update in the fields parameter, as well as specify at least one DataFilter matching the metadata they wish to update.
 */
export interface UpdateDeveloperMetadataRequest {
  /**
   * The filters matching the developer metadata entries to update.
   */
  dataFilters?: DataFilter[] | null;
  /**
   * The value that all metadata matched by the data filters will be updated to.
   */
  developerMetadata?: DeveloperMetadata;
  /**
   * The fields that should be updated. At least one field must be specified. The root `developerMetadata` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field.
   */
  fields?: string | null;
}
/**
 * The response from updating developer metadata.
 */
export interface UpdateDeveloperMetadataResponse {
  /**
   * The updated developer metadata.
   */
  developerMetadata?: DeveloperMetadata[] | null;
}
/**
 * Updates the state of the specified group.
 */
export interface UpdateDimensionGroupRequest {
  /**
   * The group whose state should be updated. The range and depth of the group should specify a valid group on the sheet, and all other fields updated.
   */
  dimensionGroup?: DimensionGroup;
  /**
   * The fields that should be updated. At least one field must be specified. The root `dimensionGroup` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field.
   */
  fields?: string | null;
}
/**
 * Updates properties of dimensions within the specified range.
 */
export interface UpdateDimensionPropertiesRequest {
  /**
   * The columns on a data source sheet to update.
   */
  dataSourceSheetRange?: DataSourceSheetDimensionRange;
  /**
   * The fields that should be updated. At least one field must be specified. The root `properties` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field.
   */
  fields?: string | null;
  /**
   * Properties to update.
   */
  properties?: DimensionProperties;
  /**
   * The rows or columns to update.
   */
  range?: DimensionRange;
}
/**
 * Updates an embedded object&#39;s border property.
 */
export interface UpdateEmbeddedObjectBorderRequest {
  /**
   * The border that applies to the embedded object.
   */
  border?: EmbeddedObjectBorder;
  /**
   * The fields that should be updated. At least one field must be specified. The root `border` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field.
   */
  fields?: string | null;
  /**
   * The ID of the embedded object to update.
   */
  objectId?: number | null;
}
/**
 * Update an embedded object&#39;s position (such as a moving or resizing a chart or image).
 */
export interface UpdateEmbeddedObjectPositionRequest {
  /**
   * The fields of OverlayPosition that should be updated when setting a new position. Used only if newPosition.overlayPosition is set, in which case at least one field must be specified. The root `newPosition.overlayPosition` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field.
   */
  fields?: string | null;
  /**
   * An explicit position to move the embedded object to. If newPosition.sheetId is set, a new sheet with that ID will be created. If newPosition.newSheet is set to true, a new sheet will be created with an ID that will be chosen for you.
   */
  newPosition?: EmbeddedObjectPosition;
  /**
   * The ID of the object to moved.
   */
  objectId?: number | null;
}
/**
 * The result of updating an embedded object&#39;s position.
 */
export interface UpdateEmbeddedObjectPositionResponse {
  /**
   * The new position of the embedded object.
   */
  position?: EmbeddedObjectPosition;
}
/**
 * Updates properties of the filter view.
 */
export interface UpdateFilterViewRequest {
  /**
   * The fields that should be updated. At least one field must be specified. The root `filter` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field.
   */
  fields?: string | null;
  /**
   * The new properties of the filter view.
   */
  filter?: FilterView;
}
/**
 * Updates properties of the named range with the specified namedRangeId.
 */
export interface UpdateNamedRangeRequest {
  /**
   * The fields that should be updated. At least one field must be specified. The root `namedRange` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field.
   */
  fields?: string | null;
  /**
   * The named range to update with the new properties.
   */
  namedRange?: NamedRange;
}
/**
 * Updates an existing protected range with the specified protectedRangeId.
 */
export interface UpdateProtectedRangeRequest {
  /**
   * The fields that should be updated. At least one field must be specified. The root `protectedRange` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field.
   */
  fields?: string | null;
  /**
   * The protected range to update with the new properties.
   */
  protectedRange?: ProtectedRange;
}
/**
 * Updates properties of the sheet with the specified sheetId.
 */
export interface UpdateSheetPropertiesRequest {
  /**
   * The fields that should be updated. At least one field must be specified. The root `properties` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field.
   */
  fields?: string | null;
  /**
   * The properties to update.
   */
  properties?: SheetProperties;
}
/**
 * Updates a slicer&#39;s specifications. (This does not move or resize a slicer. To move or resize a slicer use UpdateEmbeddedObjectPositionRequest.
 */
export interface UpdateSlicerSpecRequest {
  /**
   * The fields that should be updated. At least one field must be specified. The root `SlicerSpec` is implied and should not be specified. A single "*"` can be used as short-hand for listing every field.
   */
  fields?: string | null;
  /**
   * The id of the slicer to update.
   */
  slicerId?: number | null;
  /**
   * The specification to apply to the slicer.
   */
  spec?: SlicerSpec;
}
/**
 * Updates properties of a spreadsheet.
 */
export interface UpdateSpreadsheetPropertiesRequest {
  /**
   * The fields that should be updated. At least one field must be specified. The root 'properties' is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field.
   */
  fields?: string | null;
  /**
   * The properties to update.
   */
  properties?: SpreadsheetProperties;
}
/**
 * The response when updating a range of values by a data filter in a spreadsheet.
 */
export interface UpdateValuesByDataFilterResponse {
  /**
   * The data filter that selected the range that was updated.
   */
  dataFilter?: DataFilter;
  /**
   * The number of cells updated.
   */
  updatedCells?: number | null;
  /**
   * The number of columns where at least one cell in the column was updated.
   */
  updatedColumns?: number | null;
  /**
   * The values of the cells in the range matched by the dataFilter after all updates were applied. This is only included if the request's `includeValuesInResponse` field was `true`.
   */
  updatedData?: ValueRange;
  /**
   * The range (in [A1 notation](/sheets/api/guides/concepts#cell)) that updates were applied to.
   */
  updatedRange?: string | null;
  /**
   * The number of rows where at least one cell in the row was updated.
   */
  updatedRows?: number | null;
}
/**
 * The response when updating a range of values in a spreadsheet.
 */
export interface UpdateValuesResponse {
  /**
   * The spreadsheet the updates were applied to.
   */
  spreadsheetId?: string | null;
  /**
   * The number of cells updated.
   */
  updatedCells?: number | null;
  /**
   * The number of columns where at least one cell in the column was updated.
   */
  updatedColumns?: number | null;
  /**
   * The values of the cells after updates were applied. This is only included if the request's `includeValuesInResponse` field was `true`.
   */
  updatedData?: ValueRange;
  /**
   * The range (in A1 notation) that updates were applied to.
   */
  updatedRange?: string | null;
  /**
   * The number of rows where at least one cell in the row was updated.
   */
  updatedRows?: number | null;
}
/**
 * Data within a range of the spreadsheet.
 */
export interface ValueRange {
  /**
   * The major dimension of the values. For output, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then requesting `range=A1:B2,majorDimension=ROWS` will return `[[1,2],[3,4]]`, whereas requesting `range=A1:B2,majorDimension=COLUMNS` will return `[[1,3],[2,4]]`. For input, with `range=A1:B2,majorDimension=ROWS` then `[[1,2],[3,4]]` will set `A1=1,B1=2,A2=3,B2=4`. With `range=A1:B2,majorDimension=COLUMNS` then `[[1,2],[3,4]]` will set `A1=1,B1=3,A2=2,B2=4`. When writing, if this field is not set, it defaults to ROWS.
   *
   * Enumerated Values:
   * - DIMENSION_UNSPECIFIED: The default value, do not use.
   * - ROWS: Operates on the rows of a sheet.
   * - COLUMNS: Operates on the columns of a sheet.
   */
  majorDimension?: ("DIMENSION_UNSPECIFIED" | "ROWS" | "COLUMNS") | null;
  /**
   * The range the values cover, in [A1 notation](/sheets/api/guides/concepts#cell). For output, this range indicates the entire requested range, even though the values will exclude trailing rows and columns. When appending values, this field represents the range to search for a table, after which values will be appended.
   */
  range?: string | null;
  /**
   * The data that was read or to be written. This is an array of arrays, the outer array representing all the data and each inner array representing a major dimension. Each item in the inner array corresponds with one cell. For output, empty trailing rows and columns will not be included. For input, supported value types are: bool, string, and double. Null values will be skipped. To set a cell to an empty value, set the string value to an empty string.
   */
  values?: unknown[][] | null;
}
/**
 * Styles for a waterfall chart column.
 */
export interface WaterfallChartColumnStyle {
  /**
   * The color of the column. Deprecated: Use color_style.
   *
   * @deprecated
   */
  color?: Color;
  /**
   * The color of the column. If color is also set, this field takes precedence.
   */
  colorStyle?: ColorStyle;
  /**
   * The label of the column's legend.
   */
  label?: string | null;
}
/**
 * A custom subtotal column for a waterfall chart series.
 */
export interface WaterfallChartCustomSubtotal {
  /**
   * True if the data point at subtotal_index is the subtotal. If false, the subtotal will be computed and appear after the data point.
   */
  dataIsSubtotal?: boolean | null;
  /**
   * A label for the subtotal column.
   */
  label?: string | null;
  /**
   * The zero-based index of a data point within the series. If data_is_subtotal is true, the data point at this index is the subtotal. Otherwise, the subtotal appears after the data point with this index. A series can have multiple subtotals at arbitrary indices, but subtotals do not affect the indices of the data points. For example, if a series has three data points, their indices will always be 0, 1, and 2, regardless of how many subtotals exist on the series or what data points they are associated with.
   */
  subtotalIndex?: number | null;
}
/**
 * The domain of a waterfall chart.
 */
export interface WaterfallChartDomain {
  /**
   * The data of the WaterfallChartDomain.
   */
  data?: ChartData;
  /**
   * True to reverse the order of the domain values (horizontal axis).
   */
  reversed?: boolean | null;
}
/**
 * A single series of data for a waterfall chart.
 */
export interface WaterfallChartSeries {
  /**
   * Custom subtotal columns appearing in this series. The order in which subtotals are defined is not significant. Only one subtotal may be defined for each data point.
   */
  customSubtotals?: WaterfallChartCustomSubtotal[] | null;
  /**
   * The data being visualized in this series.
   */
  data?: ChartData;
  /**
   * Information about the data labels for this series.
   */
  dataLabel?: DataLabel;
  /**
   * True to hide the subtotal column from the end of the series. By default, a subtotal column will appear at the end of each series. Setting this field to true will hide that subtotal column for this series.
   */
  hideTrailingSubtotal?: boolean | null;
  /**
   * Styles for all columns in this series with negative values.
   */
  negativeColumnsStyle?: WaterfallChartColumnStyle;
  /**
   * Styles for all columns in this series with positive values.
   */
  positiveColumnsStyle?: WaterfallChartColumnStyle;
  /**
   * Styles for all subtotal columns in this series.
   */
  subtotalColumnsStyle?: WaterfallChartColumnStyle;
}
/**
 * A waterfall chart.
 */
export interface WaterfallChartSpec {
  /**
   * The line style for the connector lines.
   */
  connectorLineStyle?: LineStyle;
  /**
   * The domain data (horizontal axis) for the waterfall chart.
   */
  domain?: WaterfallChartDomain;
  /**
   * True to interpret the first value as a total.
   */
  firstValueIsTotal?: boolean | null;
  /**
   * True to hide connector lines between columns.
   */
  hideConnectorLines?: boolean | null;
  /**
   * The data this waterfall chart is visualizing.
   */
  series?: WaterfallChartSeries[] | null;
  /**
   * The stacked type.
   *
   * Enumerated Values:
   * - WATERFALL_STACKED_TYPE_UNSPECIFIED: Default value, do not use.
   * - STACKED: Values corresponding to the same domain (horizontal axis) value will be stacked vertically.
   * - SEQUENTIAL: Series will spread out along the horizontal axis.
   */
  stackedType?: ("WATERFALL_STACKED_TYPE_UNSPECIFIED" | "STACKED" | "SEQUENTIAL") | null;
  /**
   * Controls whether to display additional data labels on stacked charts which sum the total value of all stacked values at each value along the domain axis. stacked_type must be STACKED and neither CUSTOM nor placement can be set on the total_data_label.
   */
  totalDataLabel?: DataLabel;
}

/* METHODS */

export const googleSheetsAPIMethods = [
  "sheets.spreadsheets.batchUpdate",
  "sheets.spreadsheets.create",
  "sheets.spreadsheets.developerMetadata.get",
  "sheets.spreadsheets.developerMetadata.search",
  "sheets.spreadsheets.get",
  "sheets.spreadsheets.getByDataFilter",
  "sheets.spreadsheets.sheets.copyTo",
  "sheets.spreadsheets.values.append",
  "sheets.spreadsheets.values.batchClear",
  "sheets.spreadsheets.values.batchClearByDataFilter",
  "sheets.spreadsheets.values.batchGet",
  "sheets.spreadsheets.values.batchGetByDataFilter",
  "sheets.spreadsheets.values.batchUpdate",
  "sheets.spreadsheets.values.batchUpdateByDataFilter",
  "sheets.spreadsheets.values.clear",
  "sheets.spreadsheets.values.get",
  "sheets.spreadsheets.values.update",
] as const;

export type GoogleSheetsAPIMethods = (typeof googleSheetsAPIMethods)[number];

export interface GoogleSheetsAPIParametersMap {
  /**
   * Applies one or more updates to the spreadsheet. Each request is validated before being applied. If any request is not valid then the entire request will fail and nothing will be applied. Some requests have replies to give you some information about how they are applied. The replies will mirror the requests. For example, if you applied 4 updates and the 3rd one had a reply, then the response will have 2 empty replies, the actual reply, and another empty reply, in that order. Due to the collaborative nature of spreadsheets, it is not guaranteed that the spreadsheet will reflect exactly your changes after this completes, however it is guaranteed that the updates in the request will be applied together atomically. Your changes may be altered with respect to collaborator changes. If there are no collaborators, the spreadsheet should reflect your changes.
   */
  "sheets.spreadsheets.batchUpdate": {
    /**
     * The spreadsheet to apply the updates to.
     */
    spreadsheetId: string;
    /** The request JSON body */
    body: BatchUpdateSpreadsheetRequest;
  };
  /**
   * Creates a spreadsheet, returning the newly created spreadsheet.
   */
  "sheets.spreadsheets.create": {
    /** The request JSON body */
    body: Spreadsheet;
  };
  /**
   * Returns the developer metadata with the specified ID. The caller must specify the spreadsheet ID and the developer metadata's unique metadataId.
   */
  "sheets.spreadsheets.developerMetadata.get": {
    /**
     * The ID of the developer metadata to retrieve.
     */
    metadataId: number;
    /**
     * The ID of the spreadsheet to retrieve metadata from.
     */
    spreadsheetId: string;
  };
  /**
   * Returns all developer metadata matching the specified DataFilter. If the provided DataFilter represents a DeveloperMetadataLookup object, this will return all DeveloperMetadata entries selected by it. If the DataFilter represents a location in a spreadsheet, this will return all developer metadata associated with locations intersecting that region.
   */
  "sheets.spreadsheets.developerMetadata.search": {
    /**
     * The ID of the spreadsheet to retrieve metadata from.
     */
    spreadsheetId: string;
    /** The request JSON body */
    body: SearchDeveloperMetadataRequest;
  };
  /**
   * Returns the spreadsheet at the given ID. The caller must specify the spreadsheet ID. By default, data within grids is not returned. You can include grid data in one of 2 ways: * Specify a [field mask](https://developers.google.com/sheets/api/guides/field-masks) listing your desired fields using the `fields` URL parameter in HTTP * Set the includeGridData URL parameter to true. If a field mask is set, the `includeGridData` parameter is ignored For large spreadsheets, as a best practice, retrieve only the specific spreadsheet fields that you want. To retrieve only subsets of spreadsheet data, use the ranges URL parameter. Ranges are specified using [A1 notation](/sheets/api/guides/concepts#cell). You can define a single cell (for example, `A1`) or multiple cells (for example, `A1:D5`). You can also get cells from other sheets within the same spreadsheet (for example, `Sheet2!A1:C4`) or retrieve multiple ranges at once (for example, `?ranges=A1:D5&ranges=Sheet2!A1:C4`). Limiting the range returns only the portions of the spreadsheet that intersect the requested ranges.
   */
  "sheets.spreadsheets.get": {
    /**
     * True if grid data should be returned. This parameter is ignored if a field mask was set in the request.
     */
    includeGridData?: boolean;
    /**
     * The ranges to retrieve from the spreadsheet.
     */
    ranges?: string[];
    /**
     * The spreadsheet to request.
     */
    spreadsheetId: string;
  };
  /**
   * Returns the spreadsheet at the given ID. The caller must specify the spreadsheet ID. This method differs from GetSpreadsheet in that it allows selecting which subsets of spreadsheet data to return by specifying a dataFilters parameter. Multiple DataFilters can be specified. Specifying one or more data filters returns the portions of the spreadsheet that intersect ranges matched by any of the filters. By default, data within grids is not returned. You can include grid data one of 2 ways: * Specify a [field mask](https://developers.google.com/sheets/api/guides/field-masks) listing your desired fields using the `fields` URL parameter in HTTP * Set the includeGridData parameter to true. If a field mask is set, the `includeGridData` parameter is ignored For large spreadsheets, as a best practice, retrieve only the specific spreadsheet fields that you want.
   */
  "sheets.spreadsheets.getByDataFilter": {
    /**
     * The spreadsheet to request.
     */
    spreadsheetId: string;
    /** The request JSON body */
    body: GetSpreadsheetByDataFilterRequest;
  };
  /**
   * Copies a single sheet from a spreadsheet to another spreadsheet. Returns the properties of the newly created sheet.
   */
  "sheets.spreadsheets.sheets.copyTo": {
    /**
     * The ID of the sheet to copy.
     */
    sheetId: number;
    /**
     * The ID of the spreadsheet containing the sheet to copy.
     */
    spreadsheetId: string;
    /** The request JSON body */
    body: CopySheetToAnotherSpreadsheetRequest;
  };
  /**
   * Appends values to a spreadsheet. The input range is used to search for existing data and find a "table" within that range. Values will be appended to the next row of the table, starting with the first column of the table. See the [guide](/sheets/api/guides/values#appending_values) and [sample code](/sheets/api/samples/writing#append_values) for specific details of how tables are detected and data is appended. The caller must specify the spreadsheet ID, range, and a valueInputOption. The `valueInputOption` only controls how the input data will be added to the sheet (column-wise or row-wise), it does not influence what cell the data starts being written to.
   */
  "sheets.spreadsheets.values.append": {
    /**
     * Determines if the update response should include the values of the cells that were appended. By default, responses do not include the updated values.
     */
    includeValuesInResponse?: boolean;
    /**
     * How the input data should be inserted.
     *
     * Enumerated Values:
     * - OVERWRITE: The new data overwrites existing data in the areas it is written. (Note: adding data to the end of the sheet will still insert new rows or columns so the data can be written.)
     * - INSERT_ROWS: Rows are inserted for the new data.
     */
    insertDataOption?: "OVERWRITE" | "INSERT_ROWS";
    /**
     * The [A1 notation](/sheets/api/guides/concepts#cell) of a range to search for a logical table of data. Values are appended after the last row of the table.
     */
    range: string;
    /**
     * Determines how dates, times, and durations in the response should be rendered. This is ignored if response_value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER.
     *
     * Enumerated Values:
     * - SERIAL_NUMBER: Instructs date, time, datetime, and duration fields to be output as doubles in "serial number" format, as popularized by Lotus 1-2-3. The whole number portion of the value (left of the decimal) counts the days since December 30th 1899. The fractional portion (right of the decimal) counts the time as a fraction of the day. For example, January 1st 1900 at noon would be 2.5, 2 because it's 2 days after December 30th 1899, and .5 because noon is half a day. February 1st 1900 at 3pm would be 33.625. This correctly treats the year 1900 as not a leap year.
     * - FORMATTED_STRING: Instructs date, time, datetime, and duration fields to be output as strings in their given number format (which depends on the spreadsheet locale).
     */
    responseDateTimeRenderOption?: "SERIAL_NUMBER" | "FORMATTED_STRING";
    /**
     * Determines how values in the response should be rendered. The default render option is FORMATTED_VALUE.
     *
     * Enumerated Values:
     * - FORMATTED_VALUE: Values will be calculated & formatted in the response according to the cell's formatting. Formatting is based on the spreadsheet's locale, not the requesting user's locale. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return `"$1.23"`.
     * - UNFORMATTED_VALUE: Values will be calculated, but not formatted in the reply. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return the number `1.23`.
     * - FORMULA: Values will not be calculated. The reply will include the formulas. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then A2 would return `"=A1"`. Sheets treats date and time values as decimal values. This lets you perform arithmetic on them in formulas. For more information on interpreting date and time values, see [About date & time values](https://developers.google.com/sheets/api/guides/formats#about_date_time_values).
     */
    responseValueRenderOption?: "FORMATTED_VALUE" | "UNFORMATTED_VALUE" | "FORMULA";
    /**
     * The ID of the spreadsheet to update.
     */
    spreadsheetId: string;
    /**
     * How the input data should be interpreted.
     *
     * Enumerated Values:
     * - INPUT_VALUE_OPTION_UNSPECIFIED: Default input value. This value must not be used.
     * - RAW: The values the user has entered will not be parsed and will be stored as-is.
     * - USER_ENTERED: The values will be parsed as if the user typed them into the UI. Numbers will stay as numbers, but strings may be converted to numbers, dates, etc. following the same rules that are applied when entering text into a cell via the Google Sheets UI.
     */
    valueInputOption?: "INPUT_VALUE_OPTION_UNSPECIFIED" | "RAW" | "USER_ENTERED";
    /** The request JSON body */
    body: ValueRange;
  };
  /**
   * Clears one or more ranges of values from a spreadsheet. The caller must specify the spreadsheet ID and one or more ranges. Only values are cleared -- all other properties of the cell (such as formatting and data validation) are kept.
   */
  "sheets.spreadsheets.values.batchClear": {
    /**
     * The ID of the spreadsheet to update.
     */
    spreadsheetId: string;
    /** The request JSON body */
    body: BatchClearValuesRequest;
  };
  /**
   * Clears one or more ranges of values from a spreadsheet. The caller must specify the spreadsheet ID and one or more DataFilters. Ranges matching any of the specified data filters will be cleared. Only values are cleared -- all other properties of the cell (such as formatting, data validation, etc..) are kept.
   */
  "sheets.spreadsheets.values.batchClearByDataFilter": {
    /**
     * The ID of the spreadsheet to update.
     */
    spreadsheetId: string;
    /** The request JSON body */
    body: BatchClearValuesByDataFilterRequest;
  };
  /**
   * Returns one or more ranges of values from a spreadsheet. The caller must specify the spreadsheet ID and one or more ranges.
   */
  "sheets.spreadsheets.values.batchGet": {
    /**
     * How dates, times, and durations should be represented in the output. This is ignored if value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER.
     *
     * Enumerated Values:
     * - SERIAL_NUMBER: Instructs date, time, datetime, and duration fields to be output as doubles in "serial number" format, as popularized by Lotus 1-2-3. The whole number portion of the value (left of the decimal) counts the days since December 30th 1899. The fractional portion (right of the decimal) counts the time as a fraction of the day. For example, January 1st 1900 at noon would be 2.5, 2 because it's 2 days after December 30th 1899, and .5 because noon is half a day. February 1st 1900 at 3pm would be 33.625. This correctly treats the year 1900 as not a leap year.
     * - FORMATTED_STRING: Instructs date, time, datetime, and duration fields to be output as strings in their given number format (which depends on the spreadsheet locale).
     */
    dateTimeRenderOption?: "SERIAL_NUMBER" | "FORMATTED_STRING";
    /**
     * The major dimension that results should use. For example, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then requesting `ranges=["A1:B2"],majorDimension=ROWS` returns `[[1,2],[3,4]]`, whereas requesting `ranges=["A1:B2"],majorDimension=COLUMNS` returns `[[1,3],[2,4]]`.
     *
     * Enumerated Values:
     * - DIMENSION_UNSPECIFIED: The default value, do not use.
     * - ROWS: Operates on the rows of a sheet.
     * - COLUMNS: Operates on the columns of a sheet.
     */
    majorDimension?: "DIMENSION_UNSPECIFIED" | "ROWS" | "COLUMNS";
    /**
     * The [A1 notation or R1C1 notation](/sheets/api/guides/concepts#cell) of the range to retrieve values from.
     */
    ranges?: string[];
    /**
     * The ID of the spreadsheet to retrieve data from.
     */
    spreadsheetId: string;
    /**
     * How values should be represented in the output. The default render option is ValueRenderOption.FORMATTED_VALUE.
     *
     * Enumerated Values:
     * - FORMATTED_VALUE: Values will be calculated & formatted in the response according to the cell's formatting. Formatting is based on the spreadsheet's locale, not the requesting user's locale. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return `"$1.23"`.
     * - UNFORMATTED_VALUE: Values will be calculated, but not formatted in the reply. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return the number `1.23`.
     * - FORMULA: Values will not be calculated. The reply will include the formulas. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then A2 would return `"=A1"`. Sheets treats date and time values as decimal values. This lets you perform arithmetic on them in formulas. For more information on interpreting date and time values, see [About date & time values](https://developers.google.com/sheets/api/guides/formats#about_date_time_values).
     */
    valueRenderOption?: "FORMATTED_VALUE" | "UNFORMATTED_VALUE" | "FORMULA";
  };
  /**
   * Returns one or more ranges of values that match the specified data filters. The caller must specify the spreadsheet ID and one or more DataFilters. Ranges that match any of the data filters in the request will be returned.
   */
  "sheets.spreadsheets.values.batchGetByDataFilter": {
    /**
     * The ID of the spreadsheet to retrieve data from.
     */
    spreadsheetId: string;
    /** The request JSON body */
    body: BatchGetValuesByDataFilterRequest;
  };
  /**
   * Sets values in one or more ranges of a spreadsheet. The caller must specify the spreadsheet ID, a valueInputOption, and one or more ValueRanges.
   */
  "sheets.spreadsheets.values.batchUpdate": {
    /**
     * The ID of the spreadsheet to update.
     */
    spreadsheetId: string;
    /** The request JSON body */
    body: BatchUpdateValuesRequest;
  };
  /**
   * Sets values in one or more ranges of a spreadsheet. The caller must specify the spreadsheet ID, a valueInputOption, and one or more DataFilterValueRanges.
   */
  "sheets.spreadsheets.values.batchUpdateByDataFilter": {
    /**
     * The ID of the spreadsheet to update.
     */
    spreadsheetId: string;
    /** The request JSON body */
    body: BatchUpdateValuesByDataFilterRequest;
  };
  /**
   * Clears values from a spreadsheet. The caller must specify the spreadsheet ID and range. Only values are cleared -- all other properties of the cell (such as formatting, data validation, etc..) are kept.
   */
  "sheets.spreadsheets.values.clear": {
    /**
     * The [A1 notation or R1C1 notation](/sheets/api/guides/concepts#cell) of the values to clear.
     */
    range: string;
    /**
     * The ID of the spreadsheet to update.
     */
    spreadsheetId: string;
    /** The request JSON body */
    body: ClearValuesRequest;
  };
  /**
   * Returns a range of values from a spreadsheet. The caller must specify the spreadsheet ID and a range.
   */
  "sheets.spreadsheets.values.get": {
    /**
     * How dates, times, and durations should be represented in the output. This is ignored if value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER.
     *
     * Enumerated Values:
     * - SERIAL_NUMBER: Instructs date, time, datetime, and duration fields to be output as doubles in "serial number" format, as popularized by Lotus 1-2-3. The whole number portion of the value (left of the decimal) counts the days since December 30th 1899. The fractional portion (right of the decimal) counts the time as a fraction of the day. For example, January 1st 1900 at noon would be 2.5, 2 because it's 2 days after December 30th 1899, and .5 because noon is half a day. February 1st 1900 at 3pm would be 33.625. This correctly treats the year 1900 as not a leap year.
     * - FORMATTED_STRING: Instructs date, time, datetime, and duration fields to be output as strings in their given number format (which depends on the spreadsheet locale).
     */
    dateTimeRenderOption?: "SERIAL_NUMBER" | "FORMATTED_STRING";
    /**
     * The major dimension that results should use. For example, if the spreadsheet data in Sheet1 is: `A1=1,B1=2,A2=3,B2=4`, then requesting `range=Sheet1!A1:B2?majorDimension=ROWS` returns `[[1,2],[3,4]]`, whereas requesting `range=Sheet1!A1:B2?majorDimension=COLUMNS` returns `[[1,3],[2,4]]`.
     *
     * Enumerated Values:
     * - DIMENSION_UNSPECIFIED: The default value, do not use.
     * - ROWS: Operates on the rows of a sheet.
     * - COLUMNS: Operates on the columns of a sheet.
     */
    majorDimension?: "DIMENSION_UNSPECIFIED" | "ROWS" | "COLUMNS";
    /**
     * The [A1 notation or R1C1 notation](/sheets/api/guides/concepts#cell) of the range to retrieve values from.
     */
    range: string;
    /**
     * The ID of the spreadsheet to retrieve data from.
     */
    spreadsheetId: string;
    /**
     * How values should be represented in the output. The default render option is FORMATTED_VALUE.
     *
     * Enumerated Values:
     * - FORMATTED_VALUE: Values will be calculated & formatted in the response according to the cell's formatting. Formatting is based on the spreadsheet's locale, not the requesting user's locale. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return `"$1.23"`.
     * - UNFORMATTED_VALUE: Values will be calculated, but not formatted in the reply. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return the number `1.23`.
     * - FORMULA: Values will not be calculated. The reply will include the formulas. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then A2 would return `"=A1"`. Sheets treats date and time values as decimal values. This lets you perform arithmetic on them in formulas. For more information on interpreting date and time values, see [About date & time values](https://developers.google.com/sheets/api/guides/formats#about_date_time_values).
     */
    valueRenderOption?: "FORMATTED_VALUE" | "UNFORMATTED_VALUE" | "FORMULA";
  };
  /**
   * Sets values in a range of a spreadsheet. The caller must specify the spreadsheet ID, range, and a valueInputOption.
   */
  "sheets.spreadsheets.values.update": {
    /**
     * Determines if the update response should include the values of the cells that were updated. By default, responses do not include the updated values. If the range to write was larger than the range actually written, the response includes all values in the requested range (excluding trailing empty rows and columns).
     */
    includeValuesInResponse?: boolean;
    /**
     * The [A1 notation](/sheets/api/guides/concepts#cell) of the values to update.
     */
    range: string;
    /**
     * Determines how dates, times, and durations in the response should be rendered. This is ignored if response_value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER.
     *
     * Enumerated Values:
     * - SERIAL_NUMBER: Instructs date, time, datetime, and duration fields to be output as doubles in "serial number" format, as popularized by Lotus 1-2-3. The whole number portion of the value (left of the decimal) counts the days since December 30th 1899. The fractional portion (right of the decimal) counts the time as a fraction of the day. For example, January 1st 1900 at noon would be 2.5, 2 because it's 2 days after December 30th 1899, and .5 because noon is half a day. February 1st 1900 at 3pm would be 33.625. This correctly treats the year 1900 as not a leap year.
     * - FORMATTED_STRING: Instructs date, time, datetime, and duration fields to be output as strings in their given number format (which depends on the spreadsheet locale).
     */
    responseDateTimeRenderOption?: "SERIAL_NUMBER" | "FORMATTED_STRING";
    /**
     * Determines how values in the response should be rendered. The default render option is FORMATTED_VALUE.
     *
     * Enumerated Values:
     * - FORMATTED_VALUE: Values will be calculated & formatted in the response according to the cell's formatting. Formatting is based on the spreadsheet's locale, not the requesting user's locale. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return `"$1.23"`.
     * - UNFORMATTED_VALUE: Values will be calculated, but not formatted in the reply. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return the number `1.23`.
     * - FORMULA: Values will not be calculated. The reply will include the formulas. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then A2 would return `"=A1"`. Sheets treats date and time values as decimal values. This lets you perform arithmetic on them in formulas. For more information on interpreting date and time values, see [About date & time values](https://developers.google.com/sheets/api/guides/formats#about_date_time_values).
     */
    responseValueRenderOption?: "FORMATTED_VALUE" | "UNFORMATTED_VALUE" | "FORMULA";
    /**
     * The ID of the spreadsheet to update.
     */
    spreadsheetId: string;
    /**
     * How the input data should be interpreted.
     *
     * Enumerated Values:
     * - INPUT_VALUE_OPTION_UNSPECIFIED: Default input value. This value must not be used.
     * - RAW: The values the user has entered will not be parsed and will be stored as-is.
     * - USER_ENTERED: The values will be parsed as if the user typed them into the UI. Numbers will stay as numbers, but strings may be converted to numbers, dates, etc. following the same rules that are applied when entering text into a cell via the Google Sheets UI.
     */
    valueInputOption?: "INPUT_VALUE_OPTION_UNSPECIFIED" | "RAW" | "USER_ENTERED";
    /** The request JSON body */
    body: ValueRange;
  };
}

export interface GoogleSheetsAPIRequestMap {
  /**
   * Applies one or more updates to the spreadsheet. Each request is validated before being applied. If any request is not valid then the entire request will fail and nothing will be applied. Some requests have replies to give you some information about how they are applied. The replies will mirror the requests. For example, if you applied 4 updates and the 3rd one had a reply, then the response will have 2 empty replies, the actual reply, and another empty reply, in that order. Due to the collaborative nature of spreadsheets, it is not guaranteed that the spreadsheet will reflect exactly your changes after this completes, however it is guaranteed that the updates in the request will be applied together atomically. Your changes may be altered with respect to collaborator changes. If there are no collaborators, the spreadsheet should reflect your changes.
   */
  "sheets.spreadsheets.batchUpdate": {
    method: "POST";
    uri: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}:batchUpdate";
    path: {
      /**
       * The spreadsheet to apply the updates to.
       */
      spreadsheetId: string;
    };
    query: null;
    /** The request JSON body */
    body: BatchUpdateSpreadsheetRequest;
  };
  /**
   * Creates a spreadsheet, returning the newly created spreadsheet.
   */
  "sheets.spreadsheets.create": {
    method: "POST";
    uri: "https://sheets.googleapis.com/v4/spreadsheets";
    path: null;
    query: null;
    /** The request JSON body */
    body: Spreadsheet;
  };
  /**
   * Returns the developer metadata with the specified ID. The caller must specify the spreadsheet ID and the developer metadata's unique metadataId.
   */
  "sheets.spreadsheets.developerMetadata.get": {
    method: "GET";
    uri: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/developerMetadata/{metadataId}";
    path: {
      /**
       * The ID of the developer metadata to retrieve.
       */
      metadataId: number;
      /**
       * The ID of the spreadsheet to retrieve metadata from.
       */
      spreadsheetId: string;
    };
    query: null;
    body: null;
  };
  /**
   * Returns all developer metadata matching the specified DataFilter. If the provided DataFilter represents a DeveloperMetadataLookup object, this will return all DeveloperMetadata entries selected by it. If the DataFilter represents a location in a spreadsheet, this will return all developer metadata associated with locations intersecting that region.
   */
  "sheets.spreadsheets.developerMetadata.search": {
    method: "POST";
    uri: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/developerMetadata:search";
    path: {
      /**
       * The ID of the spreadsheet to retrieve metadata from.
       */
      spreadsheetId: string;
    };
    query: null;
    /** The request JSON body */
    body: SearchDeveloperMetadataRequest;
  };
  /**
   * Returns the spreadsheet at the given ID. The caller must specify the spreadsheet ID. By default, data within grids is not returned. You can include grid data in one of 2 ways: * Specify a [field mask](https://developers.google.com/sheets/api/guides/field-masks) listing your desired fields using the `fields` URL parameter in HTTP * Set the includeGridData URL parameter to true. If a field mask is set, the `includeGridData` parameter is ignored For large spreadsheets, as a best practice, retrieve only the specific spreadsheet fields that you want. To retrieve only subsets of spreadsheet data, use the ranges URL parameter. Ranges are specified using [A1 notation](/sheets/api/guides/concepts#cell). You can define a single cell (for example, `A1`) or multiple cells (for example, `A1:D5`). You can also get cells from other sheets within the same spreadsheet (for example, `Sheet2!A1:C4`) or retrieve multiple ranges at once (for example, `?ranges=A1:D5&ranges=Sheet2!A1:C4`). Limiting the range returns only the portions of the spreadsheet that intersect the requested ranges.
   */
  "sheets.spreadsheets.get": {
    method: "GET";
    uri: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}";
    path: {
      /**
       * The spreadsheet to request.
       */
      spreadsheetId: string;
    };
    query: {
      /**
       * True if grid data should be returned. This parameter is ignored if a field mask was set in the request.
       */
      includeGridData?: boolean;
      /**
       * The ranges to retrieve from the spreadsheet.
       */
      ranges?: string[];
    };
    body: null;
  };
  /**
   * Returns the spreadsheet at the given ID. The caller must specify the spreadsheet ID. This method differs from GetSpreadsheet in that it allows selecting which subsets of spreadsheet data to return by specifying a dataFilters parameter. Multiple DataFilters can be specified. Specifying one or more data filters returns the portions of the spreadsheet that intersect ranges matched by any of the filters. By default, data within grids is not returned. You can include grid data one of 2 ways: * Specify a [field mask](https://developers.google.com/sheets/api/guides/field-masks) listing your desired fields using the `fields` URL parameter in HTTP * Set the includeGridData parameter to true. If a field mask is set, the `includeGridData` parameter is ignored For large spreadsheets, as a best practice, retrieve only the specific spreadsheet fields that you want.
   */
  "sheets.spreadsheets.getByDataFilter": {
    method: "POST";
    uri: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}:getByDataFilter";
    path: {
      /**
       * The spreadsheet to request.
       */
      spreadsheetId: string;
    };
    query: null;
    /** The request JSON body */
    body: GetSpreadsheetByDataFilterRequest;
  };
  /**
   * Copies a single sheet from a spreadsheet to another spreadsheet. Returns the properties of the newly created sheet.
   */
  "sheets.spreadsheets.sheets.copyTo": {
    method: "POST";
    uri: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/sheets/{sheetId}:copyTo";
    path: {
      /**
       * The ID of the sheet to copy.
       */
      sheetId: number;
      /**
       * The ID of the spreadsheet containing the sheet to copy.
       */
      spreadsheetId: string;
    };
    query: null;
    /** The request JSON body */
    body: CopySheetToAnotherSpreadsheetRequest;
  };
  /**
   * Appends values to a spreadsheet. The input range is used to search for existing data and find a "table" within that range. Values will be appended to the next row of the table, starting with the first column of the table. See the [guide](/sheets/api/guides/values#appending_values) and [sample code](/sheets/api/samples/writing#append_values) for specific details of how tables are detected and data is appended. The caller must specify the spreadsheet ID, range, and a valueInputOption. The `valueInputOption` only controls how the input data will be added to the sheet (column-wise or row-wise), it does not influence what cell the data starts being written to.
   */
  "sheets.spreadsheets.values.append": {
    method: "POST";
    uri: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}:append";
    path: {
      /**
       * The [A1 notation](/sheets/api/guides/concepts#cell) of a range to search for a logical table of data. Values are appended after the last row of the table.
       */
      range: string;
      /**
       * The ID of the spreadsheet to update.
       */
      spreadsheetId: string;
    };
    query: {
      /**
       * Determines if the update response should include the values of the cells that were appended. By default, responses do not include the updated values.
       */
      includeValuesInResponse?: boolean;
      /**
       * How the input data should be inserted.
       *
       * Enumerated Values:
       * - OVERWRITE: The new data overwrites existing data in the areas it is written. (Note: adding data to the end of the sheet will still insert new rows or columns so the data can be written.)
       * - INSERT_ROWS: Rows are inserted for the new data.
       */
      insertDataOption?: "OVERWRITE" | "INSERT_ROWS";
      /**
       * Determines how dates, times, and durations in the response should be rendered. This is ignored if response_value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER.
       *
       * Enumerated Values:
       * - SERIAL_NUMBER: Instructs date, time, datetime, and duration fields to be output as doubles in "serial number" format, as popularized by Lotus 1-2-3. The whole number portion of the value (left of the decimal) counts the days since December 30th 1899. The fractional portion (right of the decimal) counts the time as a fraction of the day. For example, January 1st 1900 at noon would be 2.5, 2 because it's 2 days after December 30th 1899, and .5 because noon is half a day. February 1st 1900 at 3pm would be 33.625. This correctly treats the year 1900 as not a leap year.
       * - FORMATTED_STRING: Instructs date, time, datetime, and duration fields to be output as strings in their given number format (which depends on the spreadsheet locale).
       */
      responseDateTimeRenderOption?: "SERIAL_NUMBER" | "FORMATTED_STRING";
      /**
       * Determines how values in the response should be rendered. The default render option is FORMATTED_VALUE.
       *
       * Enumerated Values:
       * - FORMATTED_VALUE: Values will be calculated & formatted in the response according to the cell's formatting. Formatting is based on the spreadsheet's locale, not the requesting user's locale. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return `"$1.23"`.
       * - UNFORMATTED_VALUE: Values will be calculated, but not formatted in the reply. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return the number `1.23`.
       * - FORMULA: Values will not be calculated. The reply will include the formulas. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then A2 would return `"=A1"`. Sheets treats date and time values as decimal values. This lets you perform arithmetic on them in formulas. For more information on interpreting date and time values, see [About date & time values](https://developers.google.com/sheets/api/guides/formats#about_date_time_values).
       */
      responseValueRenderOption?: "FORMATTED_VALUE" | "UNFORMATTED_VALUE" | "FORMULA";
      /**
       * How the input data should be interpreted.
       *
       * Enumerated Values:
       * - INPUT_VALUE_OPTION_UNSPECIFIED: Default input value. This value must not be used.
       * - RAW: The values the user has entered will not be parsed and will be stored as-is.
       * - USER_ENTERED: The values will be parsed as if the user typed them into the UI. Numbers will stay as numbers, but strings may be converted to numbers, dates, etc. following the same rules that are applied when entering text into a cell via the Google Sheets UI.
       */
      valueInputOption?: "INPUT_VALUE_OPTION_UNSPECIFIED" | "RAW" | "USER_ENTERED";
    };
    /** The request JSON body */
    body: ValueRange;
  };
  /**
   * Clears one or more ranges of values from a spreadsheet. The caller must specify the spreadsheet ID and one or more ranges. Only values are cleared -- all other properties of the cell (such as formatting and data validation) are kept.
   */
  "sheets.spreadsheets.values.batchClear": {
    method: "POST";
    uri: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values:batchClear";
    path: {
      /**
       * The ID of the spreadsheet to update.
       */
      spreadsheetId: string;
    };
    query: null;
    /** The request JSON body */
    body: BatchClearValuesRequest;
  };
  /**
   * Clears one or more ranges of values from a spreadsheet. The caller must specify the spreadsheet ID and one or more DataFilters. Ranges matching any of the specified data filters will be cleared. Only values are cleared -- all other properties of the cell (such as formatting, data validation, etc..) are kept.
   */
  "sheets.spreadsheets.values.batchClearByDataFilter": {
    method: "POST";
    uri: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values:batchClearByDataFilter";
    path: {
      /**
       * The ID of the spreadsheet to update.
       */
      spreadsheetId: string;
    };
    query: null;
    /** The request JSON body */
    body: BatchClearValuesByDataFilterRequest;
  };
  /**
   * Returns one or more ranges of values from a spreadsheet. The caller must specify the spreadsheet ID and one or more ranges.
   */
  "sheets.spreadsheets.values.batchGet": {
    method: "GET";
    uri: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values:batchGet";
    path: {
      /**
       * The ID of the spreadsheet to retrieve data from.
       */
      spreadsheetId: string;
    };
    query: {
      /**
       * How dates, times, and durations should be represented in the output. This is ignored if value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER.
       *
       * Enumerated Values:
       * - SERIAL_NUMBER: Instructs date, time, datetime, and duration fields to be output as doubles in "serial number" format, as popularized by Lotus 1-2-3. The whole number portion of the value (left of the decimal) counts the days since December 30th 1899. The fractional portion (right of the decimal) counts the time as a fraction of the day. For example, January 1st 1900 at noon would be 2.5, 2 because it's 2 days after December 30th 1899, and .5 because noon is half a day. February 1st 1900 at 3pm would be 33.625. This correctly treats the year 1900 as not a leap year.
       * - FORMATTED_STRING: Instructs date, time, datetime, and duration fields to be output as strings in their given number format (which depends on the spreadsheet locale).
       */
      dateTimeRenderOption?: "SERIAL_NUMBER" | "FORMATTED_STRING";
      /**
       * The major dimension that results should use. For example, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then requesting `ranges=["A1:B2"],majorDimension=ROWS` returns `[[1,2],[3,4]]`, whereas requesting `ranges=["A1:B2"],majorDimension=COLUMNS` returns `[[1,3],[2,4]]`.
       *
       * Enumerated Values:
       * - DIMENSION_UNSPECIFIED: The default value, do not use.
       * - ROWS: Operates on the rows of a sheet.
       * - COLUMNS: Operates on the columns of a sheet.
       */
      majorDimension?: "DIMENSION_UNSPECIFIED" | "ROWS" | "COLUMNS";
      /**
       * The [A1 notation or R1C1 notation](/sheets/api/guides/concepts#cell) of the range to retrieve values from.
       */
      ranges?: string[];
      /**
       * How values should be represented in the output. The default render option is ValueRenderOption.FORMATTED_VALUE.
       *
       * Enumerated Values:
       * - FORMATTED_VALUE: Values will be calculated & formatted in the response according to the cell's formatting. Formatting is based on the spreadsheet's locale, not the requesting user's locale. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return `"$1.23"`.
       * - UNFORMATTED_VALUE: Values will be calculated, but not formatted in the reply. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return the number `1.23`.
       * - FORMULA: Values will not be calculated. The reply will include the formulas. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then A2 would return `"=A1"`. Sheets treats date and time values as decimal values. This lets you perform arithmetic on them in formulas. For more information on interpreting date and time values, see [About date & time values](https://developers.google.com/sheets/api/guides/formats#about_date_time_values).
       */
      valueRenderOption?: "FORMATTED_VALUE" | "UNFORMATTED_VALUE" | "FORMULA";
    };
    body: null;
  };
  /**
   * Returns one or more ranges of values that match the specified data filters. The caller must specify the spreadsheet ID and one or more DataFilters. Ranges that match any of the data filters in the request will be returned.
   */
  "sheets.spreadsheets.values.batchGetByDataFilter": {
    method: "POST";
    uri: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values:batchGetByDataFilter";
    path: {
      /**
       * The ID of the spreadsheet to retrieve data from.
       */
      spreadsheetId: string;
    };
    query: null;
    /** The request JSON body */
    body: BatchGetValuesByDataFilterRequest;
  };
  /**
   * Sets values in one or more ranges of a spreadsheet. The caller must specify the spreadsheet ID, a valueInputOption, and one or more ValueRanges.
   */
  "sheets.spreadsheets.values.batchUpdate": {
    method: "POST";
    uri: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values:batchUpdate";
    path: {
      /**
       * The ID of the spreadsheet to update.
       */
      spreadsheetId: string;
    };
    query: null;
    /** The request JSON body */
    body: BatchUpdateValuesRequest;
  };
  /**
   * Sets values in one or more ranges of a spreadsheet. The caller must specify the spreadsheet ID, a valueInputOption, and one or more DataFilterValueRanges.
   */
  "sheets.spreadsheets.values.batchUpdateByDataFilter": {
    method: "POST";
    uri: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values:batchUpdateByDataFilter";
    path: {
      /**
       * The ID of the spreadsheet to update.
       */
      spreadsheetId: string;
    };
    query: null;
    /** The request JSON body */
    body: BatchUpdateValuesByDataFilterRequest;
  };
  /**
   * Clears values from a spreadsheet. The caller must specify the spreadsheet ID and range. Only values are cleared -- all other properties of the cell (such as formatting, data validation, etc..) are kept.
   */
  "sheets.spreadsheets.values.clear": {
    method: "POST";
    uri: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}:clear";
    path: {
      /**
       * The [A1 notation or R1C1 notation](/sheets/api/guides/concepts#cell) of the values to clear.
       */
      range: string;
      /**
       * The ID of the spreadsheet to update.
       */
      spreadsheetId: string;
    };
    query: null;
    /** The request JSON body */
    body: ClearValuesRequest;
  };
  /**
   * Returns a range of values from a spreadsheet. The caller must specify the spreadsheet ID and a range.
   */
  "sheets.spreadsheets.values.get": {
    method: "GET";
    uri: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}";
    path: {
      /**
       * The [A1 notation or R1C1 notation](/sheets/api/guides/concepts#cell) of the range to retrieve values from.
       */
      range: string;
      /**
       * The ID of the spreadsheet to retrieve data from.
       */
      spreadsheetId: string;
    };
    query: {
      /**
       * How dates, times, and durations should be represented in the output. This is ignored if value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER.
       *
       * Enumerated Values:
       * - SERIAL_NUMBER: Instructs date, time, datetime, and duration fields to be output as doubles in "serial number" format, as popularized by Lotus 1-2-3. The whole number portion of the value (left of the decimal) counts the days since December 30th 1899. The fractional portion (right of the decimal) counts the time as a fraction of the day. For example, January 1st 1900 at noon would be 2.5, 2 because it's 2 days after December 30th 1899, and .5 because noon is half a day. February 1st 1900 at 3pm would be 33.625. This correctly treats the year 1900 as not a leap year.
       * - FORMATTED_STRING: Instructs date, time, datetime, and duration fields to be output as strings in their given number format (which depends on the spreadsheet locale).
       */
      dateTimeRenderOption?: "SERIAL_NUMBER" | "FORMATTED_STRING";
      /**
       * The major dimension that results should use. For example, if the spreadsheet data in Sheet1 is: `A1=1,B1=2,A2=3,B2=4`, then requesting `range=Sheet1!A1:B2?majorDimension=ROWS` returns `[[1,2],[3,4]]`, whereas requesting `range=Sheet1!A1:B2?majorDimension=COLUMNS` returns `[[1,3],[2,4]]`.
       *
       * Enumerated Values:
       * - DIMENSION_UNSPECIFIED: The default value, do not use.
       * - ROWS: Operates on the rows of a sheet.
       * - COLUMNS: Operates on the columns of a sheet.
       */
      majorDimension?: "DIMENSION_UNSPECIFIED" | "ROWS" | "COLUMNS";
      /**
       * How values should be represented in the output. The default render option is FORMATTED_VALUE.
       *
       * Enumerated Values:
       * - FORMATTED_VALUE: Values will be calculated & formatted in the response according to the cell's formatting. Formatting is based on the spreadsheet's locale, not the requesting user's locale. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return `"$1.23"`.
       * - UNFORMATTED_VALUE: Values will be calculated, but not formatted in the reply. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return the number `1.23`.
       * - FORMULA: Values will not be calculated. The reply will include the formulas. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then A2 would return `"=A1"`. Sheets treats date and time values as decimal values. This lets you perform arithmetic on them in formulas. For more information on interpreting date and time values, see [About date & time values](https://developers.google.com/sheets/api/guides/formats#about_date_time_values).
       */
      valueRenderOption?: "FORMATTED_VALUE" | "UNFORMATTED_VALUE" | "FORMULA";
    };
    body: null;
  };
  /**
   * Sets values in a range of a spreadsheet. The caller must specify the spreadsheet ID, range, and a valueInputOption.
   */
  "sheets.spreadsheets.values.update": {
    method: "PUT";
    uri: "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}";
    path: {
      /**
       * The [A1 notation](/sheets/api/guides/concepts#cell) of the values to update.
       */
      range: string;
      /**
       * The ID of the spreadsheet to update.
       */
      spreadsheetId: string;
    };
    query: {
      /**
       * Determines if the update response should include the values of the cells that were updated. By default, responses do not include the updated values. If the range to write was larger than the range actually written, the response includes all values in the requested range (excluding trailing empty rows and columns).
       */
      includeValuesInResponse?: boolean;
      /**
       * Determines how dates, times, and durations in the response should be rendered. This is ignored if response_value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER.
       *
       * Enumerated Values:
       * - SERIAL_NUMBER: Instructs date, time, datetime, and duration fields to be output as doubles in "serial number" format, as popularized by Lotus 1-2-3. The whole number portion of the value (left of the decimal) counts the days since December 30th 1899. The fractional portion (right of the decimal) counts the time as a fraction of the day. For example, January 1st 1900 at noon would be 2.5, 2 because it's 2 days after December 30th 1899, and .5 because noon is half a day. February 1st 1900 at 3pm would be 33.625. This correctly treats the year 1900 as not a leap year.
       * - FORMATTED_STRING: Instructs date, time, datetime, and duration fields to be output as strings in their given number format (which depends on the spreadsheet locale).
       */
      responseDateTimeRenderOption?: "SERIAL_NUMBER" | "FORMATTED_STRING";
      /**
       * Determines how values in the response should be rendered. The default render option is FORMATTED_VALUE.
       *
       * Enumerated Values:
       * - FORMATTED_VALUE: Values will be calculated & formatted in the response according to the cell's formatting. Formatting is based on the spreadsheet's locale, not the requesting user's locale. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return `"$1.23"`.
       * - UNFORMATTED_VALUE: Values will be calculated, but not formatted in the reply. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then `A2` would return the number `1.23`.
       * - FORMULA: Values will not be calculated. The reply will include the formulas. For example, if `A1` is `1.23` and `A2` is `=A1` and formatted as currency, then A2 would return `"=A1"`. Sheets treats date and time values as decimal values. This lets you perform arithmetic on them in formulas. For more information on interpreting date and time values, see [About date & time values](https://developers.google.com/sheets/api/guides/formats#about_date_time_values).
       */
      responseValueRenderOption?: "FORMATTED_VALUE" | "UNFORMATTED_VALUE" | "FORMULA";
      /**
       * How the input data should be interpreted.
       *
       * Enumerated Values:
       * - INPUT_VALUE_OPTION_UNSPECIFIED: Default input value. This value must not be used.
       * - RAW: The values the user has entered will not be parsed and will be stored as-is.
       * - USER_ENTERED: The values will be parsed as if the user typed them into the UI. Numbers will stay as numbers, but strings may be converted to numbers, dates, etc. following the same rules that are applied when entering text into a cell via the Google Sheets UI.
       */
      valueInputOption?: "INPUT_VALUE_OPTION_UNSPECIFIED" | "RAW" | "USER_ENTERED";
    };
    /** The request JSON body */
    body: ValueRange;
  };
}

export interface GoogleSheetsAPIResponseMap {
  "sheets.spreadsheets.batchUpdate": BatchUpdateSpreadsheetResponse;
  "sheets.spreadsheets.create": Spreadsheet;
  "sheets.spreadsheets.developerMetadata.get": DeveloperMetadata;
  "sheets.spreadsheets.developerMetadata.search": SearchDeveloperMetadataResponse;
  "sheets.spreadsheets.get": Spreadsheet;
  "sheets.spreadsheets.getByDataFilter": Spreadsheet;
  "sheets.spreadsheets.sheets.copyTo": SheetProperties;
  "sheets.spreadsheets.values.append": AppendValuesResponse;
  "sheets.spreadsheets.values.batchClear": BatchClearValuesResponse;
  "sheets.spreadsheets.values.batchClearByDataFilter": BatchClearValuesByDataFilterResponse;
  "sheets.spreadsheets.values.batchGet": BatchGetValuesResponse;
  "sheets.spreadsheets.values.batchGetByDataFilter": BatchGetValuesByDataFilterResponse;
  "sheets.spreadsheets.values.batchUpdate": BatchUpdateValuesResponse;
  "sheets.spreadsheets.values.batchUpdateByDataFilter": BatchUpdateValuesByDataFilterResponse;
  "sheets.spreadsheets.values.clear": ClearValuesResponse;
  "sheets.spreadsheets.values.get": ValueRange;
  "sheets.spreadsheets.values.update": UpdateValuesResponse;
}

export type GoogleSheetsAPIRequest<K extends GoogleSheetsAPIMethods> = GoogleSheetsAPIRequestMap[K];

export type GoogleSheetsAPIResponse<K extends GoogleSheetsAPIMethods> = GoogleSheetsAPIResponseMap[K];
