// src/components/RunningProjects.js

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const RunningProjects = () => {
  const projects = [
    {
      name: 'Clean Water Initiative',
      completedPercentage: 75,
      spentAmount: 75000,
      remainingBudget: 25000,
      companies: [
        { name: 'Nvdia', contribution: 30000 },
        { name: 'TCS', contribution: 25000 },
        { name: 'Google', contribution: 20000 },
      ],
    },
    {
      name: 'Sanitation Improvement Program',
      completedPercentage: 50,
      spentAmount: 40000,
      remainingBudget: 40000,
      companies: [
        { name: 'Intel', contribution: 20000 },
        { name: 'JP Morgan Chase', contribution: 20000 },
        { name: 'Zudio', contribution: 20000 },
      ],
    },
  ];

  const getChartData = (project) => {
    const companyContributions = project.companies.map(c => c.contribution);
    const remaining = project.remainingBudget;
    const data = [...companyContributions, remaining];
    const total = project.spentAmount + remaining;
    
    const backgroundColors = [
      '#4CAF50', // Base green
      '#66BB6A', // Lighter shade
      '#81C784', // Even lighter shade
      '#F44336', // Red for remaining
    ];

    return {
      labels: [...project.companies.map(c => c.name), 'Remaining'],
      datasets: [
        {
          data,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: backgroundColors.map(color => color),
          borderWidth: 0,
        },
      ],
    };
  };

  const chartOptions = {
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: $.${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Running Projects
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {projects.map((project, index) => (
          <Card key={index} style={{ width: '300px' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {project.name}
              </Typography>
              <Doughnut data={getChartData(project)} options={chartOptions} />
              <Typography variant="body2">
                Spent Amount: ${project.spentAmount.toLocaleString()}
              </Typography>
              <Typography variant="body2">
                Remaining Budget: ${project.remainingBudget.toLocaleString()}
              </Typography>
              <Typography variant="body2">
                Completion: {project.completedPercentage}%
              </Typography>
              <Typography variant="h6">Companies Donated:</Typography>
              <ul>
                {project.companies.map((company, i) => (
                  <li key={i}>{company.name} - ${company.contribution.toLocaleString()}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RunningProjects;
