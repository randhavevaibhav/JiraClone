import express from "express";
import cookieParser from "cookie-parser";
import healthRoutes from "@/routes/health.routes"
import { errorMiddleware } from "@/middlewares/erros.middleware";
import { API_PORT } from "@/utils/constants";
import { config } from "./utils/config";
import swaggerUi from 'swagger-ui-express';
import './docs/paths/health';
import { generateOpenAPIDocument } from "@/swagger/swagger";


const app = express();


app.get("/",(_,res)=>{
    res.send({
        message:"Home page"
    })
});


app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(
    generateOpenAPIDocument(),
  ),
);

app.use(cookieParser());
app.use(express.json());
app.use('/health', healthRoutes);


//keep the error middleware last
app.use(errorMiddleware);

app.listen(API_PORT,()=>{
console.log(`API started on PORT: ${API_PORT}`);
console.log(`URL: ${config.API_URL}`)
})