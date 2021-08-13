function tablo_yenile(){
	siralamasyon();
	var tablo = document.getElementById("tablo");
	for(var i=1;i<=20;i++){
		for(var j=0; j<10; j++){
			var hucre = tablo.rows[i].cells[j];
			if(j == 0){hucre.innerHTML = i;}
			else if(j == 1){hucre.innerHTML = pozisyonlar[i]["i"];}
			else if(j == 2){hucre.innerHTML = pozisyonlar[i]["o"];}
			else if(j == 3){hucre.innerHTML = pozisyonlar[i]["g"];}
			else if(j == 4){hucre.innerHTML = pozisyonlar[i]["b"];}
			else if(j == 5){hucre.innerHTML = pozisyonlar[i]["m"];}
			else if(j == 6){hucre.innerHTML = pozisyonlar[i]["a"];}
			else if(j == 7){hucre.innerHTML = pozisyonlar[i]["y"];}
			else if(j == 8){hucre.innerHTML = pozisyonlar[i]["p"];}
			else{hucre.innerHTML = pozisyonlar[i]["av"];}
		}
	}
}

function bitir(arg){
	var hucreler = document.getElementById("tablo2").rows[arg].cells;
	var home = hucreler[1].innerHTML;
	var away = hucreler[3].innerHTML;
	var ham_skor = hucreler[2].innerHTML.split(":");
	let skor_tabelası = [0,0,0,1,1,1,1,2,2,2,3,3,3,4,5,6];
	if(ham_skor[0] == "R"){var ev_g = skor_tabelası[(Math.floor(Math.random() * skor_tabelası.length))];}
	else{var ev_g = parseInt(ham_skor[0]);}
	if(ham_skor[1] == "R"){var dep_g = skor_tabelası[(Math.floor(Math.random() * skor_tabelası.length))];}
	else{var dep_g = parseInt(ham_skor[1]);}
	
	
	
	if(ev_g > dep_g){ takimlar[home]["p"] +=3; takimlar[home]["g"] ++; takimlar[away]["m"] ++ ;}
	else if(ev_g == dep_g){
		takimlar[home]["p"] ++ ;
		takimlar[away]["p"] ++ ;
		takimlar[home]["b"] ++ ;
		takimlar[away]["b"] ++ ;}
	else{takimlar[away]["p"] +=3; takimlar[away]["g"] ++; takimlar[home]["m"] ++ ;}
      
	takimlar[home]["o"]++;
	takimlar[away]["o"]++;
	takimlar[home]["a"] +=ev_g;
	takimlar[home]["y"] +=dep_g;
	takimlar[away]["a"] +=dep_g;
	takimlar[away]["y"] +=ev_g;
      
	takimlar[home]["av"] = takimlar[home]["a"] - takimlar[home]["y"];
	takimlar[away]["av"] = takimlar[away]["a"] - takimlar[away]["y"]
	
	var obje = {"ev":home,"ev_g":ev_g, "dep":away, "dep_g":dep_g};
	let kacinci_hafta = document.getElementById("esas").innerHTML;
	
	b_maclar[kacinci_hafta].push(obje);
		
	for(let objem of k_maclar[kacinci_hafta]){
		if(home == objem["ev"] && away == objem["dep"]){
			var indeks = k_maclar[kacinci_hafta].indexOf(objem);
			k_maclar[kacinci_hafta].splice(indeks, 1);
		}
	}
	fikstur_olustur();
	tablo_yenile();
}


