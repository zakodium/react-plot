import React, { useMemo } from 'react';

import { usePlotContext } from '../../hooks';
import type { AxisChildProps } from '../../types';

import { Ticks } from './Ticks';

export default function BottomAxis({
  id,
  displayGridLines,
  hidden = false,
  label,
  labelSpace,
  labelStyle,
  fontSize,
  tickStyle,
  hiddenTicks = false,
  tickEmbedded,
  tickLength,
}: AxisChildProps) {
  const {
    axisContext,
    plotWidth,
    top,
    bottom,
    left,
    height,
  } = usePlotContext();

  // Calculates the main axis values
  const { scale, scientific } = axisContext[id] || {};
  const ticks: number[] = useMemo(
    () => scale?.ticks(scientific ? plotWidth / 50 : undefined) || [],
    [scale, scientific, plotWidth],
  );
  const range = scale?.range() || [0, 0];

  // Create gridlines
  const gridlines = useMemo(() => {
    if (!displayGridLines || !scale) return null;
    return (
      <g className="gridLines">
        {ticks.map((val) => (
          <line
            key={val}
            x1={scale(val)}
            x2={scale(val)}
            y1={height - bottom}
            y2={top}
            stroke="black"
            strokeDasharray="2,2"
            strokeOpacity={0.5}
          />
        ))}
      </g>
    );
  }, [displayGridLines, ticks, top, scale, height, bottom]);

  const tickDirection = tickEmbedded ? -1 : 1;
  const tickLen = tickDirection * tickLength;
  return (
    <g className="axis">
      {gridlines}
      {!hidden && (
        <g className="ticks" transform={`translate(0, ${height - bottom})`}>
          <line x1={range[0]} x2={range[1]} stroke="black" />
          <Ticks
            scientific={scientific}
            scale={scale}
            show={!hiddenTicks}
            ticks={ticks}
            style={tickStyle}
            anchor="middle"
            getPositions={(val) => ({
              line: { x1: val, x2: val, y2: tickLen },
              text: { x1: val, y1: 16 },
            })}
          />
        </g>
      )}
      {label && !hidden && (
        <text
          x={plotWidth / 2 + left}
          y={height - bottom + labelSpace + fontSize}
          fontSize={fontSize}
          textAnchor="middle"
          style={labelStyle}
        >
          {label}
        </text>
      )}
    </g>
  );
}
