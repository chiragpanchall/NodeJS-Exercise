const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fName: String,
    lName: String
});

const user = mongoose.model('user', userSchema);

function connect() {
    mongoose.connect('mongodb://localhost:27017', () => {
        console.log("database connected");
    });
}

function insertUser(obj) {
    const user1 = new user(obj);
    user1.save((err, doc) => {
        if (err) return false;
        return doc;;
    });
}

async function getUser() {
    const data = await user.find({});
    return data;
}


async function deleteUser(id) {
    await user.deleteOne(id)
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log("Error" + error);
        });
}

async function updateUser(filter, newdata) {
    let data = await user.findOneAndUpdate(filter, newdata, { new: true });
}

module.exports = { connect, insertUser, getUser, deleteUser, updateUser };