function fikstur_olustur(){
	
	var hafta_html = document.getElementById("esas");
	let hafta_s = hafta_html.innerText;
	var satir = 0;
	var satirlar = document.getElementById("tablo2").rows;
	for(let b_mac of b_maclar[hafta_s]){
		satirlar[satir+1].cells[0].innerHTML = "";
		satirlar[satir+1].cells[1].style.pointerEvents = 'none';
		satirlar[satir+1].cells[1].innerHTML = b_mac["ev"];
		satirlar[satir+1].cells[2].innerHTML = b_mac["ev_g"] + ":" + b_mac["dep_g"];
		satirlar[satir+1].cells[3].innerHTML = b_mac["dep"];
		satirlar[satir+1].cells[3].style.pointerEvents = 'none';
		satirlar[satir+1].cells[4].innerHTML = "";
		satirlar[satir+1].cells[4].style.pointerEvents = 'none';
		satir++;
		}
	if(k_maclar[hafta_s]){
		for(let k_mac of k_maclar[hafta_s]){
			
			satirlar[satir+1].cells[1].innerHTML = k_mac["ev"];
			satirlar[satir+1].cells[1].style.pointerEvents = 'auto';
			var cid = "c-" + (satir+1);
			satirlar[satir+1].cells[2].innerHTML = "0:0";
			satirlar[satir+1].cells[2].setAttribute("id",cid);
			satirlar[satir+1].cells[1].setAttribute("onclick","eve_gol_attir('c-"+(satir+1)+"')");
			satirlar[satir+1].cells[3].innerHTML = k_mac["dep"];
			satirlar[satir+1].cells[3].style.pointerEvents = 'auto';
			satirlar[satir+1].cells[3].setAttribute("onclick","depe_gol_attir('c-"+(satir+1)+"')");
			satirlar[satir+1].cells[4].innerHTML = "bitir";
			satirlar[satir+1].cells[4].style.pointerEvents = 'auto';
			satir++;
			}
	}
 }
 
 function eve_gol_attir(arg){
	 var deger = document.getElementById(arg).innerHTML;
	 var ev_skor = parseInt(deger.split(":")[0]);
	 var dep_skor = deger.split(":")[1];
	 
	 let skor_tabelası = [0,1,2,3,4,5,6,7,"R"];
	 let indeks_sayisi = skor_tabelası.indexOf(ev_skor);
	 ev_skor = skor_tabelası[(indeks_sayisi+1)%9];
	 document.getElementById(arg).innerHTML = ""+ev_skor+":"+dep_skor;
 }
 
  function depe_gol_attir(arg){
	 var deger = document.getElementById(arg).innerHTML;
	 var ev_skor = deger.split(":")[0];
	 var dep_skor = parseInt(deger.split(":")[1]);
	 
	 let skor_tabelası = [0,1,2,3,4,5,6,"R"];
	 let indeks_sayisi = skor_tabelası.indexOf(dep_skor);
	 dep_skor = skor_tabelası[(indeks_sayisi+1)%8];
	 document.getElementById(arg).innerHTML = ev_skor+":"+dep_skor;
 }

 
 function fikstur_ustu_yenile(arguman){
	 
	var esas_hafta = document.getElementById("esas");
	var sonraki_hafta = document.getElementById("sonra");
	var onceki_hafta = document.getElementById("once");
	esas_hafta_deger = parseInt(esas_hafta.innerHTML);
	
	if(esas_hafta_deger == 38 && arguman == 1){console.log("Oops");}
	else if(esas_hafta_deger == 37 && arguman == 1){
		sonraki_hafta.innerHTML = "";
		esas_hafta.innerHTML = 38;
		onceki_hafta.innerHTML = 37;
		fikstur_olustur();
	}
	else if(esas_hafta_deger == 1 && arguman == -1){console.log("Oops");}
	else if(esas_hafta_deger == 2 && arguman == -1){
		esas_hafta.innerHTML = 1;
		sonraki_hafta.innerHTML = 2;
		onceki_hafta.innerHTML = "";
		fikstur_olustur();
	}
	else{
		esas_hafta.innerHTML = esas_hafta_deger + arguman;
		onceki_hafta.innerHTML = esas_hafta_deger + arguman -1;
		sonraki_hafta.innerHTML = esas_hafta_deger + arguman +1;
		fikstur_olustur();
	}
 }
