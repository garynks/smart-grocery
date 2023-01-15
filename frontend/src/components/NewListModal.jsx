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
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

export default function NewListModal(props) {
    const handleInputChange = (e) => setInput(e.target.value);
    const [input, setInput] = React.useState("");

    function createList() {
        fetch("/lists/", {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "listName": input
            })
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
            <ModalHeader>Name of List</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    type="text"
                    placeholder="Input the name of your list!"
                    value={input}
                    onChange={handleInputChange}
                />
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="purple" mr={3} onClick={() => {createList(); props.onClose()}}>Create List</Button>
                <Button variant="ghost" onClick={props.onClose}>
                Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
}
