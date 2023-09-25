export const emptyValidation = (objInputs) => {
  return objInputs.user === '' || objInputs.password === '' || objInputs.email === '' || Object.keys(objInputs).length === 0
}

export const arrayCommutationTrue = (id, arrays, events) => {
  const arrayResult = arrays.map((array) => {
    if (array.id === id) {
      return {
        id: array.id,
        label: array.label,
        typeCtrl: array.typeCtrl,
        value: array.value,
        event: events,
        arraySelect: array.arraySelect
      }
    }
    /* return {
      id: array.id,
      label: array.label,
      typeCtrl: array.typeCtrl,
      value: array.value,
      event: true,
      arraySelect: array.arraySelect
    } */
    return array
  })
  return arrayResult
}

export const arrayCommutationTrueCancel = (id, arrays, events) => {
  const arrayResult = arrays.map((array) => {
    if (array.id === id) {
      return {
        id: array.id,
        label: array.label,
        typeCtrl: array.typeCtrl,
        value: array.value,
        event: events,
        arraySelect: array.arraySelect
      }
    }
    return array
  })
  return arrayResult
}

export const arrayCommutationFalse = (id, arrays, events) => {
  const arrayResult = arrays.map((array) => {
    if (array.id === id) {
      return {
        id: array.id,
        label: array.label,
        typeCtrl: array.typeCtrl,
        value: array.value,
        event: events,
        arraySelect: array.arraySelect
      }
    }
    return array
  })
  return arrayResult
}

export const arrayCommutationFalseIdConfirmation = (id, arrays, events, valor) => {
  const arrayResult = arrays.map((array) => {
    if (array.id === 4  ) {
      return {
        id: array.id,
        label: array.label,
        typeCtrl: array.typeCtrl,
        value: '',
        event: array.event,
        arraySelect: array.arraySelect
      }
    }
    if (array.id === id) {
      return {
        id: array.id,
        label: array.label,
        typeCtrl: array.typeCtrl,
        value: valor,
        event: true,
        arraySelect: array.arraySelect
      }
    }
    return array
  })
  return arrayResult
}

export const arrayCommutationFalseId = (id, arrays, events, valor, DeliveryDate) => {
  const arrayResult = arrays.map((array) => {
    if (array.id === id) {
      return {
        id: array.id,
        label: array.label,
        typeCtrl: array.typeCtrl,
        value: valor,
        event: events,
        arraySelect: array.arraySelect
      }
    }
    
      if (array.id === 4 && (DeliveryDate !==  undefined && DeliveryDate !== '')) {
        return {
          id: array.id,
          label: array.label,
          typeCtrl: array.typeCtrl,
          value: DeliveryDate,
          event: true,
          arraySelect: array.arraySelect
        }
      }
    
    return array
  })
  return arrayResult
}