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



app.use(express.static(path.join(__dirname, '/views')));
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
    const newChat = await Chat.create({ title: req.body.title })
    res.json(newChat)
})

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/views/index.html'));
});




const uri = `mongodb+srv://db_admin:${DB_PASSWORD}@cluster0-etyvr.mongodb.net/test?retryWrites=true&w=majority`;
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
                                .select({ text: 1, autor: 1 })

        if(messages && messages.length){
            ws.send(JSON.stringify({messages: messages, channel: 'CHAT_LOADED', newChatTitle: chatTitle }));
        }else if(chat){
            ws.send(JSON.stringify({ messages: [], channel: 'CHAT_LOADED', newChatTitle: chatTitle }));
        }
    }
}

const addMessage = async (text, autor, chatId) =>{
    const chat = await Chat.find({ _id: chatId })
    if(!chat){
        console.log(err)
    }else{
        console.log('some')
        return await Message.create({ chatId: chatId, text: text, autor: autor })
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
                console.log('some_____________________', chatTitle)
                const chat = await Chat.findOne({ title: chatTitle })
                const newMessage = await addMessage(text, autor, chat.id)
                users.forEach( user =>{
                    if(user.chat == chatTitle){ 
                        user.ws.send(JSON.stringify({ messages: [newMessage], channel: 'INCOMING_NEW_MESSAGES'}));
                    }
                })
            }

        });
    });

    app.listen(3000);
});