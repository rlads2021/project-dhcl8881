import React from 'react';
import { useTheme, Typography } from '@material-ui/core';
import { CartesianGrid ,BarChart, Bar, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function Chart({ input, chartData }) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        不同地標評論重點詞分析 - "{input}"
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
          <YAxis type='category' dataKey="word" stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Words in Tfidf ordered
            </Label>
          </YAxis>
          <Bar fill="#ffc658" dataKey="tf_idf" stroke={theme.palette.primary.main}/>
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}