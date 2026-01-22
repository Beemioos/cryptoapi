import { Menu, Spin } from 'antd'
import type { MenuProps } from 'antd' 
import axios from 'axios'
import { useEffect, useState } from 'react'
import CryptoCurrencyCard from './components/CryptoCurrencyCard'
import type { Cryptocurrency, MenuItem } from './types/cryptocurrency'

const App = () => {
  const [currencies, setCurrencies] = useState<MenuItem[]>([])
  const [currency, setCurrency] = useState<Cryptocurrency | null>(null)
  const [currencyId, setCurrencyId] = useState<number>(1)

  useEffect(() => {
    axios
      .get<Cryptocurrency[]>('http://127.0.0.1:8000/cryptocurrencies')
      .then(r => {
        setCurrencies([
          {
            label: 'Список криптовалют',
            key: 'g1',
            children: r.data.map(c => ({
              label: c.name,
              key: String(c.id),
            })),
          },
        ])
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    axios
      .get<Cryptocurrency>(
        `${import.meta.env.VITE_BASE_API_URL}/cryptocurrencies/${currencyId}`
      )
      .then(r => {
        setCurrency(r.data)
      })
      .catch(console.error)
  }, [currencyId])


  const onClick: MenuProps['onClick'] = (e) => {
    setCurrencyId(Number(e.key))
  }

  return (
    <div className='flex'>
      <Menu
        onClick={onClick}
        mode='inline'
        className='max-h-screen overflow-scroll'
        style={{ width: 256 }}
        items={currencies}
        defaultOpenKeys={['g1']}
      />
      <div className='mx-auto h-screen flex items-center justify-center p-2'>
        {!currency ? <Spin /> : <CryptoCurrencyCard currency={currency} />}
      </div>
    </div>
  )
}

export default App
