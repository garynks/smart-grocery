import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, IconButton, useDisclosure, Box } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import NewItemModal from '../components/NewItemModal';
import { Card, CardHeader, CardBody } from '@chakra-ui/react';

export default function ListPage() {
  const { listName } = useParams();
  const [items, setItems] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();      // for modal, to determin closing/opening logic

  useEffect(() => {
    // fetches the list from the backend
    fetch(`/lists/${listName}/`)
      .then(res => res.json())
      .then(data => {
        setItems(data.groceries);
        console.log(data);
      })
      .catch(err => {
        console.error(err);
      })
  }, [])

  return (
    <>
      <Box display='flex' gap={3} className="list-page-container">
        <Heading>{listName}</Heading>
        <IconButton onClick={onOpen} icon={<AddIcon />} isRound={true} className='add-list-btn'>+</IconButton>
        <NewItemModal listName={listName} isOpen={isOpen} onClose={onClose} />
      </Box>
      <Box mt={5}>
        {items.map((item, index) => {
          return (
            <Card key={index} className='item-card'>
                <CardHeader p={3} className='list-card-header'>
                  <Heading size='md'>{item.itemName}</Heading>
                </CardHeader>
                <CardBody>qt: {item.quantity}</CardBody>
            </Card>
            )
        })}
      </Box>
    </>
  )
}
