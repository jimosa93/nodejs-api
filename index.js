const http = require('http')
const { bodyParser } = require('./lib/bodyParser')

let tasks = [{ id: '1', desc: 'Correr'}]

const getTasks = (req, res) => {
   res.writeHead(200, {'Content-Type':'application/json'})
   res.write(JSON.stringify(tasks))
   res.end()
}

const updateTask = async (req, res) => {
   await bodyParser(req)
   tasks = tasks.map(( task ) => {
      return task.id === req.body.id ? {...task, ...req.body } : task 
   });
   res.writeHead(200, {'Content-Type': 'text/plain'}) 
   res.write('Update successfully')
   res.end()
}

const createTask = async (req, res) => {
   await bodyParser(req)
   tasks = [...tasks, req.body]
   res.writeHead(200, {'Content-Type':'application/json'})
   res.write(JSON.stringify(tasks))
   res.end();
}

const deleteTask = (req, res) => {
   let { url } = req
   let idQuery = url.split("?")[1]
   let idKey = idQuery.split("=")[0]
   let idValue  = idQuery.split("=")[1]
   if (idKey === "id") { 
      tasks = tasks.filter((task) => {
         return task.id !== idValue;
      });
      res.writeHead(200, {'Content-Type': 'text/plain'}) 
      res.write('Delete successfully')
      res.end()
   } else {
      res.writeHead(200, {'Content-Type': 'text/plain'}) 
      res.write('Invalid Request Query')
      res.end()
   }
}

const server = http.createServer((req, res) => {
   const { url, method } = req;
   switch (method) {
      case 'GET' : 
         if (url=='/') {
            res.writeHead(200, {'Content-Type': 'application/json'}) 
            res.write(JSON.stringify({ message: 'Hello world'}))
            res.end()
         }
         if (url=='/tasks') {
            getTasks(req, res)
         }
         
         break;
      case 'POST': 
         if (url=='/task') {
            createTask(req, res)
         }
         break; 
      case 'DELETE': 
         deleteTask(req, res)
         break;
      case 'PUT': 
         updateTask(req, res)
         break
      default: 
         res.writeHead(200, {'Content-Type': 'text/plain'}) 
         res.write('Bad Method')
         res.end()
         break;
   }
 })

 server.listen(3000)
 console.log('Server running on port 3000')