const express 		= require("express")
const bodyParser 	= require("body-parser")
const cookieParser 	= require("cookie-parser")
const session       = require("express-session")
const dotenv 		= require("dotenv")
						dotenv.config()
const multer        = require("multer")
const path			= require("path")		
const nunjucks		= require("nunjucks")		
var flash           = require('connect-flash');
const db			= require("./controllers/db")
const app			= express()

app.use(express.static(path.join(__dirname, '/public')))
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 240000 },
    resave: false
}));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(flash())

app.use(function(req, res, next){
    res.locals.message = req.flash();
    next();
});

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

const routesHome	= require("./routes/Admin/home")	
const routesInvoice	= require("./routes/Admin/invoice")	
const routesProduct	= require("./routes/Admin/product")	
const routesCategory= require("./routes/Admin/category")	
const routesAdmin	= require("./routes/Admin/admin")	
const routesSettings= require("./routes/Admin/settings")	

//routes
app.use('/admin', routesHome)
app.use('/admin/invoice', routesInvoice)
app.use('/admin/product', routesProduct)
app.use('/admin/category', routesCategory)
app.use('/admin/admin', routesAdmin)
app.use('/admin/settings', routesSettings)

var server = app.listen(process.env.PORT, function(){
	console.log("Started!!")
})
