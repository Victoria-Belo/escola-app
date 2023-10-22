# Escola-App

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" />
  <img src="https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue" />
  <img src="https://img.shields.io/badge/FINALIZADO-green?logo=github&label=STATUS" />
</p>
<hr>

## ÍNDICE
 [BRANCHS](#branchs)
 [ESTRUTURA](#estrutura)
 [UML](#uml)

## BRANCHS
<p><img src="https://img.shields.io/badge/MAIN-8A2BE2?logo=git&label=BRANCH&labelColor=white" />: Não é possível executar um servidor Node.js com SQLite diretamente no GitHub Pages, mas é possível ver a disposição do modelo. Acesse https://victoria-belo.github.io/escola-app/ </p>
<br>
<p><img src="https://img.shields.io/badge/DEV-8A2BE2?logo=git&label=BRANCH&labelColor=white" />: Configurado para localhost. Baixe, instale e acesse http://localhost:3000/api </p>

## ESTRUTURA
<p align="center"><img src="swagger-ui-dist/estrutura.png" /></p>

## UML
<p align="center"><img src="swagger-ui-dist/uml.png" /></p>

### Estudante
Um estudante pode estar associado a muitas disciplinas.
Um estudante pode estar associado a muitos professores.
Um estudante pode ter muitas notas.

### Professor
Um professor pode estar associado a muitas disciplinas.
Um professor pode dar nota a muitos estudantes.

### Disciplina
Uma disciplina pode estar associada a muitos estudantes.
Uma disciplina pode ser lecionada por muitos professores.
Uma disciplina pode ter muitas notas.

### Nota
Cada nota está associada a um estudante.
Cada nota está associada a uma disciplina.
