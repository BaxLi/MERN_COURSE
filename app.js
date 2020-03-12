const express = require('express')
const config = require('config')
const cool = require('cool-ascii-faces')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

// @ts-ignore
app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))
app.use('/cool', (req, res) => res.send(cool()))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
// const PORT = config.get('port') || 5000
// console.log("config.get('port')=", config.get('port'));

//-------- for HEROKU deployment --------------------------------------------------
const PORT = process.env.PORT
console.log("config.get('port')=", process.env.PORT );
//---------------------------------------------------------------------------------

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`aPP started on port ${PORT} !`))
  } catch (error) {
    console.log('server db error, ->', error )
    process.exit(1)
  }
}

start()
