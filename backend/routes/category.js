import express from 'express';
import { isAdmin, isAuth } from '../controllers/auth';
import { list, create, read , cateByID, update, remove } from '../controllers/category';
import { userbyId } from '../controllers/user'
const router = express.Router()


// Lấy UserID từ param

router.param("userId", userbyId);

// Lấy param

router.param("categoryId", cateByID);

// Tạo danh mục

router.post('/category/:userID', isAuth, isAdmin, create);

// Danh sách danh mục

router.get("/category", list);

// Chi tiết danh mục

router.get('/category/:categoryId', read);

// Chỉnh sửa danh mục

router.put('/category/:categoryId', update);

// Xóa danh mục

router.delete('/category/:categoryId', remove);


// Exports

module.exports = router;

