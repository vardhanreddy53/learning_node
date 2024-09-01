const express=require('express')
var router=express.Router()
const mongoose=require('mongoose')
const Student=mongoose.model("Student")
router.get('/',(req,res)=>{
    res.render('student/addOrEdit',{
        viewTitle:"Insert Student"
    })
})
router.post('/',(req,res)=>{
    if(req.body._id=='')
        insertRecord(req,res)
    else
    updateRecord(req,res)
})
function insertRecord(req, res) {
    const student = new Student({
        fullName: req.body.fullName,
        email: req.body.email,
        mobile: req.body.mobile,
        city: req.body.city
    });

    student.save()
        .then(() => res.redirect('student/list'))
        .catch(err => {
            console.log("Error inserting: " + err);
            res.status(500).send('Error inserting record');
        });
}
function updateRecord(req, res) {
    Student.findOneAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true }
    )
    .then(doc => {
        if (doc) {
            res.redirect('student/list');
        } else {
            res.status(404).send('Student not found');
        }
    })
    .catch(err => {
        console.log("Error updating student: " + err);
        res.status(500).send('Error updating student');
    });
}

router.get('/list', (req, res) => {
    Student.find()
        .then(docs => {
            res.render('student/list', {
                list: docs
            });
        })
        .catch(err => {
            console.log("Error in retrieval: " + err);
        });
});
router.get('/:id', (req, res) => {
    Student.findById(req.params.id)
        .then(doc => {
            if (doc) {
                res.render('student/addOrEdit', {
                    viewTitle: 'Update Student',
                    student: doc,
                });
                console.log(doc);
            } else {
                res.status(404).send('Student not found');
            }
        })
        .catch(err => {
            console.log("Error finding student: " + err);
            res.status(500).send('Error finding student');
        });
});

router.get("/delete/:id", async (req, res) => {
    try {
        const doc = await Student.findByIdAndDelete(req.params.id);
        if (doc) {
            res.redirect('/student/list'); 
        } else {
            res.status(404).send('Student not found');
        }
    } catch (err) {
        console.log("Error deleting student: " + err);
        res.status(500).send('Error deleting student');
    }
});

module.exports=router