const express = require('express'),
    app = express(),
    WebSocket = require('ws');


app.use('/', express.static('../build'));


var wss = new WebSocket.Server({ port: 3001 });
wss.on('connection', function(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
      });

    ws.send(JSON.stringify({
        "data": [
                { "title": "chart1", "id": 1 },
                { "title": "chart1", "id": 2 },
            ]
        })
    );
});

app.listen(3000);