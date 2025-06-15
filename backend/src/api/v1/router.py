from fastapi import APIRouter
from src.api.v1.coinmarket import router as coinmarcet_router
from src.api.v1.moex import router as moext_router

router = APIRouter()
router.include_router(coinmarcet_router)
router.include_router(moext_router)
