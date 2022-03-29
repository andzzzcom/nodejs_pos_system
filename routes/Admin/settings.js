const {Router} 		= require("express")
const router		= Router()
const multer        = require("multer")
const session       = require("express-session");
const db			= require("../../controllers/db")
const SETTINGS		= require("../../controllers/Settings")

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/Admin/theme1/images/settings");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const upload = multer({
    storage: multerStorage,
});

router.get('/general', function(req, res, next){
    sess                = req.session
    const id_admin      = sess.id_admin
    const name          = sess.name
    const email         = sess.email
    const avatar_admin  = sess.avatar
    const set           = SETTINGS.GENERAL 
    if(name==undefined){
        return res.redirect('/admin/login')
    }

    db.query('SELECT * FROM settings WHERE status = ? ', 1, function(err, rows, fileds){
        if(err) throw err

        res.render('../views/Admin/setting/general.html', 
        {
            settings:rows,
            name:name, 
            id_admin:id_admin,
            avatar_admin:avatar_admin, 
            settings:set,
        });
    })
})

router.post('/general/:id', 
                upload.fields([
                        {name: 'logo_web', maxCount: 1},
                        {name: 'favicon_web', maxCount: 1}
                ]), 
                function(req, res, next){
                    
                    if(req.files['logo_web']!==undefined)
                        req.body.logo_web = req.files['logo_web'][0].filename
                    
                    if(req.files['favicon_web']!==undefined)
                        req.body.favicon_web = req.files['favicon_web'][0].filename
                    
                    console.log(req.file)
                    db.query('UPDATE settings SET ? WHERE id_setting = ?', [{...req.body}, req.params.id], function(err, rows, fileds){
                        if(err) throw err

                        req.flash('success', 'Settings Successfully Updated!');
                        res.redirect("/admin/settings/general")
                    })
                })

module.exports = router