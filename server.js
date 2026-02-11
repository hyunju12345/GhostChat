// importing the modules for http and websockets
const http = require('http');
const { WebSocketServer } = require('ws');

// setting up HTTP server
const server = http.createServer((req,res) =>{
    // sending header for the HTTP server response
    res.writeHead(200,{
        'Content-Type': 'text/plain'
    });
    res.end('Websocket server is runing!');
})

// passing in the HTTP server to make a new Web Socket Server
const wss = new WebSocketServer({server});

// telling our web socket server what we want it do when it gets a new connection
// and passing in a new socket for every new connection
wss.on('connection', (socket) =>{

    // printing to the web socket server console when a new client connects
    console.log('New client connected!');
    
    // telling our server what we want it to do when it receives a new message
    socket.on('message',(data)=>{ // data coming in 
         //prints to the message to the server console
        console.log('Received message: ',data.toString());

        
        // looping through each client 
        wss.clients.forEach(client => {
            // checks if client is ready to get a message 
            if(client.readyState === socket.OPEN){
                // sending the message to all the clients 
                client.send(data.toString()) // sending data back out
            }
        })
    })

    // tell our server what we want it do when the client disconnects
    socket.on('close', () => {
        console.log('Client disconnected'); 
    })
})


// telling our server which port to listen on 
server.listen(8080, () => {
    console.log('WebSocket server running on ws://localhost:8080'); 
})