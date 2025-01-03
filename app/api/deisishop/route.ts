export async function GET() {
    try {
      const response = await fetch('https://deisishop.pythonanywhere.com/products/');
      if (!response.ok) {
        throw new Error(`Erro ao buscar os dados: ${response.statusText}`);
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      // Verifique se o error é uma instância de Error
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  