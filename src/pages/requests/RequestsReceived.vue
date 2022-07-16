<template>
    <base-dialog :show="!!error" title="Error" @close="handleError">{{ error }}</base-dialog>
    <section>
        <base-card>
            <h2>
                Request Received
            </h2>
            <base-spinner v-if="isLoading"></base-spinner>
            <ul v-else-if="hasRequests">
                <requests-item v-for="request in receivedRequests" :key="request.id" :email="request.userEmail"
                    :message="request.message"></requests-item>
            </ul>
            <h3 v-else>You have not received any requests yet</h3>
        </base-card>
    </section>
</template>

<script>
import RequestsItem from '../../components/requests/RequestsItem.vue';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';
import BaseDialog from '../../components/ui/BaseDialog.vue';
export default {
    components: {
        RequestsItem,
        BaseSpinner,
        BaseDialog
    },
    data() {
        return {
            isLoading: false,
            error: null
        };
    },
    computed: {
        receivedRequests() {
            return this.$store.getters['requests/requests'];
        },
        hasRequests() {
            return this.$store.getters['requests/hasRequests'];
        }
    },
    methods: {
        async loadRequests() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('requests/fetchRequests');
            } catch (error) {
                this.error = error.message || 'Something went horribly wrong!';
            }
            this.isLoading = false;
        },
        handleError(){
            this.error = null;
        }
    },
    created(){
        this.loadRequests();
    }
}
</script>

<style>
header {
    text-align: center;
}

ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
}

h3 {
    text-align: center;
}
</style>