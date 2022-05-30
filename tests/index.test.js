const fs = require('fs')
const puedeFormarUnCirculo = require('../src/index')
const ruta = `${process.cwd()}/result/test.txt`

test(`palabras ordenadas alfabeticamente`, () => {

  puedeFormarUnCirculo(["chair", "height", "racket", "touch", "tunic"]).then(() => {
    fs.readFile(ruta, (error, data) => {
      if(error) throw Error(error)
      return data.toString().split('\n')
    })
  }).then((file) => {
    expect(["chair", "height", "racket", "touch", "tunic"]).toStrictEqual(file);
  })

});

test(`palabras desordenadas alfabeticamente`, () => {
  puedeFormarUnCirculo(["abc", "efg", "cde", "ghi", "ija", "aba"]).then(() => {
    fs.readFile(ruta, (error, data) => {
      if(error) throw Error(error)
      return data.toString().split('\n')
    })
  }).then(file => {
    expect(["aba", "abc", "cde", "efg", "ghi", "ija"]).toStrictEqual(file);
  })
  
});

test(`palabras con las cuales no puede formar un circulo`, () => {
  expect(puedeFormarUnCirculo(["keyboard", "mouse", "screen"])).toBe(false)
});
