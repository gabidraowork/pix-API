import app from "./app.js";
import "dotenv/config"

const server = app;

const PORT = process.env.PORT;

server.listen(PORT, ()=>
    console.log(`Server runing on http://localhost:${PORT}`)
)

