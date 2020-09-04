var pozisyonlar = {};
function siralamasyon(){
	var pozisyon = 21;
	var puanlar = {};
	// puanlar şeysini puana göre grupla
	for(let takim in takimlar){
		if(!puanlar[takimlar[takim]["p"]]){puanlar[takimlar[takim]["p"]] = [takim];}
		else{puanlar[takimlar[takim]["p"]].push(takim)}
	}
	while(pozisyon > 0){
		for(let puan in puanlar){
			if(puanlar[puan].length == 1){
				let t_team = puanlar[puan][0];
				pozisyonlar[pozisyon] = {"i":t_team, "o":takimlar[t_team]["o"],"g":takimlar[t_team]["g"],"b":takimlar[t_team]["b"],"m":takimlar[t_team]["m"],"a":takimlar[t_team]["a"],"y":takimlar[t_team]["y"],"p":takimlar[t_team]["p"],"av":takimlar[t_team]["av"]};
				pozisyon--;
			}
			else{
				var kacinci_sira = pozisyon;
				var kac_sira = puanlar[puan].length;
				aralarindaki_lig(puanlar[puan],kacinci_sira);
				pozisyon = pozisyon - kac_sira;
			}
		}
	}
}

function aralarindaki_lig(grup, poz){
	let beklenen_o_sayisi = (grup.length -1)*2;
	var mini_lig = puan_averaj_hesapla(grup);
	let lig_bitmis_mi = true;
	for(let katilan in mini_lig){if(mini_lig[katilan]["o"] != beklenen_o_sayisi){lig_bitmis_mi=false;}}
	let sira = [];
	if(lig_bitmis_mi){
		
		if(grup.length == 2){
			if(mini_lig[grup[0]]["p"] < mini_lig[grup[1]]["p"]){sira.push(grup[0]);sira.push(grup[1]);}
			else if(mini_lig[grup[0]]["p"] > mini_lig[grup[1]]["p"]){sira.push(grup[1]);sira.push(grup[0]);}
			else{
				if(mini_lig[grup[0]]["av"] < mini_lig[grup[1]]["av"] ){sira.push(grup[0]);sira.push(grup[1]);}
				else if(mini_lig[grup[0]]["av"] > mini_lig[grup[1]]["av"] ){sira.push(grup[1]);sira.push(grup[0]);}
				else{
					if(takimlar[grup[0]]["av"] < takimlar[grup[1]]["av"]){sira.push(grup[0]);sira.push(grup[1]);}
					else if(takimlar[grup[0]]["av"] > takimlar[grup[1]]["av"]){sira.push(grup[1]);sira.push(grup[0]);}
					else{
						if(takimlar[grup[0]]["a"] < takimlar[grup[1]]["a"] ){sira.push(grup[0]);sira.push(grup[1]);}
						else{sira.push(grup[1]);sira.push(grup[0]);}
					}
				}
			}
		}
		if(grup.length != 2){
			let puantaj = {};
			for(let t of grup){
				if(!puantaj[mini_lig[t]["p"]]){puantaj[mini_lig[t]["p"]] = [t];}
				else{puantaj[mini_lig[t]["p"]].push(t);}
			}
			
			for(let p in puantaj){
				if(puantaj[p].length == 1){sira.push(puantaj[p][0]);}
				else{
					let avantajlar = {};
					for(let pp of puantaj[p]){
						let avantaj = mini_lig[pp]["av"] + 300;
						if(!avantajlar[avantaj]){avantajlar[avantaj] = [pp];}
						else{avantajlar[avantaj].push(pp);}
					}
					for(let av in avantajlar){
						if(avantajlar[av].length == 1){sira.push(avantajlar[av][0]);}
						else{
							let arlrnd_goller = {};
							for(let tt of avantajlar[av]){
								let a_gol = mini_lig[tt]["a"];
								if(!arlrnd_goller[a_gol]){arlrnd_goller[a_gol] = [tt];}
								else{arlrnd_goller[a_gol].push(tt);}
								
							}
							for(let zz in arlrnd_goller){
								if(arlrnd_goller[zz].length == 1){sira.push(arlrnd_goller[zz][0]);}
								else{
									let genel_av = {};
									for(ccc of arlrnd_goller[zz]){
										let g_av = takimlar[ccc]["av"];
										if(!genel_av[g_av]){genel_av[g_av] = [ccc];}
										else{genel_av[g_av].push(ccc);}
									}
									for(bb in genel_av){
										if(genel_av[bb].length == 1){sira.push(genel_av[bb][0]);}
										else{
											let genel_goller = {};
											for(ddd of genel_av[bb]){
												let genel_gol = takimlar[ddd]["g"];
												if(!genel_goller[genel_gol]){genel_goller[genel_gol] = [ddd];}
												else{genel_goller[genel_gol].push(ddd);}
											}
											for(gg in genel_goller){
												if(genel_goller[gg].length == 1){sira.push(genel_goller[gg][0]);}
												else{
													for(let hh of genel_goller[gg]){sira.push(hh);}
												}}}}}}}}}}}}
												
	if(!lig_bitmis_mi){
		let averajlar = {};
		for(let t of grup){
			let averaj = takimlar[t]["av"]+300;
			if(!averajlar[averaj]){averajlar[averaj] = [t];}
			else{averajlar[averaj].push(t);}
			}
		for(let a in averajlar){
			if(averajlar[a].length == 1){
				sira.push(averajlar[a][0]);
			}
			else{
				let goller = {};
				for(let t2 of averajlar[a]){
					let gol = takimlar[t2]["a"];
					if(!goller[gol]){goller[gol] = [t2];}
					else{goller[gol].push(t2);}
				}
				for(let g in goller){
					for(let x of goller[g]){sira.push(x);}
				}
			}
		}
	}
	
	for(let siradaki of sira){
		pozisyonlar[poz] = {"i":siradaki, "o":takimlar[siradaki]["o"],"g":takimlar[siradaki]["g"],"b":takimlar[siradaki]["b"],"m":takimlar[siradaki]["m"],"a":takimlar[siradaki]["a"],"y":takimlar[siradaki]["y"],"p":takimlar[siradaki]["p"],"av":takimlar[siradaki]["av"]};
		poz--;		
	}
	
}

