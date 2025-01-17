const express = require('express');;
const scrapeLinksMC = require('./scrap_href');
const scrapeItensInfo = require('./cluster');
const cors = require('cors');
const ejs = require('ejs');

const app = express();

// Configuração do Express
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());

// Rota principal
app.get('/api/scrape', async (req, res) => {
  const produto = req.query.produto;

  if (!produto) {
    return res.status(400).send('Por favor, forneça um produto para busca!')
  }

  try {

    const hrefs = await scrapeLinksMC(produto);
    const resultados = await scrapeItensInfo(hrefs)

    await res.render('resultado', { resultados });

  } catch (error) {

    console.error('Erro na rota /scrape:', error.message);
    res.status(500).send('Erro no servidor');

  }
})

// Exporta o app para que o Vercel o utilize
module.exports = app;
