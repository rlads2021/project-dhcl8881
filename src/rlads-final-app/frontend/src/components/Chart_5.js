import React from 'react';
import { useTheme, Typography } from '@material-ui/core';
import { CartesianGrid ,BarChart, Bar, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function Chart({ input, chartData }) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        不同評分的評論重點詞分析 - "Rating {input}"
      </Typography>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 16,
            right: 16,
            bottom: 12,
            left: 24,
          }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="4 4" />
          <Tooltip />
          <XAxis type='number' stroke={theme.palette.text.secondary} >
            <Label value="Frequency" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis type='category' dataKey="word" stroke={theme.palette.text.secondary}>
            {/* <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Words in Tfidf ordered
            </Label> */}
          </YAxis>
          <Bar fill="#82ca9d" dataKey="n" stroke={theme.palette.primary.main}/>
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}