const POKE_LOCAL_STORAGE_KEY = 'MY_POKE'
const getPoke = ()=> {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(POKE_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }
  try {
    const auth= JSON.parse(lsValue) as any
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setPoke = (auth:any) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(POKE_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const removePoke = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(POKE_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}


export {getPoke, setPoke, removePoke, POKE_LOCAL_STORAGE_KEY}
