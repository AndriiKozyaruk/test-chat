const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  title: { type: String,  unique: true },
  key:    { type: mongoose.Schema.Types.ObjectId }
});

const messageSchema = new mongoose.Schema({
  text: String,
  textMessage: String,
  autor: String,
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chats' }
});



const Chat = mongoose.model('Chats', chatSchema);
const Message = mongoose.model('Messages', messageSchema);

module.exports = {
  Chat,
  Message
}