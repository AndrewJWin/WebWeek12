<template>
<tr v-bind:class="{ present: student.present, absent: !student.present }">
    <td>{{student.name}}</td>
    <td>{{student.starID}}</td>
    <td><input type="checkbox"  v-on:change="arrivedOrLeft(student, $event.srcElement.checked)" v-bind:checked="student.present"></td>
    <td><img v-show="edit" v-on:click="deleteStudent" src="@/assets/delete.png"> </td>
</tr>
    
</template>

<script>
export default {
    name: "StudentRow",
    props: {
        student: Object,
        edit: Boolean,
        emits: ["student-arrived-or-left", "delete-student"]
    },
    methods: {
        arrivedOrLeft(student, present) {
            this.$emit("student-arrived-or-left", student, present);
        },
        deleteStudent() {
            if (confirm(`Delete ${this.student.name}?`)) {
                this.$emit("delete-student", this.student);
            }
        }
    }
    
}
</script>

<style scoped>

img {
    width: 16px;
    height: auto;
}

.present {
    color: gray;
    font-style: italic;
}

.absent {
    color: black;
    font-weight: bold;
}

</style>