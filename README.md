![https://lumi-teste.netlify.app/](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![https://www.linkedin.com/in/raphaelvitorio/](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)

![Stars](https://img.shields.io/github/stars/{username}/{repo-name}.svg)

# Extração e Exibição de dados de Fatura de Luz :zap:

Projeto designado a extrair dados dos extratos das faturas de luz, organizá-los e aplicar regras para exibição dos mesmos em gráficos onde podemos distinguir a comparação dos valores.

## Critérios de aceite

Exiba as principais variáveis da fatura de energia elétrica ao longo do tempo.
Variáveis a serem exibidas:

      - ✅ Consumo de Energia Elétrica (kWh) – somatório das variáveis ‘Energia Elétrica kWh’ + ‘Energia SCEEE s/ICMS kWh’
 
      - ✅ Energia Compensada (kWh) – variável **Energia Compensada GD I kWh**.

      - ✅ Valor Total sem GD (R$) – somatório dos valores faturados de ‘Energia Elétrica R$’,
 
      - ✅ Energia SCEEE s/ICMS R$’, ‘Contribuição Iluminação Pública Municipal R$’ Economia GD (R$) – corresponde à ‘Energia Compensada GD I R$’

      - ✅ Os valores devem ser expressos em gráficos, com a possibilidade de filtrar pelo ‘No DO CLIENTE’.





## Tecnologias Utilizadas 💻
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) 
![Vite](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Recharts](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)


## Instalação :hammer_and_wrench:
Siga todos os passos para rodar o projeto localmente, também clone e siga os passos do repositório da API Backend https://github.com/RaphaelVjr/backend-lumi

#### Passo 1 - Pré Requisitos:

- **Postgres 16**
- **Node**
- **NPM ou YARN**

```bash
  git clone https://github.com/RaphaelVjr/frontend-lumi.git
```

Entre no diretório do projeto

Instale as dependências! Dentro da pasta do projeto execute: 
```sh
npm install
```

## Features futuras :rocket:

- Login


## Rodando Testes :traffic_light:

Para rodar os testes utilizando o o mocha basta digitar no terminal:

```bash
  npm run test
```
Testes foram feitos utilizando Vitest.


## Deploy

Deploy feito na Vercel com o banco PostgreSQL na Vercel também.


![Love](http://ForTheBadge.com/images/badges/built-with-love.svg)
