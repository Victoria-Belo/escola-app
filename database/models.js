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
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const sequelizeClass = sequelize.define('Disciplina', {
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
const StudentDiscipline = sequelize.define('StudentDiscipline', {});
const TeacherGrade = sequelize.define('TeacherGrade', {});

//  Associações many-to-many entre Aluno e Disciplina, Professor e Aluno.
sequelizeStudent.belongsToMany(sequelizeClass, { through: 'StudentDiscipline' });
sequelizeClass.belongsToMany(sequelizeStudent, { through: 'StudentDiscipline' });

sequelizeTeacher.belongsToMany(sequelizeStudent, { through: 'TeacherGrade' });
sequelizeStudent.belongsToMany(sequelizeTeacher, { through: 'TeacherGrade' });

// Associações one-to-many entre Aluno e Nota, Professor e Disciplina.
sequelizeStudent.hasMany(sequelizeGrade);
sequelizeGrade.belongsTo(sequelizeStudent);

sequelizeTeacher.hasMany(sequelizeClass);
sequelizeClass.belongsTo(sequelizeTeacher);

module.exports =  { sequelizeStudent, sequelizeTeacher, sequelizeClass, sequelizeGrade, sequelize };
