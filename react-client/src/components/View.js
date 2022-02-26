import React, { useState } from 'react';
//
import axios from 'axios';
//
function View (props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  // called when user clicks on Logout button
  const deleteCookie = async () => {
    try {
      await axios.get('/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  //called when user clicks on Get Data button
  const getData = async () => {
    try {
      const res = await axios.get('/read-cookie');
      console.log(res.data)
      //setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  //
  return (
    <div>
      <p>{screen}</p>
      <button onClick={getData}>Get Cookie Data</button>
      <button onClick={deleteCookie}>Logout</button>
    </div>
  );
}
//
export default View;