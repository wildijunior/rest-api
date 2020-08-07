// require modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// create app
const app = express();

// set ejs
app.set("view engine", "ejs");

// app uses
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// connect DB
mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// schema
const articleSchema = mongoose.Schema({
  title: String,
  content: String,
});

// model
const Article = mongoose.model("Article", articleSchema);

///////////////////////////
//  GET API HOME ROUTE
app.get("/", (req, res) => {
  res.render("home");
});

/////////////////////////////
// GET API DOCS ROUTE
app.get("/apidocs", (req, res) => {
  res.render("apidocs");
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                      REQUEST PARA TODOS OS ARTIGOS
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// API - APP.ROUTE()
// concatenamos os metodos aplicaveis na mesma route
app
  .route("/artigos")

  // API -GET ALL
  .get((req, res) => {
    Article.find((err, artigosEncontrados) => {
      res.send(artigosEncontrados);
    });
  })
  // API -POST NEW ARTICLE
  .post((req, res) => {
    const novoArtigo = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    // quando salvar no DB
    // envia de volta o resultado do post tratando se houver erro
    novoArtigo.save((err) => {
      if (!err) {
        res.send("Successfully added a new article!!");
      } else {
        res.send(err);
      }
    });
  })

  // API - DELETE ALL
  .delete((req, res) => {
    Article.deleteMany((err) => {
      if (!err) {
        res.send("Todos os artigos foram deletados da collection");
      } else {
        res.send(err);
      }
    });
  });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                      REQUEST PARA ARTIGO ESPECIFICO
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app
  .route("/artigos/:tituloArtigo")

  // GET - request de titulo especifico
  .get((req, res) => {
    // titulo requisitado: req.params.tituloArtigo
    Article.findOne({ title: req.params.tituloArtigo }, (err, foundArticle) => {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("Nenhum artigo encontrado com o titulo especificado!!");
      }
    });
  })

  // PUT - request para update completo do artigo especifico
  .put((req, res) => {
    Article.updateOne(
      // condicoes para update.
      // vamos procurar pelo titulo que vamos atualizar
      { title: req.params.tituloArtigo },
      // update que vamos fazer
      // no titulo especificado vamos inserir o novo titulo e o novo conteudo
      { title: req.body.title, content: req.body.content },
      // propriedade de overwrite
      { overwrite: true },
      (err) => {
        if (!err) {
          res.send("Artigo atualizado com sucesso!!");
        }
      }
    );
  })

  // PATCH (update apenas um campo)
  .patch((req, res) => {
    Article.updateOne(
      { title: req.params.tituloArtigo },
      { $set: req.body },
      (err) => {
        if (!err) {
          res.send("Artigo atualizado com sucesso!!");
        } else {
          res.send(err);
        }
      }
    );
  })

  // DELETE (request para deletar um document especifico)
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.tituloArtigo }, (err) => {
      if (!err) {
        res.send("Artigo especificado, deletado com sucesso!!");
      } else {
        res.send(err);
      }
    });
  });



  
///////////////////////////
//  APP LISTEN
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
  console.log("Server up and running!!");
});
