import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkOut, addToCart } from "../redux/slice";
import { useNavigate } from "react-router-dom";

function Cart() {
    const cart = useSelector((state) => state.products.cart);
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleAddQuantity = (itemId) => {
        const item = cart.find((product) => product.id === itemId);
        const product = products.find((p) => p.id === itemId);

        if (product && product.stock > item.quantity) {
            dispatch(addToCart({ id: itemId, quantity: 1 }));
        } else {
            alert("Stock tidak mencukupi untuk menambah quantity");
        }
    };

    const handleReduceQuantity = (itemId) => {
        const item = cart.find((product) => product.id === itemId);

        if (item.quantity > 1) {
            dispatch(addToCart({ id: itemId, quantity: -1 })); // Decrease quantity by 1
        } else {
            alert("Quantity tidak bisa dikurangi lebih lanjut. Anda dapat menghapus item jika diinginkan.");
        }
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items before checking out.");
            return;
        }
        dispatch(checkOut());
        alert("Checkout Berhasil !");
        navigate("/");
    };

    return (
        <div>
            <h1 className="text-center text-2xl font-bold my-4">Cart</h1>
            {cart.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
            ) : (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                        {cart.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                                <div>
                                    <img src={item.image} alt={item.title} className="h-40" />
                                </div>
                                <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                                <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => handleReduceQuantity(item.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        -
                                    </button>
                                    <button
                                        onClick={() => handleAddQuantity(item.id)}
                                        className="bg-green-500 text-white px-3 py-1 rounded"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-4">
                        <h2 className="text-xl font-semibold">Total Price: ${totalPrice.toFixed(2)}</h2>
                        <button
                            onClick={handleCheckout}
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
