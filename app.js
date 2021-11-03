const Queue = require("@mundiale-private/queue");
const CrawllerController = require("./controllers/CrawllerController");
const outgoing = Queue.get("outgoing")
const incoming = Queue.get("incoming")

class App {
  static async run() {
    let message = null;
    while ((message = await incoming.dequeue()) !== null) {
      const product = JSON.parse(message.toString())
      const { name, quantity } = product
      let products = {}

      const itens = await CrawllerController.execute(name, quantity)

      products.products = itens
      await outgoing.enqueue(Buffer.from(JSON.stringify(products)))

      return products
    }
  }
}

module.exports = App