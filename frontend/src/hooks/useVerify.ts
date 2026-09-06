import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const API_URL = import.meta.env.API_URL || 'http://localhost:8000'

export function useVerify() {
  return useMutation({
    mutationFn: async (query: string) => {
      const response = await axios.post(
        `${API_URL}/api/verify`,
        { query },
        { timeout: 10000 }  // ✅ 10 second timeout
      )
      return response.data
    },
  })
}