module.exports = (app) => {
  const utils = require('../utils/utils');
  const Summ = require('../libs/summ');
  const summerizer = new Summ();
  summerizer.init();

  app.post('/api/summary',
    utils.verifyAPIArgs(['text']),
    utils.simplifiedCallback(async (req, callback) => {
      try {
        const { text } = req.body;
        const summary = await summerizer.summarize(text);
        callback(null, summary, "summary generated successfully");
      } catch (e) {
        callback(e, null, "summary failed");
      }
    })
  );
}