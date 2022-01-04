import React from "react";
import "./newIndex.css";
  import {Header} from "./Header";
 import Menu from "./Menu";
export default function NewLayout({ children }) {
  return (
    <div className="container">
      <div className="header">
           <Header/>
          </div>
      <div className="menu"><Menu/></div>
      <div className="content">{children}</div>
    </div>
  );
}
