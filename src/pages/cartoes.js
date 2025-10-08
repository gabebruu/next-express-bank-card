import { useState, useEffect } from "react";
import {
  carregarCartoesAPI,
  adicionarCartaoAPI,
  removerCartaoAPI
} from "../services/api"; // ajusta o caminho conforme tua estrutura

export default function Cartoes() {
  const [cartoes, setCartoes] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [novoCartao, setNovoCartao] = useState({
    nome: "",
    numero: "",
    validade: "",
    cor: "from-indigo-500 to-blue-700"
  });

  // Carregar cartões do backend ao iniciar
  useEffect(() => {
    async function carregar() {
      try {
        const dados = await carregarCartoesAPI();
        setCartoes(dados);
      } catch (error) {
        console.error("Erro ao carregar cartões:", error);
      }
    }
    carregar();
  }, []);

  // Adicionar cartão via API
  const adicionarCartao = async () => {
    if (!novoCartao.nome || !novoCartao.numero || !novoCartao.validade) return;
    try {
      const cartaoCriado = await adicionarCartaoAPI(novoCartao);
      setCartoes([...cartoes, cartaoCriado]);
      setNovoCartao({ nome: "", numero: "", validade: "", cor: "from-indigo-500 to-blue-700" });
      setMostrarFormulario(false);
    } catch (error) {
      console.error("Erro ao adicionar cartão:", error);
    }
  };

  // Remover cartão via API
  const removerCartao = async (id) => {
    try {
      await removerCartaoAPI(id);
      setCartoes(cartoes.filter((cartao) => cartao.id !== id));
    } catch (error) {
      console.error("Erro ao remover cartão:", error);
    }
  };

  return (
    <div className="min-h-screen bg p-6">
      {/* Título + botão “+” no topo */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Meus Cartões</h1>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="bg-black text-gray-500 text-xl font-bold w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition"
          title="Adicionar cartão"
        >
          +
        </button>
      </div>

      {/* Formulário embutido */}
      {mostrarFormulario && (
        <div className="max-w-md mx-auto mb-10 bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Novo Cartão</h2>
          <input
            type="text"
            placeholder="Nome"
            value={novoCartao.nome}
            onChange={(e) => setNovoCartao({ ...novoCartao, nome: e.target.value })}
            className="w-full mb-2 px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Número"
            value={novoCartao.numero}
            onChange={(e) => setNovoCartao({ ...novoCartao, numero: e.target.value })}
            className="w-full mb-2 px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Validade"
            value={novoCartao.validade}
            onChange={(e) => setNovoCartao({ ...novoCartao, validade: e.target.value })}
            className="w-full mb-2 px-4 py-2 border rounded-md"
          />
          <button
            onClick={adicionarCartao}
            className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition"
          >
            Adicionar
          </button>
        </div>
      )}

      {/* Cartões em coluna */}
      <div className="flex flex-col items-center gap-6">
        {cartoes.map((cartao) => (
          <div
            key={cartao.id}
            className={`w-72 bg-gradient-to-r ${cartao.cor} text-white shadow-xl rounded-2xl p-6 min-h-[160px] hover:scale-105 transition-transform cursor-pointer relative`}
          >
            <h2 className="text-xl font-semibold mb-2">{cartao.nome}</h2>
            <p className="text-base">{cartao.numero}</p>
            <p className="text-base mt-2">Validade: {cartao.validade}</p>
            <button
              onClick={() => removerCartao(cartao.id)}
              className="absolute top-2 right-2 bg-red-600 text-white text-sm px-1 py-1 rounded hover:bg-red-700 transition"
              title="Remover cartão"
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
