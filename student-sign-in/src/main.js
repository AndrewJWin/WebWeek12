import { createApp } from 'vue'
import App from './App.vue'
import StudentService from './services/StudentService.js'

let app = createApp(App)

// Add the StudentService as a global property.
app.config.globalProperties.$student_api = StudentService

app.mount('#app')