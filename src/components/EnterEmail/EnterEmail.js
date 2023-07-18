import React, { useState } from 'react';

import './EnterEmail.css';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function EnterEmail({ setToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password
        });
        setToken(token);
    }

    return(
        <div className="login-wrapper">
            <h1>Please enter email</h1>
        <form>
            <label>
                <p>Enter email address</p>
                <input type="text"  onChange={e => setEmail(e.target.value)}/>
            </label>
            <div>
                <button type="submit">Get OTP</button>
            </div>
        </form>
        <form>
            <label>
                <p>Enter one-time password</p>
                <input type="text" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
</div>
    )
}

