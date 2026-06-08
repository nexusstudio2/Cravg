const sections = document.querySelectorAll(
".service-card, .testimonial, .gallery img, .about"
);

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("active");
}

});

},{
threshold:0.2
});

sections.forEach(section => {
section.classList.add("reveal");
observer.observe(section);
});

document
.getElementById("contactForm")
.addEventListener("submit", function(e){

e.preventDefault();

alert(
"¡Gracias! Tu solicitud de cita fue enviada."
);

this.reset();

});