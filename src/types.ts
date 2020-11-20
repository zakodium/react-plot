import type { AxisScale } from 'd3-axis';
import type { ScaleOrdinal } from 'd3-scale';
import { CSSProperties, ReactElement, ReactNode } from 'react';

// Component props helpers
export type Horizontal = 'left' | 'right';
export type Vertical = 'top' | 'bottom';
export type Margins = Record<Horizontal | Vertical, number | undefined>;

export interface Series {
  x: number[];
  y: number[];
}

// Component props

export interface PlotProps {
  width: number;
  height: number;
  colorScheme?: string[];
  margin?: Margins;
  children: ReactNode[];
}

export interface LineSeriesProps {
  data: Series;
  lineStyle?: CSSProperties;
  label?: string;
  displayMarker?: boolean;
}

export interface AxisProps {
  fontSize?: number;
  label?: string;
  showGridLines?: boolean;
}

export interface HeadingProps {
  title: string;
  titleStyle?: CSSProperties;
  titleClass?: string;
  subtitle?: string;
  subtitleStyle?: CSSProperties;
  subtitleClass?: string;
  position?: Vertical;
}

export interface LegendProps {
  position?: Horizontal;
}

// State related

export interface PlotState {
  id: string;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  label: string;
}

export interface PlotContextType {
  xScale?: AxisScale<number>;
  yScale?: AxisScale<number>;
  width?: number;
  height?: number;
  margin?: Margins;
  labels?: string[];
  colorScaler?: ScaleOrdinal<string, unknown, never>;
}

// Util functions

export type ReducerActions =
  | { type: 'newData'; value: PlotState }
  | { type: 'removeData'; value: { id: string } };

export interface PlotChildren {
  invalidChild: boolean;
  lineSeries: ReactElement<LineSeriesProps>[];
  axis: Record<'x' | 'y', ReactElement<AxisProps> | null>;
  heading: ReactElement<HeadingProps> | null;
  legend: ReactElement<LegendProps> | null;
}
