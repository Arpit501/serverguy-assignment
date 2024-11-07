import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase"

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";



const Login=()=>{

    const [isSignInForm,setIsSignInForm]=useState(true);

    const [errorMessage,setErrorMessage]=useState(null)

    const [showPassword,setShowPassword]=useState(false);

    const dispatch=useDispatch();

    
    const email=useRef(null);
    const password=useRef(null);
    const fullName=useRef(null);



    const handleButtonClick=()=>{
        
      const message= checkValidData(email.current.value,password.current.value);


    setErrorMessage(message);

 
        if(message) return;

   

        if(!isSignInForm){
    
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
             .then((userCredential) => {
             
             const user = userCredential.user;

             updateProfile(user, {
                displayName:fullName.current.value, photoURL:USER_AVATAR
              }).then(() => {

              const {uid,email,displayName,photoURL} = auth.currentUser ;
              dispatch(addUser(
                {uid:uid,
                 email:email,
                 displayName:displayName,
                 photoURL:photoURL}
                ));
             
              }).catch((error) => {
               setErrorMessage(error);
              });

             })
            .catch((error) => {

            setErrorMessage("You have entered an invalid username or password")
            });
        }
        else{
            signInWithEmailAndPassword(auth,email.current.value, password.current.value)
                .then((userCredential) => {
             })
                 .catch((error) => {
                 setErrorMessage("You have entered an invalid username or password");
            });


        }


    }
    
    const toggleSignInForm=()=>{

        setIsSignInForm(!isSignInForm);
    }

    const obj={}

    if(!isSignInForm)
    {
        obj["height"]="525px";
        obj["margin-top"]="1rem";
        obj["margin-bottom"]="1rem";
    }
    else{
        obj["height"]="440px";
        obj["margin-top"]="2rem";
        obj["margin-bottom"]="2rem";
    }

    return( 
    <div className="bg-orange-50 w-screen h-screen absolute">
        <Header/>   

        {/* <div className=""> */}
        {/* <img className="w-screen h-screen" src={BG_URL} alt="" /> */}
        {/* </div> */}
        
        <form style={obj} onSubmit={(e)=>{e.preventDefault()}} action="" className=" bg-orange-500 p-12 w-[36vw]  mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80  flex flex-col items-center z-50">

            <p className="text-red-600 font-bold text-lg">{(errorMessage)}</p>

            <h1 className="font-bold text-3xl py-2 self-start ml-6 mb-2 mt-2">{isSignInForm?"Sign In":"Sign Up"}</h1>

            {!isSignInForm &&(
             <input ref={fullName} type="text" placeholder="Full Name" className="px-3 py-4 my-3 w-[87%] bg-red-600  rounded-md  border border-white mx-auto text-white" />)}

            <input ref={email} type="email" placeholder="Email Address" className="px-3 py-4 my-3 w-[87%] bg-red-600  rounded-md  border border-white mx-auto text-white"/>

            <input ref={password} type={showPassword?"text":"password"} placeholder="Password" className="px-3 py-4 my-3 w-[87%] bg-red-600  rounded-md border border-white mx-auto text-white"/>
                       
            <div className="self-start ml-7 ">
            <input className="relative top-[2px]" type="checkbox" onClick={()=>{
                setShowPassword(!showPassword);
            }}/><label className="ml-1" htmlFor="" >see password</label>
            </div>


            <button className="p-2 my-3 bg-red-600 w-[87%] rounded-[4px]" onClick={handleButtonClick}>{isSignInForm?"Sign In":"Sign Up"}</button>

            <p  className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm?"New To Netflix? Sign Up Now.":"Already Registered? Sign In Now."}</p>

        </form>
    </div>
    )
}

export default Login;

