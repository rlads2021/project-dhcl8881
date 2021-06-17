import React from 'react';
import { useTheme, Typography } from '@material-ui/core';
import { CartesianGrid ,BarChart, Bar, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function Chart({ input, chartData }) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        評論單詞正負評統計分析 - "{input.w} {input.t}"
      </Typography>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="4 4" />
          <Tooltip />
          <Legend />
          <XAxis type='number' stroke={theme.palette.text.secondary} />
          <Bar fill="#ffc658" dataKey="positive" stackId="a" stroke={theme.palette.primary.main}/>
          <Bar fill="#82ca9d" dataKey="negative" stackId="a" stroke={theme.palette.primary.main}/>
          <YAxis type='category' dataKey="name" stroke={theme.palette.text.secondary}>
            {/* <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Tf_idf
            </Label> */}
          </YAxis>
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}