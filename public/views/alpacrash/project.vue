<template>
    <div>
        <div class="card">
            <div class="project-title-div">
                <div class="project-title-display">
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
            <div class="project-desc-div">
                <div class="project-desc-display">
                    <span class="project-desc">{{project.description}}</span>
                    <img @click="changeDescEdit()" class="edit-pen" alt="Edit pen" src="/assets/icons/edit-2.svg"
                         v-if="Boolean(isContrib)">
                </div>
                <div class="project-desc-editor">
                    <form @submit="submitDescChange()">
                        <textarea class="project-desc-field" v-model="projectChange.description"></textarea>
                        <input type="submit" value="Change" class="project-submit-btn"/>
                    </form>
                </div>
            </div>
            <div class="project-link-div">
                <div class="project-link-display">
                    <a :href="project.link.startsWith('http') ? project.link : 'http://' + project.link" target="_blank"
                       class="project-link">View code</a>
                    <img @click="changeLinkEdit()" class="edit-pen" alt="Edit pen" src="/assets/icons/edit-2.svg"
                         v-if="Boolean(isContrib)">
                </div>
                <div class="project-link-editor">
                    <form @submit="submitLinkChange()">
                        <input type="text" class="project-link-field" v-model="projectChange.link"/>
                        <input type="submit" value="Change" class="project-submit-btn"/>
                    </form>
                </div>
            </div>
            <div>
                Contributors: <i v-for="contrib in contributors" class="project-contrib">{{contrib.full_name}}</i>
            </div>
        </div>
        <div class="alpacrash-nav-btn">
            <img class="prev" alt="Prev" src="/assets/icons/arrow-down.svg" :class="{ notAct : projectI === 0}"
                 @click="prevEvent()">
            <img class="back" alt="Back" src="/assets/icons/arrow-down.svg"
                 @click="$router.push(`/alpacrash/${$route.params.event}/${$route.params.year}`)">
            <img class="next" alt="Next" src="/assets/icons/arrow-down.svg"
                 :class="{ notAct : projectI >= projects.length - 1}" @click="nextEvent()">
        </div>

    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                project: {},
                contributors: [],
                isContrib: false,
                projectChange: {},
                projects: [],
                projectI: -1,
            }
        },
        methods: {
            changeTitleEdit() {
                const titleElement = document.querySelector('.project-title-display');
                const changeDiv = document.querySelector('.project-title-editor');
                titleElement.style.display = 'none';
                changeDiv.style.display = 'block';
                const kd = e => {
                    if (e.key === 'Esc' || e.key === 'Escape') {
                        titleElement.style.display = 'block';
                        changeDiv.style.display = 'none';
                        window.removeEventListener('keydown', kd);
                    }
                };
                window.addEventListener('keydown', kd);
            },
            changeDescEdit() {
                const dpe = document.querySelector('.project-desc-display');
                const changeDiv = document.querySelector('.project-desc-editor');
                dpe.style.display = 'none';
                changeDiv.style.display = 'block';
                const kd = e => {
                    if (e.key === 'Esc' || e.key === 'Escape') {
                        dpe.style.display = 'flex';
                        changeDiv.style.display = 'none';
                        window.removeEventListener('keydown', kd);
                    }
                };
                window.addEventListener('keydown', kd);
            },
            changeLinkEdit() {
                const titleElement = document.querySelector('.project-link-display');
                const changeDiv = document.querySelector('.project-link-editor');
                titleElement.style.display = 'none';
                changeDiv.style.display = 'block';
                const kd = e => {
                    if (e.key === 'Esc' || e.key === 'Escape') {
                        titleElement.style.display = 'block';
                        changeDiv.style.display = 'none';
                        window.removeEventListener('keydown', kd);
                    }
                };
                window.addEventListener('keydown', kd);
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
            submitDescChange() {
                const xhr = new XMLHttpRequest();
                const formData = new FormData();
                formData.append('description', this.projectChange.description);
                formData.append('event', this.$route.params.event);
                formData.append('year', this.$route.params.year);
                formData.append('project', this.$route.params.project);
                xhr.responseType = 'json';
                xhr.onload = () => {
                    if (xhr.response.success) {
                        const dpe = document.querySelector('.project-desc-display');
                        const changeDiv = document.querySelector('.project-desc-editor');
                        dpe.style.display = 'flex';
                        changeDiv.style.display = 'none';

                    }
                };
                xhr.open("PUT", "/alpacrash/project");
                xhr.send(formData);
            },
            submitLinkChange() {
                const xhr = new XMLHttpRequest();
                const formData = new FormData();
                formData.append('link', this.projectChange.link);
                formData.append('event', this.$route.params.event);
                formData.append('year', this.$route.params.year);
                formData.append('project', this.$route.params.project);
                xhr.responseType = 'json';
                xhr.onload = () => {
                    if (xhr.response.success) {
                        const dpe = document.querySelector('.project-link-display');
                        const changeDiv = document.querySelector('.project-link-editor');
                        dpe.style.display = 'block';
                        changeDiv.style.display = 'none';

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
            getProjects() {
                this.$root.loading = true;
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    const resp = xhr.response;
                    const projects = [];
                    for (const i in resp) projects.push(resp[i].title);
                    this.projects = projects;
                    this.projectI = this.projects.indexOf(this.$route.params.project);
                    this.$root.loading = false;
                };
                xhr.responseType = "json";
                xhr.open('GET', `/alpacrash/projects?name=${this.$route.params.event}&year=${this.$route.params.year}`);
                xhr.send();
            },
            getImagePath() {
                return `/alpacrash/images/${this.project.img_name}`;
            },
            getProjectUsers() {
                this.$root.loading = true;
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'json';
                xhr.onload = () => {
                    if (xhr.response)
                        this.contributors = xhr.response;
                };
                xhr.open("GET", `/alpacrash/users?event=${this.$route.params.event}&year=${this.$route.params.year}&project=${this.$route.params.project}`)
                xhr.send();
            },
            isProjectContributor() {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'json';
                xhr.onload = () => this.isContrib = xhr.response.isContrib;
                xhr.open("GET", `/alpacrash/user?event=${this.$route.params.event}&year=${this.$route.params.year}&project=${this.$route.params.project}`);
                xhr.send();
            },
            prevEvent() {
                if (this.projectI - 1 >= 0) {
                    this.$router.push(`/alpacrash/${this.$route.params.event}/${this.$route.params.year}/${this.projects[this.projectI - 1]}`);
                    this.$router.go();
                }
            },
            nextEvent() {
                if (this.projectI + 1 < this.projects.length) {
                    this.$router.push(`/alpacrash/${this.$route.params.event}/${this.$route.params.year}/${this.projects[this.projectI + 1]}`);
                    this.$router.go();
                }
            }
        },
        beforeMount() {
            this.getProject();
            this.getProjects();
            this.isProjectContributor();
            this.getProjectUsers();
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

    .project-title-editor, .project-desc-editor, .project-link-editor {
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

    .project-desc-display {
        display: flex;
        flex-flow: row wrap;
    }

    .project-contrib {
        margin-right: 5px;
    }

    .edit-pen {
        cursor: pointer;
    }

    /* Back button */
    .alpacrash-nav-btn {
        position: fixed;
        bottom: 10px;
        z-index: 1;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .alpacrash-nav-btn img {
        cursor: pointer;
        display: block;
        background: #00a5dc;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        margin: 5px;
    }

    .prev {
        transform: rotate(90deg);
    }

    .next {
        transform: rotate(270deg);
    }

    .notAct {
        background: #444 !important;
        cursor: default !important;
    }
</style>
