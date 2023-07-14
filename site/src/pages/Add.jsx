import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    cover: "",
    price: ""
  });

  const handleChanage = (e) => {
    setBook(prev=>({...prev,[e.target.name]:e.target.value}));
  }
  const navigate=useNavigate();

  const handleClick=async (e)=>{
    e.preventDefault();
    try{
      console.log(book);
      await axios.post("http://localhost:8800/books",book);
      navigate("/");
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className='form'>
      <h3>add Book</h3>
      <input type="text" name="title" onChange={handleChanage} placeholder='title' />
      <input type="text" name="desc" onChange={handleChanage} placeholder='desc' />
      <input type="text" name="price" onChange={handleChanage} placeholder='price' />
      <input type="text" name="cover" onChange={handleChanage} placeholder='cover' />

      <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add