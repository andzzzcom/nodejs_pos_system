const {Router} 		= require("express")
const router		= Router()
const bcrypt        = require("bcrypt")
const multer        = require("multer")
const session       = require("express-session");
const db			= require("../../controllers/db")
const SETTINGS		= require("../../controllers/Settings")


const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/Admin/theme1/images/users");
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

    db.query('SELECT * FROM admins WHERE status != ? ORDER BY id_admin DESC', -1, function(err, rows, fileds){
        if(err) throw err

        res.render('../views/Admin/admin/list.html', 
        {
            admins:rows, 
            name:name, 
            id_admin:id_admin, 
            avatar_admin:avatar_admin, 
            settings:set
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

	res.render('../views/Admin/admin/add.html', 
    {
        id_admin:id_admin, 
        avatar_admin:avatar_admin, 
        settings:set
    });
})

router.post('/add', upload.single('avatar'), async(req, res, next)=>{
    var name        = req.body.name
    var email       = req.body.email
    var phone       = req.body.phone
    var address     = req.body.address
    var born_place  = req.body.born_place
    var gender      = req.body.gender
    var avatar      = req.file.filename
    var status      = req.body.status

    var password    = '12345678'
    const salt      = await bcrypt.genSalt(10)
        password    = await bcrypt.hash(password, salt)

    db.query('INSERT INTO admins(name, email, password, phone, address, born_place, gender, avatar, creator, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, email, password, phone, address, born_place, gender, avatar, 1, status], 
        function(err, rows, fileds)
        {
            if(err) throw err
            
            req.flash('success', 'Admin Successfully Added!');
            res.redirect('/admin/admin')
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

    db.query('SELECT * FROM admins where id_admin=? ORDER BY id_admin', req.params.id, function(err, rows, fileds){
        if(err) throw err
        
        res.render('../views/Admin/admin/edit.html', 
        {
            admin:rows, 
            name:name, 
            id_admin:id_admin, 
            avatar_admin:avatar_admin, 
            settings:set
        });
    })
})

router.post('/edit/:id', upload.single('avatar'), function(req, res, next){
    if(req.file!==undefined)
        req.body.avatar = req.file.filename
    db.query('UPDATE admins SET ? where id_admin=?', [{...req.body}, req.params.id], function(err, rows, fileds){
        if(err) throw err
        
        req.flash('success', 'Admin Successfully Updated!');
        res.redirect('/admin/admin/edit/'+req.params.id)
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

    db.query('SELECT * FROM admins where id_admin=?', req.params.id, function(err, rows, fileds){
        if(err) throw err
        
        res.render('../views/Admin/admin/delete.html', 
        {
            admin:rows, 
            name:name, 
            id_admin:id_admin, 
            avatar_admin:avatar_admin, 
            settings:set
        });
    })
})

router.post('/delete/:id', function(req, res, next){
    db.query('UPDATE admins SET ? where id_admin=?', [{status:-1}, req.params.id], function(err, rows, fileds){
        if(err) throw err
        
        req.flash('success', 'Admin Successfully Removed!');
        res.redirect('/admin/admin')
    })
})

router.get('/edit_password', function(req, res, next){
    sess                = req.session
    const id_admin      = sess.id_admin
    const name          = sess.name
    const email         = sess.email
    const avatar_admin  = sess.avatar
    const set           = SETTINGS.GENERAL 
    if(name==undefined){
        return res.redirect('/admin/login')
    }
    res.render('../views/Admin/admin/edit_password.html', 
    {
        name:name, 
        id_admin:id_admin, 
        avatar_admin:avatar_admin, 
        settings:set
    });
})

router.post('/edit_password', function(req, res, next){
    sess                = req.session
    const id_admin      = sess.id_admin

    var old_password    = req.body.old_password
    var new_password    = req.body.password
    var new_password2   = req.body.password_confirmation
    console.log(new_password, new_password2)
    if(new_password!=new_password2){
        req.flash('failed', 'New Password Not Identical!');
        res.redirect('/admin/admin/edit_password')
    }
    
    db.query('SELECT * FROM admins where id_admin=?', id_admin, async function(err, rows, fileds){
        if(err) throw err
        
        if(rows.length>0)
        {
            const validPassword = await bcrypt.compare(old_password, rows[0].password)
            if (validPassword)
            {
                const salt      = await bcrypt.genSalt(10)
                new_password    = await bcrypt.hash(new_password, salt)
                db.query('UPDATE admins SET ? where id_admin=?', [{password:new_password}, id_admin], function(err, rows, fileds){
                    if(err) throw err
                    
                    req.flash('success', 'Password Successfully Updated!');
                    res.redirect('/admin/admin/edit_password/')
                })
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

module.exports = router