const express = require('express');
const router = express.Router();
const {sequelizeClass} = require('../database/models');


router.get('/',async(req,res)=>{
    const classSchool = await sequelizeClass.findAll();
    res.status(200).json(classSchool);
 });

router.get('/:id', async(req,res)=>{
    try {
        const classSchool = await sequelizeClass.findByPk(parseInt(req.params.id));
        if(!classSchool){
            res.status(404).send(`ID ${req.params.id} not found`);
        }else{
            res.status(200).json(classSchool);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error: Oops! ${error.message}`);
    }    
 });

router.post('/', async(req, res)=>{
    try {
        const { name, workload } = req.body;
        const classSchool = await sequelizeClass.create({ name, workload });
        if(classSchool){
            res.status(201).json(classSchool);
        }        
    } catch (error) {
        console.error();
        res.status(500).send(`Error: Oops! ${error.message}`);
    }   
});

router.put('/:id', async(req,res)=>{
    const classSchool = await sequelizeClass.findByPk(parseInt(req.params.id));
    if(!classSchool){
        res.status(404).send(`ID ${req.params.id} not found`);
    }
    try {
        const {name,workload} = req.body;
        classSchool.name  = name === undefined ? classSchool.name  : name;
        classSchool.workload = workload === undefined ? classSchool.workload : workload;
        classSchool.save();
        res.status(201).json(classSchool);        
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error: Oops! ${error.message}`);
    }
 });

router.delete('/:id', async(req,res)=>{
    const classSchool = await sequelizeClass.findByPk(parseInt(req.params.id));
    if(!classSchool){
        res.status(404).send('');
    }
    try {
        const content = await sequelizeClass.destroy({where: { id: parseInt(req.params.id)}})
        if(content >= 1){
            res.status(204).end();
        }
    } catch (error) {
        console.log(error);
      res.status(500).send("Oops! Something is wrong with me! Is not your fault!");
    }
 });

 module.exports = router;