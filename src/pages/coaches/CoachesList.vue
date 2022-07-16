<template>
    <section>
        <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button link mode="outline" @click="loadCoaches">Refresh</base-button>
                <base-button v-if="!isCoach && !isLoading" link to="/register">Register as Coach</base-button>

            </div>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="hasCoaches">
                <coach-item v-for="coach in filteredCoaches" :key="coach.id" :id="coach.id" :firstName="coach.firstName"
                    :lastName="coach.lastName" :rate="coach.hourlyRate" :areas="coach.areas"></coach-item>
            </ul>
            <h3 v-else> No coaches Found</h3>
        </base-card>
    </section>
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
        }
    },
    computed: {
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
            await this.$store.dispatch('coaches/loadCoaches');
            this.isLoading = false;
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