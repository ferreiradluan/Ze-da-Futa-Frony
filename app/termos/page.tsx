import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/login" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </div>

        <div className="prose prose-gray max-w-none">
          <h1 className="text-3xl font-light text-gray-900 mb-8">Termos de Serviço</h1>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">1. Aceitação dos Termos</h2>
              <p>
                Ao utilizar os serviços do Zé da Fruta, você concorda em cumprir e estar vinculado a estes Termos de
                Serviço. Se você não concordar com qualquer parte destes termos, não deve usar nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">2. Descrição do Serviço</h2>
              <p>
                O Zé da Fruta é uma plataforma de delivery que conecta clientes a frutarias locais, oferecendo frutas
                frescas e de qualidade com entrega rápida e conveniente.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">3. Responsabilidades do Usuário</h2>
              <p>
                Você é responsável por manter a confidencialidade de sua conta e senha, e por todas as atividades que
                ocorrem sob sua conta. Você concorda em notificar-nos imediatamente sobre qualquer uso não autorizado de
                sua conta.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">4. Política de Pagamento</h2>
              <p>
                Os pagamentos são processados de forma segura através de nossos parceiros de pagamento. Todos os preços
                estão sujeitos a alterações sem aviso prévio.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">5. Política de Cancelamento</h2>
              <p>
                Pedidos podem ser cancelados até o momento em que o estabelecimento confirmar o preparo. Após este
                ponto, cancelamentos estarão sujeitos à política do estabelecimento.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
