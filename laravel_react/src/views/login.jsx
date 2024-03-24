import { Link } from "react-router-dom";

export default function login() {
    const Submit = (ev) => {
        ev.preventDefault();
    }

    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">
                    Login to Your Account
                </h1>
                <form onSubmit={Submit}>
                    <input type="email" placeholder="E-mail"/>
                    <input type="password" placeholder="Password"/>
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered ? <Link to='/register'>Create a New Account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}