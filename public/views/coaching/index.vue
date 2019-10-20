<template>
    <div class="component">
        <div class="selection">
            <router-link class="card" to="/coaching/asking">Ich brauche hilfe</router-link>
            <router-link class="card" to="/coaching/helping">Ich möchte helfen</router-link>
        </div>
        <keep-alive>
            <transition name="fade">
                <router-view></router-view>
            </transition>
        </keep-alive>
    </div>
</template>

<style scoped>
.component .selection {
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.selection a {
    text-decoration: none;
    color: #000;
    font-weight: bold;
    font-size: 1.5em;
}

.selection a.router-link-active {
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
