const salvar=(k,d)=>localStorage.setItem(k,JSON.stringify(d))
const carregar=k=>JSON.parse(localStorage.getItem(k))||[]
const dataBR=d=>new Date(d).toLocaleDateString("pt-BR")

// MODAL
const modal=document.getElementById("modalImg")
const modalImg=document.getElementById("modalImgSrc")
window.abrirImg=src=>{modal.style.display="flex";modalImg.src=src}
modal.onclick=()=>modal.style.display="none"

// FINANCEIRO
const formF=document.getElementById("form-financeiro")
const histF=document.getElementById("historico")
const saldoSpan=document.getElementById("saldo")
const desc=document.getElementById("descricao")
const val=document.getElementById("valor")
const tipo=document.getElementById("tipo")
const dataF=document.getElementById("data-financeiro")
const fotoF=document.getElementById("foto-financeiro")

let listaF=carregar("financeiro")

const saldo=()=>saldoSpan.textContent=
  listaF.reduce((a,i)=>a+(i.tipo==="entrada"?i.valor:-i.valor),0)

const renderF=()=>{
  histF.innerHTML=""
  listaF.forEach((i,idx)=>{
    histF.innerHTML+=`
    <li>
      <strong>${dataBR(i.data)}</strong> - ${i.descricao} (${i.tipo}) R$${i.valor}
      ${i.fotos?.length?`
        <div class="galeria">
          ${i.fotos.map(f=>`<img src="${f}" onclick="abrirImg('${f}')">`).join("")}
        </div>`:""}
      <button class="delete" onclick="delF(${idx})">Remover</button>
    </li>`
  })
  saldo()
}

window.delF=i=>{listaF.splice(i,1);salvar("financeiro",listaF);renderF()}

formF.onsubmit=e=>{
  e.preventDefault()
  const fotos=[]
  const files=[...fotoF.files]

  const salvarItem=()=>{
    listaF.push({
      descricao:desc.value,
      valor:+val.value,
      tipo:tipo.value,
      data:dataF.value,
      fotos
    })
    salvar("financeiro",listaF)
    renderF()
    formF.reset()
  }

  if(files.length){
    let l=0
    files.forEach(f=>{
      const r=new FileReader()
      r.onload=e=>{fotos.push(e.target.result);if(++l===files.length)salvarItem()}
      r.readAsDataURL(f)
    })
  }else salvarItem()
}

renderF()

// APOSTAS
const formA=document.getElementById("form-apostas")
const histA=document.getElementById("historico-apostas")
const nomeA=document.getElementById("aposta-nome")
const valA=document.getElementById("aposta-valor")
const resA=document.getElementById("aposta-resultado")
const dataA=document.getElementById("data-aposta")
const fotoA=document.getElementById("foto-aposta")

let listaA=carregar("apostas")

const renderA=()=>{
  histA.innerHTML=""
  listaA.forEach((i,idx)=>{
    histA.innerHTML+=`
    <li>
      <strong>${dataBR(i.data)}</strong> - ${i.nome} R$${i.valor} (${i.resultado})
      ${i.fotos?.length?`
        <div class="galeria">
          ${i.fotos.map(f=>`<img src="${f}" onclick="abrirImg('${f}')">`).join("")}
        </div>`:""}
      <button class="delete" onclick="delA(${idx})">Remover</button>
    </li>`
  })
}

window.delA=i=>{listaA.splice(i,1);salvar("apostas",listaA);renderA()}

formA.onsubmit=e=>{
  e.preventDefault()
  const fotos=[]
  const files=[...fotoA.files]

  const salvarItem=()=>{
    listaA.push({
      nome:nomeA.value,
      valor:+valA.value,
      resultado:resA.value,
      data:dataA.value,
      fotos
    })
    salvar("apostas",listaA)
    renderA()
    formA.reset()
  }

  if(files.length){
    let l=0
    files.forEach(f=>{
      const r=new FileReader()
      r.onload=e=>{fotos.push(e.target.result);if(++l===files.length)salvarItem()}
      r.readAsDataURL(f)
    })
  }else salvarItem()
}

renderA()
