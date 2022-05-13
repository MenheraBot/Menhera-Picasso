const CanvasImport = require('canvas');
const { getFortificaçao } = require('../../ImageReader');
const ProfileBadges = require('../../utils/ProfileUtils');

const captalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const fortificaçãoProfileImage = async (user, usageCommands, i18n) => {
  // Criação da Área de Trabalho
  const canvas = CanvasImport.createCanvas(1080, 720);
  const ctx = canvas.getContext('2d');


  const baseColor = user.cor ?? '#a788ff';

  // Plano de Fundo
  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Avatar do usuário
  const userAvatar = await CanvasImport.loadImage(user.avatar).catch(er => console.log(er));
  const roundedImage = await ctx.roundImageCanvas(userAvatar, 250, 250);
  ctx.drawImage(roundedImage, 77, 75, 250, 250);

  // Sobre Mim
  ctx.textAlign = 'left';
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 45px Sans';
  ctx.fillText(`${i18n.aboutme}:`, 330, 310);
  ctx.strokeText(`${i18n.aboutme}:`, 330, 310);
  ctx.font = 'bold 32px Sans';
  ctx.fillText(ctx.getLines(user.nota, 750).join('\n'), 50, 350);
  ctx.strokeText(ctx.getLines(user.nota, 750).join('\n'), 50, 350);

  const darkerColor = ProfileBadges.ShadeColor(baseColor, -15);
  ctx.fillStyle = darkerColor

  ctx.fillRect(0, 480, canvas.width, canvas.height)

  // Plano de Fundo
  const background = await CanvasImport.loadImage(getFortificaçao())
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

  // Comandos

  ctx.fillStyle = '#fff'
  ctx.font = 'bold 44px Sans'

  if (usageCommands) {
    const usedCommands = usageCommands.cmds.count;
    const mostUsedCommand = usageCommands.array[0];
    ctx.fillText(ctx.getLines(`${user.username} ${i18n.zero} ${usedCommands} ${i18n.um} ${captalize(mostUsedCommand?.name ?? 'X')}, ${i18n.dois} ${mostUsedCommand?.count ?? 'N'} ${i18n.tres} | ${user.votos} Upvotes`, 970).join('\n'), 50, 540);
    ctx.strokeText(ctx.getLines(`${user.username} ${i18n.zero} ${usedCommands} ${i18n.um} ${captalize(mostUsedCommand?.name ?? 'X')}, ${i18n.dois} ${mostUsedCommand?.count ?? 'N'} ${i18n.tres} | ${user.votos} Upvotes`, 970).join('\n'), 50, 540);
  }

  // Username
  ctx.font = `bold 36px Sans`
  ctx.fillText(user.tag, 360, 170);
  ctx.strokeText(user.tag, 360, 170)

  // Casado
  if (user.marry !== null) {
    ctx.font = 'bold 28px Sans';
    ctx.fillText(ctx.getLines(`${user.marry.username} | ${user.data.split(' ')[0]}`, 600), 385, 240);
    ctx.strokeText(ctx.getLines(`${user.marry.username} | ${user.data.split(' ')[0]}`, 600), 385, 240);
    const ringEmoji = await CanvasImport.loadImage(ProfileBadges.Badges['ring']).catch(er => console.log(er));
    ctx.drawImage(ringEmoji, 345, 210, 42, 42)
  }


  // Área de Mamadas
  const darkestThanTheDarkerColor = ProfileBadges.ShadeColor(darkerColor, -10);
  ctx.fillStyle = darkestThanTheDarkerColor;
  ctx.fillStyle = darkestThanTheDarkerColor;
  ctx.roundRect(840, 270, 200, 190, 20, true, true);

  // Mamadas e Mamou
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 40px Sans'
  ctx.textAlign = 'center';
  ctx.fillText(i18n.mamado, 940, 310);
  ctx.strokeText(i18n.mamado, 940, 310);
  ctx.fillText(i18n.mamou, 940, 400);
  ctx.strokeText(i18n.mamou, 940, 400);

  ctx.fillText(user.mamadas, 940, 350);
  ctx.strokeText(user.mamadas, 940, 350);
  ctx.fillText(user.mamou, 940, 440);
  ctx.strokeText(user.mamou, 940, 440);

  ProfileBadges.drawBadges(ctx, await ProfileBadges.GetBadges(user), 160, 5, 64)

  return canvas.toBuffer()
}

module.exports = { fortificaçãoProfileImage }