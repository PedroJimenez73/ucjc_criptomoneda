var pages = [
    { title: "Portada", path: "01", show: "no"},
    { title: "Presentación", path: "02", show: "yes"},
    { title: "Mapa Conceptual", path: "03", show: "yes"},
    { title: "Puesta en situación", path: "04", show: "yes"},
    { title: "", path: "05", show: "no"},
    { title: "Concepto", path: "06", show: "yes"},
    { title: "Información de interés", path: "07", show: "yes"},
    { title: "Historia", path: "08", show: "yes"},
    { title: "Características del principio de jerarquía normativa (art. 9.3 C.E.)", path: "09", show: "yes"},
    { title: "Normas que integran esa escala jerárquica", path: "10", show: "yes"},
    { title: "Tratados Internacionales y el Derecho de la Unión Europea", path: "11", show: "yes"},
    { title: "La Ley", path: "12", show: "yes"},
    { title: "Normas con valor de Ley", path: "13", show: "yes"},
    { title: "Decreto Ley", path: "14", show: "yes"},
    { title: "Decretos Legislativos", path: "15", show: "yes"},
    { title: "Los Reglamentos", path: "16", show: "yes"},
    { title: "Reales Decretos", path: "17", show: "yes"},
    { title: "Disposiciones normativas de la Comisión Delegada", path: "18", show: "yes"},
    { title: "Órdenes Ministeriales", path: "19", show: "yes"},
    { title: "Actividad práctica", path: "20", show: "yes"},
    { title: "Relaciones entre la ley y el reglamento", path: "21", show: "yes"},
    { title: "Principios", path: "22", show: "yes"},
    { title: "Enlaces de interés", path: "23", show: "yes"},
    { title: "Glosario", path: "24", show: "yes"},
    { title: "Bibliografía", path: "25", show: "yes"},
    { title: "Créditos", path: "26", show: "yes"},
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

    $('#burger').click(function () {
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
        window.scrollTo(0, 0);
    }, 20);
}

function toggleAccordion(e) {
    e--;
    $('article').eq(e).css('pointer-events','none');
    setTimeout(function () {
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
