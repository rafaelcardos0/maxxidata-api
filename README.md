# FullStack Challenge Backend (API)

Projeto criado com o framework [Nest](https://nestjs.com/) + [TypeORM](https://typeorm.io/#/) em typescript. 

## Resumo



#### Autenticação

Autenticação implementada com uso de rotas privadas controladas através de token JWT.

As senhas são armazenadas com a função de hash Bcrypt. A escolha pelo Bcrypt é justificada por sua maior segurança contra decodificação em caso de acesso ao hash.

#### Documentação

Documentação implementada com [Swagger](https://swagger.io/), está disponível no endereço [http://localhost:3003/api-doc](http://localhost:3003/api-doc).


#### Testes

Testes implementados com o framework [Jest](https://jestjs.io/).

#### Seed Migrations

Por padrão o Nest + TypeORM não possui suporte nativo para população de dados no banco através de seed migration. Dito isso, foi implementada uma classe de fácil reutilização (`Seeder.ts`) que será executada quando da inicialização do servidor através do script `npm run start:seed`.

## Configurando e executando o projeto


### Instalando as dependencias: 

Execute o comando: `npm install`


### Conectando ao banco de dados (PostgreSQL):

Caso possua o docker instalado basta executar o comando `docker-compose up` para subir um container contendo o banco de dados. Caso prefira rodar o banco em outro ambiente, basta alterar os parâmetros de conexão no arquivo `.env`.

### Executando o projeto localmente

#### Populando o banco de dados (primeira execução):

Execute o comando `npm run start:seed`. Este comando criará o seguinte usuário:

```json 
{
    "name": "Administrador",
    "username": "admin",
    "password": "admin21", // armazenada criptografada no banco
    "isActive": true
}
```

As demais execuções deverão ser realizadas através do comando:
`npm start`

O ambiente de desenvolvimento será executado no endereço [http://localhost:3003](http://localhost:3003).