
// Mude essa variavel para ajustar a posicao de inicio
    scrolltotop_fadein_start_position=200;

    // True significa que voce tem um circulo, false significa que voce tem um retando com bordas arredondadas
    scrolltotop_circle_mode=true;

    function scrolltotop_fadein_fadeout(){
        if (window.pageYOffset >= scrolltotop_fadein_start_position) {
            document.getElementById("scrolltotop_parent").classList.add("scrolltotop_fadein");
            document.getElementById("scrolltotop_parent").classList.remove("scrolltotop_fadeout");
        }
        else {
            document.getElementById("scrolltotop_parent").classList.add("scrolltotop_fadeout");
            document.getElementById("scrolltotop_parent").classList.remove("scrolltotop_fadein");
        }
    }

    function scrolltotop_function(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        document.activeElement.blur(); 
    }

    // Fáca um retangulo ou circulo ou cantos arredondados
    if(scrolltotop_circle_mode==true){
        document.getElementById("scrolltotop_parent").classList.add("scrolltotop_circle");
    }
    else{
        document.getElementById("scrolltotop_parent").classList.add("scrolltotop_round_corners");
    }

    setTimeout(function() {
        scrolltotop_fadein_fadeout();
    }, 1);

    // Scroll para o inicio da pagina
    document.getElementById("scrolltotop_parent").addEventListener("click",function(){
        scrolltotop_function();
    });

    document.getElementById("scrolltotop_parent").addEventListener("keydown", e => {
		var key_pressed = e.keykey_pressed || e.which;
		/* Enter Key */
		if (key_pressed == "13") {
			scrolltotop_function();
		}
	});

    // Deixar com efeito fade in/out a caixinha flutuando
    document.addEventListener("scroll",function() {
        scrolltotop_fadein_fadeout();
    });

    // Acessibilidade do teclado
    document.addEventListener("keydown", e => {
		var key_pressed = e.keykey_pressed || e.which;
		/* Esc Key */
		if (key_pressed == "27") {
			if(document.activeElement===document.getElementById("scrolltotop_arrow")) {
			    document.activeElement.blur();	
		    }
        }
    });