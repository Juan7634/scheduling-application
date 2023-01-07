import { Link } from "react-router-dom";

export const ErrorPage = ({error = 'Muchos errores'}) => {
  return (
    <div className="container-error">
        <div className="content-error">
            <h1>Error</h1>
            <h4>Ha existido el siguiente incoveniente</h4>
            <p>{error}</p>
            <div className="link">
                <Link className="a" to="/dashboard">Volver a pagina principal</Link>
            </div>
        </div>
    </div>
  )
}
