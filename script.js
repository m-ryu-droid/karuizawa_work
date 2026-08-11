
const packs={
  "服装":["半袖トップス","薄手の羽織り","長ズボンまたはレギンス","スニーカー","替え靴下","子ども用レインコート","大人用折りたたみ傘"],
  "子ども":["着替え2組","飲み物","食べ慣れたおやつ","シールブック","小さなおもちゃ","食事用エプロン","ウェットティッシュ"],
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
      const key="karuizawa-work-"+group+"-"+item;
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
    Object.keys(localStorage).forEach(k=>{ if(k.startsWith("karuizawa-work-")) localStorage.removeItem(k); });
    document.querySelectorAll("#packing-list input").forEach(i=>i.checked=false);
  });
}
