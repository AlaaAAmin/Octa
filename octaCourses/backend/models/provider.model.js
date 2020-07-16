const mongoose = require('../services/mongodb.service').mongoose;
const uniqueValidator = require('mongoose-unique-validator');
const _EventEmitter = require('../services/event.service');
const Schema = mongoose.Schema;

// subdocument for strikes
const strikesSchema = new Schema({
    strike: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), required: true },
    happenedIn: { type: String, required: true }
})

// subdocument for metadata
const metaSchema = new Schema({
    strikes: [strikesSchema] | null,
    banned: { type: Boolean, required: true, default: false }
})

// generating new collection schema for provider 
// collection schema here is like when we create database tables schema in sql database
const providerSchema = new Schema({
    name: { type: String, required: true },
    email: {
        required: true, type: String, unique: true, lowercase: true, validate: {
            validator: (email) => {
                var re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                return re.test(String(email).toLowerCase());
            },
            message: props => `${props.value} is not a valid email address!`
        },
    },
    phone: {
        required: true, type: String, unique: true, validate: {
            validator: (phone) => {
                var re = new RegExp(/^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
                return re.test(String(phone).toLowerCase());
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    password: { required: true, type: String },
    verified: { required: true, type: Boolean, default: false },
    timestamp: { required: false, type: Number, default: Date.now() },
    permissionLevel: { required: true, default: 10, type: Number },
    meta: metaSchema | null
});

// apply this plugin enables the database to detect uniqueness of emails and phone numbers
mongoose.plugin(uniqueValidator);

// this line means the mongodb realizes this is a model and gives it a name which is 'providers'
const Provider = mongoose.model('providers', providerSchema);

// methods

// createProvider is a function that creates new provider using info provided to this function
// info: name, email, phone, and password
const createProvider = (providerData) => {
    const provider = new Provider(providerData);
    return provider.save();
}

// getProviderById is a function that finds provider by id
const getProviderById = (id) => {
    return new Promise((resolve, reject) => {
        Provider.findById(id)
            .then(user => {
                let data = user.toJSON();
                delete data.__v;
                if (data.meta.banned) return resolve('This provider is banned.')
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    })
}

// getProviderByEmail is a function that finds provider by id
const getProviderByEmail = (email) => {
    return new Promise((resolve, reject) => {
        Provider.findOne({ email: email })
            .then(user => {
                if (!user) return reject('Provider not found')
                let data = user.toJSON();
                delete data.__v;
                resolve(data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

// updateProvider is a function that finds provider by id
const updateProvider = (id, providerData) => {
    return new Promise((resolve, reject) => {
        Provider.findById(id, (err, user) => {
            if (err) return reject(err);
            for (let i in providerData) {
                user[i] = providerData[i];
            }
            user.save((err, updatedProvider) => {
                if (err) return reject(err);
                resolve(updatedProvider);
            })
        })
    })
}

// deleteById is a function that deletes provider by id
const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        Provider.remove({ _id: id }, (err) => {
            if (err) return reject(err);
            resolve({ success: true, message: 'Course provider deleted.' });
        })
    })
}

// addStrikeToProvider is a method that adds strikes to provider and when reach 3 strikes fires event
// that add this provider to queue of users that violates terms and conditions
const addStrikeToProvider = (providerId, strikeData) => {
    return new Promise((resolve, reject) => {
        Provider.findOne({ _id: providerId }, (err, doc) => {
            if (err) return reject(err)
            if (!doc) return reject('Provider does not exist.')
            doc.meta.strikes.push(strikeData)
            if (doc.meta.strikes.length >= 3) _EventEmitter.emit('provider-ready-to-be-banned', { providerId: providerId, strikes: doc.meta.strikes })
            resolve(doc.save())
        })
    })
}

// getBanReadyProviders is a method that fetches every provider that have 3 strikes or more
const getBanReadyProviders = () => {
    return new Promise((resolve, reject) => {
        Provider.find({ "meta.strikes.2": { "$exists": true } }, (err, docs) => {
            if(err) return reject(err)
            resolve(docs)
        })
    })
}

module.exports = {
    createProvider,
    getProviderById,
    getProviderByEmail,
    updateProvider,
    deleteById,
    Provider,
    addStrikeToProvider,
    getBanReadyProviders
}