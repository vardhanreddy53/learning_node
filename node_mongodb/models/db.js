const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/StudentDB', {
    useNewUrlParser: true,  // Correct option name
    useUnifiedTopology: true  // Recommended to avoid deprecation warnings
})
.then(() => {
    console.log('Connected successfully');
})
.catch((err) => {
    console.log('Error while connecting: ' + err);
});
require('./student.model');