const navbar = document.querySelector("[data-nav]");
const contactForm = document.querySelector("[data-contact-form]");

const setNavbarState = () => {
    if (!navbar) return;
    navbar.classList.toggle("is-scrolled", window.scrollY > 24);
};

setNavbarState();
window.addEventListener("scroll", setNavbarState, { passive: true });

const revealTargets = document.querySelectorAll(
    ".section-heading, .service-unit, .equipment-card, .contact-copy, .contact-form"
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
);

revealTargets.forEach((target) => {
    target.classList.add("reveal");
    revealObserver.observe(target);
});

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get("name") || "";
        const email = formData.get("email") || "";
        const message = formData.get("message") || "";
        const text = encodeURIComponent(
            `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
        );

        window.open(`https://wa.me/5491123456789?text=${text}`, "_blank", "noopener");

        const button = contactForm.querySelector("button");
        const originalText = button.textContent;
        button.textContent = "Mensaje preparado";
        button.disabled = true;
        contactForm.reset();

        window.setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2600);
    });
}
