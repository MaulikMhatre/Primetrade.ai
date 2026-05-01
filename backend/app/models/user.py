from sqlalchemy import Column, Integer, String, Boolean, Enum
from sqlalchemy.orm import relationship
import enum
from app.db.session import Base

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    USER = "user"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    role = Column(String, default=UserRole.USER)
    is_active = Column(Boolean, default=True)

    tasks = relationship("Task", back_populates="owner")
