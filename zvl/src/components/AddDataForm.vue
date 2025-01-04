<template>
    <div>
        <h1>Add Data</h1>
        <form @submit.prevent="submitForm">
            <div>
                <label for="title">Naam:</label>
                <input type="text" id="title" v-model="formData.name" />
            </div>
            <div>
                <label for="description">Beschrijving:</label>
                <textarea id="description" v-model="formData.description"></textarea>
            </div>
            <div>
                <label for="description">Procedure:</label>
                <textarea id="description" v-model="formData.procedure"></textarea>
            </div>
            <div>
                <label for="description">Duur:</label>
                <textarea id="description" v-model="formData.duration"></textarea>
            </div>
            <div>
                <label for="description">Minimum spelers:</label>
                <textarea id="description" v-model="formData.minimum_players"></textarea>
            </div>
            <div>
                <label for="description">Minimum leeftijd:</label>
                <textarea id="description" v-model="formData.minimum_age"></textarea>
            </div>
            <div>
                <label for="description">water_exercise:</label>
                <textarea id="description" v-model="formData.water_exercise"></textarea>
            </div>
            
            <button type="submit">Submit</button>
        </form>
        <p v-if="message">{{ message }}</p>
    </div>

    
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            formData: {
                name: '',
                description: '', 
                procedure: '',
                duration: '',
                minimum_players: '',
                minimum_age: '',
                water_exercise: '',
                
            },
            message: '',
        };
    },
    methods: {
        async submitForm() {
            try {
                const response = await axios.post(
                    'http://127.0.0.1:8000/api/exercises',
                    this.formData
                );
                this.message = response.data.message;
                this.formData.title = '';
                this.formData.description = '';
                this.formData.category = '';
            } catch (error) {
                console.error(error.response?.data || error.message);
                this.message = 'An error occurred while submitting the form.';
            }
        },
    },
    
};
</script>