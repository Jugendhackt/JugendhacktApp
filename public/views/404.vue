<template>
<div class="errorPage">
    <div class="card">
        <h1 class="glitch">
            404
        </h1>
        <router-link to="/events" class="escapeLink">Take me out of here!</router-link>
    </div>
</div>
</template>
<style scoped>
    .errorPage {
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }

    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .escapeLink {
        position: relative;
        z-index: 2;
        font-weight: bold;
        color: #222;
        text-decoration: none;
    }

    .escapeLink::after, .escapeLink::before {
        z-index: -1;
        position: absolute;
        left: 0;
        top: 0;
        content: "Take me out of here!";
    }

    .escapeLink:hover::before {
        color: #f86d14;
        animation: glitchanimation infinite 200ms linear;
    }

    .escapeLink:hover::after {
        color: #00a5dc;
        animation: glitchanimation infinite 200ms linear;
        animation-delay: 100ms;
    }

    .glitch {
        margin: 5px;
        font-size: 5em;
        position: relative;
        z-index: 2;
    }

    .glitch::after, .glitch::before {
        z-index: -1;
        position: absolute;
        left: 0;
        top: 0;
        content: "404";
    }

    .glitch::before {
        color: #f86d14;
        animation: glitchanimation infinite 500ms linear;
    }

    .glitch::after {
        color: #00a5dc;
        animation: glitchanimation infinite 500ms linear;
        animation-delay: 200ms;
    }

    @keyframes glitchanimation {
        0% {
            transform: translate(-3px, 2px)
        }
        20% {
            transform: translate(2px, -3px)
        }
        40% {
            transform: translate(-1px, 3px)
        }
        60% {
            transform: translate(3px, -3px)
        }
        80% {
            transform: translate(2px, 1px)
        }
        100% {
            transform: translate(-2px, -2px)
        }
    }
</style>
