import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export function Auth() {
  const [Name, setName] = useState("");
  const [rr, setrr] = useState("none");

  const dispatch = useDispatch();

  const { username } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch({ type: "username_change", payload: Name });
  }, [Name]);

  const signin = async () => {
    try {
      setrr("none");
      await signInWithPopup(auth, googleProvider);
    } 
    catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } 
    catch (err) {
      console.error(err);
    }
  };

  const tomper = () => {
    console.log(rr);
    setrr("block");
  };
  
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="Diver" style={{marginTop: "10%", marginBottom: "1%", textAlign: "center", color: "lightgreen"}}>
        <h1>Join Chat</h1>
        <div>
          <input placeholder="Avatar Name" onChange={(e) => {setName(e.target.value)}} value={Name} style={{ marginTop: "2%", borderRadius:"5px", padding:"0.5em" }}/>
        </div>
        <div style={{ color: "red", display: `${rr}` }}>
          Please Provide a Name
        </div>
        <div>
          <button style={{paddingLeft: "20%", margin: "2%", paddingRight: "20%", display:"inline",backgroundColor: "darkslategrey", borderRadius: "10px", fontWeight:"bold"}} onClick={Name !== "" ? signin : tomper}>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
