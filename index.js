// Config inicial
require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");


const personRoutes = require("./routes/personRoutes");

// Forma de ler JSON / middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Rotas da API
app.use('/person', personRoutes);

// Rota inicial/endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Oi Express!",
  });
});

// Entregar uma porta
const DB_user= process.env.DB_USER;
const DB_password =  process.env.DB_PASSWORD;

mongoose.set("strictQuery", true);
mongoose
  .connect(
    `mongodb+srv://${DB_user}:${DB_password}@cluster0.vvv084l.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(3000);
    console.log("Conectamos ao MongoDB!");
  })
  .catch((err) => console.log(err));
