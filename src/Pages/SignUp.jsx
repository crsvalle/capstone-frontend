import { useState } from "react"
import { onRegistration, onLogin } from '../api/auth'
import { Typography } from "@material-tailwind/react";
import { authenticateUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

import "../style/SignUp.css"
import pic from "../Pages/Pic/lot.jpeg"
import { useDispatch } from "react-redux";

export default function SignUp() {
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });
    const [confirmEmail, setConfirmEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate()
    const onChange = (e) => {
        const { name, value } = e.target;

        if (name === 'confirmEmail') {
            setConfirmEmail(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        } else {
            setValues({ ...values, [name]: value });
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        if (values.email !== confirmEmail) {
            setError('Email and Confirm Email must match');
            return;
        }

        if (values.password !== confirmPassword) {
            setError('Password and Confirm Password must match');
            return;
        }

        try {

            const { data } = await onRegistration(values)
            try {
                const loginResponse = await onLogin(values);
                dispatch(authenticateUser());

                localStorage.setItem("isAuth", JSON.stringify(true));


                setSuccess(data.message);
                navigate("/"); // Redirect to desired page after successful login
            } catch (loginError) {
                console.error("Login error:", loginError);
                setError("Login failed. Please try again."); // Handle login failure
                navigate("/login"); // Redirect to login page on failure
            }

            setError('')
            setSuccess(data.message)
            setValues({ first_name: '', last_name: '', email: '', password: '' })
            setConfirmEmail('');
            setConfirmPassword('');
            navigate('/login')
            setLoading(false);
        } catch (error) {
            setError(error.response.data.errors[0].msg)
            setSuccess('');
            setLoading(false);
        }
    }

    return (
        <div className="form__container">
            <form onSubmit={(e) => onSubmit(e)}>
                <table>
                    <tr>
                        <td>First Name:</td>
                        <td><input
                            className="form__input"
                            type="text"
                            name="first_name"
                            id="first_name"
                            required
                            value={values.first_name}
                            onChange={(e) => onChange(e)}
                        /></td>
                    </tr>
                    <tr>
                        <td>Last Name:</td>
                        <td><input
                            className="form__input"
                            type="text"
                            name="last_name"
                            id="last_name"
                            required
                            value={values.last_name}
                            onChange={(e) => onChange(e)}
                        /></td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td><input
                            className="form__input"
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={values.email}
                            onChange={(e) => onChange(e)}
                        /></td>
                    </tr>
                    <tr>
                        <td>Confirm Email:</td>
                        <td><input
                            className="form__input"
                            type="email"
                            name="confirmEmail"
                            id="confirmEmail"
                            required
                            value={confirmEmail}
                            onChange={(e) => onChange(e)}
                        /></td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td><input
                            className="form__input"
                            type="password"
                            name="password"
                            id="password"
                            required
                            value={values.password}
                            onChange={(e) => onChange(e)}
                        /></td>
                    </tr>
                    <tr>
                        <td>Confirm Password:</td>
                        <td><input
                            className="form__input"
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            required
                            value={confirmPassword}
                            onChange={(e) => onChange(e)}
                        /></td>
                    </tr>
                </table>
                <Typography style={{ color: 'red', marginY: 1 }}>
                    {error}
                </Typography>
                <Typography style={{ color: 'green', marginY: 1 }}>
                    {success}
                </Typography>
                <input className="form__btn bg-customBlue hover:bg-customBlueLight" type="submit" value="Submit" />
                {loading && <p>Loading...</p>}
            </form>
            <div className="form__pic"><img className="form__img" src={pic} alt="" /></div>
        </div>

    )
};