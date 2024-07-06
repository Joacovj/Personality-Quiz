import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";

export default function Results({ element, artwork }) {  
  const {name} = useContext(UserContext);  
  
  return (
    <div className="results-wrapper">
      <p>
        <strong>{name}</strong>, you're a <strong>{element}</strong> cato!
      </p>
      {artwork ? (
        <div className="artwork">
          <h3>Here's a picture of you as a cat!</h3>            
          <img src={artwork[0].url} alt="Kitten" />
          <p></p>
        </div>
      ) : (
        <p>No kitten 😥</p>
      )}
    </div>
  );
}