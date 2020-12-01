import { Meta } from '@storybook/react';
import React from 'react';

import { Plot, Heading, Legend, LineSeries, XAxis, YAxis } from '../src/index';

export default {
  title: 'Example/Plot',
  component: Plot,
  argTypes: {
    width: {
      defaultValue: 550,
      control: 'number',
    },
    height: {
      defaultValue: 500,
      control: 'number',
    },
    displayPlot: {
      defaultValue: true,
      control: 'boolean',
    },
    showGridLines: {
      defaultValue: true,
      control: 'boolean',
    },
    headingPosition: {
      defaultValue: 'top',
      control: { type: 'select', options: ['top', 'bottom'] },
    },
    legendPosition: {
      defaultValue: 'right',
      control: { type: 'select', options: ['left', 'right'] },
    },
  },
} as Meta;

export function Control(props) {
  const {
    displayPlot,
    showGridLines,
    width,
    height,
    headingPosition,
    legendPosition,
  } = props;

  const bottom = headingPosition === 'top' ? 50 : 100;
  const left = legendPosition === 'right' ? 50 : 150;
  const top = headingPosition === 'top' ? 50 : 10;
  const right = legendPosition === 'right' ? 100 : 10;

  const format = (y: number) => Number.parseFloat(String(y / 1000)).toFixed(2);
  return (
    <Plot width={width} height={height} margin={{ bottom, left, top, right }}>
      <Heading
        title="Electrical characterization"
        subtitle="current vs voltage"
        position={headingPosition}
      />
      {displayPlot && (
        <LineSeries
          data={{ x: [0, 1, 2, 3, 4, 5], y: [0, 1, 2, 3, 3, 3] }}
          lineStyle={{ strokeWidth: 3 }}
          label="Vg = 7V"
          displayMarker={false}
        />
      )}
      <LineSeries
        data={{ x: [1, 2, 3, 4, 5, 6], y: [2, 4, 6, 6, 6, 6] }}
        displayMarker={true}
        markerShape="triangle"
        label="Vg = 3V"
      />
      <XAxis label="Drain voltage [V]" showGridLines={showGridLines} />
      <YAxis
        label="Drain current [mA]"
        showGridLines={showGridLines}
        labelFormat={format}
      />
      <Legend position={legendPosition} />
    </Plot>
  );
}
