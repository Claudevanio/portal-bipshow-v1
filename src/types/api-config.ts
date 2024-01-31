export type ApiConfig = Partial<{
  baseUrl: string
  headers: Record<string, string | number | boolean>
}>

export type SetupApiConfig = (overrides?: ApiConfig) => ApiConfig
 