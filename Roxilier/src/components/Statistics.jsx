import React, { useEffect, useState } from 'react'
import { Box, InputLabel, MenuItem, FormControl, Select, TextField, Pagination, Stack } from '@mui/material';

export default function Statistics() {


  const [month, setMonth] = useState(3);
  const [response, setResponse] = useState([]);
  const handleChange = (event) => {
   
    setMonth(event.target.value);
  };
  
  const months = {
    '1':'january',
    '2':'Febrauary',
    '3':'March',
    '4':'April',
    '5':'May',
    '6':'June',
    '7':'July',
    '8':'August',
    '9':'september',
    '10':'October',
  }
  

    const fetchData1 = async () => {
        
        try {
            const res = await fetch(`http://localhost:3000/statistics?month=${month}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            })


            const result1 = await res.json();
            setResponse(result1);
            
            

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData1()
    }, [month])
    return (
        <div>
            <div style={{ display: 'flex' }}>
                
                <Box sx={{ minWidth: 120 ,margin: '20px'}}>
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
                        <InputLabel id="demo-simple-select-label">Select Month</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={month}
                            label="Select Month"
                            onChange={handleChange}
                            sx={{ color: 'white', '.MuiSvgIcon-root ': { fill: 'white' } }}
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
            </div>

            <div style={{display:'flex',border:'1px solid black',flexDirection:'column',width:'fit-content',padding:'40px',alignItems:'flex-start',background:'#9abaf3',color:'black',borderRadius:'20px'}}>
            <h3>Statistics for {months[month]} Month</h3>
            <p>Total Not Sold Items: {response.totalNotSoldItems}</p>
            <p>Total Sale Amount: {response.totalSaleAmount}</p>
            <p>Told Sold Items: {response.totalSoldItems}</p>
            </div>
        </div>
    )
}
