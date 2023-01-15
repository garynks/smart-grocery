import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Text
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'

export default function NewListModal(props) {
    const handleNameChange = (e) => setNewItem({...newItem, "itemName": e.target.value});
    const handleCategoryChange = (e) => setNewItem({...newItem, "category": e.target.value});
    const [newItem, setNewItem] = React.useState({
        "itemName": "",
        "quantity": 1,
        "category": "",
    });

    function createList() {
        console.log(newItem)
        fetch(`/lists/${props.listName}/`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(newItem)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <>
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Add A New Item</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text ml={2} mb={3} fontWeight="thin" >Add a new item to the list '{props.listName}'</Text>
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        placeholder="Input the name of your item!"
                        onChange={handleNameChange}
                    />
                </FormControl>

                <FormLabel mt={2}>Quantity</FormLabel>

                <NumberInput onChange={(e) => setNewItem({...newItem, "quantity": e})} defaultValue={1} min={1} max={1000}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>

                <FormControl mt={3} isRequired>
                    <FormLabel>Category</FormLabel>
                    <Input
                        type="text"
                        placeholder="Input the category of your item!"
                        onChange={handleCategoryChange}
                    />
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="purple" mr={3} onClick={() => {createList(); props.onClose()}}>Create Item</Button>
                <Button variant="ghost" onClick={props.onClose}>
                Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
}
