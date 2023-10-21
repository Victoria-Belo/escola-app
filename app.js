const {sequelize} = require('./database/models');
const express = require('express');
const app = express();
const student = require('./routes/routerStudent');
const teacher = require('./routes/routerTeacher');
const grade = require('./routes/routerGrade');
const classeSchool = require('./routes/routerCourse');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const cors = require('cors');

// Configuração
    // Middleware para analisar solicitações JSON
    app.use(express.json());    
    app.use(cors());
// Rotas
    app.use('v1/estudante', student);
    app.use('v1/professor', teacher);
    app.use('v1/disciplina', classeSchool);
    app.use('v1/avaliacao', grade);
    app.use('api', swaggerUi.serve, swaggerUi.setup(swaggerFile));

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