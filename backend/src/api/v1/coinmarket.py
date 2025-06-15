from fastapi import APIRouter
from src.http_clients.clients import cmc_client

router = APIRouter(
    prefix="/coinmarket",
    tags=["Coinmarket"],
)


@router.get("/cryptocurrencies")
async def get_cryptocurrencies():
    return await cmc_client.get_listings()


@router.get("/cryptocurrencies/{cryptocurrency_id}")
async def get_cryptocurrency(cryptocurrency_id: int):
    return await cmc_client.get_currency(cryptocurrency_id)
