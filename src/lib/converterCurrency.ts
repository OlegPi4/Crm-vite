export const converterCurrency = (amount: string | number) => {
   return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'UAH',
   }).format(+amount) 
}