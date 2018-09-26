import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// const Form = () => 
//     <form className="login100-form validate-form "  name="loginform">
//         <div className="wrap-input100 validate-input" data-validate = "Give validate questions">
//             <input className="input100" type="text" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} placeholder="say something please"/>
//             <span className="focus-input100"></span>
//         </div>


//         <div className="wrap-input100 validate-input" data-validate="Enter password">
//             <p className = 'wrap-input100 validate-input smallP'></p>
//             <span className="focus-input100"></span>
//         </div>
//     </form>


const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

class ChatForm extends Component {

    constructor(props){
      super(props);
      this.state = {
        questions : "",
        answer : "smart answers from me!",
        inputValue: '',
        items: Array.from({ length: 20 }),
        hasMore: true,
        chats: [{
          username: "question",
          content: <p>i do not know</p>,         
        }, {
          username: "answer",
          content: <p></p>,
        }, ]
      };
      this.submitMessage = this.submitMessage.bind(this);
    };

  fetchMoreData = () => {
    if (this.state.items.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 }))
      });
    }, 500);
  };

  submitMessage(e) {
    e.preventDefault();

    this.setState({
        chats: this.state.chats.concat([{
            username: "Kevin Hsu",
            content: <p>{ReactDOM.findDOMNode(this.refs.msg).value}</p>,
        }])
    }, () => {
        ReactDOM.findDOMNode(this.refs.msg).value = "";
    });
  }

    

    updateInputValue(evt) {
      
        
        // this.setState({ 
        //   inputValue: evt.target.value,
        // });
        // console.log(evt.target.value)
        // console.log(this.state.inputValue);
        fetch(`api/answer/${evt.target.value}`)
        .then(res => res.json())
        .then(json => {
            for ( let answers of json){
                this.setState({
                    answer: answers['hi'],
                });
            }
    }
           
        )
        .catch((err) => {
          console.log(`Opz, something wrong, the error message is ${err}`);
        });
        
      }


    render() {
      return (
        <div>
          <form className="login100-form validate-form "  name="loginform">
            <div className="wrap-input100 validate-input" data-validate = "Give validate questions">
              <input className="input100" type="text" value={this.state.inputValue} ref='filterTextInput' onChange={evt => this.updateInputValue(evt)} placeholder="Talk to me."/>
              <span className="focus-input100"></span>
            </div>

            <InfiniteScroll
              dataLength={this.state.items.length}
              next={this.fetchMoreData}
              hasMore={this.state.hasMore}
              loader={<h4>Loading...</h4>}
              height={400}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              >

              {this.state.items.map((i, index) => (
                <div style={style} key={index}>
                  div - #{index}
                </div>
              ))}
            </InfiniteScroll>
          </form>

        {/* <div className="wrap-input100 validate-input" >
                <p className = 'wrap-input100 validate-input smallP'>{this.state.answer}</p>
                <span className="focus-input100"></span>

            </div> */}
    

        </div>


      );
    }
  }


export default ChatForm;
