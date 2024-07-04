import React from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";
import { Spin, Table } from "antd";
import { useColorContext } from "@src/contexts/color-context";
import { blue, red, green, lime, cyan, purple, magenta } from "@ant-design/colors";
import { config } from "@src/config";
import { dataBarChart, seriesNamesBarChart } from "@src/mocks/bar-chart-mock";
import { dataColumns, dataSource } from "@src/mocks/table-chart-mock";
import { dataLineChart, seriesNamesLineChart } from "@src/mocks/line-chart-mock";

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
function getColor(i: any, mode: string = "light") {
  const colorPalettes = [blue, red, green, lime, cyan, purple, magenta];
  const selectedColorPalette = colorPalettes[i % colorPalettes.length];
  console.log("mode: ", mode);

  const selectedToneIndex = 4 + Math.floor(i / (colorPalettes.length - 4));
  return selectedColorPalette[selectedToneIndex];
}

const numberFormatter = (item: string) => item.toLocaleString();

const CartesianChart = ({ resultSet, children, ChartComponent }: any) => {
  return (
    <div className="p-4 h-full" style={{ height: config.RECHART_HEIGHT }}>
      <ResponsiveContainer width="100%" height="90%">
        <ChartComponent
          data={resultSet}
          margin={{
            top: 10,
            right: 40,
            left: 40,
            bottom: 0,
          }}
        >
          <XAxis axisLine={false} tickLine={false} dataKey="x" minTickGap={20} />
          <YAxis axisLine={false} tickLine={false} tickFormatter={numberFormatter} />
          <Tooltip formatter={numberFormatter} />
          <CartesianGrid />
          {children}
          <Legend />
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

const TypeToChartComponent: any = {
  line: ({ pivotConfig, mode }: any) => {
    return (
      <CartesianChart resultSet={dataLineChart} pivotConfig={pivotConfig} ChartComponent={LineChart}>
        {seriesNamesLineChart.map((series: any, i: number) => {
          return (
            <Line
              key={series.key}
              dataKey={series.key}
              name={series.title}
              stroke={getColor(i, mode)}
              strokeWidth={3}
            />
          );
        })}
      </CartesianChart>
    );
  },
  bar: ({ mode }: any) => (
    <CartesianChart resultSet={dataBarChart} ChartComponent={BarChart}>
      {seriesNamesBarChart.map((series: any, i: number) => {
        return <Bar key={series.key} stackId="a" dataKey={series.key} name={series.title} fill={getColor(i, mode)} />;
      })}
    </CartesianChart>
  ),
  table: () => {
    const countColumn = dataColumns.length;
    return (
      <div className="table-analytics">
        <Table
          size="small"
          dataSource={dataSource}
          columns={dataColumns}
          scroll={{ x: countColumn >= 6 ? 600 * countColumn : 1200, y: 280 }}
          pagination={false}
        />
      </div>
    );
  },
};
const TypeToMemoChartComponent = Object.keys(TypeToChartComponent)
  .map((key) => ({
    [key]: React.memo(TypeToChartComponent[key]),
  }))
  .reduce((a, b) => ({ ...a, ...b }));

const renderChart =
  (Component: any) =>
  ({ resultSet, isLoading, ...props }: any) => {
    if (isLoading)
      return (
        <div className="flex items-center justify-center w-full h-full">
          <Spin />
        </div>
      );

    return <Component resultSet={resultSet} {...props} />;
  };

type IProps = {
  vizState: any;
};

const ChartRenderer = ({ vizState }: IProps) => {
  const { mode } = useColorContext();
  const {
    // query,
    chartType,
    ...options
  } = vizState;
  const component = TypeToMemoChartComponent[chartType];
  return component && renderChart(component)({ ...options, mode });
};

export default ChartRenderer;
