const http = require('http')
const { bodyParser } = require('./lib/bodyParser')

const server = http.createServer(async (req, res) => {
   const { url, method } = req;
   if (method=='GET') {
      res.writeHead(200, {'Content-Type':'application/json'})
      res.write(JSON.stringify({ message: 'Response from server for GET Method' }))
      res.end()
   } else if (method == 'POST')  {
      await bodyParser(req)
      res.writeHead(200, {'Content-Type':'application/json'})
      res.write(JSON.stringify({ message: 'Response from server for POST Method', content_task: req.body.task }))
      res.end()
   }
 })

 server.listen(3000)
 console.log('Server running on port 3000')