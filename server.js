require('dotenv').config()
const express = require ('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())
const secret ='197bec0e5dfc51f4f747bdc0a919dd726766dbfa68c203d1f63c617beda922486d640fdb73ca46300f0f70f5131cd1d2712df775ea5d381b56f22ab0cd19edcc'
const posts =
[{
username :"swapnil",
title:"post 1"
},
{
username :"swapnil",
title:"post 2"
}]

app.get('/posts', authenticateToken, (req,res)=>{
res.json(posts.filter(post=>post.username===req.user.name)) 
})

app.post('/login', (req,res)=>{
    const username = req.body.username
    const user={ name: username }
    const accessToken=jwt.sign(user, secret)
    res.json({ accessToken: accessToken})
})

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, secret,(err, user)=> {
    if (err) {
        return res.send(403)
    }
    req.user=user
    next()
    })
}

app.listen(3000)