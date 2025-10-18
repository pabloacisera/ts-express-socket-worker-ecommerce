import express,{ Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path, { extname } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import { Server } from "socket.io";

import render_routes from "./routes/render_routes.js";

// configuracion variables de entorno
dotenv.config();

// configuracion de ruta
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const app: Express = express();
const server = createServer(app);
const io = new Server(server, {
    cors: { origin: "*", methods: ["POST", "GET", "DELETE"] }
});

// default middlewares
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));
app.use(helmet());
app.use(cors());

// configuracion de vistas
app.set("views", path.join(__dirname, "../views"));
app.engine(".hbs", engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "../views", "layouts"),
    partialsDir: path.join(__dirname, "../views", "partials"),
    helpers: {
        json: function(context: any) {
            return JSON.stringify(context);
        }
    }
}));
app.set("view engine", ".hbs");


app.use("/", render_routes);

server.listen(port, function() {
    console.log(`Server up`)
    console.log(`Listening: http://localhost:${port}`);
});


