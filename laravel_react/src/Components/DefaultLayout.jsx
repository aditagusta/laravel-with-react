import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import { useContext, useEffect } from "react";
import axiosClient from "../axiosClient";
import axios from "axios";

export default function DefaultLayout() {
    const {user, token, setUser, setToken} = useStateContext();
    if(!token)
    {
        return <Navigate to='/login'/>
    }

    const onLogout = (ev) => {
        axiosClient.get("/user")
        .then(({}) => {
            setUser(null)
            setToken(null)
        })
    }

    useEffect(() => {
        axiosClient.get("/user")
        .then(({data}) => {
            setUser(data)
        })
    },[])

    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
