/* ===== script.js ===== */

/* ---------- NAV TOGGLE ---------- */
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

/* ---------- TYPEWRITER ---------- */
const roles = [
    "Fullstack Developer",
    "Backend Infrastructure Engineer",
    "Junior Data Analyst",
    "ML Engineer (Learning)",
    "Junior PenTester",
    "ICT Consultant",
    "Research Analyst",
    "Bug Bounty Hunter",
    "Videographer & Creator",
    "Writer & Composer"
];

const TYPING_SPEED = 90;
const DELETING_SPEED = 45;
const PAUSE_TIME = 2000;

class TypeWriter {
    constructor(el, words) {
        this.el = el;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.type();
    }
    type() {
        const current = this.words[this.wordIndex];
        this.txt = this.isDeleting
            ? current.substring(0, this.txt.length - 1)
            : current.substring(0, this.txt.length + 1);
        this.el.textContent = this.txt;
        let speed = this.isDeleting ? DELETING_SPEED : TYPING_SPEED;
        if (!this.isDeleting && this.txt === current) {
            speed = PAUSE_TIME;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
        }
        setTimeout(() => this.type(), speed);
    }
}

/* ---------- VIDEO POPUP ---------- */
function showVideoPopup() {
    const vid = document.getElementById('drive-video');
    vid.src = 'https://drive.google.com/file/d/1oPNnEOA2uTpLIYdXLrZXpeQohdIGcBQ3/preview';
    document.getElementById('video-popup').style.display = 'flex';
}
function closeVideoPopup() {
    document.getElementById('video-popup').style.display = 'none';
    document.getElementById('drive-video').src = '';
}

/* ---------- BOOK-FLIP SCROLL TRAP ---------- */

const TOTAL_PAGES = 6;
// How many pixels of scroll each page flip costs (tune for feel)
const SCROLL_PER_PAGE = 500;
// Total extra height to add to the scroll trap
const TRAP_HEIGHT = TOTAL_PAGES * SCROLL_PER_PAGE;

let currentPage = 0;
let bookUnlocked = false; // true once user has seen all pages and scrolled out

function initBook() {
    const trap = document.getElementById('book-scroll-trap');
    const viewport = document.getElementById('book-viewport');
    if (!trap || !viewport) return;

    // Set the scroll trap tall enough to hold all pages
    trap.style.height = (TRAP_HEIGHT + viewport.offsetHeight + 120) + 'px';

    updateBook(0, null);

    window.addEventListener('scroll', onScrollBook, { passive: false });
    window.addEventListener('wheel', onWheelBook, { passive: false });
    window.addEventListener('keydown', onKeyBook);
}

function getTrapBounds() {
    const trap = document.getElementById('book-scroll-trap');
    const rect = trap.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    return {
        top: rect.top + scrollTop,
        bottom: rect.bottom + scrollTop,
        height: trap.offsetHeight
    };
}

function onScrollBook() {
    if (bookUnlocked) return;
    const trap = getTrapBounds();
    const scrollTop = window.scrollY || window.pageYOffset;
    const viewportH = window.innerHeight;

    // If we haven't entered the trap zone yet, do nothing
    const stickyTop = trap.top;
    if (scrollTop < stickyTop - viewportH * 0.3) return;

    // Calculate which page we should be on based on scroll position within trap
    const scrollIntoTrap = Math.max(0, scrollTop - stickyTop + viewportH * 0.3);
    const targetPage = Math.min(TOTAL_PAGES - 1, Math.floor(scrollIntoTrap / SCROLL_PER_PAGE));

    if (targetPage !== currentPage) {
        const dir = targetPage > currentPage ? 1 : -1;
        flipTo(targetPage, dir);
    }

    // Once user has scrolled past all pages, unlock normal scroll
    const fullyScrolled = scrollTop > stickyTop + (TOTAL_PAGES) * SCROLL_PER_PAGE;
    if (fullyScrolled && currentPage === TOTAL_PAGES - 1) {
        bookUnlocked = true;
    }
}

function onWheelBook(e) {
    const trap = document.getElementById('book-scroll-trap');
    const rect = trap.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;

    if (!inViewport) return;
    if (bookUnlocked) return;

    const dir = e.deltaY > 0 ? 1 : -1;
    const next = currentPage + dir;

    if (next < 0) return; // let normal scroll happen above
    if (next >= TOTAL_PAGES) {
        bookUnlocked = true;
        return;
    }

    e.preventDefault();
    if (next !== currentPage) {
        flipTo(next, dir);
        // Advance the underlying scroll position to keep sticky tracking in sync
        const trap2 = getTrapBounds();
        const targetScroll = trap2.top + (currentPage) * SCROLL_PER_PAGE - window.innerHeight * 0.3 + 1;
        window.scrollTo({ top: Math.max(0, targetScroll), behavior: 'instant' });
    }
}

function onKeyBook(e) {
    const trap = document.getElementById('book-scroll-trap');
    const rect = trap.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        flipBook(1);
    }
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        flipBook(-1);
    }
}

function flipBook(dir) {
    const next = currentPage + dir;
    if (next < 0 || next >= TOTAL_PAGES) return;
    flipTo(next, dir);
    if (next === TOTAL_PAGES - 1 && dir === 1) {
        bookUnlocked = true;
    }
    if (next === 0 && dir === -1) {
        bookUnlocked = false;
    }
}

function goToPage(index) {
    const dir = index > currentPage ? 1 : -1;
    flipTo(index, dir);
}

function flipTo(index, dir) {
    const pages = document.querySelectorAll('.book-page');
    const outClass = dir > 0 ? 'flip-out-up' : 'flip-out-down';

    // Animate current page out
    const outPage = pages[currentPage];
    outPage.classList.remove('active');
    outPage.classList.add(outClass);
    setTimeout(() => { outPage.classList.remove(outClass); }, 550);

    currentPage = index;

    // Animate new page in
    const inPage = pages[currentPage];
    inPage.classList.add('active');

    updateBook(currentPage, dir);
}

function updateBook(page, dir) {
    // Counter
    document.getElementById('book-current').textContent = page + 1;
    document.getElementById('book-total').textContent = TOTAL_PAGES;

    // Dots
    document.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === page);
    });

    // Prev/Next buttons
    const prev = document.getElementById('book-prev');
    const next = document.getElementById('book-next');
    if (prev) prev.disabled = page === 0;
    if (next) next.disabled = page === TOTAL_PAGES - 1;

    // Hint text
    const hint = document.getElementById('book-scroll-hint');
    if (hint) {
        if (page === TOTAL_PAGES - 1) {
            hint.textContent = 'All projects viewed — scroll to continue';
        } else {
            hint.textContent = 'Scroll or use arrows to flip through projects — page exits after all 6 are viewed';
        }
    }
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
    const textEl = document.getElementById('role-text');
    if (textEl) new TypeWriter(textEl, roles);

    initBook();

    // Re-init on resize (height may change)
    window.addEventListener('resize', () => {
        bookUnlocked = false;
        initBook();
    });
});
