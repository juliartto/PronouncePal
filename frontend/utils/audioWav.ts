const TAXA_AMOSTRAGEM_ALVO = 16000;
const DURACAO_MINIMA_SEGUNDOS = 0.3;
const DURACAO_MAXIMA_SEGUNDOS = 29;

function escreverString(view: DataView, offset: number, texto: string) {
  for (let i = 0; i < texto.length; i++) {
    view.setUint8(offset + i, texto.charCodeAt(i));
  }
}

function codificarPcm16Wav(amostras: Float32Array, taxaAmostragem: number): ArrayBuffer {
  const tamanhoDados = amostras.length * 2;
  const buffer = new ArrayBuffer(44 + tamanhoDados);
  const view = new DataView(buffer);

  // Cabeçalho RIFF/WAVE padrão de 44 bytes (PCM 16 bits, mono)
  escreverString(view, 0, "RIFF");
  view.setUint32(4, 36 + tamanhoDados, true);
  escreverString(view, 8, "WAVE");
  escreverString(view, 12, "fmt ");
  view.setUint32(16, 16, true); // Tamanho do bloco fmt (16 para PCM)
  view.setUint16(20, 1, true); // Formato de áudio (1 = PCM linear)
  view.setUint16(22, 1, true); // Canais (1 = mono)
  view.setUint32(24, taxaAmostragem, true); // Taxa de amostragem (16000 Hz)
  view.setUint32(28, taxaAmostragem * 2, true); // Byte rate (16000 * 1 * 2)
  view.setUint16(32, 2, true); // Block align (1 * 2)
  view.setUint16(34, 16, true); // Bits por amostra (16 bits)
  escreverString(view, 36, "data");
  view.setUint32(40, tamanhoDados, true);

  let offset = 44;
  for (let i = 0; i < amostras.length; i++) {
    const limitado = Math.max(-1, Math.min(1, amostras[i]));
    const inteiro16 = limitado < 0 ? Math.round(limitado * 0x8000) : Math.round(limitado * 0x7fff);
    view.setInt16(offset, inteiro16, true);
    offset += 2;
  }

  return buffer;
}

export async function converterParaWav16kHzMono(blobAudio: Blob): Promise<Blob> {
  if (blobAudio.size === 0) {
    throw new Error("Nenhum áudio foi capturado. Verifique seu microfone e tente novamente.");
  }

  const arrayBuffer = await blobAudio.arrayBuffer();
  const contextoAudio = new AudioContext();

  let audioBuffer: AudioBuffer;
  try {
    audioBuffer = await contextoAudio.decodeAudioData(arrayBuffer);
  } catch {
    throw new Error("Não foi possível processar o áudio gravado. Tente gravar novamente.");
  } finally {
    await contextoAudio.close();
  }

  if (audioBuffer.duration < DURACAO_MINIMA_SEGUNDOS) {
    throw new Error("A gravação ficou muito curta. Leia a frase em voz alta antes de parar.");
  }

  if (audioBuffer.duration > DURACAO_MAXIMA_SEGUNDOS) {
    throw new Error("A gravação deve ter no máximo 29 segundos.");
  }

  const totalAmostras = Math.max(1, Math.ceil(audioBuffer.duration * TAXA_AMOSTRAGEM_ALVO));
  const contextoOffline = new OfflineAudioContext(1, totalAmostras, TAXA_AMOSTRAGEM_ALVO);
  const fonte = contextoOffline.createBufferSource();
  fonte.buffer = audioBuffer;
  fonte.connect(contextoOffline.destination);
  fonte.start(0);

  const bufferReamostrado = await contextoOffline.startRendering();
  const amostrasMono = bufferReamostrado.getChannelData(0);
  const bufferWav = codificarPcm16Wav(amostrasMono, TAXA_AMOSTRAGEM_ALVO);

  return new Blob([bufferWav], { type: "audio/wav" });
}
