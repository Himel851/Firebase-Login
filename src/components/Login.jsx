import React, { useState } from 'react'
import firebaseConfig from '../firebaseConfiq';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [err, setErr] = useState("");

    const handleSubmit = () => {
        if (!email && !password) {
            setErr("Fill the all details!");
        } else if (!email) {
            setErr("Enter your email!");
        } else if (!password) {
            setErr("Enter your password!");
        } else if (password.length < 7) {
            setErr("Password need minimum 8 character!");
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    setErr("");
                    navigate("/");
                })
                .catch((error) => {
                    console.log(error.code);
                    if (error.code === "auth/wrong-password") {
                        setErr("Wrong password!");
                    } else if (error.code === "auth/user-not-found") {
                        setErr("Wrong email!");
                    } else {
                        setErr("");
                    }
                });
        }

    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            navigate("/");
        }
    });

    return (
        <div id="singup">
            <div className="singup">
                <h2>Login your account!</h2>
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
                <p>{err}</p>
                <button onClick={handleSubmit}>Signin</button>
                <Link to="/signup">You have don't account? Signup</Link>
            </div>
        </div>
    )
}

export default Login