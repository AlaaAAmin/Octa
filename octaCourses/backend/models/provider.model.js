const mongoose = require('../services/mongodb.service').mongoose;
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
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
        required: true, type: String, validate: {
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
    permissionLevel: { required: true, default: 10, type: Number }
});

mongoose.plugin(uniqueValidator);

providerSchema.virtual('id').get((_id) => { return _id.toString('hex') });

providerSchema.set('toJSON', {
    virtuals: true
});

const Provider = mongoose.model('providers', providerSchema);

// methods

const createProvider = (providerData) => {
    const provider = new Provider(providerData);
    return provider.save();
}

const getProviderById = (id) => {
    return new Promise((resolve, reject) => {
        Provider.findById(id)
            .then(user => {
                let data = user.toJSON();
                delete data.__v;
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    })
}

const getProviderByEmail = (email) => {
    return new Promise((resolve, reject) => {
        Provider.findOne({ email: email })
            .then(user => {
                if(!user) reject('Provider not found')
                let data = user.toJSON();
                delete data.__v;
                resolve(data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

const updateProvider = (id, providerData) => {
    return new Promise((resolve, reject) => {
        Provider.findById(id, (err, user) => {
            if (err) reject(err);
            for (let i in providerData) {
                user[i] = providerData[i];
            }
            user.save((err, updatedProvider) => {
                if (err) reject(err);
                resolve(updatedProvider);
            })
        })
    })
}

const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        Provider.remove({ _id: id }, (err) => {
            if (err) reject(err);
            resolve({ success: true, message: 'Course provider deleted.' });
        })
    })
}

module.exports.createProvider = createProvider;
module.exports.getProviderById = getProviderById;
module.exports.getProviderByEmail = getProviderByEmail;
module.exports.updateProvider = updateProvider;
module.exports.deleteById = deleteById;
module.exports.Provider = Provider;