import React, { useState } from 'react';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const interests = [
  'Biking',
  'Camping',
  'Coding',
  'Playing Dice',
  'Farming',
  'Fashion',
  'Film',
  'Gaming',
  'Gardening',
  'Hiking',
  'Magic',
  'Math',
  'Motorcycling',
  'Music',
  'Painting',
  'Photography',
  'Racing',
  'Sailing',
  'Singing',
  'Skateboarding',
  'Spray Painting',
  'Traveling',
  'Unicycling',
  'Videography',
  'Walking',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function StepSix({ nextStep, setInterests }) {
  const theme = useTheme();

  const [hobbies, setHobbies] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value.
    const parsedValue = typeof value === 'string' ? value.split(',') : value;
    console.log(parsedValue);
    setHobbies(parsedValue);
  };

  const handleFormSubmit = () => {
    setInterests(hobbies);
    nextStep();
  };

  return (
    <div className='stepContainer flex flex-col items-center'>
      <h1 className='my-5'>Select some hobbies! You can change this later on.</h1>

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='demo-multiple-chip-label'>Hobbies</InputLabel>
        <Select
          key={hobbies.join(',')}
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={hobbies}
          onChange={handleChange}
          input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {interests.map((interest) => (
            <MenuItem
              key={interest}
              value={interest}
              style={getStyles(interest, hobbies, theme)}
            >
              {interest}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className='flex flex-col items-center'>
        <button
          className='mt-5 animate-pulse px-5 py-2 '
          onClick={() => {
            handleFormSubmit();
          }}
        >
          <BsArrowRightCircleFill size={30} color={'#e8ac1f'} />
        </button>
      </div>
    </div>
  );
}

export default StepSix;
