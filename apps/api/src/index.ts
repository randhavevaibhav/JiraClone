import express from "express";
import cookieParser from "cookie-parser";
import healthRoutes from "@/routes/health.routes"
import { errorMiddleware } from "@/middlewares/erros.middleware";

const app = express();
const PORT = 8080;

app.get("/",(_,res)=>{
    res.send({
        message:"Home page"
    })
});

app.use(cookieParser());
app.use(express.json());
app.use('/health', healthRoutes);



//keep the error middleware last
app.use(errorMiddleware);

app.listen(PORT,()=>{
console.log(`API started on PORT: ${PORT}`);
console.log(`Local: http://localhost:${PORT}`)
})