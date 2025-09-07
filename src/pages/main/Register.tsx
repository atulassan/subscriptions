import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

export default function Register() {

    const { register } = useContext(AuthContext);

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
            const response = await register(data);
            console.log(response);
            if(response.data.status) {  
                console.log(response.data.message);
                setData({});
            }          
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
                    name="name"
                    value={data?.name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                />
                <input
                    type="email"
                    name="email"
                    value={data?.email}
                    onChange={handleChange}
                    placeholder="joe@dom.com"
                />
                <input
                    type="password"
                    name="password"
                    value={data?.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                />
                <input
                    type="phone"
                    name="phone"
                    value={data?.phone}
                    onChange={handleChange}
                    placeholder="Enter Phone"
                />
                { loading ? 
                <span>Loading.....</span> 
                : 
                <button type="submit">Register</button>
                }
            </form>
        </>
    )
}