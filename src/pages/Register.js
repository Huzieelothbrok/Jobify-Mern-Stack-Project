// import {useState,useEffect} from 'react'
// import {Logo,FormRow,Alert} from '../Components'
// import Wrapper from '../assets/wrappers/RegisterPage'
// import { useAppContext } from '../context/appContext'
// const initialState = {
// name:'',
// email:'',
// password:'',
// isMember:true,
// }
// const Register = () => {
//   const [values,setValues]=useState(initialState)
//   //global state and use Navigate
//  const {isLoading,showAlert,displayAlert}= useAppContext()
//   const toggleMember=()=>{
//     setValues({...values,isMember:!values.isMember})
//   }
//   const handleChange = (e)=>{
//    setValues({...values, [e.target.name]: e.target.value})

//   }

//   const onSubmit= (e)=>{
//     e.preventDefault()
// const {name,email,password,isMember} =values
// if(!email||!password||(!isMember&&!name)){
//   displayAlert()
//   return
// }
// console.log(values);
// }


//   return (
//     <Wrapper className='full-page'>
//       <form className='form' onSubmit={onSubmit}>
//       <Logo/>
//       <h3>{values.isMember?"Login":"Register"}</h3>
//       {showAlert && <Alert />}
//         {/* name input */}
//         {!values.isMember && (
//           <FormRow
//             type='text'
//             name='name'
//             value={values.name}
//             handleChange={handleChange}
//           />
//         )}

//         {/* email input */}
//         <FormRow
//           type='email'
//           name='email'
//           value={values.email}
//           handleChange={handleChange}
//         />
//         {/* password input */}
//         <FormRow
//           type='password'
//           name='password'
//           value={values.password}
//           handleChange={handleChange}
//         />
//       <button  type="submit" className="btn btn-block">Submit</button>
//       <p>
//         {values.isMember?'Not a Member?':'Already a Member?'}
//         <button type='button' className='member-btn' onClick={toggleMember}>
//           {values.isMember?'Register':'Login'}
//         </button>
//       </p>
//       </form>
//     </Wrapper>
//   )
// }

// export default Register


import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../Components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom'
const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState);
  const { user,isLoading, showAlert, displayAlert,registerUser,loginUser } = useAppContext(); //global values

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser= {name, email, password}
    if(isMember){
      loginUser(currentUser)
    }
    else{
      registerUser(currentUser)
    }
    console.log(values);
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange} // Add handleChange to input field
          />
        )}

        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange} // Add handleChange to input field
        />

        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange} // Add handleChange to input field
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>Submit</button>
        <p>
          {values.isMember ? 'Not a Member?' : 'Already a Member?'}
          <button type='button' className='member-btn' onClick={toggleMember}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;