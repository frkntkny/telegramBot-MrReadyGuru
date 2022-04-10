const TelegramBot = require('node-telegram-bot-api');
const { messageTypes } = require('node-telegram-bot-api/src/telegram');
const axios = require("axios");



// replace the value below with the Telegram token you receive from @BotFather
const token = '5168646935:AAEF3WZpUShu0y-6qzsztJWRPLNGGXfBb_w';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {

  const chatId = '#-442113284';
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  
  if(msg.text.substring(0, 6) === '/indir'){
    bot.sendMessage(chatId, '/indir');
    
    let videoId = msg.text.split('&')[0];
    let str = videoId.substring(videoId.indexOf("=") + 1);
 
    console.log(str);
 
    const options = {
        method: 'GET',
        url: 'https://youtube-mp3-download1.p.rapidapi.com/dl',
        params: {id: `${str}`},
        headers: {
          'X-RapidAPI-Host': 'youtube-mp3-download1.p.rapidapi.com',
          'X-RapidAPI-Key': 'e6bd8c286bmsha4f19331eb6d325p1f9d8ajsn784a34fb7bee'
        }
      };
      
      axios.request(options).then(function (response) {
          let myLink =response.data
         console.log(myLink);
          bot.sendMessage(chatId, `${myLink.link}`);
      }).catch(function (error) {
          console.error(error);
          bot.sendMessage(chatId, `error`);
      });


   
  }
  console.log(msg.text)

  bot.sendMessage(chatId, 'Received your message');
});