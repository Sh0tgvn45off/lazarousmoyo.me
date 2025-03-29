/* script.js */
function toggleMenu()
{
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

const roles = [
    "I am a Backend Developer",
    "I am a Junior Data Analyst",
    "I am a Cyber Security Junior Penetration Tester",
    "I am a Software Tester",
    "I am a Bug Bounty Hunter",
    "I am a Research Analyst",
    "I am a Composer",
    "I am a Videographer",
    "I am a Writer"
];

const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const PAUSE_TIME = 2000;

class TypeWriter {
    constructor(textElement, words) {
        this.textElement = textElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentWord = this.words[this.wordIndex];

        if(this.isDeleting) {
            this.txt = currentWord.substring(0, this.txt.length - 1);
        } else {
            this.txt = currentWord.substring(0, this.txt.length + 1);
        }

        this.textElement.textContent = this.txt;

        let typeSpeed = this.isDeleting ? DELETING_SPEED : TYPING_SPEED;

        if(!this.isDeleting && this.txt === currentWord) {
            typeSpeed = PAUSE_TIME;
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('role-text');
    new TypeWriter(textElement, roles);
});
function showVideoPopup() {
    const videoElement = document.getElementById('drive-video');
    const videoUrl = 'https://drive.google.com/file/d/1oPNnEOA2uTpLIYdXLrZXpeQohdIGcBQ3/preview';
    videoElement.src = videoUrl;
    document.getElementById('video-popup').style.display = 'flex'; // Show popup
}

function closeVideoPopup() {
    document.getElementById('video-popup').style.display = 'none'; // Hide popup
    const videoElement = document.getElementById('drive-video');
    videoElement.src = ''; // Stop video loading when closed
}
