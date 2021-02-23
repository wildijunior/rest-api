import Article from "../database/models/wikiModel.js";

export default {
  getArticles(req, res) {
    Article.find((err, articles) => {
      if (err) return console.error(err);
      // res.send(articles);
      res.json(articles);
    });
  },

  getArticle(req, res) {
    Article.findOne({ _id: req.params.articleId }, (err, article) => {
      if (err) return console.error(err);
      res.send(article);
    });
  },

  putArticles(req, res) {
    Article.updateOne(
      { _id: req.params.articleId },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      (err) => {
        if (err) return console.error(err);
        res.send(`Article updated!!`);
      }
    );
  },

  patchArticle(req, res) {
    Article.updateOne(
      { _id: req.params.articleId },
      { $set: req.body },
      (err) => {
        if (err) return console.error(err);
        res.send(`Article field updated!!`);
      }
    );
  },

  postArticles(req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save((err, newArticle) => {
      if (err) return console.error(err);
      res.send(`New article inserted successfully ${newArticle}`);
    });
  },

  deleteArticles(req, res) {
    Article.deleteMany((err) => {
      if (err) return console.error(err);
      res.send(`<h1>All the Articles were deleted successfully !!</h1>`);
    });
  },
  deleteArticleById(req, res) {
    Article.deleteOne({ _id: req.params.articleId }).exec();
    res.send(`<h3>Article deleted successfully by id !!</h3>`);
  },
};