function puan_averaj_hesapla(liste){
	
	let lig_data = {};
	for(let l of liste){lig_data[l] = {"o":0, "g":0, "b":0, "m":0, "a":0,"y":0, "p":0, "av":0};}
	for(let h in b_maclar){
		for(let m of b_maclar[h]){
			if(liste.includes(m["ev"]) && liste.includes(m["dep"])){
				if(m["ev_g"] == m["dep_g"]){lig_data[m["ev"]]["p"]++;lig_data[m["dep"]]["p"]++;lig_data[m["ev"]]["b"]++;lig_data[m["dep"]]["b"]++;}
				else if(m["ev_g"] > m["dep_g"]){lig_data[m["ev"]]["p"]+=3;lig_data[m["ev"]]["g"]++;lig_data[m["dep"]]["m"]++;}
				else{lig_data[m["dep"]]["g"]++;lig_data[m["ev"]]["m"]++;lig_data[m["dep"]]["p"]+=3;}
				lig_data[m["ev"]]["a"] +=m["ev_g"];
				lig_data[m["ev"]]["y"] +=m["dep_g"];
				lig_data[m["dep"]]["a"]+=m["dep_g"];
				lig_data[m["dep"]]["y"]+=m["ev_g"];
				lig_data[m["ev"]]["av"] = lig_data[m["ev"]]["a"] - lig_data[m["ev"]]["y"];
				lig_data[m["dep"]]["av"] = lig_data[m["dep"]]["a"] - lig_data[m["dep"]]["y"];
				lig_data[m["ev"]]["o"]++;
				lig_data[m["dep"]]["o"]++;
				
			}
		}
	}
	return lig_data;
}

