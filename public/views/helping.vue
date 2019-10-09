<template>
    <div class="component">
        <div class="selection">
            <h2 class="card" @click="selected = 1" :class="{ highlight : selected == 1}">Ich brauche hilfe</h2>
            <h2 class="card" @click="selected = 2" :class="{ highlight : selected == 2}" v-show="questions.length">Ich möchte helfen</h2>
        </div>
        <transition name="fade">
            <form @submit.prevent="submitForm" v-show="selected == 1" class="card">
                <label for="f_title">Titel</label>
                <input v-model="question.title" type="text" name="title" id="f_title"></input>
                <label for="f_topic">Topic</label>
                <input v-model="question.topic" type="text" name="topic" id="f_topic"></input>
                <label for="f_text">Beschreibung</label>
                <textarea v-model="question.text" type="text" name="text" id="f_text" @input="autoScroll($event)" style="height: 100px"></textarea>
                <button class="button primary" @click.prevent="submitForm">Absenden</button>
            </form>
        </transition>
        <div class="questions-container">
            <div v-if="questions.length" v-show="selected == 2" class="card" v-for="question in questions">
                <h2>{{ question.title }}</h2>
                <h5>{{ question.topic }} - {{question.full_name}}</h5>
                <p>{{ question.text}}</p>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {
    data: function(){
        return {
            selected: 1,
            questions: [],
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
            xhr.open("GET", "/coach/questions");
            xhr.responseType = "json";
            xhr.onload = () => {
                if(xhr.status == 200){
                    alert("Success");
                    this.loadQuestions();
                } else {
                    alert(xhr.response.message);
                }
            }
            xhr.send(this.question);
        },
        loadQuestions(){
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/coach/questions");
            xhr.responseType = "json";
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    this.questions = xhr.response;
                    console.log(this.questions);
                } else {
                    console.warn(xhr.statusText, xhr.response);
                }
            }
            xhr.send();
        },
        autoScroll(e){
            let minimumScroll = 100;
            e.srcElement.style.height = Math.max(e.srcElement.scrollHeight, minimumScroll) + "px";
        }
    },
    beforeMount(){this.loadQuestions()}
}
</script>

<style scoped>
.component .selection {
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.highlight {
    color: #2aabe1;
}

.selection .card {
    display: inline;
    width: 100%;
    text-align: center;
    cursor: pointer;
}

.questions-container .card h2 {
    margin-bottom: 1px;
}

.questions-container .card h5 {
    margin: 0;
    font-style: italic;
    font-size: normal;
}
</style>
