<template>
  <div id="app">
    <new-student-form v-on:student-added="newStudentAdded"></new-student-form>

    <student-table 
    v-bind:students="students"
    v-on:student-arrived-or-left="studentArrivedOrLeft"
    v-on:delete-student="studentDeleted"
    ></student-table>

    <student-message v-bind:student="mostRecentStudent"></student-message>
  </div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentMessage from './components/StudentMessage.vue'
import StudentTable from './components/StudentTable.vue'

export default {
  name: 'App',
  components: {
    NewStudentForm,
    StudentMessage,
    StudentTable
  },
  data() {
    return {
      students: [],
      mostRecentStudent: {}
    }
  },
  components: {
    NewStudentForm,
    StudentTable,
    StudentMessage
  },
  mounted() {
    // load all students - make request to API
    this.updateStudents()
  },
  methods: {
    updateStudents() {
      this.$student_api.getAllStudents().then( students => {
        this.students = students
      }).catch( err => {
        console.error('Error getting latest student list', err.response)
        alert('Sorry, unable to fetch student list')
      })
    },
    newStudentAdded(student) {
      this.$student_api.addStudent(student).then( () => {
        this.updateStudents()
      })
      .catch( err => {
        console.log('Error fetching student list', err)
        // if data is returned from the server and it's an array
        if (err.response.data && Array.isArray(err.response.data)) {
          // join messages and alert user - this will be used for DB validation errors
          let msg = err.response.data.join(',')
          alert('Error adding student\n' + msg)
        } else {
          // something else went wrong, display generic error
          console.error('Error adding student', err.response)
          alert('Sorry, unable to add student')
        }
      })
    },
    studentArrivedOrLeft(student, present) {
      student.present = present  // update present value 
      this.$student_api.updateStudent(student).then( () => {
        this.mostRecentStudent = student
        this.updateStudents()
      }).catch( err => {
        console.error('Error updating student', err.response)
        alert('Sorry, unable to update student')
      })
    },
    studentDeleted(student) {
      this.$student_api.deleteStudent(student.id).then( () => {
        this.updateStudents()
        this.mostRecentStudent = {}  // clear welcome/goodbye message 
      }).catch( err => {
        console.error('Error deleting student', err.response)
        alert('Sorry, unable to delete student')
      })
    }
  }
}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
