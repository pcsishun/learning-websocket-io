import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'

const endpoint = "http://localhost:9000" // เชื่อมต่อไปยัง url ของ realtime server
const socket = socketIOClient(endpoint); 

class App extends Component {
  constructor() {
    super()

    this.state = {
      input:'',
      message: [], // เก็บ log ทั้งหมดใน message
  
    }
    
  }
  // componentWillUpdate = () => {
  //   this.response()
  // }

  // componentDidUpdate = () => {
  //   this.response()
  // }


  // function //

  // เมื่อมีการส่งข้อมูลไปยัง server
  send = () => {
    const dummyUser = "test user"
    const { input } = this.state
    // console.log("input send msg state ==> ", input);
    const warpText = {
      username: dummyUser, 
      text: input 
    }
    // const socket = socketIOClient(endpoint)
    socket.emit('receive-message', warpText)
    this.setState({ input: '' })
 
  }

  // รอรับข้อมูลเมื่อ server มีการ update
  response = () => {
    const {  message } = this.state;
    console.log("response state message ==> ", message);
    const temp = message;

    // const socket = socketIOClient(endpoint)
    socket.on('sent-message', (messageNew) => {
        console.log("messageNew ===> ",messageNew);
        temp.push(messageNew);
        this.setState({ message: temp });
 
        // this.setState({ message: '' })
      })
 
  }

  changeInput = (e) => {
    this.setState({ input: e.target.value })
  }
  // end of function //

  componentDidMount = () => {
    this.response()
  }

  render() {
    const { input, message } = this.state
    return (
      <div>
        <div style={style}>
          <input value={input} onChange={this.changeInput} />
          <button onClick={this.send}>Send</button>
        </div>
        {
          message.map((data, i) =>
            <div key={i} style={style} >
              {i + 1} : {data}
            </div>
          )
        }
      </div>
    )
  }
}

const style = { marginTop: 20, paddingLeft: 50 }

export default App