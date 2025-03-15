const express = require('express')
const app = express()
const PORT= 5000
const ejs = require('ejs')
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))
allUsers=[]

const mongoose = require('mongoose')
let URI = 'mongodb+srv://midstorm31:darkpagan31@cluster0.p2unj.mongodb.net/test-app_db?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(URI)
.then(()=>console.log('connected to database successfuly'))
.catch(err=>console.log(err))

//user schema
let userSchema = mongoose.Schema({
    firstName:{type:String, required:true, trim:true },
    lastName:{type:String, required:true, trim:true},
    email: {type:String, required:true,trim:true, lowercase:true, unique:true},
    password: {type:String, required:true,trim:true },
    registrationDate:{type:Date, default:Date.now()}


})

//user model, helps us to interact with the database and store the data collection
//in a variable which can be used anywhere in the code. It takes two parameters
//the name of the collection and the schema of the collection 
let userModel = mongoose.model('userDetails', userSchema)

app.get('/signup', (req,res)=>{
    allUsers=[]
    res.render('signup')
    
})

app.post('/dashboard', (req,res)=>{
    console.log(req.body);
   // allUsers.push(req.body)
   let form = new userModel(req.body)  //The form is a variable that allows us to be able to store the user's input on the frontend into the userModel variable/function,
                                        //  which contains the schema (structure of document)
   form.save()
   .then(()=>{
        console.log('user saved successfully');
        
   })
   .catch((err)=>{
            console.log('User not saved', err);
            
   })
    res.redirect('dashboard') 
    
  
})
//to display user on dashboard

app.get('/dashboard', async (req, res) => {
    try {
        // Fetch all users (or filter by logged-in user if needed)
        const allUsers = await userModel.find({}, { password: 0, sensitiveField: 0 }); // Exclude sensitive fields
        res.render('dashboard', { allUsers }); 
    } catch (err) {
        console.error('Could not get users:', err);
        res.status(500).send('An error occurred while fetching user data.');
    }
});




app.listen(PORT, (err)=>{
    if (err) {
       console.log('server dd not start');
        
    } else {
        console.log('server is active on port', PORT);
        
    }
})