const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 32
    },
    hashed_password: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        trim: true,
    },
    salt: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    },

}, { timestamps: true });


// Tạo trường ảo password
// 2 phương thức là set() và get()
userSchema.virtual('password')
    .set(function (password) {

        //Gán giá trị cho trường password bằng tham số password
        this._password = password
        
        //Gán giá trị cho salt bằng phương thức uuidv1()
        this.salt = uuidv1()

        //Gán giá trị cho hash_password bằng kết quả của hàm encrytPassword với tham số là password
        this.hashed_password = this.encrytPassword(password)
    })
    .get(function () {
        return this._password
    })
//Thêm phương thức cho userSchema
userSchema.methods = {
    //Tạo phương thức authenticate, truyền tham số là mật khẩu nhập vào khi đăng nhập
    //So sánh với mật khẩu trong db
    authenticate: function (plainText) {
        return this.encrytPassword(plainText) === this.hashed_password;
    },
    //Tạo phương thức mã hóa mật khẩu
    encrytPassword: function (password) {
        //Kiểm tra sự tồn tại của password
        if (!password) {
            return '';
        }
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (error) {
            return '';
        }
    }
}

//Export Files
module.exports = mongoose.model("User", userSchema);
