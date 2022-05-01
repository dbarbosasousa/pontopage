var calcular     = document.querySelector('#calcular');        // variável atribuída ao botão de comando de cálculo.
var limpar       = document.querySelector('#limpar');          // variável atribuída ao botão de comando de limpar dados.
var horaEntra1   = document.querySelector('.hora_entra_1');    // variável que registra a hora da primeira entrada
var minutoEntra1 = document.querySelector('.minuto_entra_1');  // variável que registra o minuto da primeira entrada 
var horaEntra2   = document.querySelector('.hora_entra_2');    // variável que registra a hora da segunda entrada, após o intervalo
var minutoEntra2 = document.querySelector('.minuto_entra_2');  // variável que registra o minuto da segunda entrada, após o intervalo
var horaSai1     = document.querySelector('.hora_sai_1');      // variável que registra a hora da primeira saida, para o intervalo
var minutoSai1   = document.querySelector('.minuto_sai_1');    // variável que registra o minuto da primeira saida, para o intervalo
var horaSai2     = document.querySelector('.hora_sai_2');      // variável que registra a hora da segunda saida, fim da jornada
var minutoSai2   = document.querySelector('.minuto_sai_2');    // variável que registra o minuto da segunda saida, fim da jornada

calcular.addEventListener('click', validaentradas);

limpar.addEventListener ('click', limparfunction);

function validar(hora,minuto){
    if (hora > 23 || hora < 0 || minuto > 59 || minuto < 0) 
    {
        return true;
    }
    else
    {
        return false;
    } 
}

