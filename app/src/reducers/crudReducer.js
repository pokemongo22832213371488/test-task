const initialState = {
    employee: []
}

export function crudReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_EMPLOYEE_SUCCESS':
            return { ...state, employee: action.payload }
        case 'REMOVE_DATA':
            return {...state, employee: []}
        default:
            return state
    }
}