from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.deps import get_db, get_current_active_user, RoleChecker
from app.models.user import User, UserRole
from app.repositories.task_repository import task_repository
from app.schemas.task import Task, TaskCreate, TaskUpdate

router = APIRouter()

@router.get("/", response_model=List[Task], summary="List all tasks")
def read_tasks(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    if current_user.role == UserRole.ADMIN:
        return task_repository.get_multi(db, skip=skip, limit=limit)
    return task_repository.get_multi_by_owner(db, owner_id=current_user.id, skip=skip, limit=limit)

@router.post("/", response_model=Task, summary="Create a new task")
def create_task(
    db: Session = Depends(get_db),
    *,
    task_in: TaskCreate,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    return task_repository.create_with_owner(db, obj_in=task_in, owner_id=current_user.id)

@router.put("/{id}", response_model=Task, summary="Update a task")
def update_task(
    id: int,
    *,
    db: Session = Depends(get_db),
    task_in: TaskUpdate,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    task = task_repository.get(db, id=id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if current_user.role != UserRole.ADMIN and task.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return task_repository.update(db, db_obj=task, obj_in=task_in)

@router.delete("/{id}", response_model=Task, summary="Delete a task")
def delete_task(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> Any:
    task = task_repository.get(db, id=id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if current_user.role != UserRole.ADMIN and task.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return task_repository.remove(db, id=id)
