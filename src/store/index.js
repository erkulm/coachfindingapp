import { createStore } from "vuex";
import coachesModule from "./modules/coaches/index.js";
import requestModule from "./modules/request/index.js"

const store = createStore({
    modules: {
        coaches: coachesModule,
        requests: requestModule
    },
    state(){
        return{
            currentUserId : 'c1',
        }
    },
    getters:{
        currentUserId(state){
            return state.currentUserId;
        }
    }
});

export default store;