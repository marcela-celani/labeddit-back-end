# 💻 Website - LABEDDIT - BACK END

📝 Descrição do Projeto
Este é o projeto final do meu curso de Desenvolvimento Web FullStack, onde foram aplicados os conhecimentos adquiridos em back-end e front-end. O design do aplicativo segue o conceito Mobile First, priorizando o desenvolvimento para dispositivos móveis e adaptando-o para telas maiores, como tablets ou desktops.

O projeto consiste em criar uma aplicação web, utilizando ReactJS no front-end e uma API no back-end. No front, as funcionalidades devem respeitar o layout definido no [Figma](https://www.figma.com/file/Byakv89sjTqI6NG2NRAAKJ/Projeto-Integrador-Labeddit?node-id=0%3A1&t=haX9j5M0lHbjWnAr-0) e consumir a API criada no back, como requisito de projeto, garantindo uma experiência consistente para o usuário. No back, as requisições devem se conectar com o banco de dados para realizar essas funcionalidades, fazendo verificações e validações, além de testes unitários. O objetivo final é criar uma aplicação FullStack deployável e em funcionamento.

Repositórios
Para facilitar o processo de deploy, os códigos foram divididos em repositórios separados para o front-end e back-end. Certifique-se de clonar ambos os repositórios para ter o projeto completo.

[Repositório do Front-end](https://github.com/marcela-celani/labeddit-front-end) | 🔗[Deploy](https://labeddit-front-gzrqi60sj-marcela-celani.vercel.app/login)

[Repositório do Back-end](https://github.com/marcela-celani/labeddit-back-end) | 🔗[Deploy API](https://documenter.getpostman.com/view/28315168/2s9YsT4nbL)

## Informação Geral

Acesso Rápido
* [Detalhes do Projeto](#detalhes-do-projeto)
* [Tecnologias](#tecnologias)
* [Executando o projeto localmente](#executando-o-projeto-localmente)

## Tecnologias
👩🏻‍💻 Este projeto foi criado utilizando as seguintes tecnologias:

* API Rest e Requisições HTTP
* Express.Js
* TypeScript
* Banco de dados SQLite
* POO (Programação Orientada a Objetos) e Arquitetura em camadas (business, controller, database, router)
* Verificações com Zod e tratamento de erros
* Testes unitários em Jest
* Deploy da API utilizando [Postman](https://www.postman.com)
* Deploy utilzando [Render](https://render.com)

## Detalhes do Projeto

Este projeto possui as seguintes camadas de interação:

1. Business
    - Para todas as funções CRUD do projeto (criar, ler, editar e deletar) passarem por validações relacionadas aos requisitos de negócios, recebidas através da controller, antes de enviar a informação para a database para ser computada no banco de dados

2. Controller
    - Para fazer o intermédio entre a requisição que chega do front-end e a API do back-end, passando por validações utilizando Zod na chegada de informações dos formulários dos usuários antes de enviá-la para a camada business

3. Database
    - Para receber os dados já validados e com tratamento de erros da requisição da controller e dos requisitos de negócio da business, para então realizar as query SQL para computar esses dados no banco de dados SQLite
          
4. Router
    - Para relacionar as camadas anteriores e suas funções ao endpoint da requisição que será fornecido à API para consumo

5. Dtos
    - Para criação dos esquemas que padronizam os inputs e outputs de dados utilizando o Zod
      
7. Errors
    - Para criação de erros customizados não contemplados pelo Zod e utilização na camada business, como erros de persmissão, de requisição, página não encontrada, etc.

8. Models
    - Contendo as classes a serem instanciadas em objetos na POO (Programação Orientada a Objetos), bem como suas tipagens em TypeScript (interfaces) e seus construtores (métodos Get e Set)
      
9. Services
    - Funções auxiliares de segurança, como criação e manuseio de token de autenticação, gerador de identificadores únicos automáticos para as instâncias e criptografia de senhas para segurança do usuário no armazenamento do banco de dados

10. Tests
    - Testes unitários modulares realizados com Jest, cobrindo mais de 70% das funções da aplicação criando mocks para os objetos e database, simulando atividade do usuário sem testes de integração

## Executando o projeto localmente
### Prè-requisitos:

- Node.js
- npm

1. Clone este repositório:
```
git clone https://github.com/marcela-celani/labeddit-back-end.git
```

2. Instale as dependências:
```
cd labeddit-back-end
```
```
npm install
```

3. Inicie a aplicação localmente para ver em seu navegador:
```
npm run dev
```

4. Ou acesse diretamente utilizando este: 🔗[Link do Deploy da documentação da API](https://documenter.getpostman.com/view/28315168/2s9YsT4nbL)

5. Para rodar os testes unitários em Jest:
```
npm run test
```
ou
```
npm run test -- --collect-coverage
```
para visualizar o documento de coverage detalhada dos testes, vá até a pasta coverage e abra o arquivo index no navegador
