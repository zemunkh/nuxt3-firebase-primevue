
  const productConfig =  {
    component: 'datatable',
    virtualScroll: false,
    collection: 'products',
    where: [['fnac', '==', false]],
    doc: 'product',
    nick: 'zee',
    form: true, translate: true, alphabetical: false,
    actions: { _type: 'text', add: true, edit: true, delete: false, import: true, export: true, toggle: true },
    fields: {
      active: { _type: 'switch', _value: false, _required: true, _table: true },
      frontpage: { _type: 'switch', _value: false, _required: true, _table: true },
      stock: { _type: 'switch', _value: true, _required: true, _table: false },
      name: { _type: 'text', _value: '', _required: true, _table: true },
      price: { _type: 'number', _value: 0, _table: true },
      vatRate: { _type: 'number', _value: 0, _required: true, _table: true },
      EAN: { _type: 'text', _value: '', _required: true, _width: 20, _table: false },
      programs: { _type: 'multiselect', _options: { collection: 'programs', where: [['active', '==', true]] }, _value: [], _table: false },
      category: { _type: 'select', _options: { collection: 'categories', where: [['active', '==', true]] }, _value: [], _required: true, _width: 40, _table: true },
     
      brand: { _type: 'text', _value: '', _width: 20 },
      info: { _type: 'html', _value: '' },
      seller: { _type: 'select', _options: { collection: 'sellers' }, _value: '', _required: true, _width: 20, _table: true },
  
      // sellerCode: { _type:'select', _options: { collection: 'sellers' }, _value: '', _required: true, _width: 20, _table: true },
      // sellerUrl: { _type:'text', _value: '' },
  
      deliveryPeriod: { _type: 'number', _value: 15, _required: true },
      image: { _type: 'image', _value: '', _required: true, _table: true },
      variablePrice: { _type: 'switch', _value: false, _required: true },
      card: { _type: 'switch', _value: false, _required: true },
      rechargeable: { _type: 'switch', _value: false, _required: true },
      minCardValidity: { _type: 'text', _value: '' },
      fee: { _type: 'number', _value: 0 },
      priceMin: { _type: 'number', _value: 0 },
      priceMax: { _type: 'number', _value: 99999 },
      priceMultiples: { _type: 'number', _value: 1 },
      points: { _type: 'number', _value: 0, _disabled: true },
      billable: { _type: 'switch', _value: true, _required: true },
    }
  }


  export default productConfig;