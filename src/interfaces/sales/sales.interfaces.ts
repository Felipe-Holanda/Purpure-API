export interface ISales {
  amount: number
  client: string
  value: number
  stock: number
}

export interface ISalesReturn {
  id: string
  amount: number
  clientName: string
  client: undefined
  value: number
  createdAt: Date
  stockName: string
}
