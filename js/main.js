
class Menu {
    constructor(openSelector, closeSelector, menuSelector, contentSelector) {
        this.menu = $(menuSelector);
        this.content = $(contentSelector);
        this.init(openSelector, closeSelector);
    }

    init(openSelector, closeSelector) {
        $(openSelector).click(() => this.openMenu());
        $(closeSelector).click(() => this.closeMenu());
        this.bindScrollEvents();
    }

    openMenu() {
        this.menu.animate({ width: '250px' }, 50);
        this.content.animate({ marginLeft: '250px' }, 50);
    }

    closeMenu() {
        this.menu.animate({ width: '0px' }, 50);
        this.content.animate({ marginLeft: '0px' }, 50);
    }

    bindScrollEvents() {
        this.menu.find('a').click((event) => this.scrollToSection(event));
    }

    scrollToSection(event) {
        event.preventDefault();
        const sectionId = $(event.currentTarget).attr('href');
        const positionOfSection = $(sectionId).offset().top;
        $('html, body').animate({ scrollTop: positionOfSection }, 2000);
    }
}

class Accordion {
    constructor(toggleSelector, innerSelector) {
        this.toggleSelector = toggleSelector;
        this.innerSelector = innerSelector;
        this.bindEvents();
    }

    bindEvents() {
        $(this.toggleSelector).click((event) => this.toggleSection(event));
    }

    toggleSection(event) {
        const target = $(event.currentTarget).next(this.innerSelector);
        $(this.innerSelector).not(target).slideUp(500);
        target.slideToggle(500);
    }
}

class Counter {
    constructor(futureDateString, selectors) {
        this.futureDate = new Date(futureDateString).getTime() / 1000;
        this.selectors = selectors;
        window.onload = () => this.startCounter();
    }

    startCounter() {
        this.updateCounter();
        setInterval(() => this.updateCounter(), 1000);
    }

    updateCounter() {
        const now = new Date().getTime() / 1000;
        const timeDifference = this.futureDate - now;

        const days = Math.floor(timeDifference / (24 * 60 * 60));
        const hours = Math.floor((timeDifference % (24 * 60 * 60)) / 3600);
        const mins = Math.floor((timeDifference % 3600) / 60);
        const secs = Math.floor(timeDifference % 60);

        $(this.selectors.days).html(`${days} D`);
        $(this.selectors.hours).html(`${hours} h`);
        $(this.selectors.minutes).html(`${mins} m`);
        $(this.selectors.seconds).html(`${secs} s`);
    }
}

class TextArea {
    constructor(textAreaSelector, outputSelector, maxLength) {
        this.textArea = $(textAreaSelector);
        this.output = $(outputSelector);
        this.maxLength = maxLength;
        this.bindEvents();
    }

    bindEvents() {
        this.textArea.keyup(() => this.limitCharacters());
    }

    limitCharacters() {
        const length = this.textArea.val().length;
        const amountLeft = this.maxLength - length;

        if (amountLeft <= 0) {
            this.output.text("your available characters finished");
        } else {
            this.output.text(amountLeft);
        }
    }
}

$(document).ready(function () {
    const menu = new Menu(".openNav", ".closebtn", "#leftMenu", "#home-content");
    const accordion = new Accordion("#sliderDown .toggle", ".inner");
    const counter = new Counter("10 October 2021 9:56:00", {
        days: ".days",
        hours: ".hours",
        minutes: ".minutes",
        seconds: ".seconds"
    });
    const textArea = new TextArea("textarea", "#chars", 100);
});
