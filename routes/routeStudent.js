const express = require('express');
const router = express.Router();
const { sequelizeStudent } = require('../database/models');

// Rota para buscar todos os estudantes
router.get('/', async (req, res) => {
  const students = await sequelizeStudent.findAll();
  res.status(200).json(students);
});

// busca por id
router.get('/:id', async(req, res)=>{   
  try {
    const student = await sequelizeStudent.findByPk(parseInt(req.params.id));
    if(!student){
      res.status(404).send(`ID ${req.params.id} not found`);
    }else{
      res.status(200).json(student);
    }
  } catch (error) {
    console.error();
    res.status(500).send(`Error: Oops! ${error.message}`);
  } 
});

router.post('/', async (req,res)=>{
  try {
    console.log(req.body);
    const {name, age} = req.body;
    const student = await sequelizeStudent.create({name, age});
    if(student){
      res.status(201).json(student);
    }else{
      res.status(400).send(JSON.stringify(student));
    }
  } catch (error) {
    console.error();
    res.status(500).send(`Error: Oops! ${error.message}`);
  } 
});

router.put('/:id',async(req, res)=>{
  const student = await sequelizeStudent.findByPk(parseInt(req.params.id));
  if(!student){
    res.status(404).send(`ID ${req.params.id} not found`);
  }else{
    const {name, age} = req.body;
    // sequelize e JS tem duas maneiras distintas de entender campos nulos. Sequelize entende que campo vazio é do tipo undefined
    student.name = name === undefined ? student.name : name;    
    student.age = age === undefined ? student.age : age;
    try {
      await student.save();
      res.status(200).json(student);
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error: Oops! ${error.message}`);
    }   
  } 
});

router.delete('/:id', async(req, res)=>{
    const student = await sequelizeStudent.findByPk(parseInt(req.params.id));
    if(!student){
      res.status(404).send(`ID ${req.params.id} not found`);
    } 
    try {
      const content = await sequelizeStudent.destroy({where:{ id: parseInt(req.params.id)}});
       // verificando numero de linhas afetadas pelo método destroy()
      if(content >= 1){
        res.status(204).end();
      }
    } catch (error) {      
      // algo deu errado no servidor
      console.log(error);
      res.status(500).send("Oops! Something is wrong with me! Is not your fault!");
    }   
});

module.exports = router;
