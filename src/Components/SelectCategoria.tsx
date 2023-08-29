import React from 'react'

const SelectCategoria = () => {
  return (
    <select className='styleSelect' name="selectCategorias" id="selectCategorias">
      <option value="TodasCategorias">Todas as categorias</option>
      <option value="TodasCategorias">Geladeira</option>
      <option value="TodasCategorias">Freezer</option>
    </select>
  )
}

export default SelectCategoria
