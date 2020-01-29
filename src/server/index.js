const express = require('express'),
  app = express(),
  WebSocket = require('ws'),
  env = require('dotenv').config(),
  { DB_PASSWORD, DB_USER_NAME } = process.env,
  mongoose = require('mongoose'),
  { Chat, Message } = require('./models'),
  path = require('path'),
  cors = require('cors'),
  bodyParser = require('body-parser')



app.use(express.static(path.join(__dirname, '/view')));
app.use(cors())
app.use(bodyParser())



app.get('/chats', async (req, res)=>{
  const chats = await Chat.find({})
  if(chats){
    res.status(200).json(chats)
  }else{
    console.log(chats)
  }
})

app.post('/chats', async (req, res)=>{
  const newChat = await Chat.create({ title: req.body.title, key: new mongoose.Types.ObjectId() })
  res.json(newChat)
})

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/view/index.html'));
});


const uri = `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@cluster0-etyvr.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

var wss = new WebSocket.Server({ port: 3001 });


async function sendInitialMessage (ws, chatTitle){
  const chat = await Chat.findOne({ title: chatTitle })
  if(chat){
    const messages = await Message
                            .find({ chatId: chat.id })
                            .limit( 10 )
                            .select({ textMessage: 1, autor: 1 })


    if(messages && messages.length){
      const convertedMessages = messages.map(e=>{
        return {
          autor: e.autor,
          text: e.textMessage
        }
      })
      ws.send(JSON.stringify({ messages: convertedMessages, channel: 'CHAT_LOADED', newChatTitle: chatTitle }));
    }else if(chat){
      ws.send(JSON.stringify({ messages: [], channel: 'CHAT_LOADED', newChatTitle: chatTitle }));
    }
  }
}

const addMessage = async (text, autor, chatId) =>{
  const chat = await Chat.find({ _id: chatId })
  if(!chat){
    console.log(chat)
  }else{
    const someKey = Math.random() + ''
    return await Message.create({ chatId: chatId, textMessage: text, text: someKey, autor: autor })
  }
}


let users = []
db.once('open', ()=> {
    // Message.remove({}, function(err) { 
    //      console.log('collection removed') 
    // });
    // Chat.remove({}, function(err) { 
    //      console.log('collection removed')
    // });
  wss.on('connection', function(ws) {
    const userId = Math.random() + ''
    users.push({ ws: ws, id: userId, chat: '' })

    ws.on('message', async function incoming(msg) {
      const message = JSON.parse(msg)
      if(message.type === 'INITIALIZE_ROOM'){
          const { chatTitle } = message
          users = users.map( user =>{
            if(user.ws != ws){
              return user
            }else{
              user.chat = chatTitle
              return user
            }
          })

        sendInitialMessage(ws, chatTitle)
      }else{
        const { text, autor, chatTitle } = message

        const chat = await Chat.findOne({ title: chatTitle })
        const newMessage = await addMessage(text, autor, chat.id)
        users.forEach( user =>{
          if(user.chat == chatTitle){ 
            user.ws.send(JSON.stringify({ messages: [{ text: newMessage.textMessage, autor: newMessage.autor }], channel: 'INCOMING_NEW_MESSAGES'}));
          }
        })
      }

    });
  });

  app.listen(3000);
});