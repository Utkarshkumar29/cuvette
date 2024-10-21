const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../models/userModel')

const userRegistration=async(req,res)=>{
    const {name,email,password}=req.body
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json({ message: "User with this email already exists." })
        }
        const bcryptPass= await bcrypt.hash(password,10)
        const user=new User({
            name,
            email,
            password:bcryptPass
        })
        await user.save()
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(201).json({ message: "User registered successfully!",token })
    } catch (error) {
        console.log(error)
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDocs = await User.findOne({ email });
        if (userDocs) {
            const passOk = bcrypt.compareSync(password, userDocs.password);
            if (passOk) {
                jwt.sign({
                    username: userDocs.username,
                    email: userDocs.email,
                    id: userDocs._id,
                }, process.env.JWT_SECRET, {}, (err, token) => {
                    if (err) throw err;                    
                    res.cookie('token', token).send({userDocs,token});
                });
            } else {
                res.status(422).json('Password incorrect');
            }
        } else {
            res.status(404).json('User not found');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json('Internal server error');
    }
};


module.exports={userRegistration,userLogin}