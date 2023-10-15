escola-app/
  ├── node_modules/
  ├── public(front)/
  │   ├── css/
  │   ├── js/
  │   ├── images/
  ├── database(back-end)/
  ├── views/
  ├── routes(back-end)/
  │   ├── routersUsers.js
  │   ├──  
  ├── app.js
  ├── package.json


     +----------------+     +-----------------+
     |     Aluno      |     |    Professor    |
     +----------------+     +-----------------+
     | - id: int      |     | - id: int       |
     | - nome: string |     | - nome: string  |
     | - idade: int   |     | - disciplina:   |
     |                |     |   string        |
     +----------------+     +-----------------+
            |                       |
            |                       |
            |                       |
      +-----------------+   +-----------------+
      |  Disciplina     |   |      Nota       |
      +-----------------+   +-----------------+
      | - nome: string  |   | - alunoId: int  |
      | - cargaHoraria: |   | - disciplinaId: |
      |   int           |   |   int           |
      +-----------------+   +-----------------+
