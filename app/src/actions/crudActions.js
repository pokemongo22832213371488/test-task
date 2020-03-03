export const ADD_EMPLOYEE_FAIL = 'ADD_EMPLOYEE_FAIL'
export const ADD_EMPLOYEE_SUCCESS = 'ADD_EMPLOYEE_SUCCESS'
export const DELETE_EMPLOYEE_FAIL = 'DELETE_EMPLOYEE_FAIL'
export const DELETE_EMPLOYEE_SUCCESS = 'DELETE_EMPLOYEE_SUCCESS'
export const UPDATE_EMPLOYEE_FAIL = 'UPDATE_EMPLOYEE_FAIL'
export const UPDATE_EMPLOYEE_SUCCESS = 'UPDATE_EMPLOYEE_SUCCESS'
export const GET_EMPLOYEE_FAIL = "GET_EMPLOYEE_FAIL";
export const GET_EMPLOYEE_SUCCESS = "GET_EMPLOYEE_SUCCESS";
export const REMOVE_DATA = "REMOVE_DATA"

export function getEmployee() {
    return dispatch => {
        const tokenObj = localStorage.getItem('token');
        fetch("http://localhost:3001/employees", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': tokenObj
            }
        })
            .then(res =>
                res.json())
            .then(content => {
                if (content.message) throw new Error(content.message);
                dispatch({
                    type: GET_EMPLOYEE_SUCCESS,
                    payload: content
                })
            })
            .catch(err => {
                dispatch({
                    type: GET_EMPLOYEE_FAIL,
                    payload: err
                });
                alert(err);
            });
    }
}

export function updateEmployee(_id, name, age, phone) {
    return dispatch => {
        const tokenObj = localStorage.getItem('token');
        fetch(`http://localhost:3001/employees`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': tokenObj
            },
            body: JSON.stringify({
                id: _id,
                name: name,
                age: age,
                phone: phone
            })
        })
        .then(res => res.json())
        .then(content =>{
            if (content.message) throw new Error(content.message);
            dispatch({
                type: UPDATE_EMPLOYEE_SUCCESS,
                payload: content
            })
            dispatch(getEmployee());
        })
        .catch(err =>{
            dispatch({
                type: UPDATE_EMPLOYEE_FAIL,
                payload: err
            });
            alert(err);
        })
    }
}

export function deleteEmployee(id) {
    return dispatch => {
        const tokenObj = localStorage.getItem('token');
        fetch(`http://localhost:3001/employees/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': tokenObj
            }
        })
            .then(res =>
                res.json())
            .then(content => {
                if (content.message) throw new Error(content.message);
                dispatch({
                    type: DELETE_EMPLOYEE_SUCCESS,
                });
                dispatch(getEmployee());
            })
            .catch(err => {
                dispatch({
                    type: DELETE_EMPLOYEE_FAIL,
                    payload: err
                });
                alert(err);
            });
    }
}

export function addEmployee(name, age, phone) {
    return dispatch => {
        const tokenObj = localStorage.getItem('token');
        fetch("http://localhost:3001/employees", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': tokenObj
            },
            body: JSON.stringify({
                name: name,
                age: age,
                phone: phone
            })
        })
            .then(res =>
                res.json())
            .then(content => {
                if (content.message) throw new Error(content.message);
                dispatch({
                    type: ADD_EMPLOYEE_SUCCESS,
                    payload: content
                });
                dispatch(getEmployee());
            })
            .catch(err => {
                dispatch({
                    type: ADD_EMPLOYEE_FAIL,
                    payload: err
                });
                alert(err);
            });
    }
}

export function removeData(){
    return dispatch => ({
        type: REMOVE_DATA,
        payload: []
    })
}