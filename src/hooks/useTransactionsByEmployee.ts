import { useCallback, useState } from "react"
import { RequestByEmployeeParams, Transaction } from "../utils/types"
import { TransactionsByEmployeeResult } from "./types"
import { useCustomFetch } from "./useCustomFetch"

export function useTransactionsByEmployee(): TransactionsByEmployeeResult {
  // const { fetchWithCache, loading } = useCustomFetch()
  const { fetchWithoutCache, loading } = useCustomFetch()

  const [transactionsByEmployee, setTransactionsByEmployee] = useState<Transaction[] | null>(null)

  const fetchById = useCallback(
    async (employeeId: string) => {
      // const data = await fetchWithCache<Transaction[], RequestByEmployeeParams>(
      const data = await fetchWithoutCache<Transaction[], RequestByEmployeeParams>(

        "transactionsByEmployee",
        {
          employeeId,
        }
      )

      setTransactionsByEmployee(data)
    },
    // [fetchWithCache]
    [fetchWithoutCache]

  )

  const invalidateData = useCallback(() => {
    setTransactionsByEmployee(null)
  }, [])

  return { data: transactionsByEmployee, loading, fetchById, invalidateData }
}
