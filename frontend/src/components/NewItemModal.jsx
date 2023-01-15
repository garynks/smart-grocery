import React, { useEffect } from "react";
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
    console.log("item is", props.item ? 1 : 2);
    const [newItem, setNewItem] = React.useState(()=> props.item ? {
        "itemName": props.item.itemName,
        "quantity": props.item.quantity,
        "category": props.item.category
    } : {
        "itemName": "",
        "quantity": 1,
        "category": "",
    });
    console.log("newItem is", newItem);

    function createOrEditList() {
        fetch( props.item ? `/lists/${props.listName}/${props.item.itemName}/` : `/lists/${props.listName}/`, {
            method: props.item ? 'PUT' : 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(newItem)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        if (props.item) {
            setNewItem({
                "itemName": props.item.itemName,
                "quantity": props.item.quantity,
                "category": props.item.category
            })
        } else {
            setNewItem({
                "itemName": "",
                "quantity": 1,
                "category": "",
            })
        }
    }, [props.isOpen])

    return (
        <>
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{props.item ? "Edit Item" : "Add A New Item"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text ml={2} mb={3} fontWeight="thin" >{props.item ? `Edit item '${props.item.itemName}'` : `Add a new item to the list '${props.listName}'`}</Text>
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        placeholder="Input the name of your item!"
                        onChange={handleNameChange}
                        value={newItem.itemName}
                    />
                </FormControl>

                <FormLabel mt={2}>Quantity</FormLabel>

                <NumberInput onChange={(e) => setNewItem({...newItem, "quantity": e})} defaultValue={newItem.quantity} min={1} max={1000}>
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
                        value={newItem.category}
                    />
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="purple" mr={3} onClick={() => {createOrEditList(); props.onClose()}}>{props.item ? "Confirm" : "Create Item"}</Button>
                <Button variant="ghost" onClick={props.onClose}>
                Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
}
