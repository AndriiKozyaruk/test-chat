const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    title: String,
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});

const message = new mongoose.Schema({
    text: { type: String, unique: true },
    autor: String,
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }
});



const Chat = mongoose.model('Chat', chatSchema);
const Message = mongoose.model('Message', message);

module.exports = {
    Chat,
    Message
}