const {Schema, model, Types}=require('mongoose')

const sch = new Schema({
    from:{type:String, required:true},
    to:{type:String, required:true, unique:true},
    code:{type:String, required:true, unique:true},
    data:{type:Date, default:Date.now},
    cliks:{type:Number, default:0},
    owner:{type:Types.ObjectId, ref:'User'}
})

module.exports= model('Link', sch)
