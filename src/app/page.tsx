"use client";
import { useRef, useState } from "react";
import React from "react";
import "./globals.css";

export default function Home() {
  const [addtodo, setaddtodo] = useState([]);
  const inputRef = useRef();
  const handlleaddtodo = (event) => {
    const text = inputRef.current.value;
    const newItem = { text, completed: false };
    if (event.key === "Enter") {
      if (text != "") {
        setaddtodo([...addtodo, newItem]);
      }

      inputRef.current.value = "";
    }
  };
  const handlleaddtodobutton = (event) => {
    const text = inputRef.current.value;
    const newItem = { text, completed: false };

    if (text != "") {
      setaddtodo([...addtodo, newItem]);
    }

    inputRef.current.value = "";
  };
  const handledelete = (indextoremove) => {
    setaddtodo((prevtodo) =>
      prevtodo.filter((_, index) => index !== indextoremove)
    );
  };
  const delteCompleted = (index) => {
    const newtodo = addtodo.filter((item) => !item.completed);
    setaddtodo(newtodo);
  };

  const handlleCompleted = (index) => {
    const newtodo = [...addtodo];
    newtodo[index].completed = !newtodo[index].completed;
    setaddtodo(newtodo);
    
  };
  const deleteAll= (index)=>{
    const newtodo=addtodo.filter((item)=>false)  
    setaddtodo(newtodo);  

  }
  return (
    <body>
      <div className="main-content">
        <h1>To Do list</h1>
        <div className="nostodos">
          <div className="inputbutton">
            <input type="text" onKeyDown={handlleaddtodo} ref={inputRef} />
            <button onClick={handlleaddtodobutton}>ADD</button>
          </div>
          <div className="pannel-configuration">
            <p className="delete" onClick={delteCompleted}>
              Delete Completed
            </p>
            <p className="delete-all" onClick={deleteAll}>Delete All</p>
          </div>

          <ul>
            {addtodo.map((item, index) => {
              return (
                <li
                  key={index}
                  className={item.completed ? "done" : ""}
                  onClick={() => handlleCompleted(index)}
                >
                  {item.text}
                  <img
                    onClick={(e) => {
                      e.stopPropagation();
                      handledelete(index);
                    }}
                    src="/f2.svg"
                    alt=""
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </body>
  );
}
