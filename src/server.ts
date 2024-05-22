import { Server } from "http";
import app from "./app";

const PORT = 5000;

async function main() {
  const server: Server = app.listen(PORT, () => {
    console.log("Flat Sharing server is listening on port", PORT);
  });
}

main();
