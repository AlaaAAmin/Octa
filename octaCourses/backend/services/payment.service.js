const { Stripe } = require('../config/config.json').PAYMENT
var stripe = require('stripe')(Stripe.Test_Env.Secret_Key);

module.exports = stripe
