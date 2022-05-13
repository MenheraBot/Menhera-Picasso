const CanvasImport = require('canvas');
const ProfileBadges = require('../../utils/ProfileUtils');

const captalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const buildProfileImage = async (user, usageCommands, i18n) => {
  // Criação da Área de Trabalho
  const canvas = CanvasImport.createCanvas(1080, 720);
  const ctx = canvas.getContext('2d');

  // Plano de Fundo
  const baseColor = user.cor ?? '#a788ff';
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Header
  const darkerColor = ProfileBadges.ShadeColor(baseColor, -15);
  ctx.fillStyle = darkerColor;
  ctx.roundRect(0, 0, canvas.width, 240, 20, true, true);

  // Emblemas
  const darkestThanTheDarkerColor = ProfileBadges.ShadeColor(darkerColor, -10);
  ctx.fillStyle = darkestThanTheDarkerColor;
  ctx.roundRect(0, 164, canvas.width, 75, 20, true, true);

  // Área de Mamadas
  ctx.fillStyle = darkestThanTheDarkerColor;
  ctx.roundRect(890, 250, 180, 200, 20, true, true);

  // Avatar do usuário
  const userAvatar = await CanvasImport.loadImage(user.avatar).catch(er => console.log(er));
  const roundedImage = await ctx.roundImageCanvas(userAvatar, 250, 250);
  ctx.beginPath();
  ctx.arc(120, 120, 122, 0, 2 * Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();
  ctx.drawImage(roundedImage, 0, 0, 240, 240);

  // Nick do usuário
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 50px Sans';
  ctx.fillText(ctx.getLines(user.tag, 650).join('\n'), 255, 90);
  ctx.strokeText(ctx.getLines(user.tag, 650).join('\n'), 255, 90);

  // Upvotes
  ctx.font = 'bold 45px Sans';
  ctx.fillText('Upvotes', 860, 60);
  ctx.strokeText('Upvotes', 860, 60);
  ctx.textAlign = 'center';
  ctx.fillText(user.votos, 980, 120);
  ctx.strokeText(user.votos, 980, 120);

  // Sobre Mim
  ctx.textAlign = 'left';
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 45px Sans';
  ctx.fillText(`${i18n.aboutme}:`, 20, 300);
  ctx.strokeText(`${i18n.aboutme}:`, 20, 300);
  ctx.font = 'bold 32px Sans';
  ctx.fillText(ctx.getLines(user.nota, 870).join('\n'), 20, 350);
  ctx.strokeText(ctx.getLines(user.nota, 870).join('\n'), 20, 350);

  // Repaint do footer para evitar usuários engraçadinhos que fazem sobre mim com muita quebra de linhas
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 480, canvas.width, canvas.height);

  // Área de Informações
  ctx.font = 'bold 40px Sans';
  ctx.fillStyle = 'white';


  if (usageCommands) {
    const usedCommands = usageCommands.cmds.count;
    const mostUsedCommand = usageCommands.array[0];
    ctx.fillText(ctx.getLines(`${user.username} ${i18n.zero} ${usedCommands} ${i18n.um} ${captalize(mostUsedCommand?.name ?? 'owo')}, ${i18n.dois} ${mostUsedCommand?.count ?? 'nha'} ${i18n.tres}`, 1000).join('\n'), 20, 600);
    ctx.strokeText(ctx.getLines(`${user.username} ${i18n.zero} ${usedCommands} ${i18n.um} ${captalize(mostUsedCommand?.name ?? 'owo')}, ${i18n.dois} ${mostUsedCommand?.count ?? 'nha'} ${i18n.tres}`, 1000).join('\n'), 20, 600);
  }

  // Casado
  if (user.marry !== null) {
    const ringEmoji = await CanvasImport.loadImage(ProfileBadges.Badges['ring']).catch(er => console.log(er));
    ctx.lineWidth = 1;
    ctx.textAlign = 'left';
    ctx.fillText(`${user.marry.tag} | ${user.data}`, 80, 535);
    ctx.strokeText(`${user.marry.tag} | ${user.data}`, 80, 535);
    ctx.drawImage(ringEmoji, 10, 490, 55, 55);
  }

  // Mamadas e Mamou
  ctx.textAlign = 'center';
  ctx.fillText(i18n.mamado, 980, 290);
  ctx.strokeText(i18n.mamado, 980, 290);
  ctx.fillText(i18n.mamou, 980, 380);
  ctx.strokeText(i18n.mamou, 980, 380);

  ctx.fillText(user.mamadas, 980, 335);
  ctx.strokeText(user.mamadas, 980, 335);
  ctx.fillText(user.mamou, 980, 425);
  ctx.strokeText(user.mamou, 980, 425);

  const badgesImages = await ProfileBadges.GetBadges(user).catch(er => console.log(er));

  ProfileBadges.drawBadges(ctx, badgesImages, 230, 170);

  return canvas.toBuffer();
}

module.exports = { buildProfileImage }