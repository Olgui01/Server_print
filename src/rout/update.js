const express = require("express");
const rout = express.Router();
const multer = require("multer");
const path = require("path");
const pool = require("../database");
const fs = require("fs/promises");
const FS = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/public/Documents/' + req.id)
  },
  filename: (req, file, cb) => {
    req.err_file = true;
    cb(null, file.originalname)
  }
})

// name file limit
const upload = multer({ storage: storage }).array('doc',20)

async function id(req, res, cb) {
  const { insertId } = await pool.query("INSERT INTO user VALUES();");
  await FS.mkdirSync('./src/public/Documents/' + insertId);
  req.id = insertId;
  return cb();
}

rout.post('/update', id, async (req, res) => {
  upload(req, res, async () => {
    for (let key in req.files) {
      const extname = path.extname(req.files[key].originalname)
      await pool.query("INSERT INTO Documents SET ?", { id_user: req.id, Name_Document: req.files[key].originalname, path: extname })
    }
  })
  res.render('Tike', { id: req.id });
})

rout.get('/Show', async (req, res) => {
  const files = await pool.query("SELECT * FROM user ORDER by id DESC;");
  res.render("show", { files });
  /* var files = await FS.readdirSync("./src/public/Documents/");
   files = files.map((id) => {
     return { id }
   });
   res.render("show", { files });
 */
});

rout.post("/ar", (req, res) => {
  const { id } = req.body;
  res.redirect('/ar/' + id);
});

rout.get('/ar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    var rows = await pool.query(`SELECT id_user,Name_Document,path FROM Documents WHERE id_user = ${id};`);
    //console.log(rows);
    rows.map((item)=>{
      switch (item.path) {
        case '.pdf':
          item.path = '/img_style/pdf.png';
          break;
        case '.docx':
          item.path = '/img_style/doc.png';
        break; 
        default:
          item.path = `/Documents/${item.id_user}/${item.Name_Document}`;
          break;
      }
    });
    res.render("arc", { rows });
  } catch (error) {
    res.redirect("/show");
  }
});

rout.get("/qWzw35Qn8K8cGY/:id",async (req, res) => {
  const { id } = req.params;
 try {
  await fs.readdir("./src/public/Documents/" + id).then((file) => {
    file.map((file)=>{fs.unlink(`./src/public/Documents/${id}/${file}`)});
  }).catch((err)=>{console.log(err)});
 await fs.rmdir("./src/public/Documents/"+id);
 await pool.query(`DELETE FROM user WHERE id = ${id}`);
  res.redirect("/show");
} catch (error) {
  res.redirect("/show");
}
});

module.exports = rout;