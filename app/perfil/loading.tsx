import { Skeleton } from "@/components/ui/skeleton"

export default function PerfilLoading() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-24" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coluna da esquerda - Informações do usuário */}
          <div className="md:col-span-1 space-y-6">
            <div className="border rounded-lg p-6 space-y-4">
              <Skeleton className="h-6 w-48 mx-auto" />
              <div className="flex flex-col items-center">
                <Skeleton className="h-24 w-24 rounded-full mb-4" />
                <Skeleton className="h-6 w-36 mb-2" />
                <Skeleton className="h-4 w-48 mb-2" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="flex justify-center pt-4 border-t">
                <Skeleton className="h-10 w-32" />
              </div>
            </div>

            <div className="border rounded-lg p-6 space-y-4">
              <Skeleton className="h-6 w-32 mb-2" />
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>

          {/* Coluna da direita - Conteúdo principal */}
          <div className="md:col-span-2">
            <div className="border rounded-lg p-6">
              <div className="flex space-x-2 mb-6">
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
