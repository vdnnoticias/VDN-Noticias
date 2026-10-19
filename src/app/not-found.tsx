import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-6xl font-headline font-bold text-navy-950 mb-4">404</h2>
      <h3 className="text-2xl font-bold text-navy-800 mb-6">Pagina no encontrada</h3>
      <p className="text-navy-700 max-w-md mx-auto mb-8">
        Lo sentimos, la pagina que busca no existe, ha sido eliminada, o su nombre ha cambiado.
      </p>
      <Link 
        href="/"
        className="bg-navy-900 hover:bg-navy-800 text-white font-medium py-3 px-6 rounded-sm transition-colors duration-200"
      >
        Volver a la portada
      </Link>
    </div>
  );
}
