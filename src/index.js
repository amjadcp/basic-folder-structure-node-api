// in production the back-end and front-end must be in same domain (some browsers don't allow third party cookies)
// store the jwt token in cookie
// one router in one file
require("dotenv").config({ path: `${__dirname}/.env` });
const express = require("express");

const app = express();
// const session = require("express-session");
const cookieParser = require('cookie-parser');
// const MongoStore = require("connect-mongo");
const cors = require("cors")
const swaggerUI = require("swagger-ui-express")
const YAML = require('yamljs')
const swaggerJsDocs = YAML.load(`${__dirname}/documentation/api.yml`)

const db = require(`${__dirname}/src/utils/dbConnection`); // import db connection feature from util folder

const auth = require(`${__dirname}/src/routers/auth/auth`);
const admin = require(`${__dirname}/src/routers/admin/admin`);
const team = require(`${__dirname}/src/routers/team/team`);
const common = require(`${__dirname}/routers/common/common`);


db.connect();

const bodyParser = require("body-parser");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

const whitelist = ["http://127.0.0.1:3000", "localhost", "http://localhost:3000", "https://main.dv966lilhc413.amplifyapp.com"];

app.set("trust proxy", 1); // trust first proxy

const corsOptions = {
	// eslint-disable-next-line consistent-return
	origin(origin, callback) {
		if (!origin) { // for mobile app and postman client
			return callback(null, true);
		}
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({
	type: ["application/json", "text/plain"],
}));

app.use(cookieParser());

// api doc
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs))

// auth
app.use("/auth", [
	auth.login,       // complete url : ROOTURL/auth/login
])

// admin
app.use("/admin", [
	// admin.fileName // complete url : ROOTURL/admin/something
])

app.listen(process.env.PORT, () => console.log("Server Running on " + `${process.env.PORT}`));