let retter;
async function hentJson() {
    //hent json
    let jsonData = await fetch("json/menu.json");
    retter = await jsonData.json();
    //console.log(retter);
    // find og filtrer retter efter kategori og gem dem i nyt array
    let forretter = retter.filter(ret => ret.kategori == "forretter");
    let hovedretter = retter.filter(ret => ret.kategori == "hovedretter");
    let desserter = retter.filter(ret => ret.kategori == "desserter");
    let drikkevarer = retter.filter(ret => ret.kategori == "drikkevarer");

    document.querySelector("#filter-forretter").addEventListener("click", () => {
        visRetter(forretter, "Forretter" )
    });
    document.querySelector("#filter-alle").addEventListener("click", () => {
        visRetter(retter, "Menu")
    });
    document.querySelector("#filter-hovedretter").addEventListener("click", () => {
        visRetter(hovedretter, "Hovedretter")
    });
    document.querySelector("#filter-desserter").addEventListener("click", () => {
        visRetter(desserter, "Desserter")
    });
    document.querySelector("#filter-drikkevarer").addEventListener("click", () => {
        visRetter(drikkevarer, "Drikkevarer")
    });

    visRetter(retter, "Menu");


}

function visRetter(retter, overskrift) {
    document.querySelector("[data-overskrift]").textContent = overskrift;
    
    let menuTemplate = document.querySelector("[data-template]");
    let templateModtager = document.querySelector("[data-container]");
    templateModtager.innerHTML = "";
    //for hver ret vis dem i DOM
    retter.forEach(hverRet => {
        //klon template og indsæt ret properties
        let klon = menuTemplate.cloneNode(true).content;
        klon.querySelector("[data-navn]").textContent = hverRet.navn;
        klon.querySelector("[data-kortbeskrivelse]").textContent = hverRet.kortbeskrivelse;
        klon.querySelector("[data-pris]").textContent = hverRet.pris;
        klon.querySelector("[data-billede]").setAttribute("src", "imgs/small/" + hverRet.billede + "-sm.jpg")
        templateModtager.appendChild(klon);

    });
}

document.addEventListener("DOMContentLoaded", hentJson);
