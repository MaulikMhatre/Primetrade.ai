from typing import Optional
from pydantic import BaseModel
import enum

class TaskStatus(str, enum.Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"

class TaskBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = TaskStatus.PENDING

class TaskCreate(TaskBase):
    title: str

class TaskUpdate(TaskBase):
    pass

class TaskInDBBase(TaskBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True

class Task(TaskInDBBase):
    pass
