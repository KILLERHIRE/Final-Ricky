import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slice";
import { Link } from "react-router-dom";

const Card = () => {

    const products = useSelector(state => state.products.products);
    const dispatch = useDispatch();

    const handleAddToCart = (productId) => {
        const product = products.find(p => p.id === productId);

        if (product.stock > 0) {
            dispatch(addToCart({ id: productId, quantity: 1 }));

            product.stock -= 1;

            alert(`${product.title} has been added to your cart!`);
        } else if (product.stock <= 10) {
            alert("Out of stock!");
        }
    };

    return (
        <>
            <div className="card grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
                {products.map((product) => (
                    <div key={product.id}>
                        <div className="flex flex-col p-4 border border-gray-500 h-full rounded-2xl">
                            <div className="self-center">
                                <img src={product.image} alt={product.title} className="h-40" />
                            </div>
                            <span className="font-bold text-xl text-center">{product.title}</span>
                            <div className="text-justify">
                                <p className="bg-gray-950 text-cyan-50 w-28 text-center m-1 rounded-lg">{product.category}</p>
                                <p className="font-bold">Price : ${product.price}</p>
                                <p className="font-bold">Stock: {product.stock}</p>
                            </div>
                            <div className="mt-auto">
                                <Link to={`/detail/${product.id}`}>DETAIL</Link>

                                <button
                                    className="text-cyan-50 bg-gray-950 w-28 text-center m-1 rounded-lg"
                                    onClick={() => handleAddToCart(product.id)}
                                >
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Card;