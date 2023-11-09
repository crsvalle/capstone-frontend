import "../style/SignUp.css"

export default function SignUp () {
    return (
        <div className="form__container">
            <form>
                <table>
                    <tr>
                        <td>First Name:</td>
                        <td><input type="text" name="fullname" id="fullname" required /></td>
                    </tr>
                    <tr>
                        <td>Last Name:</td>
                        <td><input type="text" name="fullname" id="fullname" required /></td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td><input type="email" name="email" id="email" required/></td>
                    </tr>
                    <tr>
                        <td>Confirm Email:</td>
                        <td><input type="email" name="confirmEmail" id="confirmEmail" required/></td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td><input type="password" name="password" id="password" required/></td>
                    </tr>
                    <tr>
                        <td>Confirm Password:</td>
                        <td><input type="password" name="confirmPassword" id="confirmPassword" required/></td>
                    </tr>
                </table>
                <input type="submit" value="Submit" />
            </form>
        </div>
        
    )
};