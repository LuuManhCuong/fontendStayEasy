// reducers/hobby.js
const initialState = {
    list: [],
    detail: {},
    imageDetail: [],
}
const propertyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET': {
            return {
                ...state,
                list: action.payload,
            }
        }
        case 'GET_BY_ID': {
            return {
                ...state,
                detail: action.payload,
            }
        }
        default:
            return state;
    }
};
export default propertyReducer;