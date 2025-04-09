# Cypress API Test - Reserva de Hotel

Este projeto contém testes de API utilizando **Cypress** para interagir com a API de reservas de hotel do **Restful Booker**. O objetivo do projeto é demonstrar a criação, atualização e a realização de login de reservas, além de testar cenários de sucesso e falha.

## Cenários Testados

1. **Login e Autenticação**:
   - Realiza o login na API com as credenciais `username: "admin"` e `password: "password123"`, retornando um token que será usado nas requisições subsequentes.
   
2. **Criar Reserva**:
   - Criação de uma reserva com sucesso.
   
3. **Atualizar Reserva com Sucesso**:
   - Atualização de uma reserva existente com novos dados, incluindo a verificação de que os dados da reserva foram realmente atualizados corretamente.

4. **Cenário de Falha - Atualização com Token Inválido**:
   - Tentativa de atualização de uma reserva com um token inválido (deve retornar erro 403).

## Como Rodar os Testes 

- Rodando os Testes em Modo Interativo (com a Interface Gráfica do Cypress)

    npm run cy:open

- Rodando os Testes em Modo Headless (Sem Interface Gráfica)

    npm run test


## Dependências

- **Cypress**: Utilizado para rodar os testes de integração com a API.
  
Para instalar as dependências, rode o seguinte comando:

```bash
npm install
