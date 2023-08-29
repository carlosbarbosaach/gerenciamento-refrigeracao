import React from 'react'
import InputEstoque from '../../Components/InputEstoque'
import SelectCategoria from '../../Components/SelectCategoria'
import SelectMarca from '../../Components/SelectMarca'
import ButtonPesquisar from '../../Components/ButtonPesquisar'

const Estoque = () => {
  return (
    <section>
      <div className='flex mb'>
        <div className='box flex styleEstoque'>
          <InputEstoque />
          <div className='styleSelectBtn'>
            <SelectCategoria />
            <SelectMarca />
            <ButtonPesquisar />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Estoque
