<template>
    <div class="questions-container">
        <div v-if="questions.length" class="card" v-for="question in questions">
            <h2>{{ question.title }}</h2>
            <h5>{{ question.topic }} - {{question.full_name}}</h5>
            <p>{{ question.text}}</p>
        </div>
    </div>
</template>

<script>
module.exports = {
    data: function(){
        return {
            questions: []
        }
    },
    methods: {
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
        }
    },
    beforeMount(){this.loadQuestions()}
}
</script>
