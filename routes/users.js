const router = require('express').Router();

const {
  getUsers,
  getUserById,
  getUserInfo,
  updateProfile,
  updateAvatar,
  createUsers,
} = require('../controllers/users');

// POST /users
router.post('/', createUsers);

// GET /users
router.get('/', getUsers);

// GET /users/me
router.get('/me', getUserInfo);

// PATCH /users/me
router.patch('/me', updateProfile);

// GET /users/:userId
router.get('/:userId', getUserById);

// PATCH /users/me/avatar
router.patch('/me/avatar', updateAvatar);

module.exports = router; 
