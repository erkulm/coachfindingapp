export default {
    async registerCoach(context, payload) {
        const userId = context.rootGetters.currentUserId;

        const newCoach = {
            firstName: payload.first,
            lastName: payload.last,
            description: payload.description,
            hourlyRate: payload.rate,
            areas: payload.areas
        };

        const response = await fetch(`https://coachfindingapp-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`, {
            method: 'PUT',
            body: JSON.stringify(newCoach)
        });

        if(!response.ok){
            //error hangling
        }

        context.commit('registerCoach', {
            ...newCoach,
            id: userId
        });
    },
    async loadCoaches(context){
        const response = await fetch(`https://coachfindingapp-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`);
        const responseData = await response.json();
        if(!response.ok){
            //errror handling
        }

        const coaches = [];

        for(const key in responseData){
            const coach = {
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas,
                id: key
            };
            coaches.push(coach)
        }

        context.commit('setCoaches', coaches);
    }
}