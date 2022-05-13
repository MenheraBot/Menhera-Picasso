const CanvasImport = require('canvas');
const { getWarriorProfile } = require('../../ImageReader');
const ProfileBadges = require('../../utils/ProfileUtils');

const captalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const guerreiroProfileImage = async (user, usageCommands, i18n) => {
  // Criação da Área de Trabalho
  const canvas = CanvasImport.createCanvas(1080, 720);
  const ctx = canvas.getContext('2d');

  // Plano de Fundo
  ctx.fillStyle = user.cor ?? '#a788ff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Avatar do usuário
  const userAvatar = await CanvasImport.loadImage(user.avatar).catch(er => console.log(er));
  ctx.drawImage(userAvatar, 23, 17, 226, 200);


  // Sobre Mim
  ctx.font = 'bold 36px Sans'
  ctx.fillStyle = '#fff'
  ctx.fillText(ctx.getLines(user.nota, 920).join('\n'), 100, 440);
  ctx.strokeText(ctx.getLines(user.nota, 920).join('\n'), 100, 440);


  if (usageCommands) {
    const usedCommands = usageCommands.cmds.count;
    const mostUsedCommand = usageCommands.array[0];
    ctx.fillText(ctx.getLines(`${user.username} ${i18n.zero} ${usedCommands} ${i18n.um} ${captalize(mostUsedCommand?.name ?? 'owo')}, ${i18n.dois} ${mostUsedCommand?.count ?? 'nha'} ${i18n.tres}   | ${user.votos} Upvotes`, 970).join('\n'), 50, 255);
    ctx.strokeText(ctx.getLines(`${user.username} ${i18n.zero} ${usedCommands} ${i18n.um} ${captalize(mostUsedCommand?.name ?? 'owo')}, ${i18n.dois} ${mostUsedCommand?.count ?? 'nha'} ${i18n.tres}   | ${user.votos} Upvotes`, 970).join('\n'), 50, 255);
  }


  // Plano de Fundo
  const background = await CanvasImport.loadImage(getWarriorProfile())
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

  // Username
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'left'
  ctx.font = '28px Warrior'
  ctx.strokeStyle = 'black'
  ctx.fillText(user.tag, 330, 140);


  // Casado
  if (user.marry !== null) {
    ctx.lineWidth = 1;
    ctx.font = 'bold 16px Warrior';
    ctx.fillText(ctx.getLines(`${user.marry.username} ${user.data.split(' ')[0]}`, 600), 380, 180);
  }


  // Mamadas e Mamou
  ctx.font = "bold 28px Sans"
  ctx.textAlign = 'center'
  ctx.fillText(`${i18n.mamado}\n\n${i18n.mamou}`, 940, 100)
  ctx.strokeText(`${i18n.mamado}\n\n${i18n.mamou}`, 940, 100)

  ctx.fillText(`${user.mamadas}\n\n${user.mamou}`, 940, 130)
  ctx.strokeText(`${user.mamadas}\n\n${user.mamou}`, 940, 130)

  ctx.textAlign = 'left'
  ctx.font = 'bold 36px Sans';
  ctx.fillStyle = 'white';

  ProfileBadges.drawBadges(ctx, await ProfileBadges.GetBadges(user), 110, 630, 50)

  return canvas.toBuffer();
}

module.exports = { guerreiroProfileImage }