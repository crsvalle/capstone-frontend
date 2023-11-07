import "../style/Login.css"

export default function Login () {
    return (
        <div className="form__container">
            <form>
                <table>
                    <tr>
                        <td>First Name:</td>
                        <td><input type="text" name="fullname" id="fullname" /></td>
                    </tr>
                    <tr>
                        <td>Last Name:</td>
                        <td><input type="text" name="fullname" id="fullname" /></td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td><input type="email" name="email" id="email" /></td>
                    </tr>
                    <tr>
                        <td>Confirm Email:</td>
                        <td><input type="email" name="confirmEmail" id="confirmEmail" /></td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td><input type="password" name="password" id="password" /></td>
                    </tr>
                    <tr>
                        <td>Confirm Password:</td>
                        <td><input type="password" name="confirmPassword" id="confirmPassword" /></td>
                    </tr>
                </table>
                <input type="submit" value="Submit" />
            </form>
        </div>
        
    )
};