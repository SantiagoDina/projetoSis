const Complex = require("complex.js");

waveform = [new Complex(1,0),new Complex(2,0),new Complex(3,0),new Complex(4,0)]

function expComp(exp) {
    let real = Math.cos(exp)
    let img = Math.sin(exp)

    return new Complex(real, img)
}

function FFT(sinal) {
    let N = sinal.length
    if(N === 1) return sinal
    if (N % 2 > 0) throw new Error("tamanho da entrada tem que ser uma potencia de 2")
    let parInput = []
    let imparInput = []
    for (let i = 0; i < N; i = i + 2)  parInput.push(sinal[i])
    for (let i = 1; i < N; i = i + 2) imparInput.push(sinal[i])
    console.log('sinal :>> ', sinal);
    let parOutput = FFT(parInput)
    let imparOutput = FFT(imparInput)
    let fator = []
    for (let i = 0; i < N; i++) fator.push(expComp(-2 * Math.PI * i / N))
    let saida = []
    let j = 0
    for (let i = 0; i < N; i++) {
        saida.push(fator[i].mul(imparOutput[j]).add(parOutput[j]))
        j++
        if (i === N / 2 - 1) j = 0
    }
    return saida
}

console.log('FFT(waveform) :>> ', FFT(waveform));

