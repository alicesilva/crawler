const CrawllerService = require("../services/mercado-livre-crawller")

class CrawllerController {
  static async execute(name, quantity) {
    let mlItems = [];
    do {
      const items = await CrawllerService.execute(name, quantity, mlItems.length)
      mlItems = [...mlItems, ...items]
    } while (mlItems.length < quantity);

    return mlItems;
  }

}

module.exports = CrawllerController

