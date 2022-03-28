
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
      frontpage: { _type: 'switch', _value: false, _required: true, _table: false },
      stock: { _type: 'switch', _value: true, _required: false },
      name: { _type: 'text', _value: '', _required: true, _table: true },
      price: { _type: 'number', _value: 0, _table: true },
      vatRate: { _type: 'number', _value: 0, _required: true, _table: true },
      EAN: { _type: 'text', _value: '', _required: true, _width: 20, _table: false  },
      programs: { _type: 'multiselect', _options: { collection: 'programs', where: [['active', '==', true]] }, _value: [] },
      category: { _type: 'select', _options: { collection: 'categories', where: [['active', '==', true]] }, _value: [], _required: true, _width: 40, _table: true },
      brand: { _type: 'text', _value: '', _width: 20, _table: false },
      info: { _type: 'html', _value: '', _table: false },
      seller: { _type: 'select', _options: { collection: 'sellers' }, _value: '', _required: true, _width: 20, _table: false },
  
      // sellerCode: { _type:'select', _options: { collection: 'sellers' }, _value: '', _required: true, _width: 20, _table: true },
      // sellerUrl: { _type:'text', _value: '' },
  
      deliveryPeriod: { _type: 'number', _value: 15, _required: true, _table: false  },
      image: { _type: 'image', _value: '', _required: true, _table: true },
      variablePrice: { _type: 'switch', _value: false, _required: true, _table: false  },
      card: { _type: 'switch', _value: false, _required: true, _table: false  },
      rechargeable: { _type: 'switch', _value: false, _required: true, _table: false  },
      minCardValidity: { _type: 'text', _value: '', _table: false  },
      fee: { _type: 'number', _value: 0, _table: true  },
      priceMin: { _type: 'number', _value: 0, _table: false  },
      priceMax: { _type: 'number', _value: 99999, _table: false  },
      priceMultiples: { _type: 'number', _value: 1, _table: false  },
      points: { _type: 'number', _value: 0, _disabled: true, _table: false  },
      billable: { _type: 'switch', _value: true, _required: true, _table: false  },
    }
  }


  export default productConfig;