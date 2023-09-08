const router = require('express').Router()

router.post("/", (req, res)=>{
    try {
        const user = req.body['user']
        const password = req.body['password']

        if (!user || !password){
            throw new Error('Error: Parameter missing')
        }

        if (user === 'admin' && password === '123'){
            res.status(200).json({accepted: true});
        }else{
            res.status(200).json({accepted: false});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

module.exports = router