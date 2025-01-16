import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { addNewPost,getAllPost,getAllPostProducts, getUserPost, likePost, dislikePost, addComment, getCommentsOfPost, deletePost, bookmarkPost , getSinglePost, getProductDataAmazon,getProductDataFlipkart, getProductDataMyntra} from "../controllers/post.controller.js";
const router = express.Router();

router.route("/addpost").post(isAuthenticated, upload.single('image'), addNewPost);
router.route("/all").get(isAuthenticated,getAllPost);
router.route("/allproducts").get(isAuthenticated,getAllPostProducts);
router.route("/posts/:idOrSlug").get(getSinglePost);
router.route("/userpost/all").get(isAuthenticated, getUserPost);
router.route("/:id/like").get(isAuthenticated, likePost);
router.route("/:id/dislike").get(isAuthenticated, dislikePost);
router.route("/:id/comment").post(isAuthenticated, addComment); 
router.route("/:id/comment/all").post(isAuthenticated, getCommentsOfPost);
router.route("/delete/:id").delete(isAuthenticated, deletePost);
router.route("/:id/bookmark").get(isAuthenticated, bookmarkPost);
router.route("/scrap/amazon").post(isAuthenticated, getProductDataAmazon)
router.route("/scrap/flipkart").post(isAuthenticated, getProductDataFlipkart)
router.route("/scrap/myntra").post(isAuthenticated, getProductDataMyntra)

export default router;

