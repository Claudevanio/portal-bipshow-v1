import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div
      className='flex flex-col items-center h-screen'
    >
      <h2>Pagina não Encontrada</h2>
      <p>Não foi possível encontrar a pagina procurada</p>
      <Link href="/" className='text-primary'>Voltar para o Inicio</Link>
    </div>
  )
}