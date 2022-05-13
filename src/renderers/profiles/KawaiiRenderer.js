const CanvasImport = require('canvas');
const { getKawaii } = require('../../ImageReader');
const ProfileBadges = require('../../utils/ProfileUtils');

const captalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const kawaiiProfileImage = async (user, usageCommands, i18n) => {
  // Criação da Área de Trabalho
  const canvas = CanvasImport.createCanvas(1080, 720);
  const ctx = canvas.getContext('2d');

  // Plano de Fundo
  ctx.fillStyle = user.cor ?? '#a788ff';
  ctx.fillRect(25, 25, canvas.width - 55, canvas.height - 55);

  const textTheme = '#fff'

  // Avatar do usuário
  const userAvatar = await CanvasImport.loadImage(user.avatar).catch(er => console.log(er));
  ctx.drawImage(userAvatar, 55, 50, 300, 290);

  // Plano de Fundo
  const background = await CanvasImport.loadImage(getKawaii())
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

  // Mamadas e Mamou
  ctx.fillStyle = textTheme
  ctx.font = 'bold 60px Kawaii'
  ctx.textAlign = 'center';
  ctx.fillText(i18n.mamado, 880, 540);
  ctx.fillText(i18n.mamou, 880, 420);

  ctx.fillText(user.mamadas, 880, 600);
  ctx.fillText(user.mamou, 880, 480);


  // Username
  ctx.textAlign = 'left'
  ctx.font = '72px Kawaii'
  ctx.fillText(user.tag, 420, 200);

  // Casado
  if (user.marry !== null) {
    ctx.font = 'bold 36px Kawaii';
    ctx.fillText(ctx.getLines(`${user.marry.username} | ${user.data.split(' ')[0]}`, 600), 460, 290);
    const ringEmoji = await CanvasImport.loadImage(ProfileBadges.Badges['ring']).catch(er => console.log(er));
    ctx.drawImage(ringEmoji, 410, 260, 42, 42)
  }

  ctx.font = 'bold 32px Kawaii'
  ctx.fillText(ctx.getLines(user.nota, 700).join('\n'), 85, 410);


  if (usageCommands) {
    ctx.font = 'bold 34px Kawaii'
    const usedCommands = usageCommands.cmds.count;
    const mostUsedCommand = usageCommands.array[0];
    ctx.fillText(ctx.getLines(`${user.username} ${i18n.zero} ${usedCommands} ${i18n.um} ${captalize(mostUsedCommand?.name ?? 'owo')}, ${i18n.dois} ${mostUsedCommand?.count ?? 'nha'} ${i18n.tres}   | ${user.votos} Upvotes`, 650).join('\n'), 85, 580);
  }

  ProfileBadges.drawBadges(ctx, await ProfileBadges.GetBadges(user), 410, 60, 46)

  return canvas.toBuffer()

}

module.exports = { kawaiiProfileImage }