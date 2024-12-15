import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, } from "@nextui-org/react";
import { MailIcon } from '../assets/MailIcon.jsx';
import { LockIcon } from '../assets/LockIcon.jsx';
import React, { useState, useEffect } from "react";

function Login() {

    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const keys = Object.keys(localStorage);
        setIsLoggedIn(keys.length > 0);
    }, []);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        setIsOpen(false);
        setError("");
    };

    const handleSignIn = async () => {
        if (!email || !password) {
            setError("Email and password cannot be empty.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Invalid email format.");
            return;
        }

        try {
            const response = await fetch("https://fakestoreapi.com/users");
            if (!response.ok) {
                throw new Error("Failed to fetch user data.");
            }
            //! email : john@gmail.com
            //! password : m38rmF$

            const users = await response.json();
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                alert("Login successful!");

                setIsLoggedIn(true);
                setEmail("");
                setPassword("");
                setError("");
                setIsOpen(false);
            } else {
                setError("Invalid email or password.");
            }
        } catch (error) {
            setError("An error occurred while logging in. Please try again later.");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        alert("You have logged out.");
    };

    return (
        <div>
            {isLoggedIn ? (
                <Button onPress={handleLogout}>LOGOUT</Button>
            ) : (
                <Button onPress={handleOpen}>LOGIN</Button>
            )}

            <Modal isOpen={isOpen} onOpenChange={setIsOpen} placement="top-center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                            <ModalBody>
                                {error && <p style={{ color: "red" }}>{error}</p>}
                                <Input
                                    autoFocus
                                    endContent={
                                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Email"
                                    placeholder="Enter your email"
                                    variant="bordered"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    endContent={
                                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                    variant="bordered"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={handleClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleSignIn}>
                                    Sign in
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Login;
