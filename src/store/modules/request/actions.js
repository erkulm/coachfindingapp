export default {
    async contactCoach(context, payload){
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        };

        const response = await fetch(`https://coachfindingapp-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
        {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });

        if(!response.ok){
            const error = new Error(response.message || 'Failed to post request');
            throw error;
        }

        const responseData = await response.json();

        newRequest.id = responseData.name;
        newRequest.coachId = payload.coachId;

        context.commit('addRequest', newRequest);
    },

    async fetchRequests(context){
        const currentUserId = context.rootGetters.currentUserId;

        const authToken  = context.rootGetters.token;

        const response  = await fetch(`https://coachfindingapp-default-rtdb.europe-west1.firebasedatabase.app/requests/${currentUserId}.json?auth=${authToken}`);
        
        if(!response.ok){
            const error = new Error(response.message || 'Failed to fetch requests');
            throw error;
        }

        const responseData = await response.json();

        const requests = [];

        for (const key in responseData) {

            const request = {
                id: key,
                coachId: currentUserId,
                message : responseData[key].message,
                userEmail: responseData[key].userEmail
            };

            requests.push(request);
        }
        
        context.commit('setRequests', requests);
    }
};