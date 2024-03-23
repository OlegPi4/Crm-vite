export interface IBaseField {
   $createdAt: string
   $id: string
}

export interface IOurChifs extends IBaseField  {
   jobtitle: string
   jobtitleadd: string
   name: string
   nameadd: string
   document: string
} 

export interface IOurCompany extends IBaseField  {
   namelong: string
   nameshort: string
   address: string
   edrpo: number
} 

export interface IOurBankRecvizits  extends IBaseField {
   mfo: number
   namebank: string
   account: string
} 

