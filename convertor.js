function generateC() {
    let pass=[];
    let comp=[];
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';
    let cont=0;
    do{
        const char = Math.floor(Math.random()* str.length);
        pass.push(str.charAt(char));
        cont+=1;
        if(pass[cont]==""){
            console.log("erro");
        }else{
            comp=pass.filter((este, i) => pass.indexOf(este) === i);
        }
    }while(comp.length<36);
    return comp;

};//Geração da criptografia

function criptograma(alfa1,alfa2,msm){
    let inde;
    let tudo="";
    let result=[];
    for(let a=0; a<msm.length; a++){
        inde=alfa1.indexOf(msm[a]);
        result.push(alfa2[inde]);
        tudo+=result[a];
    }
    return tudo;
}//Processo de criptografar/descriptografar

const letras=[
    "a","b","c",
    "d","e","f",
    "g","h","i",
    "j","k","l",
    "m","n","o",
    "p","q","r",
    "s","t","u",
    "v","w","x",
    "y","z","1",
    "2","3","4",
    "5","6","7",
    "8","9","0"," "
];//Alfabeto alfaromano

const morse={
    a:".-",b:"-...",c:"-.-.",
    d:"-..",e:".",f:"..-.",
    g:"--.",h:"....",i:"..",
    j:".---",k:"-.-",l:".-..",
    m:"--",n:"-.",o:"---",
    p:".--.",q:"--.-",r:".-.",
    s:"...",t:"-",u:"..-",
    v:"...-",w:".--",x:"-..-",
    y:"-.--",z:"--..",
    1:".----",2:"..---",3:"...--",
    4:"....-",5:".....",6:"-....",
    7:"--...",8:"---..",9:"----.",
    0:"-----"," ":"  ","  ":" ",
};//Morese
const indec=Object.keys(morse);

let center=document.getElementById ("centro");
function switchTheme() {
    document.body.classList.toggle('is-light');
    document.body.classList.toggle('is-dark');
    document.getElementById("centro").classList.toggle('glass-effect-dark');
    document.getElementById("centro").classList.toggle('glass-effect-light');
};//Botão de troca de tema
document.getElementById('switchBtn').addEventListener('click', switchTheme);

let crip;
let cont=1;
function printCriptograia() {
    const printscrip=document.getElementById("epcCrip");
    const printTextcrip=document.createElement("p");
    printTextcrip.id="Criptograma";
    printTextcrip.classList="card is-dark";
    if (cont==1) {
        //Printando Criptografia
        crip=generateC();
        crip.push(" ");
        console.log(letras);
        console.log(crip);
        printTextcrip.innerText=crip;
        printscrip.appendChild(printTextcrip);
    }else if(cont==2){
        let valorMorse=Object.values(morse);
        console.log(letras);
        console.log(valorMorse);
        printTextcrip.innerText=valorMorse;
        printscrip.appendChild(printTextcrip);
    };
}//Impressão na tela dos alfabetos
printCriptograia();

const btnCrip=document.getElementById("mudarcrip");
btnCrip.addEventListener("click", function() {
    cont=1;
    const removePrint=document.getElementById("Criptograma");
    removePrint.parentNode.removeChild(removePrint);
    printCriptograia();
});//Troca de criptografia

const btnMorse=document.getElementById("mudarmorse");
btnMorse.addEventListener("click", function() {
    cont=2;
    const removePrint=document.getElementById("Criptograma");
    removePrint.parentNode.removeChild(removePrint);
    printCriptograia();
})

let k=0;//Contadora

function addcard(resposta) {
    k++
    const addLista=document.createElement("div");
    addLista.classList="card is-dark";
    addLista.innerText=resposta;
    addLista.id="item"+k;
    const lista=document.getElementById("sla").appendChild(addLista);
    
    const addBnt=document.createElement("button");
    addBnt.id=addLista.id;
    addLista.innerHTML=addLista.innerHTML+'<button id='+addBnt.id+" "+'onclick=remove_botao("'+addBnt.id+'") class="remove-btn">Remover</button>';
};//Adição de card

function remove_botao(id){
    const card=document.getElementById(id);
    card.remove(card)
};//Remoção de card




const btn=document.getElementById("btnEnviar");
btn.addEventListener("click",function(){
    const select=document.getElementById("translate")
    const tipo=select.options[select.selectedIndex].value;
    const texto=document.getElementById("text").value;
    console.log(tipo, texto);
    if(tipo==1&&cont==1){
        const conversc=texto.split("");
        const resposta=criptograma(letras,crip,conversc);
        console.log(resposta);
        addcard(resposta);
    }else if(tipo==2&&cont==1){
        const conversc=texto.split("");
        const resposta=criptograma(crip,letras,conversc);
        console.log(resposta);
        addcard(resposta);
    }else if(tipo==1&&cont==2){
        const resposta=texto.split("");
        let traducao;
        let final="";
        for (let i=0;i<resposta.length;i++) {
            traducao=morse[resposta[i]];//pesquisa de indice
            final=final+" "+traducao;//concatena na variavelS
        }
        addcard(final);
        console.log(final);
    }else if(tipo==2&&cont==2){
        const resposta=texto.split(" ");
        let traducao;
        let final="";
        let contagem=resposta.length;
        let contagem1=0;
        const getKeyByValue = (obj, value) => Object.keys(obj).find(key => obj[key] === value);
        for (contagem;contagem>0;contagem--) {
            traducao=(getKeyByValue(morse, resposta[contagem1]));//puxando indice das letras
            final=final+traducao;//concatena na variavel
            ++contagem1;//finaçização de laço
        }
        addcard(final);
        console.log(final);
    };
});//Processo de chamada das funções

//Printando alfabeto
const printalfa=document.getElementById("alfabeto");
const printTextalfa=document.createElement("p");
printTextalfa.classList="card is-dark";
printTextalfa.innerText=letras;
printalfa.appendChild(printTextalfa);