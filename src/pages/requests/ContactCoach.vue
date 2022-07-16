<template>
    <form @submit.prevent="submitForm">
        <base-dialog :show="!!error" title="An Error Occured" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <div v-if="isLoading">
            <base-spinner></base-spinner>
        </div>
        <div>
            <label for="email">Your Email</label>
            <input type="email" id="email" v-model.trim="email" />
        </div>
        <div>
            <label for="message">Message</label>
            <textarea rows="5" id="message" v-model.trim="message"></textarea>
        </div>
        <p class="errors" v-if="!formIsValid">Please enter a valid email and nonempty message</p>
        <div class="actions">
            <base-button>Send Message</base-button>
        </div>
    </form>
</template>

<script>

export default {
    data() {
        return {
            email: '',
            message: '',
            formIsValid: true,
            error: null,
            isLoading : false
        }
    },
    methods: {
        async submitForm() {
            this.error = null;
            this.formIsValid = true;
            if (this.email === '' || !this.email.includes('@') || this.message === '') {
                this.formIsValid = false;
                return;
            }
            try {
                this.isLoading = true
                await this.$store.dispatch('requests/contactCoach', {
                    email: this.email,
                    message: this.message,
                    coachId: this.$route.params.id
                });
            } catch (error) {
                this.isLoading = false;
                this.error = error || 'An Error occured';
            }
            this.isLoading = false;
            this.$router.replace('/coaches');
        }
    }
}
</script>
}catch(){

}

<style scoped>
form {
    margin: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 1rem;
}

.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
}

input,
textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
}

input:focus,
textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
}

.errors {
    font-weight: bold;
    color: red;
}

.actions {
    text-align: center;
}
</style>