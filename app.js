const express = require("express");
const { Sequelize } = require("sequelize");
const { SELECT } = require("sequelize/types/query-types");
const sequelize = new Sequelize("postgres", "postgres", "01031979", {
  host: "localhost",
  dialect: "postgres",
});
const app = express();

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({ extended: false });
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.get("/", function (_, response) {
  response.sendFile(__dirname + "/registration.html");
});
app.post("/", urlencodedParser, function (request, response) {
  if (!request.body) return response.sendStatus(400);
  console.log(request.body);

  response.send(`${request.body.userName} - ${request.body.userSurname}`);
});

app.listen(3000, () => console.log("Сервер запущен..."));
