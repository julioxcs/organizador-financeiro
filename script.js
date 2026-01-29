const salvar = (k, d) => localStorage.setItem(k, JSON.stringify(d))
const carregar = k => JSON.parse(localStorage.getItem(k)) || []

const dataBR = d => {
  const [y, m, day] = d.split("-")
  return `${day}/${m}/${y}`
}

// MODAL
const modal = document.getElementById("modalImg")
const modalImg = document.getElementById("modalImgSrc")
window.abrirImg = src => {
  modal.style.display = "flex"
  modalImg.src = src
}
modal.onclick = () => modal.style.display = "none"

// ===== APOSTAS =====
const formA = document.getElementById("form-apostas")
const listaA = document.getElementById("lista-apostas")

const nomeA = document.getElementById("aposta-nome")
const movA = document.getElementById("aposta-movimentado")
const resValorA = document.getElementById("aposta-resultado-valor")
const dataA = document.getElementById("aposta-data")
const fotosA = document.getElementById("aposta-fotos")
const resA = document.getElementById("aposta-resultado")

let apostas = carregar("apostas")

const renderA = () => {
  listaA.innerHTML = ""

  apostas.slice().reverse().forEach((a, i) => {
    listaA.innerHTML += `
    <li class="item">
      <div class="item-header" onclick="toggle('a${i}')">
        <span>${dataBR(a.data)}</span>
        <strong>${a.nome}</strong>
        <em class="${a.resultado}">${a.resultado.toUpperCase()}</em>
      </div>

      <div class="item-body" id="a${i}">
        <p><b>Valor movimentado:</b> R$ ${a.movimentado}</p>

        <p class="${a.resultado}">
          <b>${a.resultado === "ganhou" ? "Lucro" : "Perda"}:</b>
          R$ ${Math.abs(a.resultadoValor)}
        </p>

        ${a.fotos.length ? `
        <div class="galeria">
          ${a.fotos.map(f => `<img src="${f}" onclick="abrirImg('${f}')">`).join("")}
        </div>` : ""}

        <button class="delete" onclick="delA(${i})">Remover</button>
      </div>
    </li>`
  })
}

window.toggle = id => {
  document.getElementById(id).classList.toggle("open")
}

window.delA = i => {
  apostas.splice(apostas.length - 1 - i, 1)
  salvar("apostas", apostas)
  renderA()
}

formA.onsubmit = e => {
  e.preventDefault()

  const fotos = []
  const files = [...fotosA.files]

  const resultadoFinal =
    resA.value === "ganhou"
      ? +resValorA.value
      : -Math.abs(resValorA.value)

  const salvarAposta = () => {
    apostas.push({
      nome: nomeA.value,
      movimentado: +movA.value,
      resultado: resA.value,
      resultadoValor: resultadoFinal,
      data: dataA.value,
      fotos
    })
    salvar("apostas", apostas)
    renderA()
    formA.reset()
  }

  if (files.length) {
    let l = 0
    files.forEach(f => {
      const r = new FileReader()
      r.onload = e => {
        fotos.push(e.target.result)
        if (++l === files.length) salvarAposta()
      }
      r.readAsDataURL(f)
    })
  } else salvarAposta()
}

renderA()

// ===== COMPROVANTES =====
const formC = document.getElementById("form-comp")
const listaC = document.getElementById("lista-comp")
const descC = document.getElementById("comp-desc")
const dataC = document.getElementById("comp-data")
const fotosC = document.getElementById("comp-fotos")

let comps = carregar("comprovantes")

const renderC = () => {
  listaC.innerHTML = ""
  comps.slice().reverse().forEach((c, i) => {
    listaC.innerHTML += `
    <li class="item">
      <div class="item-header" onclick="toggle('c${i}')">
        <span>${dataBR(c.data)}</span>
        <strong>${c.desc}</strong>
      </div>

      <div class="item-body" id="c${i}">
        <div class="galeria">
          ${c.fotos.map(f => `<img src="${f}" onclick="abrirImg('${f}')">`).join("")}
        </div>
        <button class="delete" onclick="delC(${i})">Remover</button>
      </div>
    </li>`
  })
}

window.delC = i => {
  comps.splice(comps.length - 1 - i, 1)
  salvar("comprovantes", comps)
  renderC()
}

formC.onsubmit = e => {
  e.preventDefault()
  const fotos = []
  const files = [...fotosC.files]

  const salvarComp = () => {
    comps.push({ desc: descC.value, data: dataC.value, fotos })
    salvar("comprovantes", comps)
    renderC()
    formC.reset()
  }

  if (files.length) {
    let l = 0
    files.forEach(f => {
      const r = new FileReader()
      r.onload = e => {
        fotos.push(e.target.result)
        if (++l === files.length) salvarComp()
      }
      r.readAsDataURL(f)
    })
  } else salvarComp()
}

renderC()
