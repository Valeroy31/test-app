const userModel = require('../Models/user.model')

const fetchUserPage = (req, res)=>{
  res.render('signup')
}

const fetchLoginPage = (req, res)=>{
    res.render('login')
}

const postLoginPage = async (req,res)=>{
     try {

    if (req.body.password != req.body.confirmPassword) {
      console.log('Wrong password');
      res.redirect('/signup')
    }
    else {
      const user = await userModel.create(req.body)
      console.log(user);
      res.redirect('/login')
    }


  } catch (error) {
    console.log(error.message);
    if (error.message.includes("user_collection validation failed")) {
      errormessage = "All fields are mandatory"
      return res.redirect("/signup")
    }

    if (error.message.includes("E11000 duplicate key error collection")) {
      errormessage = "User Already exist"
      return res.redirect("/signup")
    }

    return res.redirect("/signup")

  }
}

const getDashboardPage = async (req, res)=>{
 try {
    let allUsers = await userModel.find({});
    res.render('dashboard', { allUsers });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error loading dashboard');
  }
}

const postDashboardPage = async (req,res)=>{
     try {
    console.log(req.body);
    const { email, password, username } = req.body
    const existingUser = await userModel.findOne({ email })
    if (existingUser && existingUser.password === password) {
      console.log('login successful', username);
      res.redirect('/dashboard')
    }
    else {
      console.log('invalid email or password');
      res.redirect('/login')

    }



  } catch (error) {
    console.log(error);

  }
}

module.exports = {fetchUserPage, fetchLoginPage, postLoginPage, getDashboardPage, postDashboardPage}