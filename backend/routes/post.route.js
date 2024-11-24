import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'
import { upload } from '../middlewares/multer.js'
import { addComment, addNewPost, bookmarksPost, deletePost, dislikePost, getAllposts, getCommetsOfPost, getUserPost, likePost } from '../controllers/post.controller.js'
const router = express.Router()

router.route('/addpost').post(isAuthenticated, upload.single('image'), addNewPost)
router.route('/all').get(isAuthenticated, getAllposts)
router.route('/:id/like').post(isAuthenticated, likePost)
router.route('/:id/dislike').post(isAuthenticated, dislikePost)
router.route('/:id/comment').post(isAuthenticated, addComment)
router.route('/:id/comment/all').post(isAuthenticated, getCommetsOfPost)
router.route('/delete/:id').delete(isAuthenticated, deletePost)
router.route('/:id/bookmark').get(isAuthenticated, bookmarksPost)

export default router