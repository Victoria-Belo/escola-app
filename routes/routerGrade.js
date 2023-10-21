const express = require('express');
const router = express.Router();
const {sequelizeGrade} = require('../database/models');
const {sequelizeCourse} = require('../database/models');
const {sequelizeStudent} = require('../database/models');
const {sequelizeTeacher} = require('../database/models');

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

//  Nota a alunos dadas pro professores de suas respectivas matérias
 router.post('/add-grade/:courseID/:teacherID/:studentID', async(req,res)=>{
    // Validar ID da matéria, do professor e do aluno cadastrado na matéria;
    let notification =  null;
    const course = await sequelizeCourse.findByPk(parseInt(req.params.courseID));
    const teacher = await sequelizeTeacher.findByPk(parseInt(req.params.teacherID));
    const student = await sequelizeStudent.findByPk(parseInt(req.params.studentID));
    
    if(!course){
        error = `Course ID ${req.params.courseID} invalid!`
    }   
    if(!teacher){
        error += `\nTeacher ID ${req.params.teacherID} invalid!`
    }
    if(!student){
        error += `\nTeacher ID ${req.params.studentID} invalid!`
    }
    // se existir erros durante a verificação, informar usuário
    if(notification){
        res.status(400).json(notification);
    }
    // buscando estudante registrado na matéria
    const studentInClass = await course.hasEstudante(student);
    console.log('studentInClass -->', studentInClass);    
    try {
        const { name, value } = req.body;
        const grade = await sequelizeGrade.create({ name, value });
         // Associando nota ao estudante em relação à matéria e ao professor
        await course.addNota(grade, { through: { ProfessorId: parseInt(req.params.teacherID) } });
         // Associando nota ao estudante
        await student.addNota(grade);
        res.status(201).send(grade);
    } catch (error) {
        console.log(error);
        res.status(500).send("Oops! Something is wrong with me! Is not your fault!");
    }
 });

 module.exports = router;