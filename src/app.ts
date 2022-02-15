import "dotenv/config";

import cors from "cors";
import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

import { router } from "./routes";

const app = express();
app.use(cors());
const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log(`Usuario conectado em ${socket.id}`);
});
app.use(express.json());

app.use(router);

app.get("/github", (requst, response) => {
    response.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENTE_ID}`
    );
});

app.get("/signin/callback", (request, response) => {
    const { code } = request.query;
    response.send({ code });
});


export { serverHttp, io };

