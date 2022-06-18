const { createClient } = require('redis')

class RedisManager {
  constructor(database = 2) {
    this.client = createClient({ database })
    this.online = false;
    this.login()
  }

  async login() {
    await this.client.connect().then(() => {
      this.online = true;
      console.error('[REDIS] Redis client connected!')
    }).catch((e) => {
      this.online = false;
      if (e.code === 'ECONNREFUSED') this.retry = false;
      console.error('[REDIS] A fatal error ocurred when trying to login')
    })
  }

  /**
  * @returns {RedisManager}
  */
  static getInstance() {
    this.instance ??= new RedisManager(2);
    return this.instance;
  }
}

module.exports = RedisManager