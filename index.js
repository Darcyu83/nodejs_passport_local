const app = require("./app");

const PORT = app.get("port");
app.listen(PORT, () => {
  console.log("####################################");
  console.log(`### Server Start on port:${PORT} ###`);
  console.log("####################################");
});
