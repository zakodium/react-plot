import { Meta } from '@storybook/react';

import { Axis, Legend, LegendProps, LineSeries, Plot } from '../../src';

export default {
  title: 'API/Legend',
  component: Legend,
  argTypes: {
    position: {
      defaultValue: 'embedded',
    },
  },
} as Meta;

const data1 = [
  {
    x: 0,
    y: 10,
  },
  {
    x: 1,
    y: 12,
  },
  {
    x: 2,
    y: 14,
  },
  {
    x: 3,
    y: 16,
  },
  {
    x: 4,
    y: 18,
  },
];

const data2 = [
  {
    x: 0,
    y: 20,
  },
  {
    x: 1,
    y: 22,
  },
  {
    x: 2,
    y: 24,
  },
  {
    x: 3,
    y: 26,
  },
  {
    x: 4,
    y: 28,
  },
];

export function HeadingControl(props: LegendProps) {
  return (
    <Plot
      width={900}
      height={540}
      seriesViewportStyle={{ stroke: 'black' }}
      margin={{
        bottom: 100,
        left: 100,
        top: 100,
        right: 200,
      }}
    >
      <Legend {...props} />
      <LineSeries data={data1} xAxis="x" yAxis="y" label="Label line series" />
      <Axis id="x" position="bottom" label="X" />
      <Axis id="y" position="left" label="Y" />
    </Plot>
  );
}

export function HeaderTest() {
  return (
    <Plot
      width={900}
      height={540}
      seriesViewportStyle={{ stroke: 'black' }}
      margin={{
        bottom: 100,
        left: 100,
        top: 100,
        right: 200,
      }}
    >
      <Legend position="embedded" />

      <LineSeries data={data1} xAxis="x" yAxis="y" label="Label line series" />

      <LineSeries
        data={data2}
        markerStyle={{ fill: 'green' }}
        lineStyle={{ stroke: 'blue' }}
        markerShape="square"
        displayMarker
        xAxis="x"
        yAxis="y"
        label="Label line series 2"
      />

      <Axis id="x" position="bottom" label="X" />
      <Axis id="y" position="left" label="Y" />
    </Plot>
  );
}
