// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('../models/userModel'); // Adjust the path as needed

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: '/auth/google/callback'
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         let user = await User.findOne({ email: profile.emails[0].value });
//         if (!user) {
//             // Create a new user if it doesn't exist
//             user = new User({
//                 firstName: profile.name.givenName,
//                 lastName: profile.name.familyName,
//                 email: profile.emails[0].value,
//                 password: '' // Set a default password or leave it empty
//             });
//             await user.save();
//         }
//         done(null, user);
//     } catch (error) {
//         done(error);
//     }
// }));

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     const user = await User.findById(id);
//     done(null, user);
// });