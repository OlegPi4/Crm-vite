export interface IBaseField {
   $createdAt: string
   $id: string
}

export interface ICustomer extends IBaseField {
   name: string
   email: string
   avatar_url: string
   from_source?: string
   mfo?: number
   account?: string
   nameBank?: string
   fioLider?: string
   fioLiderBy?: string
} 

export interface IComment extends IBaseField {
   text: string,
   plandata: string
}

export enum EnumStatus {
   'todo' = 'todo',
   'to-be-agreed' = 'to-be-agreed',
   'in-process' = 'in-process',
   'produced' = 'produced',
   'done' = 'done',
}

export interface IDeal extends IBaseField {
   comments: IComment[]
   customer: ICustomer
   name: string
   price: number
   status: EnumStatus
}

