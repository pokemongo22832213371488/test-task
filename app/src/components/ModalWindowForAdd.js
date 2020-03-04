import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

export default class ModalWindowForAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: "",
            age: "",
            phone: ""
        };
    }

    handleClose = () => {
        this.setState({
            show: false,
            name: "",
            age: "",
            phone: ""
        });
    }

    saveChanges = () => {
        this.props.act(this.state.name, this.state.age, this.state.phone);
        this.handleClose();
    }

    handleShow = () => {
        this.setState({
            show: true
        });
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Add employee
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Name, age, phone</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl name="name" onChange={this.handleChange}/>
                        <FormControl name="age" onChange={this.handleChange}/>
                        <FormControl name="phone" onChange={this.handleChange}/>
                    </InputGroup></Modal.Body>
                    <Modal.Footer >
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.saveChanges}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
