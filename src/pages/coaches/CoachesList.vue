<template>
    <div>
        <base-dialog :show="!!error" title="An Error Occured" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <coach-filter @change-filter="setFilters"></coach-filter>
        </section>
        <section>
            <base-card>
                <div class="controls">
                    <base-button link mode="outline" @click="loadCoaches">Refresh</base-button>
                    <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to Register as a Coach</base-button>
                    <base-button v-if="showRegisterButton" link to="/register">Register as a Coach</base-button>

                </div>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasCoaches">
                    <coach-item v-for="coach in filteredCoaches" :key="coach.id" :id="coach.id"
                        :firstName="coach.firstName" :lastName="coach.lastName" :rate="coach.hourlyRate"
                        :areas="coach.areas"></coach-item>
                </ul>
                <h3 v-else> No coaches Found</h3>
            </base-card>
        </section>
    </div>
</template>

<script>

import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
    components: {
        CoachItem,
        CoachFilter
    },
    data() {
        return {
            filters: {
                frontend: true,
                backend: true,
                career: true
            },
            isLoading: false,
            error: null
        }
    },
    computed: {
        showRegisterButton(){
            return this.isLoggedIn && !this.isCoach && !this.isLoading;
        },
        isLoggedIn(){
            return this.$store.getters.isAuthenticated;
        },
        filteredCoaches() {
            const allCoaches = this.$store.getters['coaches/coaches'];
            const filteredCoaches = allCoaches.filter((coach) => {
                if (this.filters.frontend && coach.areas.includes('frontend')) {
                    return true;
                }
                if (this.filters.backend && coach.areas.includes('backend')) {
                    return true;
                }
                if (this.filters.career && coach.areas.includes('career')) {
                    return true;
                }
                return false;
            });
            return filteredCoaches;
        },
        hasCoaches() {
            return this.$store.getters['coaches/hasCoaches'] && !this.isLoading;
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        }
    }, methods: {
        setFilters(filters) {
            this.filters = filters;
        },
        async loadCoaches() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('coaches/loadCoaches');
            } catch (error) {
                this.error = error.message || 'Something went wrong';
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null;
        }
    },
    created() {
        this.loadCoaches();
    }
}
</script>
<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>