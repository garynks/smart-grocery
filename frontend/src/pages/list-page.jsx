import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, IconButton, useDisclosure, Box, Text, LinkBox, LinkOverlay, Button } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import NewItemModal from '../components/NewItemModal';
import { Card, CardHeader, CardBody } from '@chakra-ui/react';

export default function ListPage() {
  const { listName } = useParams();
  const [items, setItems] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();      // for modal, to determin closing/opening logic
  const [refresh, setRefresh] = useState(false);           // for refreshing the items (recalls useEffect when state changes)
  const [itemToModify, setItemToModify] = useState(false);

  const deleteItem = (itemName) => {
    console.log("yes")
    fetch(`/lists/${listName}/${itemName}/`, {
      method: 'DELETE'
    })
    .then(res => {
      setRefresh(!refresh);
    })
    .catch(err => {
      console.error(err);
    })
  }

  const modifyItem = (item) => {
    setItemToModify(item);
    onOpen();
  }

  const clearList = () => {
    fetch(`/lists/${listName}/clear/`, {
      method: 'POST'
    })
    .then(res => {
      setRefresh(!refresh);
    })
    .catch(err => {
      console.error(err);
    })
  }

  useEffect(() => {
    if (!isOpen) {
      setItemToModify(false);
    }
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
  }, [isOpen, refresh])

  return (
    <>
      <Box display='flex' gap={3} className="list-page-container">
        <Heading maxW='50vw' lineHeight='2rem' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>{listName}</Heading>
        <IconButton onClick={onOpen} icon={<AddIcon />} isRound={true} className='add-list-btn'>+</IconButton>
        <Button onClick={clearList} isRound={true} className='add-list-btn'>Clear List</Button>
        <NewItemModal item={itemToModify} listName={listName} isOpen={isOpen} onClose={onClose} />
      </Box>
      <Box mt={5}>
        {items.map((item, index) => {
          return (
            <>
              <LinkBox>
                <Card mt={3} key={index} className='item-card'>
                  <CardHeader display='flex' justifyContent='space-between' p={3} className='list-card-header'>
                    <LinkOverlay onClick={() => modifyItem(item)}>
                      <Heading maxW='50vw' lineHeight={10} overflowX='hidden' textOverflow='ellipsis' whiteSpace='nowrap' size='lg'>{item.itemName}</Heading>
                    </LinkOverlay>
                    <IconButton icon={<DeleteIcon />} onClick={() => deleteItem(item.itemName)} />
                  </CardHeader>
                  <CardBody>
                    <Text fontWeight='medium'>Category: {item.category}</Text>
                    <Text>qt: {item.quantity}</Text>
                  </CardBody>
                </Card>
              </LinkBox>
            </>
            )
        })}
      </Box>
    </>
  )
}
