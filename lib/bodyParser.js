const bodyParser = (req) => {
   return new Promise((resolve, reject) => {
      let jsonString = ''
      req.on('data', data => {
         jsonString += data
      })
      .on('end', () => {
         req.body = JSON.parse(jsonString)
         resolve()
      })
      .on('error', err => {
         console.log(err)
         reject()
      })
   })
}

module.exports = { bodyParser }