import React, { useState, useContext } from 'react';
import  {UserContext}  from './UserContext';

export default function UserForm() {
  const [inputName, setInputName] = useState('');
  const { setName } = useContext(UserContext);  

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);  // Set the name in context
    window.history.pushState({}, '', '/quiz');  // Change the URL without reloading the page
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);  // Dispatch a navigation event
    setInputName('');   
  }

  function handleInputChange(e){
    setInputName(e.target.value);
  }

  function handleFocus(e){
    e.target.style.backgroundColor = "rgb(222, 247, 255)";
  }
  
  function handleBlur(e){
    e.target.style.backgroundColor = "";
  } 

  return (
    <div>
        <form onSubmit={handleSubmit} >
            <label htmlFor="name" >Enter Name: </label>
            <input type='text' id='name' value={inputName} name='name' onChange={handleInputChange} required
            onFocus={handleFocus} onBlur={handleBlur} />
            
            <button type='submit'>Submit</button >
        </form>
    </div>
  );
}