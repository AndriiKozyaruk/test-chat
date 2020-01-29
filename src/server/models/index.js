const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    title: { type: String,  unique: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});

const message = new mongoose.Schema({
    text:  { type: String,  unique: false },
    autor: { type: String,  unique: false },
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }
});



const Chat = mongoose.model('Chat', chatSchema);
const Message = mongoose.model('Message', message);

module.exports = {
    Chat,
    Message
}