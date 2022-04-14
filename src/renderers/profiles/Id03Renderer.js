const CanvasImport = require('canvas');
const { getId03 } = require('../../ImageReader');
const ProfileBadges = require('../../utils/ProfileUtils');

const iD03ProfileImage = async (user, marry, usageCommands, i18n) => {
  // Criação da Área de Trabalho
  const canvas = CanvasImport.createCanvas(1080, 720);
  const ctx = canvas.getContext('2d');

  const baseColor = user.cor ?? '#a788ff';

  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const userAvatar = await CanvasImport.loadImage(user.avatar).catch(er => console.log(er));
  ctx.drawImage(userAvatar, 225, 92, 120, 120);

  const background = await CanvasImport.loadImage(getId03())
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

  const badgesImages = await ProfileBadges.GetBadges(user).catch(er => console.log(er));

  ProfileBadges.drawBadges(ctx, badgesImages, 408, 462, 38);

  ctx.fillStyle = '#fff';
  ctx.font = '32px Pixellari';
  ctx.fillText(ctx.getLines(user.tag, 420).join('\n'), 425, 160);
  ctx.strokeText(ctx.getLines(user.tag, 420).join('\n'), 425, 160);

  ctx.font = '24px Pixellari';
  ctx.fillText(ctx.getLines(user.nota, 700).join('\n'), 200, 540);
  ctx.strokeText(ctx.getLines(user.nota, 700).join('\n'), 200, 540);

  if (marry !== null) {
    ctx.lineWidth = 1;
    ctx.font = 'bold 20px Pixellari';
    ctx.fillText(ctx.getLines(`${marry.username} ${user.data.split(' ')[0]}`, 600), 445, 220);
  }

  ctx.font = `${user.mamou >= 1000 || user.mamadas >= 1000 ? 22 : 24}px Pixellari`;
  ctx.fillText(`${i18n.mamado}: ${user.mamou}`, 850, 145)
  ctx.strokeText(`${i18n.mamado}: ${user.mamou}`, 850, 145)

  ctx.fillText(`${i18n.mamou}: ${user.mamadas}`, 850, 175)
  ctx.strokeText(`${i18n.mamou}: ${user.mamadas}`, 850, 175)

  if (usageCommands) {
    ctx.font = '24px Pixellari';
    const usedCommands = usageCommands.cmds.count;
    const text = ctx.getLines(`${user.username} ${i18n.zero} ${usedCommands} ${i18n.um.split(' ')[0]} | ${user.votos} Upvotes `, 540)
    ctx.fillText(text.join('\n'), 390, 426);
    ctx.strokeText(text.join('\n'), 390, 426);
  }

  return canvas.toBuffer()
}

module.exports = { iD03ProfileImage }