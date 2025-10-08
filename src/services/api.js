// Carregar todos os cartões
export async function carregarCartoesAPI() {
  try {
    const response = await fetch('/api/cartoes');

    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText);
      throw new Error('Erro ao carregar cartões');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Erro ao carregar cartões:', error);
    throw error;
  }
}

// Carregar cartão por ID
export async function carregarCartaoPorIdAPI(id) {
  try {
    const response = await fetch(`/api/cartoes/${id}`);

    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText);
      throw new Error('Erro ao carregar cartão');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Erro ao carregar cartão:', error);
    throw error;
  }
}

// Adicionar novo cartão
export async function adicionarCartaoAPI(dadosCartao) {
  try {
    const response = await fetch('/api/cartoes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosCartao)
    });

    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText);
      throw new Error('Erro ao adicionar cartão');
    }

    const resultado = await response.json();
    return resultado;

  } catch (error) {
    console.error('Erro ao adicionar cartão:', error);
    throw error;
  }
}

// Atualizar cartão existente
export async function atualizarCartaoAPI(id, dadosCartao) {
  try {
    const response = await fetch(`/api/cartoes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosCartao)
    });

    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText);
      throw new Error('Erro ao atualizar cartão');
    }

    const resultado = await response.json();
    return resultado;

  } catch (error) {
    console.error('Erro ao atualizar cartão:', error);
    throw error;
  }
}

// Eliminar cartão
export async function eliminarCartaoAPI(id) {
  try {
    const response = await fetch(`/api/cartoes/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText);
      throw new Error('Erro ao eliminar cartão');
    }

    return true;

  } catch (error) {
    console.error('Erro ao eliminar cartão:', error);
    throw error;
  }
}
