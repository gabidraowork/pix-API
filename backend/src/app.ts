import express from "express";
import authRoutes from "./routes/auth.routes.js"
import pixKeyRoutes from "./routes/pixKeys.routes.js"

const app = express();

app.use(express.json());

app.get("/", (req, res)=> [
    res.send({
        message: "Olá"
    })
])
app.use("/auth", authRoutes);
app.use("/pix_key", pixKeyRoutes)

export default app;