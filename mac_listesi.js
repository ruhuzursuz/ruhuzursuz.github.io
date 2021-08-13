var b_maclar = {};
var k_maclar = {};

var takimlar = {};
var takim_listesi = ["Adana Demirspor","Galatasaray","Sivasspor","Alanyaspor","Rizespor","Kasımpaşa","Fenerbahçe","Gaziantep FK","Konyaspor","Altay","Başakşehir","Trabzonspor","Göztepe","Malatyaspor","Beşiktaş","Giresunspor","Kayserispor","Antalyaspor","Karagümrük","Hatayspor"];

function mac_listesi_olustur(){
	let week;
	
	$.get("https://m.sporx.com/_ajax/kategori_fikstur.php?lig=482ofyysbdbeoxauk19yg7tdt" , function(response){
		let regx = /<span>(.*?)[.] Hafta/g;
	
	/*$.get("https://m.sporx.com/turkiye-super-lig-fikstur" , function(response){
		let regx = /<span>(.*?)[.] Hafta<\/span>/g;
		*/
		let haftacik = regx.exec(response["html"]["week"])[1];
		
		var esas_hafta_deger = document.getElementById("esas"); 
		var sonraki_hafta_deger = document.getElementById("sonra");
		var onceki_hafta_deger = document.getElementById("once"); 
	
		if(haftacik == "38"){
			esas_hafta_deger.innerHTML = haftacik;
    		sonraki_hafta_deger.innerHTML = "";
    		onceki_hafta_deger.innerHTML = "37";}
		else if(haftacik == "1"){
    		esas_hafta_deger.innerHTML = haftacik;
    		sonraki_hafta_deger.innerHTML = "2";
    		onceki_hafta_deger.innerHTML = "38";}
		else{
    		sonraki_hafta_deger.innerHTML = parseInt(haftacik)+1;
    		onceki_hafta_deger.innerHTML = parseInt(haftacik)-1;
			esas_hafta_deger.innerHTML = haftacik;}
		
		let ajans_linki = "https://m.sporx.com/_ajax/kategori_fikstur.php?lig=482ofyysbdbeoxauk19yg7tdt&week=";
		let regie_takimlar_ev = /text-right\">(.*?)<\/td>/g;
		let regie_takimlar_dep = /text-left\">(.*?)<\/td>/g;
		let regie_skorlar = /<span>(.{3,5})<\/span>/g;	
			
		
		for(week=1; week<41; week++){
			let s_week = week.toString();
			b_maclar[s_week] = [];
				
			let eslesmeler;
			let takimciklar_ev = [];
			let takimciklar_dep = [];
			let skorcuklar = [];
			$.get(ajans_linki+s_week, function(response){
				while(eslesmeler = regie_takimlar_ev.exec(response["html"]["body"])){takimciklar_ev.push(eslesmeler[1])}
				while(eslesmeler = regie_takimlar_dep.exec(response["html"]["body"])){takimciklar_dep.push(eslesmeler[1])}
				while(eslesmeler = regie_skorlar.exec(response["html"]["body"])){skorcuklar.push(eslesmeler[1])}
					
				for(let ii=0; ii<10; ii++){
					let ev = takimciklar_ev[ii];
					let dep = takimciklar_dep[ii];
						
					if(skorcuklar[ii].includes(":") || skorcuklar[ii].includes("ERT") ){
						let mac_objem = {"ev":ev, "dep":dep};
						if(k_maclar[s_week]){k_maclar[s_week].push(mac_objem);}
						else{k_maclar[s_week] = [mac_objem];}}
					else{
						let ev_g = parseInt(skorcuklar[ii].split("-")[0]);
						let dep_g = parseInt(skorcuklar[ii].split("-")[1]);
						let mac_objem = {"ev":ev, "ev_g":ev_g, "dep":dep, "dep_g":dep_g};
						b_maclar[s_week].push(mac_objem);}}
			}).done(()=>{
				if(week == 39){
					takimlar = puan_averaj_hesapla(takim_listesi);fikstur_olustur();tablo_yenile();
				}
			})		
		}	
	})
}
mac_listesi_olustur();
