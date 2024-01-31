import { appToken } from '@/constants';
import { GET_EVENTS, api } from '.'

export const eventosService = {
  get: async (id: number) => {

    const response = await api.get(`${GET_EVENTS}`, {
      headers: {
        'X-App-Context': 'bipshow',
        'Authorization': appToken,
        'Cookie': 'mbssid3=s%3AdmhsdJ-jv-xjL5oBd7acfrw6AgbUWHiu.91QJLvigqHfcfEipe2xg4ozvA4swy2ytIEnjB1GUNH0',
        'Access-Control-Allow-Origin': '*',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Content-Length': '24',
        'Keep-Alive': 'timeout=5',
      }
    })
    return response.data
  }
}