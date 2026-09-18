const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const girlNames = [
    "Jessica", "Emily", "Ashley", "Sarah", "Chloe", "Madison", "Taylor", "Hannah", "Megan", "Alyssa",
    "Samantha", "Brianna", "Kayla", "Alexis", "Victoria", "Lauren", "Grace", "Zoe", "Hailey", "Savannah"
];

let bots = [];
for (let i = 1; i <= 100; i++) {
    let randomName = girlNames[Math.floor(Math.random() * girlNames.length)] + "_" + Math.floor(Math.random() * 899 + 100);
    bots.push({
        id: `bot_${i}`,
        username: randomName,
        isBot: true
    });
}

const botMessages = [
    "Hey everyone! What's up? ✨",
    "Anyone down to chat for a bit?",
    "Just chilling and listening to some music 🎶",
    "Anyone here from California or NY?",
    "Having such a lazy day today lol",
    "What are your plans for the weekend?",
    "Hi there! Hope you're having a good day 😊",
    "Coffee is literally keeping me alive right now ☕",
    "Did anyone watch that new movie yet?",
    "Vibing and chatting, hbu guys?"
];

io.on('connection', (socket) => {
    socket.on('chat_message', (data) => {
        io.emit('chat_message', { username: data.username, message: data.message });
    });
});

setInterval(() => {
    if (bots.length > 0) {
        const randomBot = bots[Math.floor(Math.random() * bots.length)];
        const randomMsg = botMessages[Math.floor(Math.random() * botMessages.length)];

        io.emit('chat_message', {
            username: randomBot.username,
            message: randomMsg,
            isBot: true
        });
    }
}, 5000);

setInterval(() => {
    const fakeOnlineCount = Math.floor(Math.random() * 100) + 950;
    const fakeGirlsCount = Math.floor(Math.random() * 15) + 90;

    io.emit('update_stats', {
        onlineCount: fakeOnlineCount,
        girlsCount: fakeGirlsCount
    });
}, 3000);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
