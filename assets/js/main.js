document.addEventListener("DOMContentLoaded", () => {
    // 1. Ano Automático
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 2. Menu Mobile
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector("#primary-navigation");
    const overlay = document.querySelector(".nav-overlay");
    const body = document.body;

    function setMenu(open) {
        if (!toggle || !nav || !overlay) return;

        // Compatível com CSS antigo/novo
        nav.classList.toggle("is-open", open);
        nav.classList.toggle("active", open);

        toggle.classList.toggle("is-open", open);
        toggle.classList.toggle("active", open);

        overlay.classList.toggle("is-open", open);
        overlay.classList.toggle("active", open);

        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        body.style.overflow = open ? "hidden" : "";
    }

    function toggleMenu() {
        const open = !nav.classList.contains("is-open") && !nav.classList.contains("active");
        setMenu(open);
    }

    if (toggle && nav && overlay) {
        toggle.addEventListener("click", toggleMenu);
        overlay.addEventListener("click", () => setMenu(false));

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => setMenu(false));
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") setMenu(false);
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 900) setMenu(false);
        });
    }

    // 3. Fade-in ao rolar
    const fadeEls = document.querySelectorAll(".fade-in");
    if ("IntersectionObserver" in window && fadeEls.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("visible");
                    }, i * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        fadeEls.forEach(el => observer.observe(el));
    } else {
        fadeEls.forEach(el => el.classList.add("visible"));
    }

    // 4. FAQ Accordion
    document.querySelectorAll(".faq-question").forEach(btn => {
        btn.addEventListener("click", () => {
            const item = btn.closest(".faq-item");
            const isOpen = item.classList.contains("is-open");
            document.querySelectorAll(".faq-item.is-open").forEach(open => {
                open.classList.remove("is-open");
                open.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
            });
            if (!isOpen) {
                item.classList.add("is-open");
                btn.setAttribute("aria-expanded", "true");
            }
        });
    });
});

function enviarWhatsApp(e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const servico = document.getElementById("servico").value;
    const mensagem = document.getElementById("mensagem").value;

    const texto = `Olá, meu nome é ${nome}. Orçamento para: ${servico}.\n\nDetalhes: ${mensagem}`;
    window.open(`https://wa.me/5531985499733?text=${encodeURIComponent(texto)}`, "_blank");
}
