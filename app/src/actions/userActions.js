import { REMOVE_DATA } from "./crudActions"

export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const SIGNUP_FAIL = 'SIGNUP_FAIL'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export function checkToken() {
    return (dispatch) => {
        const tokenObj = localStorage.getItem('token');
        if (tokenObj) {
            fetch("http://localhost:3001/user/me", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': tokenObj
                }
            })
                .then(res =>
                    res.json()
                )
                .then(content => {
                    if (content.message) throw new Error(content.message);
                    dispatch({
                        type: LOGIN_SUCCESS,
                    });
                })
                .catch(err => {
                    localStorage.removeItem('token');
                    dispatch({
                        type: LOGIN_FAIL
                    })
                    alert(err);
                })
        }
        else
            dispatch({
                type: LOGIN_FAIL
            });
    }
}

export function login(email, password) {
    return dispatch => {
        fetch('http://localhost:3001/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
            .then(res =>
                res.json()
            )
            .then(content => {
                if (content.message) throw new Error(content.message);
                localStorage.setItem('token', content.token);
                dispatch({
                    type: LOGIN_SUCCESS
                })
            })
            .catch(err => {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: err
                })
                alert(err);
            });
    }
}

export function signup(email, password) {
    return dispatch => {
        fetch('http://localhost:3001/user/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
            .then(res =>
                res.json()
            )
            .then(content => {
                if (content.message) throw new Error(content.message);
                localStorage.setItem('token', content.token);
                dispatch({
                    type: SIGNUP_SUCCESS,
                })
                dispatch({
                    type: LOGIN_SUCCESS,
                })
            })
            .catch(err => {
                dispatch({
                    type: SIGNUP_FAIL,
                    payload: err
                });
                alert(err);
            });
    }
}

export function logout() {
    return dispatch => {
        localStorage.removeItem("token");
        dispatch({
            type: LOGOUT_SUCCESS
        });
        dispatch({
            type: REMOVE_DATA
        })
    };
}
