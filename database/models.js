const { DataTypes } = require('sequelize');
const sequelize = require('../databaseConfig');
  
// Definição de modelos Estudante, Professor, Nota e Disciplina

const sequelizeStudent = sequelize.define('Estudante', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
 
const sequelizeTeacher = sequelize.define('Professor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const sequelizeCourse = sequelize.define('Disciplina', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  workload: {
    type: DataTypes.INTEGER,  
    allowNull: true,  
  },
});

const sequelizeGrade = sequelize.define('Nota', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: true,  
  },
});

// Definição das tabelas de associação para many-to-many. Necessário.
const StudentDisciplines = sequelize.define('StudentDisciplines', {});
const TeacherGrade = sequelize.define('TeacherGrade', {});
const TeacherDisciplines =  sequelize.define('TeacherDisciplines', {});

//  Associações many-to-many entre Aluno e Disciplina, Professor e Aluno.
sequelizeStudent.belongsToMany(sequelizeCourse, { through: 'StudentDisciplines' });
sequelizeCourse.belongsToMany(sequelizeStudent, { through: 'StudentDisciplines' });

sequelizeTeacher.belongsToMany(sequelizeStudent, { through: 'TeacherGrade' });
sequelizeStudent.belongsToMany(sequelizeTeacher, { through: 'TeacherGrade' });

sequelizeTeacher.belongsToMany(sequelizeCourse, { through: 'TeacherDisciplines' });
sequelizeCourse.belongsToMany(sequelizeTeacher, { through: 'TeacherDisciplines' });

// Associações one-to-many entre Aluno e Nota, Professor e Disciplina.
sequelizeStudent.hasMany(sequelizeGrade);
sequelizeGrade.belongsTo(sequelizeStudent);

sequelizeCourse.hasMany(sequelizeGrade);
sequelizeGrade.belongsTo(sequelizeCourse);

module.exports =  { sequelizeStudent, sequelizeTeacher, sequelizeCourse, sequelizeGrade, sequelize};
