import Link from 'next/link';
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar validação se quiser
    router.push("/cartoes"); // Redireciona para a página de cartões
  };

  return (
    <div className="h-screen rounded-3xl flex flex-col justify-center text-white px-8 bg-cover bg-center bg-[url('/background.jpg')]">
      <div className="w-full max-w-sm mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          Login
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col space-y-6">
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
            className="w-full py-2 bg-gray-900 text-white text-lg font-semibold rounded-xl mt-3 hover:bg-gray-900 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/recuperar"
            className="text-sm text-shadow-gray-300 hover:underline"
          >
            Esqueci minha senha
          </Link>
        </div>
      </div>
    </div>
  );
}
