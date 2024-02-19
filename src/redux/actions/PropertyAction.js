import {propertyService} from '../../service/PropertyService';
export const getProperty = () => {
    return async (dispatch) => {
        try{
            const result = await propertyService.getProperty();
            dispatch({
              type:'GET',
              payload: result
            })
          } catch (errors){
            console.log("errors", errors)
          }
    } 
  }

export const getPropertyById = (id) => {
    return async (dispatch) => {
        try{
            const result = await propertyService.getPropertyById(id);
            dispatch({
              type:'GET_BY_ID',
              payload: result
            })
          } catch (errors){
            console.log("errors", errors)
          }
    } 
  }
