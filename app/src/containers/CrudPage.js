import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import ModalWindowForAdd from '../components/ModalWindowForAdd'

import { connect } from "react-redux";
import { getEmployee, updateEmployee, deleteEmployee, addEmployee} from "../actions/crudActions"


class CrudPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemClicked: false,
            item: {}          
        }
        this.name = React.createRef();
        this.age = React.createRef();
        this.phone = React.createRef();
    }

    componentDidMount() {
        this.props.getEmployeeAction();
    }

    tryUpdate = item => {
        this.setState({
            item: item,
            itemClicked: true,
        })
    }



    renderRow = ({ _id, name, phone, age }) => {
        return (<tr key={_id} onClick={() => this.tryUpdate({ _id, name, phone, age })}>
            <td>{_id}</td>
            <td>{name}</td>
            <td>{age}</td>
            <td>{phone}</td>
        </tr>);
    }


    handleClose = () => {
        this.setState({
            itemClicked: false
        })
    }

    saveChanges = () => {
        this.props.updateEmployeeAction(this.state.item._id, this.name.current.value, this.age.current.value, this.phone.current.value);
        this.handleClose();
    }

    deleteRow = () => {
        this.props.deleteEmployeeAction(this.state.item._id);
        this.handleClose();
    }

    render() {
        return (
            <>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.employee.map((empl) =>
                            this.renderRow(empl)
                        )}
                    </tbody>
                </Table>
                <ModalWindowForAdd act={this.props.addEmployeeAction} />
                <Modal show={this.state.itemClicked} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Name, age, phone</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl ref={this.name} defaultValue={this.state.item.name} />
                        <FormControl ref={this.age} defaultValue={this.state.item.age} />
                        <FormControl ref={this.phone} defaultValue={this.state.item.phone} />
                    </InputGroup></Modal.Body>
                    <Modal.Footer >
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                            </Button>
                        <Button variant="primary" onClick={this.saveChanges}>
                            Save Changes
                            </Button>
                        <Button variant="primary" onClick={this.deleteRow}>
                            Delete
                            </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = store => {
    return {
        employee: store.crud.employee,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getEmployeeAction: () => dispatch(getEmployee()),
        updateEmployeeAction: (id, name, age, phone) => dispatch(updateEmployee(id, name, age, phone)),
        deleteEmployeeAction: (id) => dispatch(deleteEmployee(id)),
        addEmployeeAction: (name, age, phone) => dispatch(addEmployee(name, age, phone)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CrudPage)