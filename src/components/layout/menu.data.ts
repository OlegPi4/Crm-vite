export interface IMenuItem {  
   name:string
   url:string
   icon:string 
   role: [string, string?, string?] 
}

export const MENU_DATA: IMenuItem[] = [   
   {
      icon: "public/home-main.svg",  
      name: 'Main',	      
      url: '/',       
      role: ['admin', 'user', 'demo']      
   },
   {
      icon: "products.svg",
      name: 'Products',
      url: '/products',
      role: ['admin', 'user', 'demo']
   },
   {
      icon: "customers.svg",
      name: 'Customers',
      url: '/customers',
      role: ['admin', 'user', 'demo']
   },
   {
      icon: "documents.svg",
      name: 'Documents',
      url: '/documents',
      role: ['admin', 'user', 'demo']
   },
   {
      icon: "storage.svg",
      name: 'Storage',
      url: '/storage',
      role: ['admin', 'user', 'demo']
   },
   {
      icon: "settings.svg",
      name: 'Settings',
      url: '/settings',
      role: ['admin', 'demo']
   },
   
]