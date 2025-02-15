import myAxios from "../plugins/myAxios.ts";
import {useCurrentUserStore} from "../stores/userStore.ts";


export const getCurrentUser = async () => {
    const userStore = useCurrentUserStore()

    if (!userStore.currentUser) {
        const res =  await myAxios.get("/user/current");

        if (res.code === 0){
            userStore.setCurrentUser(res.data)
            return res.data
        }
    }else{
        return userStore.currentUser;
    }


}



