<template>
    <div>
        <base-dialog :show="!!error" title="An error occured" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog :show="isLoading" title="Authentication" fixed>
            <base-spinner></base-spinner>
        </base-dialog>
        <section>
            <base-card>
                <form @submit.prevent="submitForm">
                    <div class="form-control">
                        <label for="email">Email</label>
                        <input type="email" id="email" v-model.trim="email" />
                    </div>
                    <div class="form-control">
                        <label for="password">Password</label>
                        <input type="password" id="password" v-model.trim="password" />
                    </div>
                    <p v-if="!formIsValid">Please enter a valid email and a password which must be 6 characters minumum.
                    </p>
                    <base-button>{{ submitButtonCaption }}</base-button>
                    <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaaption }}
                    </base-button>
                </form>
            </base-card>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null,
        };
    },
    computed: {
        submitButtonCaption() {
            if (this.mode === 'login') {
                return "Login";
            } else {
                return 'Signup';
            }
        },
        switchModeButtonCaaption() {
            if (this.mode === 'login') {
                return 'Signup instead';
            } else {
                return 'Login instead';
            }
        }
    },
    methods: {
        async submitForm() {
            this.isLoading = true;
            this.formIsValid = true;
            if (this.email === '' || !this.email.includes('@'), this.password.length < 6) {
                this.formIsValid = false;
                return;
            }

            const authPayload = {
                email: this.email,
                password: this.password
            };

            try {
                if (this.mode === 'login') {
                    await this.$store.dispatch('login', authPayload);
                } else {
                    await this.$store.dispatch('signup', authPayload);
                }
            } catch (error) {
                this.error = error.message || 'Failed to authenticate!';
            }

            this.isLoading = false;
        },
        switchAuthMode() {
            if (this.mode === 'login') {
                this.mode = 'signup';
            } else {
                this.mode = 'login';
            }
        },
        handleError() {
            this.error = null;
        }
    }
}
</script>

<style scoped>
.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
}

input[type='checkbox']+label {
    font-weight: normal;
    display: inline;
    margin: 0 0 0 0.5rem;
}

input,
textarea {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
}

input:focus,
textarea:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #3d008d;
}

input[type='checkbox'] {
    display: inline;
    width: auto;
    border: none;
}

input[type='checkbox']:focus {
    outline: #3d008d solid 1px;
}

h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
}

.invalid label {
    color: red;
}

input.invalid,
textarea.invalid {
    border: 1px solid red;
}

.danger {
    color: red;
}
</style>