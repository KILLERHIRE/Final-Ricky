import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slice";

function Detail() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const product = useSelector(state =>
        state.products.products.find(product => product.id === parseInt(id))
    );

    if (!product) {
        return <h2>Product not found</h2>;
    }

    const handleAddToCart = () => {
        dispatch(addToCart({ id: product.id, quantity: 1 }));
        alert(`${product.title} has been added to the cart.`);
    };

    return (
        <div className="flex h-screen ">
            <div className="flex flex-col p-4 border border-gray-500 h-auto w-1/2 rounded-2xl m-auto">
                <div className="self-center" >
                    <img src={product.image} alt={product.title} className="h-40" />
                </div>
                <span className="font-bold text-xl text-center">{product.title}</span>
                <div className="text-justify">
                    <p className="bg-gray-950 text-cyan-50 w-28 text-center m-1 rounded-lg">{product.category}</p>
                    <p>{product.description}</p>
                    <p className="font-bold">Price : ${product.price}</p>
                </div>
                <button
                    onClick={handleAddToCart}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4 self-center"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default Detail;
