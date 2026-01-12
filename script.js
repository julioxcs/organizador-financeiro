// ===== Helper =====
function salvarLocalStorage(chave, dados){
  localStorage.setItem(chave, JSON.stringify(dados));
}

function carregarLocalStorage(chave){
  return JSON.parse(localStorage.getItem(chave)) || [];
}

// ===== FINANCEIRO =====
const formFinanceiro = document.getElementById("form-financeiro");
const historico = document.getElementById("historico");
const saldoSpan = document.getElementById("saldo");

let saldo = 0;
let financeiroLista = carregarLocalStorage("financeiro");

function atualizarSaldo(){
  saldo = financeiroLista.reduce((acc, item) => acc + (item.tipo === "entrada" ? item.valor : -item.valor), 0);
  saldoSpan.textContent = saldo;
}

function criarLiFinanceiro(item, index){
  const li = document.createElement("li");

  li.innerHTML = `
    ${item.foto ? `<img src="${item.foto}">` : ""}
    ${item.data} - ${item.descricao}: ${item.tipo === "entrada" ? "+" : "-"} R$${item.valor}
    <button class="edit">Editar</button>
    <button class="delete">Remover</button>
  `;

  li.querySelector(".delete").addEventListener("click", ()=>{
    financeiroLista.splice(index,1);
    salvarLocalStorage("financeiro", financeiroLista);
    renderizarFinanceiro();
  });

  li.querySelector(".edit").addEventListener("click", ()=>{
    document.getElementById("descricao").value = item.descricao;
    document.getElementById("valor").value = item.valor;
    document.getElementById("tipo").value = item.tipo;
    document.getElementById("data-financeiro").value = item.data;
    financeiroLista.splice(index,1);
    salvarLocalStorage("financeiro", financeiroLista);
    renderizarFinanceiro();
  });

  return li;
}

function renderizarFinanceiro(){
  historico.innerHTML = "";
  financeiroLista.forEach((item, i)=>{
    historico.appendChild(criarLiFinanceiro(item,i));
  });
  atualizarSaldo();
}

formFinanceiro.addEventListener("submit", function(e){
  e.preventDefault();
  const descricao = document.getElementById("descricao").value;
  const valor = Number(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;
  const data = document.getElementById("data-financeiro").value;
  const fotoInput = document.getElementById("foto-financeiro");

  let foto = "";
  if(fotoInput.files && fotoInput.files[0]){
    const reader = new FileReader();
    reader.onload = function(e){
      foto = e.target.result;
      financeiroLista.push({descricao, valor, tipo, foto, data});
      salvarLocalStorage("financeiro", financeiroLista);
      renderizarFinanceiro();
      formFinanceiro.reset();
    }
    reader.readAsDataURL(fotoInput.files[0]);
  } else {
    financeiroLista.push({descricao, valor, tipo, foto, data});
    salvarLocalStorage("financeiro", financeiroLista);
    renderizarFinanceiro();
    formFinanceiro.reset();
  }
});

renderizarFinanceiro();

// ===== APOSTAS =====
const formApostas = document.getElementById("form-apostas");
const historicoApostas = document.getElementById("historico-apostas");

let apostasLista = carregarLocalStorage("apostas");

function criarLiAposta(item,index){
  const li = document.createElement("li");
  li.innerHTML = `
    ${item.foto ? `<img src="${item.foto}">` : ""}
    ${item.data} - ${item.nome} - R$${item.valor} - ${item.resultado}
    <button class="edit">Editar</button>
    <button class="delete">Remover</button>
  `;

  li.querySelector(".delete").addEventListener("click", ()=>{
    apostasLista.splice(index,1);
    salvarLocalStorage("apostas", apostasLista);
    renderizarApostas();
  });

  li.querySelector(".edit").addEventListener("click", ()=>{
    document.getElementById("aposta-nome").value = item.nome;
    document.getElementById("aposta-valor").value = item.valor;
    document.getElementById("aposta-resultado").value = item.resultado;
    document.getElementById("data-aposta").value = item.data;
    apostasLista.splice(index,1);
    salvarLocalStorage("apostas", apostasLista);
    renderizarApostas();
  });

  return li;
}

function renderizarApostas(){
  historicoApostas.innerHTML = "";
  apostasLista.forEach((item,i)=>{
    historicoApostas.appendChild(criarLiAposta(item,i));
  });
}

formApostas.addEventListener("submit", function(e){
  e.preventDefault();
  const nome = document.getElementById("aposta-nome").value;
  const valor = Number(document.getElementById("aposta-valor").value);
  const resultado = document.getElementById("aposta-resultado").value;
  const data = document.getElementById("data-aposta").value;
  const fotoInput = document.getElementById("foto-aposta");

  let foto = "";
  if(fotoInput.files && fotoInput.files[0]){
    const reader = new FileReader();
    reader.onload = function(e){
      foto = e.target.result;
      apostasLista.push({nome, valor, resultado, foto, data});
      salvarLocalStorage("apostas", apostasLista);
      renderizarApostas();
      formApostas.reset();
    }
    reader.readAsDataURL(fotoInput.files[0]);
  } else {
    apostasLista.push({nome, valor, resultado, foto, data});
    salvarLocalStorage("apostas", apostasLista);
    renderizarApostas();
    formApostas.reset();
  }
});

renderizarApostas();
