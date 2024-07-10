import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Items',
        data: [],
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
      },
    ],
  });
  const [month, setMonth] = useState(10); // Default month

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/bar-chart?month=${month}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await res.json();
     
      
      setChartData({
        labels: result.labels,
        datasets: [
          {
            label: 'Number of Items',
            data: result.counts,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [month]);

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <div >
      <Box sx={{ minWidth: '120px', marginBottom: 2,margin: '20px',width:'100px' }}>
        <FormControl fullWidth 
        sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiSelect-icon': { color: 'white' }
          }}>
          <InputLabel id="month-select-label">Select Month</InputLabel>
          <Select
            labelId="month-select-label"
            id="month-select"
            value={month}
            label="Select Month"
            onChange={handleMonthChange}
            sx={{ color: 'white', '.MuiSvgIcon-root ': { fill: "white" } }}
          >
            <MenuItem value={1}>January</MenuItem>
            <MenuItem value={2}>February</MenuItem>
            <MenuItem value={3}>March</MenuItem>
            <MenuItem value={4}>April</MenuItem>
            <MenuItem value={5}>May</MenuItem>
            <MenuItem value={6}>June</MenuItem>
            <MenuItem value={7}>July</MenuItem>
            <MenuItem value={8}>August</MenuItem>
            <MenuItem value={9}>September</MenuItem>
            <MenuItem value={10}>October</MenuItem>
            <MenuItem value={11}>November</MenuItem>
            <MenuItem value={12}>December</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Bar
       
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'right',
            },
            title: {
              display: true,
              text: 'Items per Price Range',
            },
          },
        }}
        
        width={'500 !important'}
        
      />
    </div>
  );
};

export default BarChart;
