export async function POST(req: Request){
    const body= await req.json()
    const resp= await fetch('https://deisishop.pythonanywhere.com/buy/',{
        method: "POST",
        body: JSON.stringify(body),

    })
    if(!resp.ok){
 
    }

    
    
}