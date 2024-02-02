export default function Button({children,atributes}){
  return (
    <button
      {...atributes}
    >
      {children}
    </button>
  )
}