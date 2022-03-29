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

    db.query('SELECT * FROM invoices WHERE status != ? ORDER BY id_invoice DESC', -1, function(err, rows, fileds){
        if(err) throw err

        res.render('../views/Admin/invoice/list.html', 
        {
            invoices:rows, 
            name:name, 
            id_admin:id_admin,
            avatar_admin:avatar_admin, 
            settings:set,
        });
    })
})

router.get('/product/:id', function(req, res, next){
    sess                = req.session
    const id_admin      = sess.id_admin
    const name          = sess.name
    const email         = sess.email
    const avatar_admin  = sess.avatar
    const set           = SETTINGS.GENERAL 
    if(name==undefined){
        return res.redirect('/admin/login')
    }

    db.query('SELECT * FROM invoices i, invoices_detail d, products p WHERE i.status != -1 AND d.id_invoice=i.id_invoice AND i.id_invoice = ? AND d.id_product = p.id_product ORDER BY i.id_invoice DESC'
            , req.params.id, function(err, rows, fileds){
        if(err) throw err
        
        res.render('../views/Admin/invoice/product/list.html', 
        {
            invoices:rows, 
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

    db.query('SELECT * FROM products WHERE status= ? ORDER BY id_product DESC', 1, function(err, rows, fileds){
        if(err) throw err

        res.render('../views/Admin/invoice/add.html', 
        {
            products:rows, 
            id_admin:id_admin,
            name:name, 
            avatar_admin:avatar_admin, 
            settings:set,
        });
    })
})

router.post('/add', async function(req, res, next){
    var invoice_code    = req.body.invoice_code
    var product         = req.body.product
    var status          = req.body.status
    var tax_price       = parseInt(req.body.tax_price)
    var productPrice    = parseInt((await getProduct(product))[0].price)
    var total_price     = productPrice+tax_price

    db.query('INSERT INTO invoices(invoice_code, subtotal_price, tax_price, total_price, creator, status) VALUES (?, ?, ?, ?, ?, ?)', [invoice_code, productPrice, tax_price, total_price, 1, status], function(err, rows, fileds){
        if(err) throw err
        
        db.query('INSERT INTO invoices_detail(id_invoice, id_product, status) VALUES (?, ?, ?)', [rows.insertId, product, status], function(err2, rows2, fileds2){
            if(err2) throw err2

            req.flash('success', 'Invoice Successfully Added!');
            res.redirect('/admin/invoice')
        })
    })
})

router.get('/edit/:id',async function(req, res, next){
    sess                = req.session
    const id_admin      = sess.id_admin
    const name          = sess.name
    const email         = sess.email
    const avatar_admin  = sess.avatar
    const set           = SETTINGS.GENERAL 
    if(name==undefined){
        return res.redirect('/admin/login')
    }

    var products   = await getProduct(null)
    db.query('SELECT * FROM invoices i, invoices_detail d WHERE i.status != ? AND i.id_invoice = ? AND i.id_invoice=d.id_invoice', [-1, req.params.id], function(err, rows, fields){
        if(err) throw err
        
        res.render('../views/Admin/invoice/edit.html', 
        {
            invoice:rows, 
            products:products, 
            id_admin:id_admin,
            name:name, 
            avatar_admin:avatar_admin, 
            settings:set,
        });
    })
})

router.post('/edit/:id', async function(req, res, next){
    var product         = req.body.product
    var status          = req.body.status

    var tax_price           = parseInt(req.body.tax_price)
    req.body.subtotal_price = parseInt((await getProduct(product))[0].price)
    req.body.total_price    = req.body.subtotal_price+tax_price

    delete req.body.product

    db.query('UPDATE invoices SET ? where id_invoice=?', [{...req.body}, req.params.id], function(err, rows, fileds){
        if(err) throw err
        
        db.query('UPDATE invoices_detail SET ? where id_invoice=?', [{id_product:product, status:status}, req.params.id], function(err2, rows2, fields2){
            if(err2) throw err2
    
            req.flash('success', 'Invoice Successfully Updated!');
            res.redirect('/admin/invoice/edit/'+req.params.id)
        })
    })
})

router.get('/delete/:id', async function(req, res, next){
    sess                = req.session
    const id_admin      = sess.id_admin
    const name          = sess.name
    const email         = sess.email
    const avatar_admin  = sess.avatar
    const set           = SETTINGS.GENERAL 
    if(name==undefined){
        return res.redirect('/admin/login')
    }

    var products   = await getProduct(null)
    db.query('SELECT * FROM invoices i, invoices_detail d WHERE i.status != ? AND i.id_invoice = ? AND i.id_invoice=d.id_invoice', [-1, req.params.id], function(err, rows, fields){
        if(err) throw err
        
        res.render('../views/Admin/invoice/delete.html', 
        {
            invoice:rows,
            products:products, 
            id_admin:id_admin,
            name:name, 
            avatar_admin:avatar_admin, 
            settings:set,
        });
    })
})

router.post('/delete/:id', function(req, res, next){
    db.query('UPDATE invoices SET ? where id_invoice=?', [{status:-1}, req.params.id], function(err, rows, fileds){
        if(err) throw err
        
        db.query('UPDATE invoices_detail SET ? where id_invoice=?', [{id_invoice:req.params.id, status:-1}, req.params.id], function(err2, rows2, fields2){
            if(err2) throw err2
    
            req.flash('success', 'Product Successfully Removed!');
            res.redirect('/admin/invoice/')
        })
    })
})

function getProduct(id){
    return new Promise((resolve, reject)=>{
        if(id==null){
            db.query('SELECT * FROM products WHERE status=?', 1, function(err, rows, fileds){
                if(err) 
                    reject(err)
                else
                   resolve(rows)
            })
        }else{
            db.query('SELECT * FROM products where id_product=?', id, function(err, rows, fileds){
                if(err) 
                    reject(err)
                else
                   resolve(rows)
            })
        }
    })
}

module.exports = router