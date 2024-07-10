import { useEffect, useState } from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select, TextField, Pagination, Stack } from '@mui/material';

export default function Home() {
  const [month, setMonth] = useState(3);
  const [data, setData] = useState([]);
  const [page, setPage] = useState('1');
  const [search, setSearch] = useState('');
  const [count, setCount] = useState('');

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  useEffect(() => {
    fetchData();
  }, [page, search, month]);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/transactions?page=${page}&search=${search}&month=${month}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await res.json();
      setData(result.transactions);
      setCount(result.total / 10);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px' }}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
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
            '& .MuiOutlinedInput-root': {
              '& .MuiSvgIcon-root ': { fill: 'white' },
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={handleSearchChange}
            sx={{
              color: 'white',
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
              '& .MuiSvgIcon-root ': { fill: 'white' },
            }}
          />
        </Box>
        <Box sx={{ minWidth: '120px' }}>
          <FormControl
            fullWidth
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
            }}
          >
            <InputLabel id="demo-simple-select-label">Select Month</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={month}
              label="Select Month"
              onChange={handleChange}
              sx={{ color: 'white' }}
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
              <MenuItem value={''}>All</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <div className="container">
        <div className="table">
          <div className="table-header">
            <div className="header__item"><a id="id" className="filter__link" href="#">Id</a></div>
            <div className="header__item"><a id="image" className="filter__link" href="#">Image</a></div>
            <div className="header__item"><a id="title" className="filter__link" href="#">Title</a></div>
            <div className="header__item"><a id="category" className="filter__link" href="#">Category</a></div>
            <div className="header__item"><a id="price" className="filter__link" href="#">Price</a></div>
            <div className="header__item"><a id="sold" className="filter__link" href="#">Sold</a></div>
            <div className="header__item"><a id="dateOfSale" className="filter__link" href="#">Date Of Sale</a></div>
            <div className="header__item"><a id="description" className="filter__link" href="#">Description</a></div>
            
          </div>

          <div className="table-content">
            {data.length > 0 ? data.map((element, index) => (
              <div className="table-row" key={index}>
                
                <div className="table-data">{element.id}</div>
                <img className="table-data-img" src={element.image} alt={element.title} />
                <div className="table-data">{element.title}</div>
                <div className="table-data">{element.category}</div>
                <div className="table-data">${element.price.toFixed(2)}</div>
                <div className="table-data">{element.sold}</div>
                <div className="table-data">{element.dateOfSale}</div>
                <div className="table-data">{element.description.slice(0, 100)}...</div>
                
              </div>
            )) : <p>No data</p>}
          </div>
          <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center', margin: '20px' }}>
            <Pagination count={count} color="secondary" onChange={(event, value) => setPage(value)} />
          </Stack>
        </div>
      </div>
    </>
  );
}
