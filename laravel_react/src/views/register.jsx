import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function register() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();

    const Submit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        // console.log(payload);
        axiosClient.post("/register",payload).then(({data}) =>{
            setUser(data.user);
            setToken(data.token);
        })
        .catch(err => {
            const response = err.response;
            if(response && response.status == 400)
            {
                console.log(response.data.errors);
            }
        });
    }

    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">
                    Create a New Account
                </h1>
                <form onSubmit={Submit}>
                    <input ref={nameRef} type="text" placeholder="Name"/>
                    <input ref={emailRef} type="email" placeholder="E-mail"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <button className="btn btn-block">Register</button>
                    <p className="message">
                        Already Have an Account ? <Link to='/login'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}