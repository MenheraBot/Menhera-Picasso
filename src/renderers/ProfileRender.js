const { getRing, getBirthday, getVote, getHundred, getMenheraDev, getBanido, getDeveloper, getBravery, getBrilliance, getBadgeOne, getBalance } = require("../ImageReader");
const CanvasImport = require('canvas')

const shadeColor = (color, percent) => {
  const num = parseInt(color.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;

  const shadedColor = `#${(0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)}`;
  return shadedColor;
}

const ProfileBadges = {}

const start = () => {
  ProfileBadges[1] = getBadgeOne()
  ProfileBadges[6] = getBanido()
  ProfileBadges[7] = getMenheraDev()
  ProfileBadges[8] = getBirthday()
  ProfileBadges['HOUSE_BRAVERY'] = getBravery()
  ProfileBadges['HOUSE_BRILLIANCE'] = getBrilliance()
  ProfileBadges['HOUSE_BALANCE'] = getBalance()
  ProfileBadges['EARLY_VERIFIED_DEVELOPER'] = getDeveloper()
  ProfileBadges['ring'] = getRing()
  ProfileBadges['vote'] = getVote()
  ProfileBadges['hundred'] = getHundred()
}


const captalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const getUserBadgesLink = async (user) => {
  const images = [];

  if (user?.casado !== 'false') {
    const ringEmoji = await CanvasImport.loadImage(ProfileBadges['ring']).catch(er => console.log(er));
    images.push(ringEmoji);
  }

  if (user.voteCooldown && parseInt(user?.voteCooldown) > Date.now()) {
    const voteEmoji = await CanvasImport.loadImage(ProfileBadges['vote']).catch(er => console.log(er));
    images.push(voteEmoji);
  }

  if (user.votos > 100) {
    const hundredVoteEmoji = await CanvasImport.loadImage(ProfileBadges['hundred']).catch(er => console.log(er));
    images.push(hundredVoteEmoji);
  }

  if (user.flagsArray?.length > 0) {
    user.flagsArray.map(async a => {
      const buffer = ProfileBadges[a]
      const img = await CanvasImport.loadImage(buffer).catch(er => console.log(er))
      images.push(img)
    })
  }

  if (user.badges?.length > 0) {
    for (const i in user.badges) {
      const { id } = user.badges[i];
      const buffer = ProfileBadges[id];
      const img = await CanvasImport.loadImage(buffer).catch(er => console.log(er));
      images.push(img);
    }
  }

  return images;
}


const buildProfileImage = async (user, marry, usageCommands, i18n) => {
  // Criação da Área de Trabalho
  const canvas = CanvasImport.createCanvas(1080, 720);
  const ctx = canvas.getContext('2d');

  // Plano de Fundo
  const baseColor = user.cor || '#a788ff';
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Header
  const darkerColor = shadeColor(baseColor, -15);
  ctx.fillStyle = darkerColor;
  ctx.roundRect(0, 0, canvas.width, 240, 20, true, true);

  // Emblemas
  const darkestThanTheDarkerColor = shadeColor(darkerColor, -10);
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
  if (marry !== 'false') {
    const ringEmoji = await CanvasImport.loadImage(getRing()).catch(er => console.log(er));
    ctx.lineWidth = 1;
    ctx.textAlign = 'left';
    ctx.fillText(`${marry.tag} | ${user.data}`, 80, 535);
    ctx.strokeText(`${marry.tag} | ${user.data}`, 80, 535);
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

  const badgesImages = await getUserBadgesLink(user).catch(er => console.log(er));

  if (badgesImages) {
    let number = 0;
    badgesImages.forEach((img) => {
      ctx.drawImage(img, 230 + (number * 64), 170, 64, 64);
      number++;
    });
  }

  return canvas.toBuffer();
}

module.exports = { buildProfileImage, start }