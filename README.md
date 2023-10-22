<h1 align="center"> Escola-App </h1>
STATUS: <img src="https://img.shields.io/badge/FINALIZADO-green" />

<hr>
BRANCH MAIN : Produção. Não é possível executar um servidor Node.js com SQLite diretamente no GitHub Pages, mas é possível ver a disposição do modelo. Acesse https://victoria-belo.github.io/escola-app/

BRANCH DEV: Configurado para localhost. Baixe, instale e acesse http://localhost:3000/api 
Exemplo:

<hr> 

<h3>ESTRUTURA</h3>

escola-app/
  ├── node_modules/
  ├── public/
  │   ├── css/
  │   ├── js/
  │   ├── images/
  ├── database/
  │   ├── database.sqlite
  │   ├── models.js
  ├── routers/
  │   ├── routerStudent.js
  │   ├── routerTeacher.js
  │   ├── routerGrade.js
  │   ├── routerCourse.js
  ├── app.js
  ├── package.json


<hr>
<h3>UML</h3>

+----------------+     +-----------------+
|     Estudante  |     |    Professor    |
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


Estudante:
Um estudante pode estar associado a muitas disciplinas.
Um estudante pode estar associado a muitos professores.
Um estudante pode ter muitas notas.

Professor:
Um professor pode estar associado a muitas disciplinas.
Um professor pode dar nota a muitos estudantes.

Disciplina :
Uma disciplina pode estar associada a muitos estudantes.
Uma disciplina pode ser lecionada por muitos professores.
Uma disciplina pode ter muitas notas.

Nota:
Cada nota está associada a um estudante.
Cada nota está associada a uma disciplina.
