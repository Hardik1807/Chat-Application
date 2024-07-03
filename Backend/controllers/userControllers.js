import User from "../models/usermodel.js"; 
import bc from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { FullName, username, Password, confirmPassword, gender } = req.body;
        console.log(FullName, username, Password, confirmPassword, gender);

        if (!FullName || !username || !Password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (Password !== confirmPassword) {
            return res.status(400).json({ message: "Password and confirm Password fields should be same" });
        }

        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists. Please login" });
        }

        const hashedPassword = await bc.hash(Password, 10);

        const profilePhoto = gender === "male" ?
            `https://avatar.iran.liara.run/public/boy?username=${username}` :
            `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = await User.create({
            FullName,
            username,
            Password: hashedPassword,
            profilePhoto,
            gender
        });

        return res.status(201).json({ message: "User Signed-Up successfully"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req,res) => {
    try {
        const { username, Password } = req.body;

        if(!username || !Password){
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ message: "Username doesnot exist. Please signup" });
        }

        let ispasstrue = await bc.compare(Password,user.Password)

        if(!ispasstrue){
            return res.status(400).json({ message: "Incorrect Username or Password" });
        }

        const tokendata = {
            id:user._id,
        }

        const token = jwt.sign(tokendata,"hgsfjahjf",{ expiresIn: '1d' })
        
        return res.status(200).cookie("token",token,{maxAge : 24*60*60*1000}).json({
            _id:user._id,
            username:user.username,
            fullname:user.FullName,
            profilePhoto:user.profilePhoto,
            message:"Login is done successfully"
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = async (req,res) => {
    try {

        res.clearCookie("token").json({
            message: "Logged out successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });   
    }
}

export const getOtherUser = async (req,res) => {
    try {
        
        const loggedInUser = req.id;
        const OtherUser = await User.find({_id:{$ne : loggedInUser}}).select("-Password");
        return res.status(200).json(OtherUser);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" }); 
    }
}
