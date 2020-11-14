/* 
https://socket.io/get-started/chat/

Enable es module: https://blog.logrocket.com/es-modules-in-node-today/
__dirname is not defined: https://nodejs.org/api/esm.html#esm_no_require_exports_module_exports_filename_dirname

*/
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.broadcast.emit('Welcome!')

  socket.on('chat:message', msg => {
    console.log('message: ' + msg)
    io.emit('chat:message', msg)
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('Sorry to see you go!')
    console.log('user disconnected')
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})