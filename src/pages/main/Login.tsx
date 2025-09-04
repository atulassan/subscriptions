import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData, [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent page reload
        setLoading(true);
        setError("");
        console.log("Form submitted:", data);

        try {
            const response = await axios.post("http://localhost:5050/api/v1/login", data);
            console.log("Login Success:", response);
            // Example: store token in localStorage
            console.log(response.data.token);
            localStorage.setItem("token", response.data.token);
            // redirect to dashboard after login
            navigate("/dashboard", { replace: true });
        } catch (err: any) {
            console.error("Login Failed:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }

    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                />
                <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                />
                { loading ? 
                <span>Loading.....</span> 
                : 
                <button type="submit">Login</button>
                }
            </form>
        </>
    )
}