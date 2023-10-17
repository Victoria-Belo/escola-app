const express = require('express');
const router = express.Router();
const {sequelizeGrade} = require('../database/models');


router.get('/',async(req,res)=>{
    const grades = await sequelizeGrade.findAll();
    res.status(200).json(grades);
 });

router.get('/:id', async(req,res)=>{
    try {
        const grade = await sequelizeGrade.findByPk(parseInt(req.params.id));
        if(!grade){
            res.status(404).send(`ID ${req.params.id} not found`);
        }else{
            res.status(200).json(grade);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error: Oops! ${error.message}`);
    }    
 });

router.post('/', async(req, res)=>{
    try {
        const { name, value } = req.body;
        const grade = await sequelizeGrade.create({ name, value });
        if(grade){
            res.status(201).json(grade);
        }        
    } catch (error) {
        console.error();
        res.status(500).send(`Error: Oops! ${error.message}`);
    }   
});

router.put('/:id', async(req,res)=>{
    const grade = await sequelizeGrade.findByPk(parseInt(req.params.id));
    if(!grade){
        res.status(404).send(`ID ${req.params.id} not found`);
    }
    try {
        const {name,value} = req.body;
        grade.name  = name === undefined ? grade.name  : name;
        grade.value = value === undefined ? grade.value : value;
        grade.save();
        res.status(201).json(grade);        
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error: Oops! ${error.message}`);
    }
 });

router.delete('/:id', async(req,res)=>{
    const grade = await sequelizeGrade.findByPk(parseInt(req.params.id));
    if(!grade){
        res.status(404).send('');
    }
    try {
        const content = await sequelizeGrade.destroy({where: { id: parseInt(req.params.id)}})
        if(content >= 1){
            res.status(204).end();
        }
    } catch (error) {
        console.log(error);
      res.status(500).send("Oops! Something is wrong with me! Is not your fault!");
    }
 });

 module.exports = router;