// API client for task operations
class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';
  }

  async request(endpoint: string, options: RequestInit = {}) {
    // In a real app, you would include auth tokens here
    // For development, we're keeping it simple
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    return response.json();
  }

  // Task API methods
  getTasks(userId: string, params?: { completed?: boolean; limit?: number; offset?: number }) {
    const queryParams = new URLSearchParams();
    if (params?.completed !== undefined) queryParams.append('completed', String(params.completed));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.offset) queryParams.append('offset', String(params.offset));

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/${userId}/tasks?${queryString}` : `/${userId}/tasks`;

    return this.request(endpoint);
  }

  createTask(userId: string, taskData: { title: string; description?: string; completed?: boolean }) {
    return this.request(`/${userId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  getTask(userId: string, taskId: string) {
    return this.request(`/${userId}/tasks/${taskId}`);
  }

  updateTask(userId: string, taskId: string, taskData: { title?: string; description?: string; completed?: boolean }) {
    return this.request(`/${userId}/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  deleteTask(userId: string, taskId: string) {
    return this.request(`/${userId}/tasks/${taskId}`, {
      method: 'DELETE',
    });
  }

  updateTaskCompletion(userId: string, taskId: string, completed: boolean) {
    return this.request(`/${userId}/tasks/${taskId}/complete`, {
      method: 'PATCH',
      body: JSON.stringify({ completed }),
    });
  }
}

export const apiClient = new ApiClient();