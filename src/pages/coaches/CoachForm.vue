<template>
    <form @submit.prevent="submitForm">
        <div class="form-control">
            <label for="firstname">First Name</label>
            <input type="text" id="firstname" v-model.trim="firstName" :class="{invalid: !isFirstValid}" @keyup="clearError('isFirstValid')"/>
        </div>
        <div class="form-control">
            <label for="lastname">Last Name</label>
            <input type="text" id="lastname" v-model.trim="lastName" :class="{invalid: !isLastValid}" @keyup="clearError('isLastValid')"/>
        </div>
        <div class="form-control">
            <label for="description">Description</label>
            <textarea type="text" id="description" rows="5" v-model.trim="description" :class="{invalid: !isDescValid}" @keyup="clearError('isDescValid')"></textarea>
        </div>
        <div class="form-control">
            <label for="rate">Hourly Rate</label>
            <input type="number" id="rate" v-model.number="rate" :class="{invalid: !isRateValid}"  @keyup="clearError('isRateValid')"/>
        </div>

        <div class="form-control" :class="{invalid: !isAreasValid}">
            <h3>Areas of Expertise</h3>
            <div>
                <input type="checkbox" id="frontend" value="frontend" v-model="areas"  @change="clearError('isAreasValid')"/>
                <label for="frontend">Frontend Development</label>
            </div>
            <div>
                <input type="checkbox" id="backend" value="backend" v-model="areas" @change="clearError('isAreasValid')"/>
                <label for="backend">Backend Development</label>
            </div>
            <div>
                <input type="checkbox" id="career" value="career" v-model="areas" @change="clearError('isAreasValid')" />
                <label for="career">Career Development</label>
            </div>
        </div>
        <p v-if="!isFormValid" class="danger">Please fix the errors above</p>
        <base-button>Register</base-button>
    </form>
</template>

<script>

export default {
    emits: ['save-data'],
    data() {
        return {
            firstName: '',
            lastName: '',
            description: '',
            rate: null,
            areas: [],
            isFormValid : true,
            isFirstValid: true,
            isLastValid:true,
            isDescValid:true,
            isRateValid:true,
            isAreasValid:true,
        }
    },
    methods: {
        clearError(input){
            this[input] = true;
        },
        validateForm() {
            if (this.firstName === '') {
                this.isFormValid = false;
                this.isFirstValid = false;
            }
            if (this.lastName === '') {
                this.isFormValid = false;
                this.isLastValid = false;
            }
            if (this.description === '') {
                this.isFormValid = false;
                this.isDescValid = false;
            }
            if (this.rate || this.rate <= 0) {
                this.isFormValid = false;
                this.isRateValid = false;
            }
            if (this.areas.length === 0) {
                this.isFormValid = false;
                this.isAreasValid = false;
            }
        },
        submitForm() {
            this.validateForm();
            if(this.isFormValid === false){
                return;
            }
            const formData = {
                first: this.firstName,
                last: this.lastName,
                desc: this.description,
                rate: this.rate,
                areas: this.areas
            };
            this.$emit('save-data', formData);
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
    border: 1px solid red ;
}

.danger{
    color: red;
}
</style>