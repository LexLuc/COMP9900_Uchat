import React, { Component } from 'react';
import './App.css';
import ChatRoom from '../src/components/chatRoom.js';


const BackgroundItem = () => 
  <div className="container-login100">
    <div className="wrap-login100" >
      
      <ChatRoom/>
    </div>
	</div>




class App extends Component {

  
 
  render() {
    return (
      <div className="App">
       
        <BackgroundItem/>
      </div>
    );
  }
}

export default App;


