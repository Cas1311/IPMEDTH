<template>
    <div>
        <h1>Add Data</h1>
        <form @submit.prevent="submitForm">
            <div>
                <label for="title">Title:</label>
                <input type="text" id="title" v-model="formData.title" />
            </div>
            <div>
                <label for="description">Description:</label>
                <textarea id="description" v-model="formData.content"></textarea>
            </div>
            <div>
                <label for="category">Category:</label>
                <textarea id="category" v-model="formData.category"></textarea>
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
                title: '',
                description: '',
                category: '',
            },
            message: '',
        };
    },
    methods: {
        async submitForm() {
            try {
                const response = await axios.post(
                    'http://127.0.0.1:8000/api/add-data',
                    this.formData
                );
                this.message = response.data.message;
                this.formData.title = '';
                this.formData.content = '';
            } catch (error) {
                console.error(error.response?.data || error.message);
                this.message = 'An error occurred while submitting the form.';
            }
        },
    },
};
</script>
