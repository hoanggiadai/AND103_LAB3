const express = require('express'); // Tham chiếu thư viện
const mongoose = require('mongoose');

// Tham chiếu sinhVienRoute
const sinhVienRoute = require('./routes/sinhVienRoute');

const bodyParser = require('body-parser');

// Tạo đối tượng express
const app = express();

// Kết nối với mongodb
mongoose.connect('mongodb://localhost:27017/AND103', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Kết nối thành công với MongoDB');
}).catch((err)=>{
    console.error('Lỗi kết nối: '+ err);
});

app.use(bodyParser.urlencoded({extended: false})); // Cho phép gọi thông qua PostMen
app.use(express.json()); // Chuyển về dạng json

// Sử dụng route
app.use('/sinhVien', sinhVienRoute);
app.use('/', sinhVienRoute);

// Sử dụng EJS làm view engine
app.set('view engine', 'ejs');

// Khởi động server
const PORT = process.env.PORT||3000;
app.listen(PORT, ()=>{
    console.log('Server đang chạy ở cổng 3000');
});