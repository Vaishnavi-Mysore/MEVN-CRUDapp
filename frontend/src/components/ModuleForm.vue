<template>
    <div class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="row">
                <div class="col-md-10">

                    <h5 class="modal-title">{{ module ? 'Edit Module' : 'Add Module' }}</h5>
                </div>
                <div class="col-md-2">
                    <button type="button" style="float: right;" class="close" @click="$emit('close')">&times;</button>
                </div>
            </div>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveModule">
              <div class="form-group">
                <div class="row" style="margin-top: 2%;">
                    <div class="col-md-4">
                        <label>Name</label>
                    </div>
                    <div class="col-md-8">
                        <input type="text" class="form-control" v-model="formData.name" required>
                    </div>
                </div>
               </div>
              <div class="form-group">
                <div class="row" style="margin-top: 2%;">
                    <div class="col-md-4">
                        <label>Category</label>
                    </div>
                    <div class="col-md-8">
                        <select class="form-control" v-model="formData.category" required>
                            <option v-for="category in categories"  :key="category._id" :value="category._id">{{ category.name }}</option>
                        </select>
                    </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row" style="margin-top: 2%;">
                    <div class="col-md-4">
                        <label>Description</label>
                    </div>
                    <div class="col-md-8">
                        <input type="text" class="form-control" v-model="formData.description">
                    </div>
                </div>
              </div>
              <button style="margin-top: 2%; float: right;" type="submit" class="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../../services/api';
  
  export default {
    
    props: ['module'],
    data() {
      return {
        formData: this.module ? { ...this.module } : { name: '', category: '', description: '', topics: [] },
        categories: []
      };
    },
    methods: {
      fetchCategories() {
        api.getCategories().then(response => {
          this.categories = response.data;
        });
      },
      fetchModuleById(){
        api.getModulesById(this.module._id).then(response =>{
            this.formData = response.data;
        })
      },
      saveModule() {
        if (this.module) {
          api.updateModule(this.module._id, this.formData).then(() => {
            this.$emit('refresh');
            this.$emit('close');
          });
        } else {
          api.addModule(this.formData).then(() => {
            this.$emit('refresh');
            this.$emit('close');
          });
        }
      }
    },
    created() {
        if(this.module){

            this.fetchModuleById();
        }
    
         this.fetchCategories();
    }
  };
  </script>
  
  <style scoped>
  .modal {
    display: block;
    background: rgba(0, 0, 0, 0.5);
  }
  .modal-dialog {
    margin-top: 100px;
  }
  .modal-header {
    display: grid;
  }
  </style>