import app from "./app";

const PORT = 3003;

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error.message);
  }
  console.log(`Server is runnig on port ${PORT}`);
});
