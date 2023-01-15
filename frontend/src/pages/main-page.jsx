import { React, useState, useEffect } from 'react';
import { Box, Heading, IconButton, LinkBox, LinkOverlay, useDisclosure } from '@chakra-ui/react';
import { Card, CardHeader } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons';
import NewListModal from '../components/NewListModal';

export default function MainPage() {
  const [lists, setLists] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();      // for modal, to determin closing/opening logic

  useEffect(() => {
    // fetches the lists from the backend
    fetch(`/lists/`)
      .then(res => res.json())
      .then(data => {
        setLists(data);
        console.log(data);
      })
      .catch(err => {
        console.log(err.error);
      })
  }, [isOpen])

  return (
    <>
        <Box display='flex' gap={3} className='lists-header'>
          <Heading pb={5} size='lg'>Lists</Heading>
          <IconButton onClick={onOpen} icon={<AddIcon />} isRound={true} className='add-list-btn'>+</IconButton>
          <NewListModal isOpen={isOpen} onClose={onClose} />
        </Box>
        <Box display='flex' flexWrap='wrap' gap={5} className='lists-container'>
          {lists.map((list, index) => {
            return (
              <LinkBox>
                <LinkOverlay href={`/lists/${list.listName}`} >
                  <Card key={index} className='list-card' w='300px' h='300px' bgGradient="linear(to-tr, purple.500, purple.400)" boxShadow='lg'>
                    <CardHeader p={3} className='list-card-header'>
                      <Heading size='md'>{list.listName}</Heading>
                    </CardHeader>
                  </Card>
                </LinkOverlay>
              </LinkBox>
            )
          }
          )}
        </Box>
    </>

  )
}
