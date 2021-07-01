require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("mongoDB connected");
  } catch (err) {
    console.log(err);
  }
};
connectDB();
const port = process.env.PORT || 6000;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const cors = require("cors");

const productRoute = require("./routes/product.route");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const cartRoute = require("./routes/cart.route");

const apiProductRoute = require("./api/routes/product.route");
const apiUserRoute = require("./api/routes/user.route");
const apiAuthRoute = require("./api/routes/auth.route");
const apiSearchRoute = require("./api/routes/search.route");
const apiOrderRoute = require("./api/routes/order.route");

const authMiddleware = require("./middlewares/auth.middleware");
const sessionMiddleware = require("./middlewares/session.middleware");

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(cors());

// // Add headers
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static("public"));
app.use(sessionMiddleware);

app.use("/api/products", apiProductRoute);
app.use("/api/users", apiUserRoute);
app.use("/api/", apiAuthRoute);
app.use("/api/search", apiSearchRoute);
app.use("/api/orders", apiOrderRoute);

// app.use(authMiddleware.authMiddleware)

app.use("/products", authMiddleware.authMiddleware, productRoute);
app.use("/users", userRoute);
app.use("/cart", authMiddleware.authMiddleware, cartRoute);
app.use("", authRoute);

app.get("/", authMiddleware.authMiddleware, (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server start at http://localhost:${port}`);
});
