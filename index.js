const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cv = require('opencv4nodejs');

const FPS = 10;
const cap = new cv.VideoCapture(0);

cap.set(cv.CAP_PROP_FRAME_WIDTH, 300);
cap.set(cv.CAP_PROP_FRAME_HEIGHT, 300);

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

setInterval(() => {
    var frame = cap.read();
    var image = cv.imencode('.jpg', frame).toString('base64');
    io.emit('image', image)
}, 100);

server.listen(3000);