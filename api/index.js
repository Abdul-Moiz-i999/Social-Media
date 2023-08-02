const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");

// All routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, () =>
  console.log("successfully connected to DB")
);

// app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.static("public"));

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    console.log("*********************************\n");
    console.log(req.body);
    console.log("*********************************\n");

    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File Uploaded Successfully");
  } catch (err) {
    console.log(err);
  }
});

// routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);

app.listen(8800, () => console.log("Started Listening at PORT 8800"));

app.get("/", (req, res) => res.send("Hello  "));
