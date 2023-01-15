import { React, useState, useEffect } from 'react';
import { Box, Heading, IconButton, LinkBox, LinkOverlay, useDisclosure } from '@chakra-ui/react';
import { Card, CardHeader } from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import NewListModal from '../components/NewListModal';

export default function MainPage() {
  const [lists, setLists] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();      // for modal, to determin closing/opening logic
  const [refresh, setRefresh] = useState(false);           // for refreshing the lists (recalls useEffect when state changes)

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
  }, [isOpen, refresh])

  const deleteList = (listName) => {
    console.log("yes")
    fetch(`/lists/${listName}`, {
      method: 'DELETE'
    })
    .then(res => {
      setRefresh(!refresh);
    })
    .catch(err => {
      console.error(err);
    })
  }

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
                  <Card key={index} className='list-card' w='300px' h='300px' bgGradient="linear(to-tr, purple.500, purple.400)" boxShadow='lg'>
                    <CardHeader display='flex' justifyContent='space-between' className='list-card-header'>
                      <LinkOverlay href={`/lists/${list.listName}`} >
                        <Heading maxW={200} overflowX='hidden' textOverflow='ellipsis' whiteSpace='nowrap' size='md'>{list.listName}</Heading>
                      </LinkOverlay>
                      <IconButton icon={<DeleteIcon />} onClick={() => deleteList(list.listName)} />
                    </CardHeader>
                  </Card>
              </LinkBox>
            )
          }
          )}
        </Box>
    </>

  )
}
