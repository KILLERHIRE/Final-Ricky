import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login.jsx";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const keys = Object.keys(localStorage);
        setIsLoggedIn(keys.length > 0);
    }, []);


    return (
        <div>
            <div className="flex bg-slate-600 h-12 mb-1 items-center justify-evenly sticky top-0">
                <div>
                    <h1 className="text-white weight-bold">COCOSHOP</h1>
                </div>
                <div>
                    <nav style={{ display: 'flex', gap: '16px', }}>
                        <Link to={`/`} className="text-white">Home</Link>
                        {isLoggedIn ? (
                            <Link to={`/cart`} className="text-white">Cart</Link>
                        ) : undefined}
                    </nav>

                </div>
                <Login />
            </div>
            <Outlet />
        </div>
    )
}
