import React from 'react';
import { Card } from 'antd';

function MoexCard({ security }) {
    if (!security || !Array.isArray(security.info)) {
        return <p>Нет данных для отображения</p>;
    }

    const info = security.info;

    const [
        ticker,         // 0
        category,       // 1
        name,           // 2
        lastPrice,      // 3
        lotSize,        // 4
        step,           // 5
        classCode,      // 6
        description,    // 7
        boardId,        // 8
        shortName,      // 9
        skip1,          // 10 - null
        prevCloseCode,  // 11 - FNDT ?
        yieldCode,      // 12 - EQIN ?
        skip2,          // 13 - null
        nominal,        // 14
        prevClose,      // 15
        currencyCode,   // 16 - SUR ?
        maturityDate,   // 17
        issueSize,      // 18
        isin,           // 19
        englishName,    // 20
        regNumber,      // 21
        skip3,          // 22
        currency,       // 23
        faceUnit,       // 24
        faceValue,      // 25
        updateDate      // 26
    ] = info;

    return (
        <Card
            style={{ width: 400 }}
            className="shadow-lg rounded-xl"
            title={
                <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold">{name || ticker}</span>
                </div>
            }
        >
            <p><strong>Тикер:</strong> {ticker}</p>
            <p><strong>Краткое название:</strong> {shortName || '—'}</p>
            <p><strong>Тип:</strong> {category || '—'}</p>
            <p><strong>Класс:</strong> {classCode || '—'}</p>
            <p><strong>Цена:</strong> {lastPrice ? `${lastPrice} ₽` : '—'}</p>
            <p><strong>Пред. закрытие:</strong> {prevClose ? `${prevClose} ₽` : '—'}</p>
            <p><strong>Шаг цены:</strong> {step || '—'}</p>
            <p><strong>Номинал:</strong> {nominal || '—'}</p>
            <p><strong>Валюта:</strong> {currency || currencyCode || '—'}</p>
            <p><strong>Лот:</strong> {lotSize || '—'}</p>
            <p><strong>ISIN:</strong> {isin || '—'}</p>
            <p><strong>Рег. номер:</strong> {regNumber || '—'}</p>
            <p><strong>Дата погашения:</strong> {maturityDate || '—'}</p>
            <p><strong>Объем выпуска:</strong> {issueSize || '—'}</p>
            <p><strong>Обновлено:</strong> {updateDate || '—'}</p>
            <p><strong>Описание:</strong> {description || '—'}</p>
        </Card>
    );
}

export default MoexCard;