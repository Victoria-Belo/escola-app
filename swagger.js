const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['routes/routerGrade.js']

swaggerAutogen(outputFile, endpointsFiles)