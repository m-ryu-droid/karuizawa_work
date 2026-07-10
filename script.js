const packs={
  "子ども":["着替え2組","薄手の羽織り","帽子","飲み物","食べ慣れたおやつ","シールブック","小さなおもちゃ","子ども用イヤホン","食事用エプロン","ウェットティッシュ"],
  "暑さ・雨":["日焼け止め","虫よけ","冷感タオル","子ども用レインコート","大人用折りたたみ傘","替え靴下","小タオル"],
  "健康・宿泊":["保険証","医療証","常用薬","体温計","絆創膏","子ども用パジャマ","歯ブラシ","保湿剤"],
  "移動":["新幹線予約画面","交通系IC","スマートフォン","モバイルバッテリー","折りたたみバッグ","保冷バッグ"]
};
const list=document.getElementById("packing-list");
if(list){
  Object.entries(packs).forEach(([group,items])=>{
    const box=document.createElement("section");
    box.className="pack";
    box.innerHTML="<h3>"+group+"</h3>";
    items.forEach(item=>{
      const key="karuizawa-final-"+group+"-"+item;
      const label=document.createElement("label");
      const input=document.createElement("input");
      input.type="checkbox";
      input.checked=localStorage.getItem(key)==="1";
      input.addEventListener("change",()=>localStorage.setItem(key,input.checked?"1":"0"));
      label.append(input,document.createTextNode(item));
      box.appendChild(label);
    });
    list.appendChild(box);
  });
}
const clear=document.getElementById("clear-checks");
if(clear){
  clear.addEventListener("click",()=>{
    Object.keys(localStorage).forEach(k=>{if(k.startsWith("karuizawa-final-"))localStorage.removeItem(k)});
    document.querySelectorAll("#packing-list input").forEach(i=>i.checked=false);
  });
}
function selectedDay(){
  const q=new URLSearchParams(location.search).get("day");
  if(q==="1"||q==="2") return q;
  const d=new Date();
  if(d.getFullYear()===2026&&d.getMonth()===7&&d.getDate()===15) return "1";
  if(d.getFullYear()===2026&&d.getMonth()===7&&d.getDate()===16) return "2";
  return "prep";
}
const today=document.getElementById("today-card");
if(today){
  const data={
    prep:["旅行準備","あさま605号 東京9:04→軽井沢10:10。初日はタリアセン→ハルニレ→ホテル。白糸の滝は2日目10:20バスを軸にします。"],
    "1":["1日目","軽井沢駅で荷物を預け、バスでタリアセンへ。昼食と遊びの後、ハルニレテラスで散策・おやつ・夕食候補。夕方ホテルへ。"],
    "2":["2日目","白糸の滝を最優先。軽井沢駅10:20発の草軽交通バスを軸に動きます。"]
  }[selectedDay()];
  today.innerHTML='<p class="label">TODAY</p><h3>'+data[0]+'</h3><p>'+data[1]+'</p>';
}
if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
}
