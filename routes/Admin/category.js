const {Router} 		= require("express")
const router		= Router()
const multer        = require("multer")
const session       = require("express-session");
const db			= require("../../controllers/db")
const SETTINGS		= require("../../controllers/Settings")

router.get('/', function(req, res, next){
    sess                = req.session
    const id_admin      = sess.id_admin
    const name          = sess.name
    const email         = sess.email
    const avatar_admin  = sess.avatar
    const set           = SETTINGS.GENERAL 
    if(name==undefined){
        return res.redirect('/admin/login')
    }

    db.query('SELECT * FROM categories WHERE status != ? ORDER BY id_category DESC', -1, function(err, rows, fileds){
        if(err) throw err

        res.render('../views/Admin/category/list.html', 
        {
            categories:rows, 
            id_admin:id_admin,
            name:name, 
            avatar_admin:avatar_admin, 
            settings:set,
        });
    })
})

router.get('/add', function(req, res, next){
    sess                = req.session
    const id_admin      = sess.id_admin
    const name          = sess.name
    const email         = sess.email
    const avatar_admin  = sess.avatar
    const set           = SETTINGS.GENERAL 
    if(name==undefined){
        return res.redirect('/admin/login')
    }

    db.query('SELECT * FROM categories WHERE status= ? ORDER BY id_category DESC', 1, function(err, rows, fileds){
        if(err) throw err

        res.render('../views/Admin/category/add.html', 
        {
            categories:rows, 
            id_admin:id_admin,
            name:name, 
            avatar_admin:avatar_admin, 
            settings:set,
        });
    })
})

router.post('/add', function(req, res, next){
    var name      = req.body.name
    var status    = req.body.status

    db.query('INSERT INTO categories(name, creator, status) VALUES (?, ?, ?)', [name, 1, status], function(err, rows, fileds){
        if(err) throw err

        req.flash('success', 'Category Successfully Added!');
        res.redirect('/admin/category')
    })
})

router.get('/edit/:id', function(req, res, next){
    sess                = req.session
    const id_admin      = sess.id_admin
    const name          = sess.name
    const email         = sess.email
    const avatar_admin  = sess.avatar
    const set           = SETTINGS.GENERAL 
    if(name==undefined){
        return res.redirect('/admin/login')
    }

    db.query('SELECT * FROM categories where id_category=?', req.params.id, function(err, rows, fileds){
        if(err) throw err
        
        res.render('../views/Admin/category/edit.html', 
        {
            category:rows, 
            id_admin:id_admin,
            name:name, 
            avatar_admin:avatar_admin, 
            settings:set,
        });
    })
})

router.post('/edit/:id', function(req, res, next){
    db.query('UPDATE categories SET ? where id_category=?', [{...req.body}, req.params.id], function(err, rows, fileds){
        if(err) throw err

        req.flash('success', 'Category Successfully Updated!');
        res.redirect('/admin/category/edit/'+req.params.id)
    })
})

router.get('/delete/:id', function(req, res, next){
    sess                = req.session
    const id_admin      = sess.id_admin
    const name          = sess.name
    const email         = sess.email
    const avatar_admin  = sess.avatar
    const set           = SETTINGS.GENERAL 
    if(name==undefined){
        return res.redirect('/admin/login')
    }

    db.query('SELECT * FROM categories where id_category=?', req.params.id, function(err, rows, fileds){
        if(err) throw err

        res.render('../views/Admin/category/delete.html', 
        {
            category:rows, 
            id_admin:id_admin,
            name:name, 
            avatar_admin:avatar_admin, 
            settings:set,
        });
    })
})

router.post('/delete/:id', function(req, res, next){
    db.query('UPDATE categories SET ? where id_category=?', [{status:-1}, req.params.id], function(err, rows, fileds){
        if(err) throw err
        
        req.flash('success', 'Category Successfully Removed!');
        res.redirect('/admin/category')
    })
})

module.exports = router