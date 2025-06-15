from fastapi import APIRouter, HTTPException
from src.http_clients.clients import moex_client

router = APIRouter(
    prefix="/moex",
    tags=["MOEX"],
)


@router.get("/stocks")
async def list_stocks():
    data = await moex_client.get_securities_list()
    return {"stocks": data}


@router.get("/stocks/{ticker}")
async def get_stock(ticker: str):
    stock_info = await moex_client.get_security(ticker)
    if stock_info is None:
        raise HTTPException(
            status_code=404, detail=f"Stock with ticker '{ticker}' not found"
        )
    return {"ticker": ticker, "info": stock_info}
