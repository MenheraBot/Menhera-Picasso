const CanvasImport = require('canvas');
const { getChristmasBaseProfile } = require('../../ImageReader');
const ProfileBadges = require('../../utils/ProfileUtils');

const captalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const christmasProfileImage = async (user, marry, usageCommands, i18n) => {
  // Criação da Área de Trabalho
  const canvas = CanvasImport.createCanvas(1080, 720);
  const ctx = canvas.getContext('2d');

  // Plano de Fundo
  const baseColor = user.cor ?? '#a788ff';
  ctx.fillStyle = baseColor;
  ctx.fillRect(67, 30, 950, 621);

  // Sobremim
  const darkerColor = ProfileBadges.ShadeColor(baseColor, -15);
  ctx.fillStyle = darkerColor;
  ctx.fillRect(48, 465, 974, 187);

  // Mamados
  ctx.roundRect(370, 208, 557, 53, 20, true, true);

  // Avatar do usuário
  const userAvatar = await CanvasImport.loadImage(user.avatar).catch(er => console.log(er));
  const roundedImage = await ctx.roundImageCanvas(userAvatar, 250, 250);
  ctx.drawImage(roundedImage, 65, 10, 263, 265);

  // Plano de Fundo
  const background = await CanvasImport.loadImage(getChristmasBaseProfile())
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height)


  // Username
  ctx.fillStyle = 'red'
  ctx.textAlign = 'center'
  ctx.font = `bold ${user.username.length >= 18 ? 24 : 36}px Candy`
  ctx.strokeStyle = 'white'
  ctx.fillText(user.username, 660, 100);
  ctx.strokeText(user.username, 660, 100)


  // Sobre Mim
  ctx.textAlign = 'left';
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = 'black'
  ctx.font = 'bold 32px Impact';
  ctx.fillText(ctx.getLines(user.nota, 920).join('\n'), 90, 506);
  ctx.strokeText(ctx.getLines(user.nota, 920).join('\n'), 90, 506);

  // Casado
  if (marry !== null) {
    ctx.font = 'bold 24px Sans';
    ctx.lineWidth = 1;
    ctx.fillText(ctx.getLines(`${marry.username} ${user.data.split(' ')[0]}`, 600), 400, 140);
    ctx.strokeText(ctx.getLines(`${marry.username} ${user.data.split(' ')[0]}`, 600), 400, 140);
  }

  // Mamadas e Mamou
  ctx.font = "bold 32px Sans"
  ctx.fillText(`${i18n.mamado}: ${user.mamadas} ${i18n.mamou}: ${user.mamou}`, 380, 243)
  ctx.strokeText(`${i18n.mamado}: ${user.mamadas} ${i18n.mamou}: ${user.mamou}`, 380, 243)


  ctx.font = 'bold 40px Sans';
  ctx.fillStyle = 'white';

  if (usageCommands) {
    const usedCommands = usageCommands.cmds.count;
    const mostUsedCommand = usageCommands.array[0];
    ctx.fillText(ctx.getLines(`${user.username} ${i18n.zero} ${usedCommands} ${i18n.um} ${captalize(mostUsedCommand?.name ?? 'owo')}, ${i18n.dois} ${mostUsedCommand?.count ?? 'nha'} ${i18n.tres}   | ${user.votos} Upvotes`, 920).join('\n'), 90, 300);
    ctx.strokeText(ctx.getLines(`${user.username} ${i18n.zero} ${usedCommands} ${i18n.um} ${captalize(mostUsedCommand?.name ?? 'owo')}, ${i18n.dois} ${mostUsedCommand?.count ?? 'nha'} ${i18n.tres}   | ${user.votos} Upvotes`, 920).join('\n'), 90, 300);
  }

  ProfileBadges.drawBadges(ctx, await ProfileBadges.GetBadges(user), 80, 667, 54)

  return canvas.toBuffer();
}

module.exports = { christmasProfileImage }