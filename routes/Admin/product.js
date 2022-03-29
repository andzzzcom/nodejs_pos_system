const {Router} 		= require("express")
const router		= Router()
const multer        = require("multer")
const session       = require("express-session");
const db			= require("../../controllers/db")
const SETTINGS		= require("../../controllers/Settings")


const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/Admin/theme1/images/product");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const upload = multer({
    storage: multerStorage,
});

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

    db.query('SELECT * FROM products WHERE status != ? ORDER BY id_product DESC', -1, function(err, rows, fileds){
        if(err) throw err

        res.render('../views/Admin/product/list.html', 
        {
            products:rows, 
            name:name, 
            id_admin:id_admin,
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

        res.render('../views/Admin/product/add.html', 
        {
            categories:rows, 
            id_admin:id_admin,
            name:name, 
            avatar_admin:avatar_admin, 
            settings:set,
        });
    })
})

router.post('/add', upload.single('thumbnail'), function(req, res, next){
    var name      = req.body.name
    var price     = req.body.price
    var category  = req.body.category
    var thumbnail = req.file.filename
    var status    = req.body.status

    db.query('INSERT INTO products(name, price, category, thumbnail, creator, status) VALUES (?, ?, ?, ?, ?, ?)', [name, price, category, thumbnail, 1, status], function(err, rows, fileds){
        if(err) throw err

        req.flash('success', 'Product Successfully Added!');
        res.redirect('/admin/product')
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

    db.query('SELECT * FROM products where id_product=?', req.params.id, function(err, rows, fileds){
        if(err) throw err
        
        db.query('SELECT * FROM categories WHERE status= ? ORDER BY id_category DESC', 1, function(err2, rows2, fileds2){
            if(err2) throw err2

            res.render('../views/Admin/product/edit.html', 
            {
                categories:rows2, 
                product:rows, 
                id_admin:id_admin,
                name:name, 
                avatar_admin:avatar_admin, 
                settings:set,
            });
        })
    })
})

router.post('/edit/:id', upload.single('thumbnail'), function(req, res, next){
    if(req.file!==undefined)
        req.body.thumbnail = req.file.filename

    db.query('UPDATE products SET ? where id_product=?', [{...req.body}, req.params.id], function(err, rows, fileds){
        if(err) throw err
        
        req.flash('success', 'Product Successfully Updated!');
        res.redirect('/admin/product/edit/'+req.params.id)
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

    db.query('SELECT * FROM products where id_product=?', req.params.id, function(err, rows, fileds){
        if(err) throw err
        
        db.query('SELECT * FROM categories WHERE status= ? ORDER BY id_category DESC', 1, function(err2, rows2, fileds2){
            if(err2) throw err2
            
            res.render('../views/Admin/product/delete.html', 
            {
                categories:rows2, 
                product:rows, 
                id_admin:id_admin,
                name:name, 
                avatar_admin:avatar_admin, 
                settings:set,
            });
        })
    })
})

router.post('/delete/:id', function(req, res, next){
    db.query('UPDATE products SET ? where id_product=?', [{status:-1}, req.params.id], function(err, rows, fileds){
        if(err) throw err
        
        req.flash('success', 'Product Successfully Removed!');
        res.redirect('/admin/product')
    })
})

module.exports = router