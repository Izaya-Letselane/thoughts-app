import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { generateToken, setCookies, storeRefreshToken } from "../util/generateToken.js"
import jwt from 'jsonwebtoken'
import { redis } from "../lib/redis.js"

const signup = async(req,res)=>{
 const {name, email, password} = req.body

 try {
    const userExists = await User.findOne({email})
    if(userExists){
        return res.status(400).json({message: "User Already exists "})
    }
    //Hash passworword
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name, email, password:hashedPassword
    })
    //Authenticate 
    const {accessToken, refreshToken} = generateToken(user._id)
    await storeRefreshToken(user._id, refreshToken)
    setCookies(res, accessToken, refreshToken)
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        
    })
 } catch (error) {
    console.log("Error in signup controller", error)
    res.status(500).json({message: error.message})
 }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const { accessToken, refreshToken } = generateToken(user._id);

        await storeRefreshToken(user._id, refreshToken);

        setCookies(res, accessToken, refreshToken);

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });

    } catch (error) {
        console.log("Error in the Login function", error);

        return res.status(500).json({
            error: error.message,
        });
    }
};

const logout = async (req,res)=>{
    try {
        const refreshToken = req.cookies.refreshToken
        if(refreshToken){
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            await redis.del(`refresh_token:${decoded.userId}`)
        }
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        res.json({message: "Logged  out successfully"})
        
    } catch (error) {
        console.log("Error in logout",error)
        res.status(500).json({message: "Server error",error: message.error})
    }
}

const refreshToken = async(req,res)=>{
    try {
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken){
            return res.status(401).json({message: "No refresh Token"})
        }
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const storedToken= await redis.get(`refresh_token:${decoded.userId}`)
        if(storedToken!=refreshToken){
           return res.status(201).json({message: "Invalid refresh Token"})
        }

        const accessToken = jwt.sign({userId: decoded.userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"15m"})
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV=="production",
            sameSite:"strict",
            maxAge: 15 * 60 * 1000
        })
        res.json({message:"Token refreshed successfully"})
    } catch (error) {
        console.log("Error in refreshedToken controller", error)
        res.status(500).json({message: "Server Error", error: error.message})
    }
} 

const getProfile = async (req,res)=>{
   try {
    res.json(req.user)
   } catch (error) {
    res.status(500).json({message: "Server error",error: message.error})
   }
    
}

export{signup, login, logout, getProfile, refreshToken}