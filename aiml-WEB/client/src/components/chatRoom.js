import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import Message from './Message';



class ChatRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chats: [{
                username: "question",
                content: <p>I have a few questions about UNSW courses</p>,
                img: "http://i.imgur.com/jDjFqixr.jpg",
            }, {
                username: "answer",
                content: <p>Hi, I am a UNSW Chatbot. I can give you any answers related to CoursesFAQ</p>,
                img: "http://i.imgur.com/jDjFqixr.jpg",
                
            }],
            
        };

        this.submitMessage = this.submitMessage.bind(this);
    }

    componentDidMount() {
        this.scrollToBot();
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    submitMessage(e) {
        e.preventDefault();
        var question = ReactDOM.findDOMNode(this.refs.msg).value.replace(/\//g,' ');


        fetch('/api/questions/' + question)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    chats: this.state.chats.concat([{
                        username: "answer",
                        content: <p>{json['whatIsQuestion']}</p>,
                        img: "http://i.imgur.com/jDjFqixr.jpg",
                    }])
                });
            })
        this.setState(         
            () => {ReactDOM.findDOMNode(this.refs.msg).value = "";
        })   
    }

    customizeSubmitMessage(e){
        e.preventDefault();
        console.log('here is customizeSubmitMessage')
        let InputTextQuestion = ReactDOM.findDOMNode(this.refs.InputTextQuestion).value;
        let InputTextAnswer = ReactDOM.findDOMNode(this.refs.InputTextAnswer).value;
        let data = {'question': InputTextQuestion,'answer':InputTextAnswer};
      

        fetch('/api/customizeQuestions', {
            method: 'POST', 
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                if(json['ableToInsert'] === 0){
                    alert('Sorry, you can not input this keywords. Please, try some other keywords!');
                } 
                else{
                    alert('Thanks for your provide, our bot have learnt more new knowledge');
                }
            })

        this.setState(         
            () => {
                ReactDOM.findDOMNode(this.refs.InputTextQuestion).value = "";
                ReactDOM.findDOMNode(this.refs.InputTextAnswer).value = "";

        }) 
        
    }
    
    handleOnClick(txt){
        this.setState({
            chats: this.state.chats.concat([{
                username: "question",
                content: <p>{ReactDOM.findDOMNode(this.refs.msg).value}</p>,
                img: "http://i.imgur.com/jDjFqixr.jpg",
            }])
        });
    }

    plusOnClick(){
        //console.log(document.getElementById("Customize"))
        let onOff = document.getElementById("Customize").style.display;
        if (onOff === "none"){
            document.getElementById("Customize").style.display = "block";
        }else{
            document.getElementById("Customize").style.display = "none";
        }
    }



    render() {
        const username = "question";
        const { chats } = this.state;

        return (
            <div>
                <div className="chatroom">
                    <h3>UNSW Chatbot</h3>
                    <ul className="chats" ref="chats">
                        {
                            chats.map((chat) => 
                                <Message chat={chat} user={username} />
                            )
                        }
                    </ul>
                    <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                        <input type="text" placeholder = "Input your questions, please" ref="msg" />
                        <input type="submit" onClick = {(txt) => this.handleOnClick(txt)}/>
                        <button name="plus" onMouseOver = {this.plusOnClick}>
                           +
                        </button>
                    </form>
                    
                </div>
                        
                <div id="Customize" style = {{display : "none"}}>
                    <form className="CustomizeForm" onSubmit={(e) => this.customizeSubmitMessage(e)}>
                        <input type="InputText" ref = "InputTextQuestion" placeholder = "Customize Question" />
                        <input type="InputText" ref = "InputTextAnswer" placeholder = "Customize Answer"  />
                        <input type="submit"/>
                        
                    </form>
                </div>    
        </div>
        );
    }
}

export default ChatRoom;