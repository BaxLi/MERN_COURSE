const {Router}=require('express')
const Link=require('../models/link')
const router=Router()

router.get('/:code', async (req, res)=>{
    try {
        const link=await Link.findOne({code:req.params.code})
        if (link) {
            link.clicks++
            await link.save()
            return res.redirect(link.from)
        }
        else {
           res.status(404).json("link wasn't found") 
        }
    } catch (error) {
        
    }
} )
module.exports =router
