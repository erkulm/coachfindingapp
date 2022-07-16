import { createStore } from "vuex";
import coachesModule from "./modules/coaches/index.js";
import requestModule from "./modules/request/index.js"

const store = createStore({
    modules: {
        coaches: coachesModule,
        requests: requestModule
    }
});

export default store;