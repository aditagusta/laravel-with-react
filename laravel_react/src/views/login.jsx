import { Link } from "react-router-dom";
import { useRef } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();

    const Submit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        // console.log(payload);
        axiosClient.post("/login",payload).then(({data}) =>{
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
                    Login to Your Account
                </h1>
                <form onSubmit={Submit}>
                    <input ref={emailRef} type="email" placeholder="E-mail"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered ? <Link to='/register'>Create a New Account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
