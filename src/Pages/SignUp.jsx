import "../style/SignUp.css"
import {  useState } from "react"
import { onRegistration } from '../api/auth'
import { Typography } from  "@material-tailwind/react";

export default function SignUp () {
    const [values, setValues] = useState({
        firstName:'',
        lastName:'',
        email: '',
        password: '',
      })
    const [confirmEmail, setConfirmEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    
    
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

            setError('')
            setSuccess(data.message)
            setValues({ firstName: '', lastName: '', email: '', password: ''})
            setConfirmEmail('');
            setConfirmPassword('');
        } catch (error) {
            setError(error.response.data.errors[0].msg)
            setSuccess('');
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
                            name="firstName" 
                            id="firstName" 
                            required
                            value={values.firstName}
                            onChange={(e) => onChange(e)} 
                        /></td>
                    </tr>
                    <tr>
                        <td>Last Name:</td>
                        <td><input 
                            className="form__input"
                            type="text"
                            name="lastName"
                            id="lastName"
                            required
                            value={values.lastName}
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
          <Typography  style={{ color: 'green', marginY: 1 }}>
            {success}
          </Typography>
                <input type="submit" value="Submit" />
            </form>
        </div>
        
    )
};