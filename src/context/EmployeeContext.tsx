// ** React Imports
import { createContext, useMemo, ReactNode, useContext } from 'react'

// import EmployeeService from 'src/services/employee.service'
import useAsync from 'src/@core/hooks/useAsync'

export interface EmployeeValuesType {
  status?: 'error' | 'idle' | 'pending' | 'success'
  error?: string | null
  employees?: any[] | null
  getEmployee?: () => Promise<void>
}

// ** Defaults
const defaultProvider: EmployeeValuesType = {
  employees: [],
  error: '',
  status: 'pending'
}

const EmployeeContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const EmployeeProvider = ({ children }: Props) => {
  // const { status, data, error, execute } = useAsync(EmployeeService.getAll)

  // const values = useMemo(
  //   () => ({
  //     status,
  //     error,
  //     employees: data?.data?.employees || [],
  //     getEmployee: execute
  //   }),
  //   [status, error, data]
  // )
  const values = {}
  return <EmployeeContext.Provider value={values}>{children}</EmployeeContext.Provider>
}

export { EmployeeContext, EmployeeProvider }

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext)
  if (context === undefined || context === null) {
    throw new Error(`useEmployeeContext must be called within EmployeeProvider`)
  }
  return context
}
