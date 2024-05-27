import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Components from './Components';
import './app.css';
import axios from "axios";

function App() {
    const [signIn, setSignIn] = useState(true);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const toggle = () => setSignIn(!signIn);

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/auth/signup", {
                nom: fullName,
                email: email,
                password: password
            });
            console.log("User signed up successfully:", response.data);
            handleSignIn(event);
        } catch (error) {
            console.error("Error signing up:", error);
            setError(error.response?.data?.message || "An error occurred during signup.");
        }
    };

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                email: email,
                password: password
            });
            if (response && response.data) {
                console.log("User signed in successfully:", response.data);
                navigate("/Home");
            } else {
                console.error("Empty response from server.");
                setError("Empty response from server.");
            }
        } catch (error) {
            console.error("Error signing in:", error);
            setError(error.response?.data?.message || "An error occurred during signin.");
        }
    };

    return (
        <div className="background">
            <Components.Container>
                <Components.SignUpContainer signinIn={signIn}>
                    <Components.Form onSubmit={handleSignUp}>
                        <Components.Title>Create Account</Components.Title>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <Components.Input type='text' placeholder='Full Name' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        <Components.Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Components.Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Components.Button type="submit">Sign Up</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form onSubmit={handleSignIn}>
                        <Components.Title>Sign in</Components.Title>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <Components.Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Components.Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                        <Components.Button type="submit">Sign In</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>
                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title>Welcome Back!</Components.Title>
                            <Components.Paragraph>
                                To keep connected with us please login with your personal info
                            </Components.Paragraph>
                            <Components.GhostButton onClick={toggle}>
                                Sign In
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title>Hello, Friend!</Components.Title>
                            <Components.Paragraph>
                                Enter Your personal details and reserve your place
                            </Components.Paragraph>
                            <Components.GhostButton onClick={toggle}>
                                Sign Up
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </div>
    );
}

export default App;