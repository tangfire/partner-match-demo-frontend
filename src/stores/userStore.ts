import {defineStore} from "pinia";
import {ref} from "vue";
import type {UserType} from "../models/user";


export const useCurrentUserStore = defineStore('currentUser', () => {
    const currentUser = ref<UserType | null>(null)

    const setCurrentUser = (user: UserType | null): void => {
        currentUser.value = user
    }

    const clearCurrentUser = (): void => {
        currentUser.value = null
    }

    return {
        currentUser,
        setCurrentUser,
        clearCurrentUser
    }
})