const mongoose = require('mongoose');
const schemaName = new mongoose.Schema({
    nim: {
        type: String
    },
    nama: {
        type: String
    },
    program_studi: {
        type: String
    },
    jenis_kelamin: {
        type: String
    },
    no_telepon: {
        type: String
    },
    ipk: {
        type: Number
    }
}, {timestamps: true})

//YOU CAN ADD MIDDLEWARE UNDER HERE

const Schema = mongoose.model('Data_Mahasiswa', schemaName);
module.exports = Schema;