<template>
    <div class="component">
        <div class="selection">
            <h2 class="card" @click="selected = 1" :class="{ highlight : selected == 1}">Ich brauche hilfe</h2>
            <h2 class="card" @click="selected = 2" :class="{ highlight : selected == 2}" v-show="questions.length">Ich möchte helfen</h2>
        </div>
        <transition name="fade">
            <form method="POST" action="/coach/questions" v-show="selected == 1" class="card">
                <label for="f_title">Titel</label>
                <input type="text" name="title" id="f_title"></input>
                <label for="f_topic">Topic</label>
                <input type="text" name="topic" id="f_topic"></input>
                <label for="f_text">Text</label>
                <textarea type="text" name="text" id="f_text"></textarea>
                <button type="submit" class="button primary">Absenden</button>
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
            questions: []
        }
    },
    beforeMount() {
        var request = new XMLHttpRequest();
        request.open("GET","/coach/questions");
        request.responseType = "json";
        request.onload = () => {
            if (request.status >= 200 && request.status < 300) {
                this.questions = request.response;
                console.log(this.questions);
            } else {
                console.warn(request.statusText, request.response);
            }
        }
        request.send();
    }
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
