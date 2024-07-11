<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <h1>Module Management</h1>
            </div>
            <div class="col-md-4" style="text-align: right;">
                <button class="btn btn-primary mb-3" @click="showAddForm">Add Module</button>
            </div>
        </div>
    
    
    
        <table class="table">
            <thead>
                <tr>
                    <th> <b>Name</b></th>
                    <th><b>Category</b></th>
                    <th><b>Description</b></th>
                    <th><b>Topics</b></th>
                    <th><b>Actions</b></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="module in modules" :key="module._id">
                    <td>{{ module.name }}</td>
                    <td>{{ module?.category?.name }}</td>
                    <td>{{ module.description }}</td>
                    <td>
                        <div class="row">
                            <div class="col-md-5">
    
                                <input v-model="newTopics[module._id]" placeholder="Add new topic" style="margin-right: 2%;line-height: 2; padding: 1%">
                                <button class="btn btn-sm btn-secondary" @click="addTopic(module._id)" :disabled="!newTopics[module._id]"> +</button>
                            </div>
                            <div class="col-md-7">
    
                                <ul style="list-style-type: none;">
                                    <li style="margin-bottom: 1%;" v-for="topic in module.topicsCovered" :key="topic._id">
                                        <button style="margin-right: 1%;" class="btn btn-sm btn-danger" @click="deleteTopic(module._id, topic._id)">-</button>
                                        {{ topic.title }}
                                    </li>
                                </ul>
                            </div>
    
                        </div>
    
                    </td>
                    <td>
                        <button class="btn btn-sm btn-warning" @click="showEditForm(module)" style="margin-right: 2%;">Edit</button>
                        <button class="btn btn-sm btn-danger" @click="deleteModule(module._id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    
        <module-form v-if="showForm" :module="currentModule" @close="closeForm" @refresh="fetchModules"></module-form>
    </div>
</template>
  
<script>
import api from '../../services/api';
import ModuleForm from './ModuleForm.vue';

export default {
    components: { ModuleForm },
    data() {
        return {
            modules: [],
            showForm: false,
            currentModule: null,
            newTopics: []
        };
    },
    methods: {
        fetchModules() {
            api.getModules().then(response => {
                this.modules = response.data;
            });
        },
        showAddForm() {
            this.currentModule = null;
            this.showForm = true;
        },
        showEditForm(module) {
            this.currentModule = module;
            this.showForm = true;
        },
        closeForm() {
            this.showForm = false;
        },
        deleteModule(_id) {
            api.deleteModule(_id).then(() => {
                this.fetchModules();
            });
        },
        addTopic(moduleId) {
            const topic = { title: this.newTopics[moduleId] };
            api.addTopic(moduleId, topic).then(() => {
                this.fetchModules();
                this.newTopics[moduleId] = '';
            });
        },
        deleteTopic(moduleId, topicId) {
            api.deleteTopic(moduleId, topicId).then(() => {
                this.fetchModules();
            });
        }
    },
    created() {
        this.fetchModules();
    }
};
</script>
  
<style scoped>
.table {
    margin-top: 20px;
}
</style>