// src/components/common/Charts/LearningHoursChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', hours: 1 },
  { name: 'Tue', hours: 2 },
  { name: 'Wed', hours: 3 },
  { name: 'Thu', hours: 4 },
  { name: 'Fri', hours: 5 },
  { name: 'Sat', hours: 6 },
  { name: 'Sun', hours: 7 },
];

function LearningHoursChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="hours" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LearningHoursChart;