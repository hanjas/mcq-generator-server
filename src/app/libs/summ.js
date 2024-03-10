const nodecallspython = require("node-calls-python");
const py = nodecallspython.interpreter;

class Summ {
  
  async init() {
    console.log("initializing...")
    const pymodule = await py.import("/Users/roshinhanjas/Desktop/works/nodejs/mcq-generator-server/src/app/libs/summ.py");
    const pyobj = await py.create(pymodule, "Summ");
    this.pythonShell = pyobj
  }

  async summarize(text) {
    console.log('Summarizing...')
    const summary = await py.call(this.pythonShell, 'summarize', text);
    return summary;
  }
}

exports = module.exports = Summ;