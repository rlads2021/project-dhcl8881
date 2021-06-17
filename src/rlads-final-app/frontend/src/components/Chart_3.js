import React from 'react';
import { useTheme, Typography } from '@material-ui/core';
import { CartesianGrid ,BarChart, Bar, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function Chart({ chartData }) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Google Map 整題評論重點詞分析
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
          <XAxis type='number' stroke={theme.palette.text.secondary}>
            <Label value="Frequency" offset={0} position="insideBottom" />
          </XAxis>
          <Bar fill="#0e0b46" dataKey="star_1" stackId="a" stroke={theme.palette.primary.main}/>
          <Bar fill="#231f72" dataKey="star_2" stackId="a" stroke={theme.palette.primary.main}/>
          <Bar fill="#403b96" dataKey="star_3" stackId="a" stroke={theme.palette.primary.main}/>
          <Bar fill="#605bb8" dataKey="star_4" stackId="a" stroke={theme.palette.primary.main}/>
          <Bar fill="#8884d8" dataKey="star_5" stackId="a" stroke={theme.palette.primary.main}/>
          <YAxis type='category' dataKey="word" stroke={theme.palette.text.secondary} />
          </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

