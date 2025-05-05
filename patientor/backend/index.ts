const PORT = 3001;

import app from "./app";

app.listen(PORT, (error) => {
  if (error) {
    console.log(error.message);
    return;
  }
  console.log(`Server is running on port ${PORT}`);
  console.log(`link http://localhost:${PORT}`);
});
