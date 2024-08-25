const express=require('express')
const router=express.Router()
let users=require('../../Users');
//get all users
router.get('/',(req,res)=>{
    res.json(users);
});
//get users by id
router.get
module.exports=router
