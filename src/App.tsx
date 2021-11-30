import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const [type, setType] = useState('A');

  const [showEA, setShowEA] = useState(true)

  const [showEB, setshowEB] = useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType((event.target as HTMLInputElement).value);
    setCount(0);
  };

  const handleChangeForCheck = (e:any) => {
    const {value, checked} = e.target;
    if(value === 'EA'){
      setShowEA(checked)
    }else{
      setshowEB(checked)
    }
  }

  const typeMap :any = {
    'A':{
      'colorMapA':{
        '0':[5],
        '1': [0,1,2,4,6,8,9,10],
        '2': [3,7,11,15,12,13,14,15]
      },
      'colorMapB':{
        '0':[10],
        '1': [5,6,7,9,11,13,14,15],
        '2': [0,1,2,3,4,8,12]
      }
    },
    'B': {
      'colorMapA':{
        '0':[6],
        '1': [1,2,3,5,7,9,10,11],
        '2': [0,4,8,12,13,14,15]
      },
      'colorMapB':{
        '0':[9],
        '1': [4,5,6,8,10,12,13,14],
        '2': [0,1,2,3,7,11,15]
      }
    },
    'C': {
      'colorMapA':{
        '0':[0],
        '1': [1,4,5],
        '2': [2,6,8,9,10],
        '3': [3,7,11,15,12,13,14],
      },
      'colorMapB':{
        '0':[15],
        '1': [10,11,14],
        '2': [5,6,7,9,13],
        '3': [0,1,2,3,4,8,12],
      }
    },
    'D': {
      'colorMapA':{
        '0':[3],
        '1': [2,6,7],
        '2': [1,5,9,10,11],
        '3': [0,4,8,12,13,14,15],
      },
      'colorMapB':{
        '0':[12],
        '1': [8,9,13],
        '2': [4,5,6,10,14],
        '3': [0,1,2,3,7,11,15],
      }
    },
  }

  let maxCount = ['A','B'].includes(type) ? 2 : 3

  let indexArray = (showEA ? typeMap[`${type}`].colorMapA[`${count}`] : []).concat(showEB ? typeMap[`${type}`].colorMapB[`${count}`] : []);

  const centerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

  const buttonStyle = {
    color: 'black', 
    border:1
  }
  return (
    <div>
      <div>
        <List>
        <ListItem>There are 4 Evil Earth pattern</ListItem>
        <ListItem>Black = explosion, white = safe</ListItem>
        <ListItem>Click 'Forward' will show the explosion pattern</ListItem>
        <ListItem>Checkbox allow to show individual explosion or both</ListItem>
        </List>
      </div>
      <FormControl component="fieldset" style={centerStyle}>
      <FormLabel sx={{color: 'black'}} >Type</FormLabel>
      <RadioGroup row name="row-radio-buttons-group"
      value={type}
      onChange={handleChange}>
        <FormControlLabel value="A" control={<Radio />} label="A" />
        <FormControlLabel value="B" control={<Radio />} label="B" />
        <FormControlLabel value="C" control={<Radio />} label="C" />
        <FormControlLabel value="D" control={<Radio />} label="D" />
      </RadioGroup>
    </FormControl>
    <FormGroup row={true}  style={centerStyle}>
    <Button sx={buttonStyle} onClick={() => (count < maxCount) && setCount(count + 1)}>forward</Button>
      <Button sx={buttonStyle} onClick={() => (count > 0) && setCount(count - 1)}>backward</Button>
      <Button sx={buttonStyle} onClick={() => setCount(0)}>reset</Button>
    </FormGroup>
    <div style={centerStyle}>
    <Box 
    sx={{
      height: 450,
      width: 450,
    }}>
    <Grid container spacing={0} columns={16}>
          {Array.from(Array(16)).map((_,index) => (
            <Grid key={index} item xs={4}>
              <Paper sx={{ display: 'block', height: 100, width: 100, backgroundColor: `${indexArray.includes(index) ? 'black' :'white'}` }}>
                <p>{index}</p>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked onChange={handleChangeForCheck} value='EA'/>} label="ExplosionA" />
      <FormControlLabel control={<Checkbox defaultChecked onChange={handleChangeForCheck} value='EB'/>} label="ExplosionB" />
    </FormGroup>
    </div>
    <div>Made by Ota Top (Crystal-Malboro)</div>
    </div>
  );
}

export default App;
