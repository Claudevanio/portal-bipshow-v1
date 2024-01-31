'use client'
import { useAuth } from '@/hooks'
import { useSearch } from '@/shared/hooks/useSearch'
import { SearchEvents } from '../SearchEvents'

interface PrivateRouteProps {
  children: React.ReactNode
}
export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  
  const { search, handleClearSearchEvents } = useSearch()

  return (
    <>
      {!search || search === '' ? (
        children
      ) : (
        <SearchEvents/>
      )}
    </>
  )

}
