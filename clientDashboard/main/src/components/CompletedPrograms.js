// src/components/CompletedPrograms.js

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CompletedPrograms = () => {
  const completedPrograms = [
    {
      name: 'Village Clean Water Supply',
      companies: ['Reliance', 'Walmart'],
    },
    {
      name: 'Urban Sanitation Upgrade',
      companies: ['HDFC', 'Company I', 'Company J'],
    },
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Completed Programs
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {completedPrograms.map((program, index) => (
          <Card key={index} style={{ width: '300px' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {program.name}
              </Typography>
              <Typography variant="h6">Companies Donated:</Typography>
              <ul>
                {program.companies.map((company, i) => (
                  <li key={i}>{company}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompletedPrograms;
