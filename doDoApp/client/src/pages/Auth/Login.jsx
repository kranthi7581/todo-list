import React, { useState } from "react";
import styles from "./Login.module.css";
import login from "../../assets/login.png";
import { Button, Input, message } from "antd";
import { Link, useNavigate } from "react-router";
import AuthServices from "../../services/authServices";
import { getErrorMessage } from "../../util/GetError";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            let data = {
                username,
                password,
            };
            const response = await AuthServices.loginUser(data);
            // ✅ Save user data (including token) to localStorage
            localStorage.setItem("toDoAppUser", JSON.stringify(response.data));
            console.log(response.data);
            setLoading(false);
            message.success("you're logged in Successfully!");
            navigate("/to-do-list");
        } catch (err) {
            console.log(err);
            setLoading(false);
            message.error(getErrorMessage(err));
        }
    };
    return (
        <div className={styles.login__card}>
            <img src={login} width={250} alt="../" />
            <h4 style={{ fontWeight: "bold" }}>Login</h4>
            <br />
            <div className={styles.input__wrapper}>
                <Input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className={styles.input__wrapper}>
                <Input.Password
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={styles.input__info}>
                New User? <Link to="/register">Register</Link>
            </div>
            <Button
                loading={loading}
                type="primary"
                size="large"
                disabled={!username || !password}
                onClick={handleSubmit}
            >
                Login
            </Button>
        </div>
    );
}

export default Login;
