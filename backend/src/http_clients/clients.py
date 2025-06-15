from src.config import settings
from src.http_clients.coinmarcet_client import CMCHTTPClient
from src.http_clients.moex_client import MOEXHTTPClient

cmc_client = CMCHTTPClient(
    base_url="https://pro-api.coinmarketcap.com",
    api_key=settings.CMC_API_KEY,
)
moex_client = MOEXHTTPClient()
