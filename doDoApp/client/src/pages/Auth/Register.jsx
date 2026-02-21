import React, { useState } from "react";
import styles from "./Login.module.css";
import login from "../../assets/login.png";
import { Button, Input, message } from "antd";
import { Link, useNavigate } from "react-router";
import AuthServices from "../../services/authServices";
import { getErrorMessage } from "../../util/GetError";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            let data = {
                firstName,
                lastName,
                username,
                password,
            };
            const response = await AuthServices.registerUser(data);
            console.log(response.data);
            setLoading(false);
            message.success("you're registered Successfully!");
            navigate("/login");
        } catch (err) {
            console.log(err);
            setLoading(false);
            message.error(getErrorMessage(err));
        }
    };
    return (
        <div className={styles.login__card}>
            <img src={login} width={250} alt="../" />
            <h4 style={{ fontWeight: "bold" }}>Register</h4>
            <br />
            <div className={styles.input__inline__wrapper}>
                <Input
                    placeholder="first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                    placeholder="last name"
                    style={{ marginLeft: "10px" }}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
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
                Exisiting User? <Link to="/login">Login</Link>
            </div>
            <Button
                loading={loading}
                type="primary"
                size="large"
                disabled={!username || !password}
                onClick={handleSubmit}
            >
                Register
            </Button>
        </div>
    );
}

export default Register;
