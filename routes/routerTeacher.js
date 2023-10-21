const express = require('express');
const router = express.Router();
const {sequelizeTeacher, sequelizeCourse} = require('../database/models');

router.get('/',async(req,res)=>{
    const teachers = await sequelizeTeacher.findAll({include:[ {
        model: sequelizeCourse,
        as: 'Disciplinas',
        through: { attributes: [] },
        attributes: { exclude: ['createdAt', 'updatedAt'] }, 
    }]});
    res.status(200).json(teachers);
 });

router.get('/:id', async(req,res)=>{
    try {
        const teacher = await sequelizeTeacher.findByPk(parseInt(req.params.id));
        if(!teacher){
            res.status(404).send(`ID ${req.params.id} not found`);
        }else{
            res.status(200).json(teacher);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error: Oops! ${error.message}`);
    }    
 });

router.post('/', async(req, res)=>{
    try {
        let { name, age } = req.body;
        const teacher = await sequelizeTeacher.create({ name, age });
        if(teacher){
            res.status(201).json(teacher);
        }        
    } catch (error) {
        console.error();
        res.status(500).send(`Error: Oops! ${error.message}`);
    }   
});

router.put('/:id', async(req,res)=>{
    const teacher = await sequelizeTeacher.findByPk(parseInt(req.params.id));
    if(!teacher){
        res.status(404).send(`ID ${req.params.id} not found`).end();
    }
    const classeSchool = await sequelizeCourse.findByPk(parseInt(req.params.classeSchoolID));
    if (!classeSchool) {
        return res.status(404).send("Error: Class school not found in database. Check ID Class and try again.").end();
    }
    try {
        const {name, age} = req.body;
        teacher.name = name === undefined ? teacher.name : name;
        teacher.age = age === undefined ? teacher.age : age;        
        await teacher.save();
        res.status(201).json(teacher);        
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error: Oops! ${error.message}`);
    }
 });

router.delete('/:id', async(req,res)=>{
    const teacher = await sequelizeTeacher.findByPk(parseInt(req.params.id));
    if(!teacher){
        res.status(404).send('');
    }
    try {
        const content = await sequelizeTeacher.destroy({where: { id: parseInt(req.params.id)}})
        if(content >= 1){
            res.status(204).end();
        }
    } catch (error) {
        console.log(error);
      res.status(500).send("Oops! Something is wrong with me! Is not your fault!");
    }
 });

 module.exports = router;