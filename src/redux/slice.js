// state => data

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

// mini ecommerce

// slice (action + reducer) => function-function untuk memanipulasi/mengubah data
// slice => setState => setData("name")
// menghandle berbagai macam operasi => sync dan async (middleware) => fetching API 

// fetch data dari API (list produk) => produknya => menambahkan stock (10) => async
// add to cart => belum mengurangi stock => sync
// checkout => mengurangi stock => sync
const initialState = {
    products: [],
    cart: [],
}

// reducer digunakan untuk sifat yg sync
// extra reducer => async => middleware
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        // action.payload => data yang dimasukkan ketika memanggil function => dispatch(addToCart({id: 1, name: "Sepatu"}))
        // action.payload => {id: 1, name: "Sepatu"}
        addToCart: (state, action) => {
            // informasi produk id dan quantity => {id: 1, quantity: 1}

            // kita harus mencari apakah produk tersebut sudah ada di cart atau belum
            let existingCart = state.cart.find(product => product.id === action.payload.id)

            // harus mengecek apakah stock >= quantity cart (ini ditambahkan kalian sendiri)

            if (existingCart) {
                existingCart.quantity += action.payload.quantity
                state.cart = state.cart.map(product => {
                    if (product.id === existingCart.id) {
                        return existingCart
                    }
                    return product
                })
            } else {
                const selectedProduct = state.products.find(product => product.id === action.payload.id)
                state.cart.push({
                    ...selectedProduct,
                    quantity: action.payload.quantity
                })
            }
        },

        checkOut: (state, action) => {
            // tidak perlu payload => menggunakan cart
            state.products = state.products.map(product => {
                const existingCart = state.cart.find(cart => cart.id === product.id)
                // pengecekan apakah stock >= quantity (kalian tambahkan sendiri)
                if (existingCart) {
                    product.stock -= existingCart.quantity
                }

                return product
            })

            state.cart = []
        },

        removeFromCart: (state, action) => {
            // Menghapus produk dari cart berdasarkan id
            state.cart = state.cart.filter(product => product.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            // action.payload => hasil return middleware
            state.products = action.payload.map((product) => {
                return {
                    ...product, // mengambil semua data dari product
                    stock: 10 // menambahkan properti stock
                }
            })
        })
    }
});

// asynchronous => promise => pending, fulfilled, rejected 
export const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
    const response = await axios.get("https://fakestoreapi.com/products")
    return response.data;
});

export const { addToCart, checkOut, removeFromCart } = productSlice.actions
export default productSlice.reducer
