const CanvasImport = require('canvas');
const { getWithoutSoul } = require('../../ImageReader');
const ProfileBadges = require('../../utils/ProfileUtils');

const withoutSoulProfileImage = async (user) => {
  // Criação da Área de Trabalho
  const canvas = CanvasImport.createCanvas(1080, 720);
  const ctx = canvas.getContext('2d');

  const baseColor = user.cor ?? '#a788ff';

  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const userAvatar = await CanvasImport.loadImage(user.avatar).catch(er => console.log(er));
  ctx.drawImage(userAvatar, 85, 95, 175, 175);

  const background = await CanvasImport.loadImage(getWithoutSoul())
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

  const badgesImages = await ProfileBadges.GetBadges(user).catch(er => console.log(er));

  ProfileBadges.drawBadges(ctx, badgesImages, 135, 595, 54);

  ctx.fillStyle = '#fff';

  ctx.font = `20px Postamt`;
  ctx.fillText(ctx.getLines(user.nota, 520).join('\n\n'), 385, 180);

  if (user.marry !== null) {
    ctx.font = '28px Gabrielle';
    ctx.fillText(ctx.getLines(`${user.marry.username} | ${user.data.split(' ')[0]}`, 600), 440, 320);
  }


  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `${user.tag.length > 22 ? 24 : 30}px Postamt`;
  ctx.fillText(ctx.getLines(user.tag, 420).join('\n'), 620, 135);

  ctx.font = '30px Postamt'
  ctx.fillText(`Upvotes: ${user.votos}`, 875, 625);
  ctx.strokeText(`Upvotes: ${user.votos}`, 875, 625);

  return canvas.toBuffer()
}

module.exports = { withoutSoulProfileImage }