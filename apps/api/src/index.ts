import express from "express";
import cookieParser from "cookie-parser";
import { checkDbConnection } from '@packages/db';

const app = express();
const PORT = 8080;

app.use(cookieParser());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send({
        message:"Home page"
    })
});

app.get('/health/db', async (_req, res) => {
  try {
     await checkDbConnection();

    res.json({
      success: true,
      message: 'Database connected successfully',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Database connection failed',
    });
  }
});

app.listen(PORT,()=>{
console.log(`API started on PORT: ${PORT}`);
console.log(`Local: http://localhost:${PORT}`)
})