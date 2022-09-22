const path = require('path')
const jsonServer = require('json-server')
const auth = require('json-server-auth')

// import * as path from "path";
// import jsonServer from "json-server";
// import auth from "json-server-auth";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const server = jsonServer.create();
// const router = jsonServer.router('db.json')
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults({
  noCors: false,
  static: 'build',
});

server.use(middlewares);

server.db = router.db;

const rules = auth.rewriter({
  // users: 664,
  // contacts: 660,
})

// server.use(rules);
server.use(auth);
server.use(router);

function isAuthorized({ email, password }) {
  console.log(email, password);
  return (
    server.db.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

// server.get("/auth", (req, res) => {
//   res.jsonp(req.query);
// });

server.use("/auth" , (req, res, next) => {
  console.log('-----------');
  // const body = await Promise.resolve(req.body)
  // console.log(body);

  console.log('req: ', req.body);
  const { email, password } = req.body;

  if (isAuthorized({ email, password })) {
    next();
  } else {
    res.sendStatus(401);
  }
});

server.listen(3333, () => {
  console.log("JSON Server is running");
});
