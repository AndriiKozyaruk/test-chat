const express = require('express'),
    app = express(),
    WebSocket = require('ws'),
    env = require('dotenv').config(),
    { DB_PASSWORD, DB_USER_NAME } = process.env,
    mongoose = require('mongoose'),
    { Chat, Message } = require('./models'),
    path = require('path'),
    cors = require('cors')





app.use(express.static(path.join(__dirname, '/views')));
app.use(cors())

app.get('/chats', async (req, res)=>{
    const chats = await Chat.find({})
    if(chats){
        res.status(200).json(chats)
    }else{
        res.json(chats)
    }
})

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/views/index.html'));
});


const addMessage = async (text, autor, chatId) =>{

    if(!chat){
        console.log(err)
    }else{
        return await Message.create({ chatId: chatId, text: text, autor: autor })
    }
}

const uri = `mongodb+srv://db_admin:${DB_PASSWORD}@cluster0-etyvr.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var wss = new WebSocket.Server({ port: 3001 });


const imitateMessage = (ws)=>{
    ws.send('message')
}


db.once('open', ()=> {
    wss.on('connection', function(ws) {
        // setInterval(()=>imitateMessage(ws), 1000)
        ws.on('message', async function incoming(msg) {
            const message = JSON.parse(msg)
            if(message.type === 'initial'){
                const { chatTitle } = message
                const chat = await Chat.findOne({ title: chatTitle })

                const messages = await Message
                                        .find({ chatId: chat.id })
                                        .limit( 10 )
                                        .select({ text: 1, autor: 1 })
                ws.send(JSON.stringify(messages));
            }else{
                const { text, autor, chatTitle } = message
                const chat = await Chat.findOne({ title: chatTitle })

                const newMessage = await addMessage(text, autor, chat.id)

                ws.send(JSON.stringify(newMessage));
            }

        });
        // Message.find({  })
        // ws.send()
    });

    app.listen(3000);
});