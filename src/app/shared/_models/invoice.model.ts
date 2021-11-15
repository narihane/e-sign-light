export class Item {
  itemArr: ItemNames[] = [
    {
      displayName: 'Model',
      attrName: ''
    },
    {
      displayName: 'Serial Number',
      attrName: 'serial_number'
    },
    {
      displayName: 'Quantity',
      attrName: 'quantity'
    },
    {
      displayName: 'Karat',
      attrName: 'karat'
    },
    {
      displayName: 'Category',
      attrName: 'category'
    },
    {
      displayName: 'Weight',
      attrName: 'weight'
    }
  ];
}

export interface ItemNames {
  displayName: string,
  attrName: string
}

export interface Invoice {
  fixed: {
    branch: string,
    client_email: string,
    client_id: string,
    client_name: string,
    client_phone: string,
    date: Date,
    invoice_id: string,
    payment_type: string,
    totalPrice: string
  },
  items: InvoiceItems[]
}
export interface InvoiceItems {
  category: string,
  karat: string,
  model: string,
  price: string,
  quantity: string,
  serial_number: string,
  weight: string
}
