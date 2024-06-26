import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { db, googleProvider, auth, storage } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  limit,
  uid,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function ChatroomList() {
  let navigate = useNavigate();

  const [checkroomId, setcheckroomId] = useState("none");
  const [vroomList, setvroomList] = useState([])
  const [checkroomValid, setcheckroomValid] = useState("none");

  const [FullroomList, setFullroomList] = useState([])
  const roomsCollectionRef = collection(db, "rooms");
  const [roomList, setroomList] = useState([]);
  
  const [title, settitle] = useState("");
  const [titlefoot, settitlefoot] = useState("");
  const rand = Math.random().toString().substr(2, 8);

  const createmessage = async (e) => {
    e.preventDefault();
    const ans = Number(new Date());

    try {
      await addDoc(roomsCollectionRef, {
        ider: rand,
        title: title,
        createdAt: ans,
      });

      getroomList();
      return navigate(`/room/${rand}`);
    } 
    catch (err) {
      console.error(err);
    }
  };

  const getroomList = async () => {
    try {
      const q = query(
        roomsCollectionRef,
        orderBy("createdAt", "asc"),
        limit(6)
      );
    
      const data = await getDocs(q);
    
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    
      setroomList(filteredData);
    }
    catch (err) {
      console.error(err);
    }
  };
  
  const getFullroomList = async () => {
    try {
      const q = query(
        roomsCollectionRef,
        orderBy("createdAt", "asc"),
      );
      
      const data = await getDocs(q);
      
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      
      setFullroomList(filteredData);
    } 
    catch (err) {
      console.error(err);
    }
  };

  const HandleInput = (e) => {
    if (title.length == 0) {
      setcheckroomId("block");
    } 
    else {
      setcheckroomId("none");
      e.preventDefault();
      createmessage(e);
    }
  };

  const HandleInputFoot = (e) => {
    let ans = 0;

    FullroomList.forEach((val) => {
      titlefoot == val.ider ? ans++ : (ans = ans);
    });

    if (ans == 0) {
      setcheckroomValid("block");
    } 
    else {
      setcheckroomValid("none");
    
      return navigate(`/room/${titlefoot}`);
    }
  };

  useEffect(() => {
    getroomList();
    getFullroomList();
  }, []);

  return (
    <>
      <div style={{ marginTop: "5%", display: "flex", flexDirection: "column", justifyContent: "center",}}>
        <div >
          <input placeholder="Give us a Name" onChange={(e) => {settitle(e.target.value);}} style={{ margin: "2%", borderRadius:"5px", padding:"0.25em"}} />
          <button style={{backgroundColor: "green", borderRadius: "10px", padding: "0.5em", marginBottom: "2%",}} onClick={HandleInput}>
            Create a Room
          </button>
          <div style={{ color: "yellow", display: `${checkroomId}` }}>
            {" "} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Give a Valid Title{" "}
          </div>
        </div>

        <div className="align-items-center">
          <input placeholder="Give us an Id" onChange={(e) => {settitlefoot(e.target.value);}} style={{ margin: "2%", borderRadius:"5px", padding:"0.25em", webkitTextSecurity: "disc" }}/>
          <button onClick={HandleInputFoot} style={{backgroundColor: "blue", borderRadius: "10px", padding: "0.5em"}}>
            Join a Room
          </button>
          <div style={{ color: "yellow", display: `${checkroomValid}` }}>
            {" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Not a Valid Room Id{" "}
          </div>
        </div>
      </div>

      <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", padding: "100px", color: "lavender", marginTop: "1%", marginLeft: "17%", marginRight: "17%"}}>
        {roomList.map((e) => {
          return (
            <>
              <div style={{color: "lavender", margin: "1%"}}>
                <div className="op" style={{width: "170px", border: "solid", padding: "25px", margin: "5px", borderRadius:"10px"}}>
                  <Link style={{ color: "cyan", textDecoration: "none" }} to={`/room/${e.ider}}`}>
                    {e.title}
                  </Link>
                </div>
              </div>
            </>
          );
        })}
      </div>

    </>
  );
}

export default ChatroomList;
