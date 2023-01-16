export interface ISales {
  id: number
  amount: number
  client_id: string
  value: number
  createdAt: Date
}

export interface ISalesReturn {
  id: number
  amount: number
  client_name: string
  value: number
  createdAt: Date
}
