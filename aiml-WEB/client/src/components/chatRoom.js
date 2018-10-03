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
                content: <p>I am a few questions about UNSW courses</p>,
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
        //console.log(test)
        var question = ReactDOM.findDOMNode(this.refs.msg).value
        fetch('/api/questions/' + question)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    chats: this.state.chats.concat([{
                        username: "answer",
                        content: <p>{json[question]}</p>,
                        img: "http://i.imgur.com/jDjFqixr.jpg",
                    }])
                });
            })
    this.setState(         
        () => {ReactDOM.findDOMNode(this.refs.msg).value = "";
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

    render() {
        const username = "question";
        const { chats } = this.state;

        return (
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
                </form>
            </div>
        );
    }
}

export default ChatRoom;