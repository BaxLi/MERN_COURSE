const { Router } = require('express')
const router = Router()
const shortid = require('shortid')
const Link = require('../models/link')
const auth = require('../middleware/auth.middleware')
const config = require('config')
router.post('/generate', auth, async (req, res) => {
  console.log("link-routes /generate start");
  try {
    const baseUrl = config.get('baseUrl')
    const {from} = req.body

    const code = shortid.generate()
    const existing = await Link.findOne({ from })
    if (existing) {
      return res.json({ link: existing })
    }
    const to = baseUrl + '/t/' + code
    const link = new Link({
      // @ts-ignore
      code, to, from, owner: req.user.userId
    })
    // console.log("link-routes 6 ok, link=",link)
    link.save()
    console.log("link-routes 7 saved")
    res.status(201).json({ link })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    // @ts-ignore
    const links = await Link.find({owner: req.user.userId })
    res.json(links)
  } catch (error) {
    res.status(500).json({
      message: 'link-routes: server error - try again'
    })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (error) {
    res.status(500).json({
      message: 'link-routes: server error - try again'
    })
  }
})

module.exports = router
