const path = require('path');
const express = require('express');
const glob = require('glob');
const http = require('http');
const WebSocket = require('ws');
const app = express();
var fs = require("fs");
var mkdir = require('mkdirp');




const httpServer = http.createServer(app);

const PORT = process.env.PORT || 8000;

const wsServer = new WebSocket.Server({ server: httpServer }, () => console.log(`WS server is listening at ws://localhost:${WS_PORT}`));




//array of connected websocket clients
let connectedClients = [];
var i = 0;
wsServer.on('connection', (ws, req) => {
    if(ws.protocol===''){
        ws.protocol='bot'
    }
    console.log(ws.protocol)
    //console.log('Connected' + i++);
    // add new connected client
    connectedClients.push(ws);
    //console.log(ws)
    // listen for messages from the streamer, the clients will not send anything so we don't need to filter
    ws.on('message', data => {
        
        let idSend = data.split('_')[0];
        let idReceive = data.split('_')[2]

        // send the base64 encoded frame to each connected ws
        connectedClients.forEach((ws, i) => {
            if (ws.readyState === ws.OPEN) { // check if it is still connected
               


                if(idSend==='bot' && ws.protocol===idReceive && ws.protocol!=='bot' ){
                    ws.send(data);   
                }else if(ws.protocol==='bot'){
                    ws.send(data)
                }
                 
                // send
            } else { // if it's not connected remove from the array of connected ws
                connectedClients.splice(i, 1);
            }
        });
    });
});


//static folder img
app.use(express.static('public'));
// HTTP stuff
app.get('/index', (req, res) => res.sendFile(path.resolve(__dirname, './index.html')));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './index.html')));



httpServer.listen(PORT, () => console.log(`HTTP server listening at http://localhost:${PORT}`));
