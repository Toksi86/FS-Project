import React from 'react';
import { Card } from 'antd';

function CryptoCurrencyCard(props) {
    const { currency } = props;
    const price = Math.round(currency.quote.USD.price);

    return (
        <Card
            style={{ width: 400 }}
            className="shadow-lg rounded-xl"
            title={
                <div className="flex items-center gap-3">
                    <img
                        src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}
                        alt={currency.name}
                        className="w-10 h-10 object-contain"
                    />
                    <span className="text-lg font-semibold">{currency.name}</span>
                </div>
            }
        >
            <p className="text-base">Текущая цена: <strong>{price}$</strong></p>
        </Card>
    );
}

export default CryptoCurrencyCard;