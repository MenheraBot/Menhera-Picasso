const { default: Collection } = require("@discordjs/collection");

const profileCache = new Collection();

const inCache = (data) => {
  const haveInCache = profileCache.get(`${data.user.id}`);
  if (!haveInCache) return;

  if (haveInCache.stringed === JSON.stringify(data)) return haveInCache.data;
}

const updateInCache = (data, buffer) =>
  profileCache.set(data.user.id, { stringed: JSON.stringify(data), data: buffer.toJSON() })

module.exports = { inCache, updateInCache }