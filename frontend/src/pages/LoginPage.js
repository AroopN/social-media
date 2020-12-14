import {React, useState} from 'react'
import { loginUser } from '../actions/auth.actions';
import {connect} from 'react-redux'

const LoginPage = ({loginUser}) => {
   const [loginData, setloginData] = useState({
       email: "",
       password: ""
   });
   const { email, password } = loginData;
   const onChange = (e) =>
       setloginData({ ...loginData, [e.target.name]: e.target.value });
   const submitForm = (loginData) => {
       loginUser(loginData);
   };
   return (
       <div>
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
                   submitForm(loginData);
               }}
           >
               Login
           </button>
       </div>
   );
}

export default connect(null, { loginUser })(LoginPage);

