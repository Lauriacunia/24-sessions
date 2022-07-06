import express  from "express";
import session from "express-session";
import sessionFileStore from "session-file-store";
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
            path: './sessionsEjercicio',
            ttl: 1000 * 60 * 60 * 24 * 7  // 1 week
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7  // 1 week
        }
    }
));

app.set('views', 'src/views');
app.set('view engine', 'ejs');

const getNombreSession = (req) => {
    console.log(req.session.nombre);
    return req.session.nombre? req.session.nombre : "Invitado";
}

app.get("/", (req, res) => {
    if(req.session.contador){
        req.session.contador ++
        res.send(`<h1>Hola ${getNombreSession(req)}. Visitaste la página  ${req.session.contador} veces</h1>`)
    }else {
        console.log(req.session.nombre)
        req.session.nombre = req.query.nombre
        req.session.contador = 1
        res.send(`<h1>Bienvenido ${getNombreSession(req)}.</h1>`)
    } 
})

app.use('/olvidar', (req, res) => {
    const nombre = getNombreSession(req)
    req.session.destroy(err => {
            if(err){
                res.send(`<h1>Error al eliminar la sesión</h1>`)
            }else {
                res.send(`<h1>Hasta pronto ${nombre}</h1>`)
            }
        }
    )
})


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);