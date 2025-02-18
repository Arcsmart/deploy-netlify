import React, { useContext, useState } from 'react'
import classes from "./Signup.module.css"
import { Link,useNavigate ,useLocation} from 'react-router-dom'
import {auth} from "../../components/Utility/Firebase"
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth"
import { DataContext } from "../../components/DataProvider/Dataprovider"
import {Type} from "../../components/Utility/Action.type"
import {ClipLoader } from "react-spinners"



const Auth = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  console.log(user);
  const naviget=useNavigate()
  const useStateData=useLocation()
  // console.log(useStateData)

  const [email,setEmail]=useState("")
  const [password,setPassaword]=useState("")
  const [err,setErr]=useState("")
  const [loading,setLoading]=useState(
    {SignIn:false,
      SignUp:false
    }
  )
//  console.log(email,password)
const authHandler= async(e)=>{
  e.preventDefault()
// console.log(e.target.name)
      if(e.target.name=="SignIn"){
        setLoading({...loading,SignIn:true})
        signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
          
            dispatch({
              type:Type.SET_USER,
              user:userInfo.user
            })
            setLoading({...loading,SignIn:false})
            naviget(useStateData?.state?.redirect || "/")

          
          }).catch((err)=>{
            setErr(err.message)
            setLoading({...loading,SignIn:false})
          })


      }else{
        setLoading({...loading,SignUp:true})
      createUserWithEmailAndPassword(auth,email,password).then((userInfo)=>{
          
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, SignUp: false });
          naviget(useStateData?.state?.redirect || "/");
        }).catch((err)=>{
          setErr(err.message)
          setLoading({...loading,SignUp:false})
        })
      }

      }
  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to="/">
        <img
          src="https://cdn.pixabay.com/photo/2021/08/10/16/02/amazon-6536326_1280.png"
          alt=""
        />
      </Link>
      <div className={classes.login_container}>
        <h1>sign In</h1>
        {
         useStateData?.state?.msg && (
         <small style={{color:"red",textAlign:"center",padding:"5px",
          fontWeight:"bold"
         }}>
          {useStateData?.state?.msg}

         </small>

         ) 
        }
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassaword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            name="SignIn"
            onClick={authHandler}
            className={classes.login_signButton}
          >
            {loading.SignIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>

          {/* agrement */}
          <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of use &
            sale. please see our privacy Notice, our cooks Notice and our
            Interest_Based Notice.
          </p>
          {/* create account btn */}
          <button
            type="submit"
            name="SignUp"
            onClick={authHandler}
            className={classes.login_registerBtn}
          >
            {loading.SignUp ? (
              <ClipLoader color="#000" size={15} />
            ) : (
              "Create your Amazon Account"
            )}
          </button>
          {err && (
            <small style={{ paddingTop: "5px", color: "red" }}>{err}</small>
          )}
        </form>
      </div>

      {/* form */}
    </section>
  );
}

export default Auth