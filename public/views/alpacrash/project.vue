<template>
    <div>
        <div class="card">
            <div class="project-title-div">
                <div>
                    <span class="name project-title">{{project.title}}</span>
                    <img @click="changeTitleEdit()" class="edit-pen" alt="Edit pen" src="/assets/icons/edit-2.svg"
                         v-if="Boolean(isContrib)">
                </div>
                <div class="project-title-editor">
                    <form @submit="submitTitleChange()">
                        <input type="text" class="project-title-field" v-model="projectChange.title"/>
                        <input type="submit" value="Change" class="project-submit-btn"/>
                    </form>
                </div>
            </div>
            <img :src="getImagePath()" alt="Project image" class="project-image">
            <p class="project-desc">
                {{project.description}}
            </p>
            <a :href="project.link.startsWith('http') ? project.link : 'http://' + project.link" target="_blank"
               class="project-link">View code</a>
        </div>
        <!-- TODO: Fix nav -->
        <img class="back" alt="Back" src="/assets/icons/arrow-down.svg"
             @click="$router.push(`/alpacrash/${$route.params.event}`)">
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                project: {},
                contributors: [],
                isContrib: false,
                projectChange: {}
            }
        },
        methods: {
            changeTitleEdit() {
                const titleElement = document.querySelector('.project-title');
                const changeDiv = document.querySelector('.project-title-editor');
                titleElement.parentElement.style.display = 'none';
                changeDiv.style.display = 'block';
            },
            submitTitleChange() {
                const xhr = new XMLHttpRequest();
                const formData = new FormData();
                formData.append('title', this.projectChange.title);
                formData.append('event', this.$route.params.event);
                formData.append('year', this.$route.params.year);
                formData.append('project', this.$route.params.project);
                xhr.responseType = 'json';
                xhr.onload = () => {
                    if (xhr.response.success === true) {
                        this.$router.push(`/alpacrash/${this.$route.params.event}/${this.$route.params.year}/${this.projectChange.title}`);
                        this.$router.go();
                    }
                };
                xhr.open("PUT", "/alpacrash/project");
                xhr.send(formData);
            },
            getProject() {
                this.$root.loading = true;
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    const res = xhr.response;
                    if (res.success === false) console.log(res.message);
                    else this.project = xhr.response;
                    if (!this.project.length) this.$router.replace(window.history.back());
                    this.$root.loading = false;
                    this.project = this.project[0];
                    this.projectChange = this.project;
                };
                xhr.responseType = 'json';
                xhr.open("GET", `/alpacrash/project?name=${this.$route.params.event}&year=${this.$route.params.year}&title=${this.$route.params.project}`);
                xhr.send();
            },
            getImagePath() {
                return `/alpacrash/images/${this.project.img_name}`;
            },
            getProjectUsers() {
                this.$root.loading = true;
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    // TODO: idk
                }
            },
            isProjectContributor() {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'json';
                xhr.onload = () => {
                    console.log(xhr.response);
                    this.isContrib = xhr.response.isContrib;
                };
                xhr.open("GET", `/alpacrash/user?event=${this.$route.params.event}&year=${this.$route.params.year}&project=${this.$route.params.project}`);
                xhr.send();
            }
        },
        beforeMount() {
            this.getProject();
            this.isProjectContributor();
        },
    }
</script>

<style scoped>
    .name {
        font-size: 2em;
        margin: 0.67em 0;
        font-weight: bold;
    }

    .project-image {
        display: block;
        max-height: 600px;
        max-width: 1600px;
        margin: 0 auto;
    }

    .project-title {
        text-decoration: #f86d14 underline;
        text-align: center;
    }

    .project-title-div {
        text-align: center;
    }

    .project-title-editor {
        display: none;
    }

    .project-link {
        text-decoration: none;
        color: #f86d14;
    }

    .project-link:active {
        color: #f86d14;
    }

    .project-desc {
        background: #f8f8f8;
        border: 2px solid black;
        padding: 10px;
        width: 60%;
        display: block;
        margin: 20px auto;
    }


    .edit-pen {
        cursor: pointer;
    }
</style>
