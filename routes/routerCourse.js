const express = require('express');
const router = express.Router();
const {sequelizeCourse} = require('../database/models');
const {sequelizeTeacher} = require('../database/models');

router.get('/',async(req,res)=>{   
    const courses = await sequelizeCourse.findAll();
    res.status(200).json(courses);
 });

router.get('/:id', async(req,res)=>{
    try {
        const classSchool = await sequelizeCourse.findByPk(parseInt(req.params.id));
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
    let { name, workload } = req.body;  
    // Padronizando sintaxe de nomes;
    let nameChecking = name.toLowerCase().split(' ');
    nameChecking = nameChecking.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    try {             
        //checando existencia de nome de disciplina
        const course = await sequelizeCourse.findOne({where: { name: nameChecking}});                
        if(course){
            res.status(400).send('Error: Course already exists! Please enter with another course name');
        }else{
            name = nameChecking;
            const classSchool = await sequelizeCourse.create({ name, workload });
            if(classSchool){
                res.status(201).json(classSchool);
            }        
        }      
    } catch (error) {
        console.error();
        res.status(500).send(`Error: Oops! ${error.message}`);
    }   
});

router.put('/:id', async(req,res)=>{
    const classSchool = await sequelizeCourse.findByPk(parseInt(req.params.id));
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
    const classSchool = await sequelizeCourse.findByPk(parseInt(req.params.id));
    if(!classSchool){
        res.status(404).send('');
    }
    try {
        const content = await sequelizeCourse.destroy({where: { id: parseInt(req.params.id)}})
        if(content >= 1){
            res.status(204).end();
        }
    } catch (error) {
        console.log(error);
      res.status(500).send("Oops! Something is wrong with me! Is not your fault!");
    }
 });

 //  Vincula PROFESSOR A MATÉRIA
 router.put('/add/:classeSchoolID/:teacherID', async(req, res)=>{
    // Encontre a matéria. Se existir, prossiga; Se não, informe ao usuário e encerre.
    const classeSchool = await sequelizeCourse.findByPk(parseInt(req.params.classeSchoolID));
    if(!classeSchool){
        res.status(404).send("Error: Class school not found in database. Check ID Class and try again.");
    }
    // Busque professor. Se encontra prossiga; Se não, informe ao usuário e encerre.
    const teacher = await sequelizeTeacher.findByPk(parseInt(req.params.teacherID));
    if(!teacher){
        res.status(404).send(`Error: Teacher ID ${req.params.teacherID} not found in database. Check ID and try again.`);
    }
    teacher.subject = classeSchool.name;
    classeSchool.ProfessorId = req.params.teacherID;
    // Associe o professor à disciplina usando a tabela TeacherDisciplines
    await teacher.addDisciplina(classeSchool);
    try {        
        await classeSchool.save();
        await teacher.save();
        res.status(200).json(classeSchool);
    } catch (error) {
        console.error(error);
        res.status(400).send(`Error: ${error.message}`);
    }
 }); 

 module.exports = router;