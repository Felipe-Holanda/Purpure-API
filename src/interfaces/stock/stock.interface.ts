export interface IStockRequest {
  name: string;
  stock: number;
  amount: number;
}

export interface IStock {
  id: number;
  name: string;
  stock: number;
  amount: number;
  userid: string;
}

export interface IStockUpdate {
  name: string;
  amount: number;
}

export interface IInsertStock {
  stock: number;
}
