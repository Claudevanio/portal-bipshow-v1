import { appToken } from '@/constants'
import { GET_USER, api } from '.'
import { IUser } from '@/types'

export const userService = {
  login: async (email: string, password: string) => {
    const response = api.post('/auth/login', { email, password })
    return response
  },
  getUserTokenData: async () => {
    const response = await api.get(`${GET_USER}`, {
      headers: {
        'Authorization': "Bearer f9c803a05f570476fed12eb05d072fd8",
      }
    }
    )
    debugger
    return response.data
  },
  updateUser: async (user: IUser) => {
    debugger
    const response = await api.put(`${GET_USER}/${user.id}`, user, {
      headers: {
        'Authorization': "Bearer f9c803a05f570476fed12eb05d072fd8",
      }
    });
    return response;
  }
}