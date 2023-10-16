escola-app/
  ├── node_modules/
  ├── public(front)/
  │   ├── css/
  │   ├── js/
  │   ├── images/
  ├── database(back-end)/
  ├── views/
  ├── routes(back-end)/
  │   ├── routeStudent.js
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
      |                 |   | - nota: float   |
      |                 |   | - professorId:  |
      |                 |   | int             |   
      +-----------------+   +-----------------+

Aluno tem uma ou muitas Disciplinas. Muitas disciplinas podem ter muitos alunos. -> many-to-many
Aluno pode ter muitas notas. Muitas notas pertecem a um aluno. -> one-to-many
Professor pode lecionar uma ou muitas Disciplinas. Disciplinas são lecionadas por um professor. -> one-to-many
Professor pode dar nota a muitos Alunos. Alunos podem ter muitas Notas. -> many-to-many