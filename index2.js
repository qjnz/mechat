/* 
https://socket.io/get-started/chat/

Enable es module: https://blog.logrocket.com/es-modules-in-node-today/
__dirname is not defined: https://nodejs.org/api/esm.html#esm_no_require_exports_module_exports_filename_dirname

*/

import express from 'express'
import http from 'http'
import { Server as SocketIO } from 'socket.io'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const server = http.createServer(app)
const io = new SocketIO(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('chat message', msg => {
    console.log('message: ' + msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(3001, () => {
  console.log('listening on *:3001')
})