const passport  = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const databaseController = require('../controller.js');


passport.serializeUser((user,done)=> {
	console.log('serializeUsserrr', user[0].dataValues.id);
	done(null, user[0].dataValues.id)});
passport.deserializeUser((id,done)=>{
		console.log('DEserializeUsserrr', user);
	let user = databaseController.login(id);
	done(err,user);
})


passport.use(new GoogleStrategy({
	// data required by Google Strategy
	callbackURL:'/auth/google/redirect',
	clientID:keys.google.clientID,
	clientSecret:keys.google.clientSecret
},(accessToken,refreshToken,profile,done)=>{

	databaseController.createUser(profile).then((user)=>{
		// console.log('USERRRR ', user);
		done(null,user)})

}))
