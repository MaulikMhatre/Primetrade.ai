from typing import Optional
from pydantic import BaseModel, EmailStr
import enum

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    USER = "user"

class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    role: Optional[UserRole] = UserRole.USER
    is_active: Optional[bool] = True

class UserCreate(UserBase):
    email: EmailStr
    password: str

class UserUpdate(UserBase):
    password: Optional[str] = None

class UserInDBBase(UserBase):
    id: Optional[int] = None

    class Config:
        from_attributes = True

class User(UserInDBBase):
    pass
