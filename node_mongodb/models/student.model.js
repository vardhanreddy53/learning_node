const mongoose=require('mongoose')
var studentSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:'this field is required'
    },
    email:{
        type:String,
        required:'this field is required'
    },
    mobile:{
        type:Number,
        required:'this field is required'
    },
    city:{
        type:String,
        required:'this field is required'
    },
});
mongoose.model("Student",studentSchema);