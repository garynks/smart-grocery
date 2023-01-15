import { useEffect, useState } from 'react';
import './App.css';
import { Heading, Button, useColorMode, Box, LinkOverlay, LinkBox } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div className="App">
      <Box className='header' display='flex' alignItems='center' justifyContent="space-between" bgGradient="linear(to-tr, purple.500, purple.400)" p={5}>
        <LinkBox>
          <LinkOverlay href='/'>
            <Heading className='logo'>smartGrocery</Heading>
          </LinkOverlay>
        </LinkBox>
        <Button className='mode-toggle-btn' onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
      </Box>
      <Box p={10} className='main-container'>
        <Outlet />
      </Box>
    </div>
  );
}

export default App;
