import React, { useEffect, useState } from 'react';
import { Menu, Spin } from 'antd';
import axios from 'axios';
import CryptoCurrencyCard from './components/CryptoCurrencyCard';
import MoexCard from './components/MoexCard';

const getItem = (label, key, children) => ({ label, key, children });

const App = () => {
  const [cryptos, setCryptos] = useState([]);
  const [moexSecurities, setMoexSecurities] = useState([]);

  // Выбранный элемент: { key, type } — чтобы связать меню и тип сразу
  const [selected, setSelected] = useState({ key: null, type: null });

  // Данные выбранного элемента
  const [currencyData, setCurrencyData] = useState(null);
  const [moexData, setMoexData] = useState(null);

  // Загрузка списков без установки selected по умолчанию
  useEffect(() => {
    const loadCryptos = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/coinmarket/cryptocurrencies");
        const items = data.map(c => ({ label: c.name, key: String(c.id) }));
        setCryptos(items);
      } catch (e) {
        console.error("Ошибка загрузки криптовалют:", e);
      }
    };

    const loadMoex = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/moex/stocks");
        const items = data.stocks.map((stock, idx) => ({
          label: stock[2],
          key: `${stock[0]}-${idx}`, // для уникальности ключа в меню
          ticker: stock[0],          // отдельно сохраняем чистый тикер
        }));
        setMoexSecurities(items);
      } catch (e) {
        console.error("Ошибка загрузки MOEX:", e);
      }
    };

    loadCryptos();
    loadMoex();
  }, []);

  // Загрузка данных выбранного элемента
  useEffect(() => {
    if (!selected.key || !selected.type) return;

    if (selected.type === 'crypto') {
      setCurrencyData(null);
      axios.get(`http://127.0.0.1:8000/coinmarket/cryptocurrencies/${selected.key}`)
        .then(res => setCurrencyData(res.data))
        .catch(() => setCurrencyData(null));
      setMoexData(null);
    } else if (selected.type === 'moex') {
      setMoexData(null);
      // Найти тикер из ключа
      const moexItem = moexSecurities.find(item => item.key === selected.key);
      const ticker = moexItem ? moexItem.ticker : selected.key.split('-')[0];
      axios.get(`http://127.0.0.1:8000/moex/stocks/${ticker}`)
        .then(res => setMoexData(res.data))
        .catch(() => setMoexData(null));
      setCurrencyData(null);
    }
  }, [selected, moexSecurities]);

  const handleMenuClick = e => {
    if (cryptos.find(c => c.key === e.key)) {
      setSelected({ key: e.key, type: 'crypto' });
    } else if (moexSecurities.find(s => s.key === e.key)) {
      setSelected({ key: e.key, type: 'moex' });
    }
  };

  const menuItems = [
    getItem("Криптовалюты", "cryptos", cryptos),
    getItem("Ценные бумаги MOEX", "moex", moexSecurities),
  ];

  return (
    <div className="flex gap-3" style={{ height: "100vh" }}>
      <Menu
        onClick={handleMenuClick}
        style={{ width: 256 }}
        mode="inline"
        items={menuItems}
        selectedKeys={selected.key ? [selected.key] : []}
        defaultOpenKeys={["cryptos", "moex"]}
        className="h-full overflow-auto"
      />

      <div className="flex-grow flex items-center justify-center p-6">
        {selected.type === 'crypto' && (
          currencyData ? <CryptoCurrencyCard currency={currencyData} /> : <Spin size="large" />
        )}

        {selected.type === 'moex' && (
          moexData ? <MoexCard security={moexData} /> : <Spin size="large" />
        )}

        {!selected.type && (
          <p>Выберите элемент в меню для отображения данных</p>
        )}
      </div>
    </div>
  );
};

export default App;