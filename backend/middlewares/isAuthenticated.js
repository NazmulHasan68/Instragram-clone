import jwt from 'jsonwebtoken'

export const isAuthenticated = async(req, res, next)=>{
    try {
        const token = req.cookies.token;
        if(!token) return res.status(401).json({success:false, message:"User not Authenticated"})

        const decoded = await jwt.verify(token, process.env.JWT_KEY)
        if(!decoded) return res.status(401).json({success:false, message:"Invalid token"})
            
        req.id = decoded.userId
        next()
    } catch (error) {
        res.status(500).json({message : "User not Authenticatd"})
    }
}