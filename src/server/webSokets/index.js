
var wss = new WebSocket.Server({ port: 3001 });
wss.on('connection', function(ws) {
    ws.on('client_message', function incoming(message) {
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
