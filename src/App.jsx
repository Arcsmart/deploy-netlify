import { useContext, useEffect } from "react"
import Routing from "./Routing"
import { DataContext } from "./components/DataProvider/Dataprovider"
import { auth } from "./components/Utility/Firebase"
import { Type } from "./components/Utility/Action.type"



function App() {
  const [{user},dispatch]=useContext(DataContext)
  useEffect(()=>{
    auth.onAuthStateChanged((authuser)=>{
      if(authuser){
        dispatch({
          type:Type.SET_USER,
          user:authuser
        })
      }else{
        dispatch({
          type:Type.SET_USER,
          user:null
        })
      }

    })
  },[])
  

  return (
    <>
     <Routing/>
    </>
  )
}

export default App
