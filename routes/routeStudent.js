const express = require('express');
const router = express.Router();
const { sequelizeStudent, sequelize, sequelizeCourse } = require('../database/models');

router.get('/', async (req, res) => {
  const sqlQuery = `
    SELECT
      e.id AS student_id,
      e.name AS student_name,
      e.age AS student_age, 
      d.id AS course_id,           
      d.name AS course_name,      
      n.name AS grade_name,
      n.value AS grade_value
    FROM Estudantes e
    LEFT JOIN StudentDisciplines sd ON e.id = sd.EstudanteId
    LEFT JOIN Disciplinas d ON sd.DisciplinaId = d.id
    LEFT JOIN Nota n ON e.id = n.EstudanteId;
  `;
  
  try {
    const results = await sequelize.query(sqlQuery, { type: sequelize.QueryTypes.SELECT });
    // Criando uma lista para armazenar os resultados
    const groupedResults = [];
    // Percorra os resultados e agrupe-os pela combinação de nome do estudante e nome da disciplina
    results.forEach((result) => {
      // Verifique se já existe um objeto no grupo com o nome do estudante
      const existingStudent = groupedResults.find((group) => group.student_name === result.student_name);
      if (existingStudent) {
        // Se o estudante já existe, adicione apenas a disciplina e a nota a esse estudante
        existingStudent.disciplinas.push({          
          course_id : result.course_id,
          course_name: result.course_name,
          grade_id: result.grade_id,
          grade_name: result.grade_name,
          grade_value: result.grade_value,
        });
      } else {
        // Se o estudante ainda não existe no grupo, crie um novo objeto para esse estudante
        groupedResults.push({
          student_id : result.student_id,
          student_name: result.student_name,
          student_age: result.student_age,       
          disciplinas: [
            {
              course_id : result.course_id,
              course_name: result.course_name,
              grade_id: result.grade_id,
              grade_name: result.grade_name,
              grade_value: result.grade_value,
            },
          ],
        });
      }
    });   
    res.status(200).json(groupedResults);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error: Oops! ${err.message}`);
  } 
});

// busca por id
router.get('/:id', async(req, res)=>{   
  const sqlQuery = `
  SELECT
    e.id AS student_id,
    e.name AS student_name,
    e.age AS student_age, 
    d.id AS course_id,           
    d.name AS course_name,      
    n.name AS grade_name,
    n.value AS grade_value
  FROM Estudantes e
  LEFT JOIN StudentDisciplines sd ON e.id = sd.EstudanteId
  LEFT JOIN Disciplinas d ON sd.DisciplinaId = d.id
  LEFT JOIN Nota n ON e.id = n.EstudanteId
  WHERE e.id = ${req.params.id}
`;

try {
  const results = await sequelize.query(sqlQuery, { type: sequelize.QueryTypes.SELECT });
  // Criando uma lista para armazenar os resultados
  const groupedResults = [];
  // Percorra os resultados e agrupe-os pela combinação de nome do estudante e nome da disciplina
  results.forEach((result) => {
    // Verifique se já existe um objeto no grupo com o nome do estudante
    const existingStudent = groupedResults.find((group) => group.student_name === result.student_name);
    if (existingStudent) {
      // Se o estudante já existe, adicione apenas a disciplina e a nota a esse estudante
      existingStudent.disciplinas.push({          
        course_id : result.course_id,
        course_name: result.course_name,
        grade_id: result.grade_id,
        grade_name: result.grade_name,
        grade_value: result.grade_value,
      });
    } else {
      // Se o estudante ainda não existe no grupo, crie um novo objeto para esse estudante
      groupedResults.push({
        student_id : result.student_id,
        student_name: result.student_name,
        student_age: result.student_age,       
        disciplinas: [
          {
            course_id : result.course_id,
            course_name: result.course_name,
            grade_id: result.grade_id,
            grade_name: result.grade_name,
            grade_value: result.grade_value,
          },
        ],
      });
    }
  });   
  res.status(200).json(groupedResults);
} catch (err) {
  console.error(err);
  res.status(500).send(`Error: Oops! ${err.message}`);
} 
});

router.post('/', async (req,res)=>{
  try {
    console.log(req.body);
    const {name, age} = req.body;
    const student = await sequelizeStudent.create({name, age});
    if(student){
      res.status(201).json(student);
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

// Vincular aluno a disciplinas
router.put('/add-class/:studentID/:classSchoolID', async(req, res)=>{
  const student = await sequelizeStudent.findByPk(parseInt(req.params.studentID));
  if(!student){
    res.status(404).send(`ID ${req.params.id} not found`);
  }
  const classSchool = await sequelizeCourse.findByPk(parseInt(req.params.classSchoolID));
  if(!classSchool){
    res.status(404).send(`ID ${req.params.id} class school not found`);
  }
  try {
    await student.addDisciplina(classSchool);
    res.status(200).json(student);   
   } catch (error) {
    console.log(error);
    res.status(500).send("{ Error: Oops! Something is wrong with me! Is not your fault!}");
  }
});

// Remover aluno a disciplinas
router.put('/remove-class/:studentID/:classSchoolID', async(req, res)=>{
  const student = await sequelizeStudent.findByPk(parseInt(req.params.studentID));
  if(!student){
    res.status(404).send(`ID ${req.params.id} not found`);
  }
  const classSchool = await sequelizeCourse.findByPk(parseInt(req.params.classSchoolID));
  if(!classSchool){
    res.status(404).send(`ID ${req.params.id} class school not found`);
  }
  try {
    await student.removeDisciplina(classSchool);
    res.status(200).json(student);   
   } catch (error) {
    console.log(error);
    res.status(500).send("{ Error: Oops! Something is wrong with me! Is not your fault!}");
  }
});

module.exports = router;
