import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default function Component() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/logo.png" alt="Zé da Fruta" width={120} height={60} className="h-12 w-auto cursor-pointer" />
          </Link>
        </div>
        <nav className="flex items-center gap-8">
          <Link href="/lojas" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Lojas
          </Link>
          <Link href="/onboarding" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Seja um Parceiro
          </Link>
          <Link href="/login">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Entrar
            </Button>
          </Link>
        </nav>
      </header>

      {/* Main Hero Section */}
      <main className="flex flex-col items-center justify-center px-6 py-20 max-w-4xl mx-auto text-center">
        <div className="space-y-6 mb-12">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 leading-tight">
            As frutas mais frescas, <span className="block">na porta da sua casa.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto">
            Qualidade de feira com a conveniência da entrega.
          </p>
        </div>

        {/* Search Section */}
        <div className="w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Encontre sua fruta ou loja favorita"
                className="pl-12 pr-4 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-[#F28500] focus:ring-0 w-full"
              />
            </div>
            <Link href="/login">
              <Button
                size="lg"
                className="bg-[#F28500] hover:bg-[#E07600] text-white px-8 py-4 rounded-full text-lg font-medium transition-colors whitespace-nowrap"
              >
                Ver lojas
              </Button>
            </Link>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-[#6E9C45] rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Frutas Selecionadas</h3>
            <p className="text-gray-600">Escolhemos apenas as melhores frutas para você</p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-[#6E9C45] rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Entrega Rápida</h3>
            <p className="text-gray-600">Receba suas frutas frescas em casa rapidamente</p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-[#6E9C45] rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Qualidade Garantida</h3>
            <p className="text-gray-600">Satisfação garantida ou seu dinheiro de volta</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
