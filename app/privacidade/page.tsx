import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacidadePage() {
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
          <h1 className="text-3xl font-light text-gray-900 mb-8">Política de Privacidade</h1>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">1. Informações que Coletamos</h2>
              <p>
                Coletamos informações que você nos fornece diretamente, como quando você cria uma conta, faz um pedido
                ou entra em contato conosco. Isso pode incluir seu nome, endereço de e-mail, endereço de entrega e
                informações de pagamento.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">2. Como Usamos suas Informações</h2>
              <p>
                Usamos as informações coletadas para processar seus pedidos, melhorar nossos serviços, comunicar-nos com
                você sobre sua conta e pedidos, e personalizar sua experiência em nossa plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">3. Compartilhamento de Informações</h2>
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing
                sem seu consentimento explícito. Podemos compartilhar informações com parceiros de entrega e
                estabelecimentos apenas para processar seus pedidos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">4. Segurança dos Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger suas informações
                pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">5. Seus Direitos</h2>
              <p>
                Você tem o direito de acessar, atualizar ou excluir suas informações pessoais. Para exercer esses
                direitos, entre em contato conosco através dos canais de atendimento disponíveis.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-3">6. Contato</h2>
              <p>
                Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco em:
                <br />
                <strong>E-mail:</strong> privacidade@zedafruta.com
                <br />
                <strong>Telefone:</strong> (11) 99999-9999
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
