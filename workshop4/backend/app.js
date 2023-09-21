const express = require("express");
const { getDB, saveData, createToken, auth } = require("./utils");
const cors = require("cors");
const COLLECTION_NAME = "tasks"
const app = express();

app.use(express.json());
app.use(cors());

const users = [
  {email: "test@miu.edu", password: "123"}
]
app.post("/login", (req, res) => {
  const user = req.body;
  let found = users.find(x => x.email === user.email && x.password === user.password);
  if (!found) {
    res.send({ success: false, error: "Wrong email" });
    return;
  }
  const token = createToken(found);
  res.send({ success: true, data: token });
});

app.use(auth);

app.get("/tasks", (req, res) => {
  let db = getDB(COLLECTION_NAME);
  res.send({ success: true, data: db });
});
app.get("/tasks/:id", (req, res) => {
  let db = getDB(COLLECTION_NAME);
  let found = db.find(x => x.id === req.params.id);
  if (!found) {
    res.send({ success: false, error: "Cannot find the data" });
    return;
  }
  res.send({ success: true, data: found });
});
app.post("/tasks", (req, res) => {
  try {
    let data = req.body;
    let coll = COLLECTION_NAME;
    const db = getDB(coll);
    data.id = "" + db.length;
    db.push(data);
    saveData(coll);
    res.send({ success: true });
  } catch (error) {
    console.log(error)
    res.send({ success: false, error: "Server Error" });
  }
});

app.put("/tasks/:id", (req, res) => {
  try {
    let data = req.body;
    let coll = COLLECTION_NAME;
    const db = getDB(coll);
    for (let i = 0; i < db.length; i++) {
      if (db[i].id === req.params.id) {
        let updated = { ...db[i], ...data };
        db[i] = updated;
        saveData(coll);
        res.send({ success: true });
        return;
      }
    }
    res.send({ success: false, error: "Cannot find the data" });
  } catch (error) {
    res.send({ success: false, error: "Server Error" });
  }
});

app.delete("/tasks/:id", (req, res) => {
  try {
    let coll = COLLECTION_NAME;
    const db = getDB(coll);
    let index = db.findIndex(x => x.id === req.params.id);
    if (index === -1) {
      res.send({ success: false, error: "Cannot find the data" });
      return;
    }
    db.splice(index, 1);
    saveData(coll);
    res.send({ success: true });
  } catch (error) {
    res.send({ success: false, error: "Server Error" });
  }
});

app.use((req, res, next) => {
  res.send("API is not supported");
});

let PORT = 5001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
