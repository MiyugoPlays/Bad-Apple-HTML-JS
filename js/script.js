const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const asciiArt = document.getElementById('ascii-art');
const asciiWidth = 80;
const asciiHeight = 45;
const asciiChars = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '@'];

// Usando requestAnimationFrame para sincronizar com a taxa de atualização do navegador
function draw() {
  requestAnimationFrame(draw);

  if (video.paused || video.ended) {
    return;
  }

  // Desenha o frame atual do vídeo em um canvas temporário
  canvas.width = asciiWidth;
  canvas.height = asciiHeight;
  const tempCtx = canvas.getContext('2d');
  tempCtx.drawImage(video, 0, 0, asciiWidth, asciiHeight);

  // Obtém os dados de pixel do canvas temporário
  const imageData = tempCtx.getImageData(0, 0, asciiWidth, asciiHeight);
  const data = imageData.data;

  let asciiText = '';

  // Converte os pixels pretos em caracteres ASCII
  for (let y = 0; y < asciiHeight; y += 2) {
    for (let x = 0; x < asciiWidth; x++) {
      const index = (y * asciiWidth + x) * 4;
      const red = data[index];
      const green = data[index + 1];
      const blue = data[index + 2];

      // Verifica se o pixel é preto
      if (red === 0 && green === 0 && blue === 0) {
        asciiText += '●'; // Adiciona '#' se o pixel for preto
      } else {
        asciiText += ' '; // Adiciona ' ' se o pixel não for preto
      }
    }
    asciiText += '\n'; // Adiciona uma quebra de linha após cada linha de texto ASCII
  }

  // Atualiza o elemento pre com o texto ASCII
  asciiArt.textContent = asciiText;
}

// Inicia o desenho do vídeo como arte ASCII
draw();