function validaentradas(){
    var dadosok = 0;
    if (validar(Number(horaEntra1.value),Number(minutoEntra1.value)) ||
        validar(Number(horaSai1.value),Number(minutoSai1.value)))
    {
        alert("Primeira jornada inválida. Favor, conferir valores de hora e minutos inseridos!");
    }
    else
    {
        dadosok++;
    }
    if (validar(Number(horaEntra2.value),Number(minutoEntra2.value)) || 
        validar(Number(horaSai2.value),Number(minutoSai2.value)))
    {
        alert("Segunda jornada inválida. Favor, conferir valores de hora e minutos inseridos!");
    }
    else
    {
        dadosok++;
    }
    if (dadosok === 2) {calcula_tempo_trabalhado()}
}
function calcula_tempo_trabalhado() {
    var entrada1 = Number(horaEntra1.value) * 60 + Number(minutoEntra1.value);
    var entrada2 = Number(horaEntra2.value) * 60 + Number(minutoEntra2.value);
    var saida1   = Number(horaSai1.value)   * 60 + Number(minutoSai1.value);
    var saida2   = Number(horaSai2.value)   * 60 + Number(minutoSai2.value);
    var intervalo = (entrada2 - saida1);
    switch (intervalo != null)
    {
        case (intervalo > 0 && intervalo < 60):
        {
            let minutosintervalo = intervalo;
            var horaintervalo = 0;       
            document.getElementById("intervalo").innerHTML = " " + horaintervalo + " : " + minutosintervalo;
            break;
        }
        case (intervalo < 0 && entrada2 == 0):
        {
            document.getElementById("intervalo").innerHTML = " 0 : 0";
            break;
        }
        case (intervalo < 0 && entrada2 != 0 && saida1 != 0):
        {
            entrada2 = entrada2 + 1440;
            intervalo = (entrada2 - saida1); 
            var horaintervalo = Math.floor(intervalo / 60);
            var minutosintervalo = Math.floor(intervalo - (horaintervalo * 60));
            document.getElementById("intervalo").innerHTML = " " + horaintervalo + " : " + minutosintervalo;
            document.getElementById("show").innerHTML = "Cálculo ainda não possível para jornadas entre dias."
            break;
        }
        default:
        {
            var horaintervalo = Math.floor(intervalo / 60);
            var minutosintervalo = Math.floor(intervalo - (horaintervalo * 60));
            document.getElementById("intervalo").innerHTML = " " + horaintervalo + " : " + minutosintervalo;
        }
    }
    var jornada1 = (saida1 - entrada1);                         // jornada1 calcula a primeira jornada em minutos.
    switch (jornada1 != null)
    {
        case (jornada1 == 0):
            {
                document.getElementById("obs1").innerHTML = "Não há primeira jornada.";
                document.getElementById("intervalo").innerHTML = " 0 : 0";
            }
        case (jornada1 > 0 && jornada1 < 60):                   //jornada1 menor que 1h
        {
            let minutosjornada1 = jornada1;
            var horajornada1 = 0;       
            document.getElementById("showjornada1").innerHTML = " " + horajornada1 + " : " + minutosjornada1;
            break;
        }
        case (jornada1 < 0):                                    // jornada1 entre dias.
        {
            saida1 = saida1 + 1440;
            jornada1 = (saida1 - entrada1); 
            var horajornada1 = Math.floor(jornada1 / 60);
            var minutosjornada1 = Math.floor(jornada1 - (horajornada1 * 60));
            document.getElementById("showjornada1").innerHTML = " " + horajornada1 + " : " + minutosjornada1;
            //document.getElementById("show").innerHTML = "Cálculo ainda não possível para jornadas entre dias."
            break;
        }
        default:                                            // jornada1 maior que 1h
        {
            var horajornada1 = Math.floor(jornada1 / 60);
            var minutosjornada1 = Math.floor(jornada1 - (horajornada1 * 60));
            document.getElementById("showjornada1").innerHTML = " " + horajornada1 + " : " + minutosjornada1;
        }
    }
    var jornada2 = (saida2 - entrada2);                         //jornada2 calcula a segunda jornada, após o intervalo.
    switch (jornada2 != null)
    {
        case (jornada2 == 0 ):
            {
                document.getElementById("obs2").innerHTML = "Não há segunda jornada.";
                document.getElementById("intervalo").innerHTML = " 0 : 0";
                break;
            }
       case (saida2 == 0):
            {
                document.getElementById("obs2").innerHTML = "Segunda jornada não finalizada.";
                jornada2 = 0;
                break;
            }
            case (jornada2 > 0 && jornada2 < 60):
        {
            let minutosjornada2 = jornada2;
            var horajornada2 = 0;       
            document.getElementById("showjornada2").innerHTML = " " + horajornada2 + " : " + minutosjornada2;
            break;
        }
        case (jornada2 < 0):
        {
            saida2 = saida2 + 1440;
            jornada2 = (saida2 - entrada2); 
            var horajornada2 = Math.floor(jornada2 / 60);
            var minutosjornada2 = Math.floor(jornada2 - (horajornada2 * 60));
            document.getElementById("showjornada2").innerHTML = " " + horajornada2 + " : " + minutosjornada2;
            //document.getElementById("show").innerHTML = "Cálculo ainda não possível para jornadas entre dias."
            break;
        }
        default:
        {
            var horajornada2 = Math.floor(jornada2 / 60);
            var minutosjornada2 = Math.floor(jornada2 - (horajornada2 * 60));
            document.getElementById("showjornada2").innerHTML = " " + horajornada2 + " : " + minutosjornada2;
        }
    }
    var totaljornada = jornada1 + jornada2;
    // document.getElementById("testes").innerHTML = jornada1 + " - " + jornada2 + " - " + totaljornada;
    switch (totaljornada != null)
    {
        case (totaljornada == 0 || totaljornada == 15):
            {
                document.getElementById("obs3").innerHTML = "Não há jornada a calcular.";
            } 
        case (totaljornada > 0 && totaljornada < 60):
        {
            let minutosintervalo = totaljornada;
            var horaintervalo = 0;       
            document.getElementById("totaljornada").innerHTML = " " + horaintervalo + " : " + minutosintervalo;
            break;
        }
        case (totaljornada < 0):
        {
            saida2 = saida2 + 1440;
            totaljornada = (saida2 - entrada2); 
            var horaintervalo = Math.floor(totaljornada / 60);
            var minutosintervalo = Math.floor(totaljornada - (horaintervalo * 60));
            document.getElementById("totaljornada").innerHTML = " " + horaintervalo + " : " + minutosintervalo;
            //document.getElementById("show").innerHTML = "Cálculo ainda não possível para jornadas entre dias."
            break;
        }
        default:
        {
            var horaintervalo = Math.floor(totaljornada / 60);
            var minutosintervalo = Math.floor(totaljornada - (horaintervalo * 60));
            document.getElementById("totaljornada").innerHTML = " " + horaintervalo + " : " + minutosintervalo;
        }
    }
    //alert('soma de minutos é: ' + entrada);
    //document.getElementById("testes").innerHTML = "Jornada 1 em minutos: " + jornada1;
    dif_jornadapretendida(totaljornada);
    var dif = dif_jornadapretendida(totaljornada);
    //document.getElementById("testes").innerHTML = "variavel dif: " + dif;
    alertas(intervalo,jornada1,dif);
    if (saida2 == 0 && entrada2 != 0)
    {
        dif = entrada2 + dif;
        var dif_hora = Math.floor(dif / 60.0);
        var dif_minuto = Math.floor(dif - (dif_hora * 60.0));
        document.getElementById("obs3").innerHTML = "Horário previsto para saída: " + dif_hora + " : " + dif_minuto + ".";
    }
}

