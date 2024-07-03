import jwt from "jsonwebtoken"

const isAuthenticate = async (req,res,next) =>{
    try{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({error:"Please Login first"})
    }
    const decoded = await jwt.verify(token,"hgsfjahjf");
    
    if(!decoded){
        return res.status(401).json({error:"Invalid token"});
    }
    req.id=decoded.id;
    next()
    }catch(err){
        res.status(401).json({error:"Invalid token"})
        console.log(err);
    }
}

export default isAuthenticate;