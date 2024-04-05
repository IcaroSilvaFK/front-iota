import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { constants } from '../utils/constants'

type UserProps = {
  avatar_url: string
  bio: string
  email: string
  name: string
  url: string
}

type Store = {
  user: UserProps | null,
  setUser(u: UserProps): void
  removeUser(): void
}

export const userStore = create<Store>()(devtools(persist((set) => ({
  user: null,
  setUser(u) {
    set(state => ({ ...state, user: u }))
  },
  removeUser() {
    set(state => ({ ...state, user: null }))
  }
}), { name: constants.userStorage, storage: createJSONStorage(() => sessionStorage) })))