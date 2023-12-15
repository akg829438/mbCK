const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../model/userLoginPart/user_modal");
const Cart = require("../model/cart/addtocart_model");
const jwt = require("jsonwebtoken");
const UserLoginModel = require("../model/userLoginPart/user_modal");
const AddToCartModel = require("../model/cart/addtocart_model");
const { JWT_SECRET_KEY } = require("../constent/Constent");
const { JWT } = require("google-auth-library");
const WishlistModel = require("../model/wishlist/wishlist_model");
require("dotenv").config();

const PORT = process.env.PORT
const HOST = process.env.HOST
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `http://${HOST}:${PORT}/auth/facebook/callback`,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await UserLoginModel.findOne({ facebookId: profile.id });
      console.log(profile);
      if (existingUser) {
        jwt.sign(
          {
            userId: existingUser._id,
          },
         JWT_SECRET_KEY,
          (err, token) => {
            console.log(token);
            existingUser.token = token;
            return done(null, existingUser);
          }
        );
      } else {
        const existingUserWithEmail = await UserLoginModel.findOne({
          email: profile._json.email,
        });
        if (existingUserWithEmail) {
          existingUserWithEmail.facebookId = profile.id;
          await existingUserWithEmail.save();
          jwt.sign(
            {
              userId: existingUserWithEmail._id,
            },
            JWT_SECRET_KEY,
            (err, token) => {
              existingUserWithEmail.token = token;
              return done(null, existingUserWithEmail, token);
            }
          );
        } else {
          const cart = await new AddToCartModel({ items: [], user: null }).save();
          const wishlist = await new WishlistModel({ items: [], user: null }).save();
          const newUser = await new UserLoginModel({
            facebookId: profile.id,
            name: profile._json.name,
            email: profile._json.email,
            cart: cart._id,
            wishlist:wishlist._id
          }).save();
          cart.user = newUser._id;
          wishlist.user=newUser._id
          cart.save();
          wishlist.save();
          jwt.sign(
            {
              userId: newUser._id,
            },
            JWT_SECRET_KEY,
            (err, token) => {
              newUser.token = token;
              console.log(token);

              return done(null, newUser, token);
            }
          );
        }
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://${HOST}:${PORT}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
       
      const existingUser = await UserLoginModel.findOne({ googleId: profile.id });
      if (existingUser) {
        jwt.sign(
          {
            userId: existingUser._id,
          },
          JWT_SECRET_KEY,
          (err, token) => {
            console.log(token);
            existingUser.token = token;
            return done(null, existingUser);
          }
        );
      } else {
        const existingUserWithEmail = await UserLoginModel.findOne({
          email: profile._json.email,
        });
        if (existingUserWithEmail) {
          existingUserWithEmail.googleId = profile.id;
          await existingUserWithEmail.save();
          jwt.sign(
            {
              userId: existingUserWithEmail._id,
            },
            JWT_SECRET_KEY,
            (err, token) => {
              existingUserWithEmail.token = token;
              return done(null, existingUserWithEmail, token);
            }
          );
        } else {
          const cart = await new Cart({ items: [], user: null }).save();
          const wishlist = await new WishlistModel({ items: [], user: null }).save();
          const newUser = await new User({
            googleId: profile.id,
            name: profile._json.name,
            email: profile._json.email,
            cart: cart._id,
            wishlist:wishlist._id
          }).save();
          cart.user = newUser._id;
          cart.save();
          wishlist.user=newUser._id;
          wishlist.save();
          jwt.sign(
            {
              userId: newUser._id,
            },
            JWT_SECRET_KEY,
            (err, token) => {
              newUser.token = token;
              console.log(token);

              return done(null, newUser, token);
            }
          );
        }
      }
    }
  )
);
