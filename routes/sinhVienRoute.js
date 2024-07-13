// Chứa các API
const express = require('express'); // Tham chiếu thư viện
const router = express.Router(); // Điều hướng lời gọi hàm
const sinhVien = require('../models/sinhVienModel'); // Tham chiếu đến model

// Lời gọi hàm (GET)
router.get('/', async(req, res)=>{ // Khi người dùng gọi localhost:3000/
    try {
        const sinhViens = await sinhVien.find(); // Lấy tất cả sinh viên có trong bảng dữ liệu
        // res.json(sinhViens); // Trả về Json
        res.render('sinhViens', {sinhViens: sinhViens}); // Trả về file ejs
        console.log(sinhViens); // Ghi ra log nếu cần
    } catch (err) {
        console.error(err); // In ra lỗi
        res.status(500).json({error: 'Không kết nối được với server'});
    }
});

// PORT: Tạo mới 1 sinh viên
// http://localhost:3000/sinhvien

router.post('/', async (req, res)=>{
    try {
        const {id, name} = req.body; // Nhập id, name
        const sinhVienAdd = new sinhVien({id, name}); // Tạo đối tượng sinhVienAdd với 2 giá trị nhập vào
        await sinhVienAdd.save(); // Lưu vào cơ sở dữ liệu
        res.status(201).json(sinhVienAdd); // Trả về kết quả cho người dùng biết
        console.log(sinhVienAdd);

    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Không kết nối được với Server'});
    }
});

// PUT: Cập nhật thông tin sinh viên
// http://localhost:3000/sinhvien/:_id

router.put('/:_id', async(req,res)=>{
    try {
        const {_id} = req.params; // Nhận tham số truyền
        const {name, id} = req.body; // Lấy nội dung người dùng nhập
        const updatedSinhVien = await sinhVien.findByIdAndUpdate(_id, {id, name}, {new: true});
        res.json(updatedSinhVien); // Trả kết quả cho người dùng
        console.log(updatedSinhVien); // In ra kết quả
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Không kết nối được với Server'});
    }
});

module.exports = router;