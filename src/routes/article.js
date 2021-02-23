import Router from "express";
import articleController from "../controllers/article.js";

const routes = Router();

routes
  .route("/")
  .get(articleController.getArticles)
  .post(articleController.postArticles)
  .delete(articleController.deleteArticles);

routes
  .route("/:articleId")
  .get(articleController.getArticle)
  .patch(articleController.patchArticle)
  .put(articleController.putArticles)
  .delete(articleController.deleteArticleById);

export default routes;
