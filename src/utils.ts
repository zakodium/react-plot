import React, { CSSProperties } from 'react';

import Axis from './components/Axis';
import Heading from './components/Heading';
import Legend from './components/Legend';
import LineSeries from './components/LineSeries';
import ScatterSeries from './components/ScatterSeries';
import type { AxisContextType, CSSFuncProps, PlotChildren } from './types';

import { Annotation } from '.';

let currentValue = 1;

/**
 * Creates autoincremental values, generally for series
 */
export function getNextId() {
  return ++currentValue;
}

/**
 * Validates that all the items inside Plot are supported and organizes by kind
 */
export function splitChildren(children: React.ReactNode): PlotChildren {
  let hasInvalidChild = false;
  let series = [];
  let axes = [];
  let heading = null;
  let legend = null;
  let annotations = [];
  for (let child of React.Children.toArray(children)) {
    // Base child validation
    if (typeof child !== 'object' || !React.isValidElement(child)) {
      hasInvalidChild = true;
    }

    // Classifies the expected components
    else if (child.type === LineSeries || child.type === ScatterSeries) {
      series.push(child);
    } else if (child.type === Axis) {
      axes.push(child);
    } else if (child.type === Heading) {
      heading = child;
    } else if (child.type === Legend) {
      legend = child;
    } else if (child.type === Annotation.Annotations) {
      annotations.push(child);
    }

    // Default case
    else {
      hasInvalidChild = true;
    }
  }
  return { hasInvalidChild, series, axes, heading, legend, annotations };
}

const horizontal = ['top', 'bottom'];
const vertical = ['left', 'right'];
/**
 * Validates that two positions are not orthogonal between them
 */
export function validatePosition(
  currPosition: string,
  position: string,
  id: string,
) {
  const error =
    (horizontal.includes(currPosition) && !horizontal.includes(position)) ||
    (vertical.includes(currPosition) && !vertical.includes(position));
  if (error) {
    throw new Error(`The positions are ortogonal for ${id}`);
  }
}

/**
 * Validates that two axes are orthogonal between them
 */
export function validateAxis(
  axisContext: Record<string, AxisContextType>,
  xKey: string,
  yKey: string,
) {
  const xAxis = axisContext[xKey];
  const yAxis = axisContext[yKey];
  if (!xAxis || !yAxis) return [undefined, undefined];

  if (
    horizontal.includes(xAxis.position)
      ? !vertical.includes(yAxis.position)
      : vertical.includes(xAxis.position)
  ) {
    if (
      vertical.includes(xAxis.position) ||
      horizontal.includes(yAxis.position)
    ) {
      throw new Error(
        `The axis ${xKey} should be ${horizontal.join(
          ' ',
        )} and ${yKey} should be ${vertical.join(' ')}`,
      );
    }

    throw new Error(`The axis ${xKey} and ${yKey} are not orthogonal`);
  }
  return [xAxis.scale, yAxis.scale];
}

/**
 * Checks the style added to a component and if is a function, gets the resulting value
 */
export function functionalStyle<T>(
  defaultStyle: CSSProperties,
  elementStyle: CSSFuncProps<T>,
  point: T,
  index: number,
  data: T[],
): CSSProperties {
  let style: CSSProperties = { ...defaultStyle };
  for (const key in elementStyle) {
    if (typeof elementStyle[key] === 'function') {
      style[key] = elementStyle[key](point, index, data);
    } else {
      style[key] = elementStyle[key];
    }
  }
  return style;
}

/**
 * Calculate Ticks number to display
 */
export function calculateTicksNumber(
  plotWidth: number,
  scientific: boolean,
  domaine: number[] | undefined,
): number {
  const fontSizeDefault = 16;
  const scientificTickLength = 7;
  let tickLength = domaine ? `${Math.trunc(domaine[1])}`.length : 1;
  // if domaine too small => tickLength+2 for decimal values
  tickLength =
    domaine && Math.abs(domaine[1] - domaine[0]) < plotWidth * 0.05
      ? tickLength + 2
      : tickLength;

  const ticksNumber = scientific
    ? plotWidth / (scientificTickLength * fontSizeDefault)
    : plotWidth / (tickLength * fontSizeDefault);

  return ticksNumber;
}
