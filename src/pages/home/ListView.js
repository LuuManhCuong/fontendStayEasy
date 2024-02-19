import Category from "../../components/category/Category";
import Row from "../../components/row/Row";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProperty } from "../../redux/actions/PropertyAction";


function ListView() {
    const { list } = useSelector(state => state.propertyReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        const action = getProperty();
        dispatch(action);
    }, []);

    return (
      <div className="main">
        <Category />
        <Row property={list} />
      </div>
    );
}

export default ListView;