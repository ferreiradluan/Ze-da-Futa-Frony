import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Zé da Fruta"
                  width={120}
                  height={60}
                  className="h-10 w-auto brightness-0 invert cursor-pointer"
                />
              </Link>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              As frutas mais frescas na porta da sua casa. Qualidade de feira com a conveniência da entrega.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/lojas" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Lojas
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Seja um Parceiro
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/ajuda" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Central de Ajuda
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Fale Conosco
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/devolucoes" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Política de Devoluções
                </Link>
              </li>
              <li>
                <Link href="/seguranca" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Segurança
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#F28500]" />
                <span className="text-gray-300 text-sm">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#F28500]" />
                <span className="text-gray-300 text-sm">contato@zedafruta.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-[#F28500] mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Rua das Frutas, 123
                  <br />
                  São Paulo, SP - 01234-567
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">© 2024 Zé da Fruta. Todos os direitos reservados.</div>
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-sm">Pagamento seguro por:</span>
              <a href="https://stripe.com/br" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <img src="/stripe-logo.png" alt="Stripe" className="h-8 w-auto bg-white rounded px-3 py-1.5" style={{objectFit: 'contain'}} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
