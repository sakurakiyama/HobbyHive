import React, { useState, useEffect } from 'react';
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function StepSix({ nextStep, previousStep, setInterests }) {
  const theme = useTheme();

  const [hobbies, setHobbies] = useState([]);
  const [valid, setValid] = useState('');
  const [allInterests, setAllInterests] = useState(null);

  // Populate the interests from the database
  useEffect(() => {
    const getAllInterests = async () => {
      const { data } = await axios.get('/interests/getInterests');
      setAllInterests(data);
    };
    getAllInterests();
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value.
    const parsedValue = typeof value === 'string' ? value.split(',') : value;
    setHobbies(parsedValue);
    setValid('valid');
  };

  const handleFormSubmit = () => {
    if (!hobbies.length) {
      setValid('invalid');
      return;
    }
    setInterests(hobbies);
    nextStep();
  };

  return (
    <div className='stepContainer flex flex-col items-center'>
      <h1 className='my-5'>
        Select some hobbies! You can change this later on.
      </h1>
      <p className='mb-4 text-red-500'>
        {valid === 'invalid' ? 'Please select at least one hobby.' : ''}
      </p>

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
          {allInterests &&
            allInterests.map((element) => (
              <MenuItem
                key={element.interest}
                value={element.interest}
                style={getStyles(element, hobbies, theme)}
              >
                {element.interest}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <div className='flex flex-row justify-between w-full'>
        <button
          className='mt-5 animate-pulse px-5 py-2'
          onClick={() => {
            previousStep();
          }}
        >
          <BsArrowLeftCircleFill size={30} color={'#e8ac1f'} />
        </button>
        <button
          className='mt-5 animate-pulse px-5 py-2'
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
