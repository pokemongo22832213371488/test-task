import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

export default class ModalWindowForAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        this.name = React.createRef();
        this.age = React.createRef();
        this.phone = React.createRef();
    }

    handleClose = () => {
        this.setState({
            show: false
        });
    }

    saveChanges = () => {
        this.props.act(this.name.current.value, this.age.current.value, this.phone.current.value);
        this.handleClose();
    }

    handleShow = () => {
        this.setState({
            show: true
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
                        <FormControl ref={this.name} />
                        <FormControl ref={this.age} />
                        <FormControl ref={this.phone} />
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
