const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (like the HTML)
app.use(express.static('public'));

// When a user connects
io.on('connection', (socket) => {
    console.log('a user connected: ' + socket.id);

    // Listen for messages from the client
    socket.on('chat message', (msg) => {
        // Broadcast the message to all other clients
        socket.broadcast.emit('chat message', msg);
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        console.log('user disconnected: ' + socket.id);
    });
});

// Start the server
const port = process.env.PORT;
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
