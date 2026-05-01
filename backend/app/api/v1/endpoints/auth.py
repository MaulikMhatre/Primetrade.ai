from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.core import security
from app.core.config import settings
from app.core.deps import get_db
from app.repositories.user_repository import user_repository
from app.schemas.user import User, UserCreate

router = APIRouter()

@router.post("/login", summary="Login to get access token")
def login(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
    user = user_repository.authenticate(db, email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(user.id, expires_delta=access_token_expires),
        "token_type": "bearer",
        "role": user.role,
        "email": user.email
    }

@router.post("/signup", response_model=User, summary="Register a new user")
def signup(db: Session = Depends(get_db), *, user_in: UserCreate) -> Any:
    user = user_repository.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    return user_repository.create(db, obj_in=user_in)
