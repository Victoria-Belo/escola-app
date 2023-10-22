escola-app/
  ├── node_modules/
  ├── database/
  │   ├── database.sqlite
  │   ├── models.js
  ├── views/
  ├── routes/
  │   ├── routerStudent.js
  │   ├── routerCourse.js
  │   ├── routerGrade.js
  │   ├── routerTeacher.js
  ├── app.js
  ├── package.json

+----------------+     +-----------------+
|     Estudante |     |    Professor    |
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

Estudante
Um estudante pode estar associado a muitas disciplinas. Um estudante pode estar associado a muitos professores. Um estudante pode ter muitas notas.

Professor
Um professor pode estar associado a muitas disciplinas. Um professor pode dar nota a muitos estudantes.

Disciplina
Uma disciplina pode estar associada a muitos estudantes. Uma disciplina pode ser lecionada por muitos professores. Uma disciplina pode ter muitas notas.

Nota
Cada nota está associada a um estudante. Cada nota está associada a uma disciplina.