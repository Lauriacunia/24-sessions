import express  from "express";
import session from "express-session";
import sessionFileStore from "session-file-store";
import sessionRoutes from "./src/routes/session.js";
const fileStore = sessionFileStore(session);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(
    {
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: new fileStore({
            path: './sessions',
            ttl: 1000 * 60 * 60 * 24 * 7  // 1 week
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7  // 1 week
        }
    }
));

app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use("/", sessionRoutes);


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);