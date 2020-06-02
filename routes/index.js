var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  global.db.findAll((e, docs) => {
    if (e) {  return console.log(e) }
    res.render('index', { title: 'Lista de clientes', docs: docs })
  })
});

router.get('/new', (req, res) => {
  res.render('new', { title: 'Novo Cadastro', doc: { nome:"", idade:"" }, action: '/new/' })
})

router.get('/edit/:id', (req, res) => {
  var id = req.params.id

  global.db.findOne(id, (e, docs) => {
    if (e) {  return console.log(e) }
    res.render('new', { title: "Edição de clientes", doc: docs[0], action: '/edit/' + docs[0]._id })
  })
})

router.get('/delete/:id', (req, res) => {
  var id = req.params.id

  global.db.deleteOne(id, (e, docs) => {
    if (e) {  return console.log(e) }
    res.redirect('/')
  })
})

router.post('/edit/:id', (req, res) => {
  var id = req.params.id
  var nome = req.body.nome 
  var idade = parseInt(req.body.idade)

  global.db.updateOne(id, {nome, idade}, (e, docs) => {
    if (e) {  return console.log(e) }
    res.redirect('/')
  })
})

router.post('/new', (req, res) => {
  var nome = req.body.nome
  var idade = parseInt(req.body.idade)

  global.db.insert({nome, idade}, (err, result) => {
    if (err) { return console.log(err)}
    res.redirect('/')
  })
})


module.exports = router;
