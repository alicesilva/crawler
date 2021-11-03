const axios = require('axios')
const cheerio = require('cheerio')
const elements = require("../utils/elements")

class CrawllerService {
  static async execute(name, quantity, len) {
    let search = (name.split(" ")).join("-")
    
    const response = await axios.get(`https://lista.mercadolivre.com.br/${search}_Desde_${
      quantity > len + 1 ? len + 1 : quantity
    }`)

    const { data, status } = response
    
    const $ = cheerio.load(data)
    let results = []

    $(elements.results).slice(0, quantity - len).each(function (i, elem) {
      let price_decimal = $(this).find(elements.price).find(elements.price_fraction).text().trim();
      let price_decimal_separator = $(this).find(elements.price).find(elements.price_separator).text().trim();
      let price_cents = $(this).find(elements.price).find(elements.price_cents).text().trim();
      let price_symbol = $(this).find(elements.price).find(elements.price_symbol).text().trim();

      let result = {
        name: $(this).find(elements.title).text().trim(),
        price: price_symbol + price_decimal + price_decimal_separator + price_cents,
        image: $(this).find(elements.image).find('img').attr('data-src')
      }

      results.push(result);
    })
    return results
  }
}

module.exports = CrawllerService;