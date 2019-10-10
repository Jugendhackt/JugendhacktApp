<template>
    <form @submit.prevent="submitForm" class="card">
        <label for="f_title">Titel</label>
        <input v-model="question.title" type="text" name="title" id="f_title"></input>
        <label for="f_topic">Topic</label>
        <input v-model="question.topic" type="text" name="topic" id="f_topic"></input>
        <label for="f_text">Beschreibung</label>
        <textarea v-model="question.text" type="text" name="text" id="f_text" @input="autoScroll($event)" style="height: 100px"></textarea>
        <button class="button primary" @click.prevent="submitForm">Absenden</button>
    </form>
</template>

<script>
module.exports = {
    data: function(){
        return {
            question: {
                title: "",
                topic: "",
                text: ""
            }
        }
    },
    methods: {
        submitForm(){
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/coach/questions");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.responseType = "json";
            xhr.onload = () => {
                if(xhr.status == 200){
                    alert("Success");
                } else {
                    alert(xhr.response.message);
                }
            }
            xhr.send(JSON.stringify(this.question));
        },
        autoScroll(e){
            let minimumScroll = 100;
            e.srcElement.style.height = Math.max(e.srcElement.scrollHeight, minimumScroll) + "px";
        }
    }
}
</script>
