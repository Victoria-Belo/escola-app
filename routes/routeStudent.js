const express = require('express');
const router = express.Router();
const { sequelizeStudent } = require('../database/models');

// Rota para buscar todos os estudantes
router.get('/', async (req, res) => {
  const students = await sequelizeStudent.findAll();
  res.json(students);
});

router.post('/', async (req,res)=>{
  console.log(req.body);
  const {name, age} = req.body;
  const student = await sequelizeStudent.create({name, age});
  if(student){
    res.status(201).json(student);
  }else{
    res.status(400).send(JSON.stringify(student));
  }
});

module.exports = router;
