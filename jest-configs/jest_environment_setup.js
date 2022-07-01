/*------------------------------------------------------------------------------
   About      : Jest node setup
   
   Created on : Fri Jul 01 2022
   Author     : Ajith K P
------------------------------------------------------------------------------*/

const NodeEnvironment = require('jest-environment-node')

class JestCustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = JestCustomEnvironment;