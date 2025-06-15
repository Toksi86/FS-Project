from aiohttp import ClientSession


class MOEXHTTPClient:
    def __init__(self, base_url: str = "https://iss.moex.com"):
        self._session = ClientSession(base_url=base_url)

    async def close(self):
        await self._session.close()

    async def get_securities_list(self):
        """Получить список всех торгуемых акций на Московской бирже"""
        async with self._session.get(
            "/iss/engines/stock/markets/shares/securities.json"
        ) as response:
            result = await response.json()
            return result["securities"]["data"]

    async def get_security(self, ticker: str):
        """Получить информацию по конкретной бумаге по её тикеру"""
        async with self._session.get(
            f"/iss/engines/stock/markets/shares/securities/{ticker}.json"
        ) as response:
            result = await response.json()
            securities = result.get("securities", {}).get("data")
            if not securities:
                return None
            return securities[0]
