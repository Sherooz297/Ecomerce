const mongoose = require('mongoose')

const productmodal = new mongoose.Schema({
    name: {
        type: String,
        required:[true,"please enter product name"] 
    },
    description: {
        type: String,
        required: [true,"please enter product description"] 
    },
    price: {
        type: Number,
        required: [true,"please enter product price"] ,
        maxLength:[9,"price can't e increase 8 digits"]
    },
    rating: {
        type: Number,
        default:0
    },

    images: [{
       public_id:{
        type:String,
        required:true
       },
       url:{
        type:String,
        required:true
       }
     }],
     category:{
        type:String,
        required: [true,"please enter product category"]
     },
     Stock:{
        type:Number,
        required: [true,"please enter product Stock"],
        maxLength:[4,"price can't e increase 4 digits"],
        default:0
     },
     numberOfReviews:{
        type:Number,
        default:0
    },
      reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
             },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String
            }
        }
     ],


     user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
     },

     createdAt:{
        type:Date,
        default:Date.now
     }
    
})

module.exports = mongoose.model("product",productmodal)