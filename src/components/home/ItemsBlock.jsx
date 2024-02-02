import Button from "../Button";

export default function ItemsBlock({name}){
  return (
    <div className="row p-3">
      <span className="col-7">
        {name}
      </span>
      <div className="col-5">
        <Button
        atributes={
          {
            className:"btn btn-primary border-0 text-bg-light",
          }
        }
        >
          Ver
        </Button>
      </div>            
    </div>
  )
}