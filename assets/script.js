confirm("Are you sure you want to delete?")
$(document).ready(function(){

    $(".mudaTela").click(function(){
        mudaTela( $(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao") );
    });

    $("a.opcoes").click(function(e){
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    $(".calendario .marcado").click(function(){
        mostraMsgMes($(this).attr("value"));
    });

    const mudaTela = ( atual, nova = null, animacao = "fade", tempoAnimacao = 900 ) => {

        // define a nova tela
        if(!nova){
            nova = parseInt(atual.parent().attr("id").split("tela")[1])+1;
        }

        if(animacao == "fade"){
            $("#tela"+(nova-1)).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#tela"+nova).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        }else{
            $("#tela"+(nova-1)).hide(tempoAnimacao);
            $("#tela"+nova).show(tempoAnimacao);
        }

        if($("#tela"+nova).hasClass("temporizado")){
            $("#tela"+nova+" div").hide();
            telaTemporizada(nova, 0);
        }

        verificaFundo(nova);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if(nova == 5){
            var audio = new Audio('assets/musica.mp3');
            audio.volume = 0.1;
            audio.play();
        }
        
    }

    const telaTemporizada = ( nTela, contador ) =>{

        const tela = $("#tela"+nTela+" div:eq("+contador+")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador==0?$("#tela"+nTela).attr("tempo"):temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if(tela.attr("final") == "true"){
                    mudaTela(null, nTela+1, "fade", 900);
                    verificaFundo(nTela+1);
                }else{
                    telaTemporizada(nTela, contador+1);
                }

            }, tela.attr("tempo") );

        }, temporizadorPrimeiraTela);
        
    }

    const verificaFundo = (nTela) =>{

        const fundo = $("#tela"+nTela).attr("fundo");
        const tempo = $("#tela"+nTela).attr("tempo");

        if(fundo){
            $("body").attr("class", fundo);            
        }
        
    }

    const mostraMsgMes = (texto) =>{

        let titulo;
        let mensagem;

        switch(texto){
            case "11/5": titulo = "11 de Maio de 2023"; mensagem = "<p>Esse foi o dia em que te levei para casa a primeira vez! Ou pelo menos, o dia que nos conhecemos já sabendo que dali pra frente poderiamos ter alguma coisa juntos.</p><p>Foi bem rápido, você tinha que entrar logo em casa (normal) e conversamos tão pouquinho, mas já foi o suficiente para eu entender naquele momento que você era diferente, e que todo o tempo que eu dedicava em escrever minhas mensanges pra você, estavam valendo a pena. Eu quis de verdade, a partir desse dia, te conhecer melhor do que já conhecia por mensagens.</p><p>E eu estava certo, você é incrível!</p>";break;
            case "17/5": titulo = "17 de Maio de 2023"; mensagem = "<p>Foi o primeiro dia que saímos.<br>Você estava linda,.</p><p>Foi quando a gente foi na pista e você perdeu o medo de descer a rampa sozinhanao consegui acreditar que estava ali com você, você estava incrível e aquele momento foi mágico pra mim, e tive a certeza disso depois de poder finalmente te beijar de verdade! E que beijo bom ❤️</p>";break;
            case "20/5": titulo = "20 de Maio de 2023"; mensagem = "<p>Foi quando fomos naquele lounge com sua mãe do nada, nesse dia você estava usando um delineado levinho. e ficamos conversando e rindo sobre absolutamente nada, e voê me contou uma historia de uma vez que tinha ido ali e que uma mulher bebadassa simplesmente caiu do chão do lounge e você quase nao conseguiu se segurar.</p><p>E aquele dia foi a primeira vez que você ficou com meu casaco kskks</p>";break;
            case "28/5": titulo = "22 de Maio de 2023"; mensagem = "<p>Acho que esse dia foi um pequeno marco no nosso relacionamento, pois antes saíamos para ficar por aí a sós, mas dessa vez o combinado foi de nos encontramos e ficar na sua casa, sem sairmos. Parece algo bobo, mas isso pra mim é muito significado, isso demonstra que você me queria ali, e que já não importava mais que seu irmão estivesse por lá ou não. Esse dia me senti muito bem estando com você.</p>";break;
            case "4/6": titulo = "4 de junho de 2023"; mensagem = "<p>Essa foi a vez que fomos na praia com a minha familia e você tava toda envergonhada 🤣<br>tivemos a grande ideia de andar naquelas pedras pra ver o que tinha do outro lado, que embora fosse sinistro, ainda foi e é um ótimo lugar para ficarmos haha, pena que a mayla foi junto.</p><p>Nesse dia acabamos encontrando um casal que nao tinha seda lembra?? tadinhos fquei com muita dó deles akaka.</p>";break;
            case "8/6": titulo = "08 de Junho de 2023"; mensagem = "<p>Não lembro muito bem o que foi esse dia, mas so sei que foi a primeira vez que te levei na prainha, foi eu tu a vitória e a Kaka</p><p>Foi uma noite sensacional com você. Sentamos no trapiche e ficamos jogando conversa fora nós ficamos por ali até sua mãe ligar porque tava procurando você akakaka, mas tambem estavamos brincando naquele balanço e rindo. Me dá uma ansiedade muito grande em pensar que podemos fazer isso de novo tantas e tantas vezes ainda...</p>";break;
            case "12/6": titulo = "12 de Junho de 2023"; mensagem = "<p>|Esse foi o dia que fizemos aqueles tacos estranhos, mas que realmente ficaram gostosos akkak, na maior parte do tempo apenas fofocamos e vemos um filme, eu nem lembro do filme direito kakaka, ja estava perdidamente apaixonado</p>";break;
            case "18/6": titulo = "18 de Junho de 2023"; mensagem = "<p>Ai ai... o que dizer desse dia? Você discutinbdo comigo porque queria beber mais akakakka e ja tava beem beldinha, mas aiii tava tao bonitinha com aquele vestido verde e as trancinhas aquele dia foi muito bom tanto que reciprocamente eu nem precisaria escrever mais nada aqui, você saberia exatamente o momento único que tivemos juntos.</p>";break;
            case "final": titulo = "11 de novembro de 2023"; mensagem = "<p>Eu e você juntos para sempre ❤️</p>";break;
        }

        mostraPopUp(true, titulo, mensagem);
        telaFinal = (texto=="final"?true:false);
    }

    

});

let telaFinal = false;

const mostraPopUp = (mostrar, titulo = "Título de testes", mensagem = "Mensagem de teste...") =>{

    if(mostrar){
        $("html, body").animate({ scrollTop: $(".pop-up")[0].offsetTop }, "smooth");
        $(".pop-up").fadeIn(500);
        $(".pop-up h1").html(titulo);
        $(".pop-up div").html(mensagem);
        $(".container").css("opacity", "0.5");
    }else{
        $(".pop-up").fadeOut(500);
        $(".container").css("opacity", "1");

        if(telaFinal){
            $("#tela19").fadeOut(4000);
            setTimeout(() => {
                $("#tela20").fadeIn(6500);
                $("body").attr("class", "fundo6");    
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 4000);
        }

    }

}