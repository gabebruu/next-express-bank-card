import { useState, useEffect } from "react";
import {
  carregarCartoesAPI,
  adicionarCartaoAPI,
  removerCartaoAPI,
  atualizarCartaoAPI
} from "../services/api";
import { useRouter } from "next/router";

export default function Cartoes() {
  const router = useRouter();
  const [cartoes, setCartoes] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [novoCartao, setNovoCartao] = useState({
    nome: "",
    numero: "",
    validade: "",
    cor: "from-indigo-500 to-blue-700"
  });

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

  const adicionarOuAtualizarCartao = async () => {
    if (!novoCartao.nome || !novoCartao.numero || !novoCartao.validade) return;
    try {
      if (editandoId) {
        const atualizado = await atualizarCartaoAPI(editandoId, novoCartao);
        setCartoes(cartoes.map(c => c.id === editandoId ? atualizado : c));
      } else {
        const criado = await adicionarCartaoAPI(novoCartao);
        setCartoes([...cartoes, criado]);
      }
      setNovoCartao({ nome: "", numero: "", validade: "", cor: "from-indigo-500 to-blue-700" });
      setMostrarFormulario(false);
      setEditandoId(null);
    } catch (error) {
      console.error("Erro ao salvar cartão:", error);
    }
  };

  const removerCartao = async (id) => {
    try {
      await removerCartaoAPI(id);
      setCartoes(cartoes.filter((cartao) => cartao.id !== id));
    } catch (error) {
      console.error("Erro ao remover cartão:", error);
    }
  };

  const editarCartao = (cartao) => {
    setNovoCartao({
      nome: cartao.nome,
      numero: cartao.numero,
      validade: cartao.validade,
      cor: cartao.cor
    });
    setEditandoId(cartao.id);
    setMostrarFormulario(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Topo com título e botões */}
      <div className="flex justify-around items-center mb-6">
        <h1 className="text-2xl text-gray-800">Meus Cartões</h1>
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/")}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Voltar
          </button>
          <button
            onClick={() => {
              setMostrarFormulario(!mostrarFormulario);
              setNovoCartao({ nome: "", numero: "", validade: "", cor: "from-indigo-500 to-blue-700" });
              setEditandoId(null);
            }}
            className="bg-black text-white text-xl font-bold w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition"
            title="Adicionar cartão"
          >
            +
          </button>
        </div>
      </div>

      {/* Formulário */}
      {mostrarFormulario && (
        <div className="max-w-md mx-auto mb-10 bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            {editandoId ? "Editar Cartão" : "Novo Cartão"}
          </h2>
          <input
            type="text"
            placeholder="Nome"
            value={novoCartao.nome}
            onChange={(e) => setNovoCartao({ ...novoCartao, nome: e.target.value })}
            className="w-full mb-2 px-4 py-2 border rounded-md text-gray-700"
          />
          <input
            type="text"
            placeholder="Número"
            value={novoCartao.numero}
            onChange={(e) => setNovoCartao({ ...novoCartao, numero: e.target.value })}
            className="w-full mb-2 px-4 py-2 border rounded-md  text-gray-700"
          />
          <input
            type="text"
            placeholder="Validade"
            value={novoCartao.validade}
            onChange={(e) => setNovoCartao({ ...novoCartao, validade: e.target.value })}
            className="w-full mb-2 px-4 py-2 border rounded-md  text-gray-700"
          />
          <button
            onClick={adicionarOuAtualizarCartao}
            className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition"
          >
            {editandoId ? "Salvar alterações" : "Adicionar"}
          </button>
        </div>
      )}

      {/* Cartões */}
      <div className="flex flex-col items-center gap-6">
        {cartoes.map((cartao) => (
          <div
            key={cartao.id}
            className={`w-72 bg-gradient-to-r ${cartao.cor} text-white shadow-xl rounded-2xl p-6 min-h-[160px] hover:scale-105 transition-transform cursor-pointer relative`}
          >
            <h2 className="text-xl font-semibold mb-2">{cartao.nome}</h2>
            <p className="text-base">{cartao.numero}</p>
            <p className="text-base mt-2">Validade: {cartao.validade}</p>
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => editarCartao(cartao)}
                className=" text-white text-xs px-1 py-1"
                title="Editar cartão"
              >
                Editar
              </button>
              <button
                onClick={() => removerCartao(cartao.id)}
                className="bg-gray-500 text-white text-xs px-2 py-1 rounded hover:bg-red-700 transition"
                title="Remover cartão"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
