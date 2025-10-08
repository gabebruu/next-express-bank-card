// services/api.js

export async function carregarCartoesAPI() {
  const res = await fetch('/api/cartoes');
  if (!res.ok) throw new Error('Erro ao carregar cartões');
  return await res.json();
}

export async function adicionarCartaoAPI(cartao) {
  const res = await fetch('/api/cartoes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cartao)
  });
  if (!res.ok) throw new Error('Erro ao adicionar cartão');
  return await res.json();
}

export async function removerCartaoAPI(id) {
  const res = await fetch(`/api/cartoes/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Erro ao remover cartão');
  return true;
}

export async function atualizarCartaoAPI(id, dadosCartao) {
  const res = await fetch(`/api/cartoes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosCartao)
  });
  if (!res.ok) throw new Error('Erro ao atualizar cartão');
  return await res.json();
}
