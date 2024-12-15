import React, { useEffect } from "react";
import Header from "../component/Header";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slice";

function Dashboard() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, []);
    return (
        <>
            <Header />
        </>
    );
}

export default Dashboard;