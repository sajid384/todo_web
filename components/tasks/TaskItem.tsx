'use client';

import { useState } from 'react';
import { Trash2, Edit3 } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { Task } from '@/types/task';

interface TaskItemProps {
  task: Task;
  userId: string;
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
}

export function TaskItem({ task, userId, onTaskUpdated, onTaskDeleted }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleCompletion = async () => {
    try {
      await apiClient.updateTaskCompletion(userId, task.id, !task.completed);
      onTaskUpdated();
    } catch (error) {
      console.error('Error updating task completion:', error);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await apiClient.deleteTask(userId, task.id);
        onTaskDeleted();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleSaveEdit = async () => {
    try {
      setIsLoading(true);
      await apiClient.updateTask(userId, task.id, {
        title: editTitle,
        description: editDescription || undefined,
      });
      setIsEditing(false);
      onTaskUpdated();
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  return (
    <div className={`bg-white rounded-lg shadow p-4 flex items-start ${task.completed ? 'opacity-75' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleCompletion}
        className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />

      <div className="ml-3 flex-1">
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task title"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task description (optional)"
              rows={2}
            />
            <div className="flex space-x-2 mt-2">
              <button
                onClick={handleSaveEdit}
                disabled={isLoading}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-gray-600 text-sm mt-1">{task.description}</p>
            )}
            <div className="text-xs text-gray-500 mt-2">
              Created: {new Date(task.created_at).toLocaleDateString()}
              {task.completed && task.updated_at !== task.created_at && (
                <span>, Completed: {new Date(task.updated_at).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-2 ml-4">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-500 hover:text-blue-500"
            title="Edit task"
          >
            <Edit3 size={18} />
          </button>
        )}
        <button
          onClick={handleDelete}
          className="p-1 text-gray-500 hover:text-red-500"
          title="Delete task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}