function dif_jornadapretendida(total_jornada){
    var jornadapretendida;
    var tipojornada = 0 ;
    var opcaojornada = document.body.querySelectorAll("input[type='radio']");
    for (var i = 0; i <= opcaojornada.length - 1; i++)
    {
        if (opcaojornada[i].checked == true) {tipojornada = i}
   }
    switch (tipojornada != null)
    {
        case (tipojornada == 0):
            {
                jornadapretendida = 6 * 60;             //jornada pretendida em totais de minutos
                opcaojornada[0].checked = true;
                var dif_jornadapretendida = (total_jornada + 15) - jornadapretendida;
                if (dif_jornadapretendida < 0)
                {
                    dif_jornadapretendida = -1.0 * dif_jornadapretendida;
                    var dif_hora = Math.floor(dif_jornadapretendida / 60.0);
                    var dif_minuto = Math.floor(dif_jornadapretendida - (dif_hora * 60.0));
                    document.getElementById("dif_jornada").innerHTML = " - " + dif_hora + " : " + dif_minuto;
                    dif_jornadapretendida = -1.0 * dif_jornadapretendida;
                }
                else
                {
                    var dif_hora = Math.floor(dif_jornadapretendida / 60.0);
                    var dif_minuto = Math.floor(dif_jornadapretendida - (dif_hora * 60.0));
                    document.getElementById("dif_jornada").innerHTML = " " + dif_hora + " : " + dif_minuto;
                }
                return dif_jornadapretendida;
            }
        case (tipojornada == 1):
            {
                jornadapretendida = 8.0 * 60.0;
                var dif_jornadapretendida = total_jornada - jornadapretendida;             //jornada pretendida em totais de minutos
                if (dif_jornadapretendida < 0)
                {
                    dif_jornadapretendida = -1.0 * dif_jornadapretendida;
                    var dif_hora = Math.floor(dif_jornadapretendida / 60.0);
                    var dif_minuto = Math.floor(dif_jornadapretendida - (dif_hora * 60.0));
                    document.getElementById("dif_jornada").innerHTML = " - " + dif_hora + " : " + dif_minuto;
                    dif_jornadapretendida = -1.0 * dif_jornadapretendida;
                }
                else
                {
                    var dif_hora = Math.floor(dif_jornadapretendida / 60.0);
                    var dif_minuto = Math.floor(dif_jornadapretendida - (dif_hora * 60.0));
                    document.getElementById("dif_jornada").innerHTML = " " + dif_hora + " : " + dif_minuto;
                }
                return dif_jornadapretendida;
            }
        case (tipojornada == 2):
            {
                var hora_pretendida   = document.querySelector(".hora_pretendida").value;
                var minuto_pretendida = document.querySelector(".minuto_pretendida").value;
                jornadapretendida     = Math.floor((hora_pretendida * 60.0) + minuto_pretendida * 1.0); //jornada pretendida em totais de minutos
                var dif_jornadapretendida = total_jornada - jornadapretendida;             //jornada pretendida em totais de minutos
                if (dif_jornadapretendida < 0)
                {
                    dif_jornadapretendida = -1.0 * dif_jornadapretendida;
                    var dif_hora = Math.floor(dif_jornadapretendida / 60.0);
                    var dif_minuto = Math.floor(dif_jornadapretendida - (dif_hora * 60.0));
                    document.getElementById("dif_jornada").innerHTML = "  - " + dif_hora + " : " + dif_minuto;
                    dif_jornadapretendida = -1.0 * dif_jornadapretendida;
                }
                else
                {
                    var dif_hora = Math.floor(dif_jornadapretendida / 60.0);
                    var dif_minuto = Math.floor(dif_jornadapretendida - (dif_hora * 60.0));
                    document.getElementById("dif_jornada").innerHTML = " " + dif_hora + " : " + dif_minuto;
                }
                return dif_jornadapretendida;
            }
        default:
            {
                var dif_jornadapretendida = 6.0 * 60.0;             //jornada pretendida em totais de minutos    var dif_jornadapretendida = total_jornada - jornadapretendida;
                var dif_hora = Math.floor(dif_jornadapretendida / 60.0);
                var dif_minuto = Math.floor(dif_jornadapretendida - (dif_hora * 60.0));
                document.getElementById("dif_jornada").innerHTML = " " + dif_hora + " : " + dif_minuto;
                return dif_jornadapretendida;
            }
    }
}
function alertas(intervalo, jornada1, dif){
    switch (intervalo != null)
    {
        case intervalo == 0 || intervalo < 0:
            {
                document.getElementById("alerta1").innerHTML = "";
                break;
            }
        case intervalo < 30 && intervalo > 0:
            {
               document.getElementById("alerta1").innerHTML = "Intervalo irregular: menor que 30 min.";
                break;
            }
        case intervalo > 120:
            {
                document.getElementById("alerta1").innerHTML = "Intervalo irregular: maior que 2h.";
                break;
            }
        default:
            {
                document.getElementById("alerta1").innerHTML = "Intervalo regular: " + intervalo + " minutos.";
            }
    }
    switch (jornada1 != null)
    {
        case jornada1 == 0:
            {
                document.getElementById("alerta2").innerHTML = "";
                break;
            }
        case jornada1 < 120:
            {
                document.getElementById("alerta2").innerHTML = "Primeira jornada menor que 2h.";
                break;
            }
        case jornada1 > 240:
            {
                document.getElementById("alerta2").innerHTML = "Primeira jornada maior que 4h.";
                break;
            }
        default:
            {
                document.getElementById("alerta2").innerHTML = "Intervalo entre a 2ª e 4ª hora.";
            }
    }
    switch (dif != null)
    {
        case dif == -345 && jornada1 == 0 && intervalo == 0:
            {
                document.getElementById("alerta3").innerHTML = "";
                break;
            }
        case dif > 0:
            {
                document.getElementById("alerta3").innerHTML = "Tempo extra: " + dif + " minutos.";
                break;
            }
        case dif < 0:
            {
                document.getElementById("alerta3").innerHTML = "Tempo a compensar: " + dif + " minutos.";
                break;
            }
        default:
            {
                document.getElementById("alerta3").innerHTML = "Jornada exata.";
            }
    }
}

function limparfunction (){
    document.getElementById("obs1").innerHTML = "";
    document.getElementById("obs2").innerHTML = "";
    document.getElementById("obs3").innerHTML = "";
    document.getElementById("alerta1").innerHTML = "";
    document.getElementById("alerta2").innerHTML = "";
    document.getElementById("alerta3").innerHTML = "";
    document.getElementById("showjornada1").innerHTML = "";
    document.getElementById("showjornada2").innerHTML = "";
    document.getElementById("intervalo").innerHTML = "";
    document.getElementById("totaljornada").innerHTML = "";
    document.getElementById("dif_jornada").innerHTML = "";
    document.querySelector(".hora_entra_1").value = 0;
    document.querySelector('.hora_entra_1').value = 0;
    document.querySelector('.minuto_entra_1').value = 0;
    document.querySelector('.hora_entra_2').value = 0;
    document.querySelector('.minuto_entra_2').value = 0;
    document.querySelector('.hora_sai_1').value = 0;
    document.querySelector('.minuto_sai_1').value = 0;
    document.querySelector('.hora_sai_2').value = 0;
    document.querySelector('.minuto_sai_2').value = 0;
}