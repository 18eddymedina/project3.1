import React from "react";
import "./style.css";
import API from "../../utils/API";
import Books from "../../pages/Books";

// This file exports both the List and ListItem components

var string = "";
var x = 0;
export function List1({ children }) {

  var array = [];
  if (x == 0) {
    API.getBooks().then(function (res, req) {
      res.data.forEach(element => {
        array.push(element.author);
        //div1.appendChild(element.author);
      });
      array.reverse();
      console.log(array);
      console.log(res);
      array.forEach(e => {
        string += e + " ";
      })
      console.log(string);
    }
    )
    x++;
  }
  else { console.log("yay");
 }
  return (

    <div>{string}</div>
  )
  // (
  //   <div className="list-overflow-container">
  //     <p className="list-group">{children}</p>
  //   </div>
  // );
}

export function ListItem({ children }) {
  return <p className="list-group-item">{children}</p>;
}
