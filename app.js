const {sequelize} = require('./database/models');
const express = require('express');
const app = express();
const student = require('./routes/routeStudent');
const teacher = require('./routes/routeTeacher');
const grade = require('./routes/routerGrade');
const classeSchool = require('./routes/routerClasses');

// Configuração
    // Middleware para analisar solicitações JSON
    app.use(express.json());

// Rotas
    app.use('/v1/estudante', student);
    app.use('/v1/professor', teacher);
    app.use('/v1/disciplina', classeSchool);
    app.use('/v1/avaliacao', grade);

// Depuração
// console.log('o que tem dentro do sequelize? ->', sequelize);
// console.log('o que tem dentro do app = express()? ->', app);

// Criando tabelas
sequelize.sync() // Isso cria as tabelas no banco de dados
.then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
})
.catch((error) => {
  console.error('Database synchronization error:', error);
});