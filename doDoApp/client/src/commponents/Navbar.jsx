import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import login from "../assets/login.png";
import { Link, useNavigate } from "react-router";
import { getUserDetails } from "../util/GetUser.js";
import { Dropdown } from "antd";

function Navbar({ active }) {
    const [user, setUser] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const userDetails = getUserDetails();
        setUser(userDetails);
    }, []);

    const handLogout = () => {
        localStorage.removeItem("toDoAppUser");
        navigate("/login");
    };
    const items = [
        {
            key: "1",
            label: <span onClick={handLogout}>Logout</span>,
        },
    ];
    return (
        <header>
            <nav>
                <div className="logo__wrapper">
                    <img src={logo} alt="logo" />
                    <h4>DoDo</h4>
                </div>
                <ul className="navigation-menu">
                    <li>
                        <Link
                            to="/"
                            className={active === "home" ? "activeNav" : undefined}
                        >
                            Home
                        </Link>
                    </li>
                    {user && (
                        <li>
                            <Link
                                to="/to-do-list"
                                className={active === "myTask" ? "activeNav" : undefined}
                            >
                                My Task
                            </Link>
                        </li>
                    )}
                    {user ? (
                        <Dropdown menu={{ items }} placement="bottom" arrow>
                            <div className="userInfoNav">
                                <img src={login} width={50} alt="." />
                                <span>
                                    {user?.firstName
                                        ? `hello, ${user?.firstName} ${user?.lastName}`
                                        : user?.username}
                                </span>
                            </div>
                        </Dropdown>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
