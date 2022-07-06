import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("session");
});

router.post("/session", (req, res) => {
    console.log(req.body);
    for(let key in req.body) {
        if(req.body[key]) {
            // guardar cada key en la session
            req.session[key] = req.body[key];
        }
    }

  res.send({session: req.session});
});


export default router;