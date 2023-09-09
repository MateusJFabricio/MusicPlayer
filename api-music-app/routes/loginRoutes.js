var md5 = require('md5');
const router = require('express').Router()

router.post("/", (req, res)=>{
    try {
        const user = req.body['user']
        const password = req.body['password']

        if (!user || !password){
            throw new Error('Error: Parameter missing')
        }

        const userMd5 = md5(user)
        const pwdMd5 = md5(password)

        if (userMd5 === 'eb0a191797624dd3a48fa681d3061212' && pwdMd5 === 'b01ff228a597bffa84bd722081184105'){
            res.status(200).json({accepted: true, level: 9});
        }else if (userMd5 === '21232f297a57a5a743894a0e4a801fc3' && pwdMd5 === '4582ef600b4316d72eede3ef78fc77d9')
            res.status(200).json({accepted: true, level: 2});
        else{
            res.status(200).json({accepted: false, level: 1});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

module.exports = router