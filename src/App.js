import { useContext, useEffect, useState } from "react";
import Home from "./components/home/home";
import Register from "./components/register/register";
import { UserContext } from "./costext/context";
import { auth } from "./firebase";

function App() {
  const [user, setuser] = useContext(UserContext).user;
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setuser(userAuth);
      }
    })
  },[user])

  return (
    <>
      {
        user ? (
          <>
          <Home />
          </>
        ): (
          <Register/>
        )
      }
    </>
  );
}

export default App;

// {
//           user? (
//             <Route path='/'>
//               <Home/>
//             </Route>
//           ) : (
//             <Route exact path='/register'>
//           <Register />
//         </Route>
//           )
//         }