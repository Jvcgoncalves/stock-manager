import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function Home_ProductsInStock_boundary(){
  const error = useRouteError()

  if(isRouteErrorResponse(error)){

    switch(error.status){
      case 404:
        return <h2>Nenhum produto encontrado</h2>
      case 401:
        return <h2>Acesso negado</h2>
      case 400:
        return <h2>Algo deu errado</h2>
      case 500:
        return <h2>Problemas no servidor</h2>
      default:
        return <h2>Erro na resposta</h2>
    }
  }
  return <h3>Problemas no servidor, tente reiniciar seu login</h3>
}