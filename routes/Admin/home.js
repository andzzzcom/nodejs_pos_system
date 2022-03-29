const {Router} 		= require("express");
const session       = require("express-session");
const bcrypt        = require("bcrypt")
const router		= Router()
const db			= require("../../controllers/db")
const SETTINGS		= require("../../controllers/Settings")

router.get('/', async function(req, res, next){
    sess                = req.session
    const id_admin      = sess.id_admin
    const name          = sess.name
    const email         = sess.email
    const avatar_admin  = sess.avatar

    const set        = SETTINGS.GENERAL 
    const products   = await getProducts()
    const invoices   = await getInvoices()
    const categories = await getCategories()
    const admins     = await getAdmins()
    
    
    if(email !== undefined)
    	res.render('../views/Admin/Home.html', 
        {
            products:products,
            invoices:invoices, 
            categories:categories, 
            admins:admins, 
            name:name, 
            id_admin:id_admin, 
            avatar_admin:avatar_admin, 
            settings:set
        });
    else
        res.redirect('/admin/login')
})

router.get('/login', function(req, res, next){
    const set        = SETTINGS.GENERAL 

	res.render('../views/Admin/Login.html', {settings:set});
})

router.post('/login', function(req, res, next){

    var email       = req.body.email
    var password    = req.body.password

    db.query('SELECT * FROM admins WHERE email = ? AND status = 1', email, async(err, rows, fileds)=>{
        if(err) throw err

        if(rows.length>0)
        {
            const validPassword = await bcrypt.compare(password, rows[0].password)
            if (validPassword){
                sess          = req.session
                sess.id_admin = rows[0].id_admin
                sess.name     = rows[0].name
                sess.email    = email
                sess.password = password
                sess.avatar   = rows[0].avatar
    
                res.redirect('/admin')
            }else{
                req.flash('failed', 'Old Password Not Correct!');
                res.redirect('/admin/login')
            }
        }else{
            req.flash('failed', 'Account Not Found!');
            res.redirect('/admin/login')
        }
    })
})

router.get('/logout', function(req, res, next){
    req.session.destroy();

    res.redirect('/admin')
})


function getProducts(){
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM products WHERE status!=? ORDER BY id_product DESC', -1, function(err, rows, fileds){
            if(err) 
                reject(err)
            else
                resolve(rows)
        })
    })
}

function getInvoices(){
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM invoices WHERE status!=? ORDER BY id_invoice DESC', -1, function(err, rows, fileds){
            if(err) 
                reject(err)
            else
                resolve(rows)
        })
    })
}

function getCategories(){
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM categories WHERE status!=? ORDER BY id_category DESC', -1, function(err, rows, fileds){
            if(err) 
                reject(err)
            else
                resolve(rows)
        })
    })
}

function getAdmins(){
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM admins WHERE status!=? ORDER BY id_admin DESC', -1, function(err, rows, fileds){
            if(err) 
                reject(err)
            else
                resolve(rows)
        })
    })
}

module.exports = router