var pages = [
    { title: "Portada", path: "01", show: "no"},
    { title: "Presentación", path: "02", show: "yes"},
    { title: "Mapa Conceptual", path: "03", show: "yes"},
    { title: "Criptomonedas y Blockchain: Conceptos y aspectos jurídicos", path: "04", show: "yes"},
    { title: "", path: "05", show: "no"},
    { title: "1. ¿Qué es el blockchain?", path: "06", show: "yes"},
    { title: "", path: "07", show: "no"},
    { title: "2. La criptomoneda como bien económico: concepto y análisis jurídico", path: "08", show: "yes"},
    { title: "", path: "09", show: "no"},
    { title: "", path: "10", show: "no"},
    { title: "", path: "11", show: "no"},
    { title: "", path: "12", show: "no"},
    { title: "", path: "13", show: "no"},
    { title: "", path: "14", show: "no"},
    { title: "Glosario", path: "15", show: "yes"},
    { title: "Bibliografía", path: "16", show: "yes"},
    { title: "Enlaces de interés", path: "17", show: "yes"},
]

var menuItems = document.getElementById('menu-items');

var title = document.getElementById('title');
title.style.opacity = 0;

var funcs = [];

var prevBtn = document.getElementById('prev-btn');
var counter = document.getElementById('counter');
var nextBtn = document.getElementById('next-btn');

prevBtn.style.display = 'none'
counter.innerHTML = currentPage + 1 + '/' + pages.length;

function createfunc(l) {
    return function() { goTo(l); };
}

for (var m = 0; m < pages.length; m++) {
    funcs[m] = createfunc(m);
}

for (i = 0; i < pages.length; i++) { 
    if (pages[i].show !== "no") {
        var node = document.createElement("div");
        var hr = document.createElement("hr");
        var text = document.createTextNode(pages[i].title);
        node.appendChild(text);
        node.classList.add('item');
        node.onclick = funcs[i];
        menuItems.appendChild(node);
        if (i !== (pages.length - 1)) {
            menuItems.appendChild(hr);
        }
    }
}


$(document).ready(function(){

    $("#content").empty();
    $("#content").load("content/" + pages[currentPage].path + "/index.html",function()	{
    $("#page-container").fadeIn('slow');												  
    });

    $('#burger').click(() => {
        $('#burger').toggleClass('open');
        $('#menu').toggleClass('open');
    });

})


function prev() {
    currentPage--;
    navTo();
}

function next() {
    currentPage++;
    navTo();
}

function goTo(l) {
    currentPage = l;
    navTo();
    $('#burger').toggleClass('open');
    $('#menu').toggleClass('open');
}

function navTo() {
    ScormProcessSetValue('cmi.location', (currentPage).toString());
    if (this.currentPage === (this.pages.length - 1)){
        // reachedEnd = true;
        ScormProcessSetValue("cmi.completion_status", "completed");
        ScormProcessSetValue("cmi.success_status", "passed");
    }
    counter.innerHTML = currentPage + 1 + '/' + pages.length;
    if(currentPage === 0) {
        title.style.opacity = 0;
        prevBtn.style.display = 'none';
    } else if (currentPage === pages.length - 1){
        title.style.opacity = 1;
        prevBtn.style.display = 'inline';
        nextBtn.style.display = 'none';
    } else {
        title.style.opacity = 1;
        prevBtn.style.display = 'inline';
        nextBtn.style.display = 'inline';
    }
    $("#content").empty();
    $("#content").load("content/" + pages[currentPage].path + "/index.html",function()	{
        $("#page-container").fadeIn('slow');												  
    });
}

function exit() {
    doUnload(false);
    window.open(window.location, '_self').close();
}

// Interactive Components

function toggleTip(e) {
    e--
    $(".modal").eq(e).toggleClass("show");
    $("#overlay").toggleClass("show");
    setTimeout(function(){
        $(".modal").eq(e).toggleClass("visible");
        $("#overlay").toggleClass("visible");
    }, 20);
}

function toggleAccordion(e) {
    e--;
    $('article').eq(e).css('pointer-events','none');
    setTimeout(() => {
        $('article').eq(e).css('pointer-events','auto');
    }, 700);
    for (i = 0; i < $('article').length; i++) {
        if (i !== e) {
            $('article').eq(i).removeClass('show');
        } else {
            $('article').eq(i).toggleClass('show');
        }
        if (i === e &&  $('.accordion-content').eq(i).css('display') === 'none') {
            $('.accordion-content').eq(i).slideDown(700);
        } else {
            $('.accordion-content').eq(i).slideUp(700);
        }
    }
}

