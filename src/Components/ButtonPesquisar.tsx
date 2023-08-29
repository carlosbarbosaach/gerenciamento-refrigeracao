import React from 'react'
import "../Style.css"

const style: React.CSSProperties = {
  backgroundColor: "var(--color-7)",
  border: "none",
  borderRadius: "0.375rem",
  color: "var(--color-6)",
  flexGrow: "1",
  fontSize: "0.9375rem",
  fontWeight: "600",
  height: "2.5rem",
  lineHeight: "1.25rem",
  margin: "0.75rem",
  minWidth: "185px",
  padding: "0 1rem 0 1rem",
  transition: "0.3s",
  cursor: "pointer",
}

const ButtonPesquisar = () => {
  return (
    <button style={style} className='btnHover' >Pesquisar</button>
  )
}

export default ButtonPesquisar