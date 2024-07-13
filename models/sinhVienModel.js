const mongoose = require('mongoose');
const sinhVienSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    }
});

const sinhVien = mongoose.model('student', sinhVienSchema);
module.exports = sinhVien;