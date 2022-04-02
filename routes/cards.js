const router = require('express').Router();


const {
  getCards,
  deleteCardById,
  postCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

// GET /cards
router.get('/', getCards);

// DELETE /cards/:cardId
router.delete('/:cardId', deleteCardById);

// POST /cards
router.post('/', postCard);

// PUT /cards/:cardId/likes
router.put('/:cardId/likes', putLike);

// DELETE /cards/:cardId/likes
router.delete('/:cardId/likes', deleteLike);
 

module.exports = router;
