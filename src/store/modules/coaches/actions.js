export default {
    registerCoach(context, payload) {
        const newCoach = {
            id: new Date().toISOString(),
            firstName: payload.first,
            lastName: payload.last,
            description: payload.description,
            hourlyRate: payload.rate,
            areas: payload.areas
        };

        context.commit('registerCoach', newCoach);
    }
}