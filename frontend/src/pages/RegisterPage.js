import {React,useState} from 'react'
import { registerUser } from '../actions/auth.actions';
import {connect} from 'react-redux'

const RegisterPage = ({registerUser}) => {
    const [userData, setuserData] = useState(
        {
            firstName:"",
            lastName:"",
            email:"",
            userName:"",
            password:""
        }
    )
    const {firstName, lastName, userName, email, password} = userData;
    const onChange = e => setuserData({...userData , [e.target.name]: e.target.value})
    const submitForm = (userData) => {
        registerUser(userData); 
    };
    return (
        <div>
            <label>First Name</label>
            <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => onChange(e)}
            />
            <br />
            <label>Last Name</label>
            <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => onChange(e)}
            />
            <br />
            <label>User Name</label>
            <input
                type="text"
                name="userName"
                value={userName}
                onChange={(e) => onChange(e)}
            />
            <br />
            <label>Email</label>
            <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
            />
            <br />
            <label>Password </label>
            <input
                type="text"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
            />
            <br />
            <button
                onClick={() => {
                    console.log("aa")
                    submitForm(userData);
                }}
            >
                Submit
            </button>
        </div>
    );
}

export default connect(null, {registerUser})(RegisterPage)


// const RegisterPage = ({registerUser}) => {
//     return <h1>dd</h1>
// }
// export default RegisterPage;
