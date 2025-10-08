import Link from 'next/link';
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/cartoes");
  };

  return (
    <div className="h-screen rounded-3xl flex flex-col items-center justify-center text-white px-8 bg-cover bg-center bg-[url('/comunismo.jpg')] relative">
      {/* Título posicionado acima da imagem */}
      <h1 className="absolute top-50 text-5xl font-light text-center w-full">
        SBI - Seu Banco Imigrante
      </h1>

      <div className="w-full max-w-sm flex flex-col items-center mt-10">
        <img
          src="/Lula.webp"
          alt="Avatar"
          className="w-40 h-40 rounded-full object-cover mb-6 shadow-[0_0_20px_5px_rgba(239,68,68,0.6)]"
        />

        <form onSubmit={handleLogin} className="flex flex-col space-y-6 w-full">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-4 text-lg rounded-xl bg-white text-gray-200 placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-4 text-lg rounded-xl bg-white text-gray-200 placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
          />

          <button
            type="submit"
            className="w-full py-2 bg-red-700 text-white text-lg font-semibold rounded-xl mt-3 hover:bg-red-800 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/recuperar"
            className="text-sm px-3 py-1 bg-red-500/30 rounded-md hover:underline transition"
          >
            Esqueci minha senha
          </Link>
        </div>
      </div>
    </div>
  );
}
