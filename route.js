const router  = require('express').Router();
const passport = require('passport');

router.get('/login', (req,res)=>{
	console.log('req url ', req.url)
	console.log('Login into the user')
})

router.get('/google', (req,res,next)=>{
	console.log('GOOGLE AUTH');
	next();
},passport.authenticate('google',{
	scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
	console.log('In the redirect method')
	res.send('you have been redirected');
})

//router.get('/google/redirect')
router.get('/logout', (req,res)=>{
	console.log('Logouttt')
})

module.exports = router;
