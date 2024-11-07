

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {addUser, removeUser} from "../utils/userSlice"
import { useNavigate } from "react-router-dom";
// import { LOGO } from "../utils/constants";
import {onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import {signOut } from "firebase/auth";

const Header=({showWhere})=>{

    const dispatch=useDispatch();
    const navigate=useNavigate();
    
   useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user) => {
            if (user) {
              const {uid,email,displayName,photoURL} = user ;
              dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
                navigate("/browse")
            } else {

              dispatch(removeUser());
              navigate("/")
            }
          });

          return ()=> unsubscribe();
    },[])


    return(

      <div>

      </div>
    )
}

export default Header;