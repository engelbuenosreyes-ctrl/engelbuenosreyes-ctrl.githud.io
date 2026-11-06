/* =====================================================
   ASFERmart — app.js
   Lógica de tienda: catálogo, filtros, carrito, auth,
   checkout, hero, tema oscuro, búsqueda.
   ===================================================== */

/* ============ DATA ============ */
const CATEGORIES = {
  "Niños": ["0 años", "1 año", "5 años", "Uniforme"],
  "Niñas": ["0 años", "1 año", "5 años", "Uniforme"],
  "Fiesta": ["Globos", "Fundas", "Cajitas", "Letreros", "Papel para envolver"],
  "Cocina": ["Tazas", "Sartenes", "Platos", "Utensilios", "Envases"],
  "Renta": ["Cortinas", "Sillas", "Mesas", "Manteles"],
  "Arreglos": ["Hombres", "Mujeres", "Babyshower", "Niños", "Niñas"],
  "Escolar": ["Mochilas", "Cuadernos", "Escritura y Papelería"]
};

const PRODUCTS = [
  {id:1, name:"Body Bebé Niño 0-6 meses", cat:"Niños", brand:"BabyKids", price:520, img:"https://m.media-amazon.com/images/I/81lfRP0iluL._AC_UL320_.jpg", popular:1, desc:"Body suave de algodón para bebé de 0 años.", diet:["bebe"], nutri:null},
  {id:2, name:"Conjunto 2 Pzas Bebé Niño", cat:"Niños", brand:"BabyKids", price:750, img:"https://m.media-amazon.com/images/I/81jeqsxfxnL._AC_UL320_.jpg", desc:"Conjunto de 2 piezas para bebé de 0 años.", diet:["bebe"], nutri:null},
  {id:3, name:"Mameluco Niño 1 Año", cat:"Niños", brand:"BabyKids", price:695, img:"https://m.media-amazon.com/images/I/81vGZ8aneWL._AC_UL320_.jpg", new:1, desc:"Mameluco cómodo para niño de 1 año.", diet:["bebe"], nutri:null},
  {id:4, name:"Playera Niño 1 Año", cat:"Niños", brand:"ColeKids", price:460, img:"https://m.media-amazon.com/images/I/811vWIliJCL._AC_UL320_.jpg", desc:"Playera de algodón para niño de 1 año.", diet:["bebe"], nutri:null},
  {id:5, name:"Pantalón Niño 1 Año", cat:"Niños", brand:"ColeKids", price:550, img:"https://m.media-amazon.com/images/I/81ieepgBp7L._AC_UL320_.jpg", desc:"Pantalón resistente para niño de 1 año.", diet:["bebe"], nutri:null},
  {id:6, name:"Camiseta Niño 5 Años", cat:"Niños", brand:"ColeKids", price:490, img:"https://m.media-amazon.com/images/I/71YOW8Ito9L._AC_UL320_.jpg", popular:1, desc:"Camiseta fresca para niño de 5 años.", diet:[], nutri:null},
  {id:7, name:"Pantalón Niño 5 Años", cat:"Niños", brand:"ColeKids", price:635, img:"https://m.media-amazon.com/images/I/911EZ2IUsaL._AC_UL320_.jpg", desc:"Pantalón de mezclilla para niño de 5 años.", diet:[], nutri:null},
  {id:8, name:"Sudadera Niño 5 Años", cat:"Niños", brand:"ColeKids", price:865, img:"https://m.media-amazon.com/images/I/61pfQSlGruL._AC_UL320_.jpg", new:1, desc:"Sudadera abrigadora para niño de 5 años.", diet:[], nutri:null},
  {id:9, name:"Chamarra Ligera Niño", cat:"Niños", brand:"BabyKids", price:1100, img:"https://m.media-amazon.com/images/I/618uzYp8EjL._AC_UL320_.jpg", desc:"Chamarra ligera para niño.", diet:["premium"], nutri:null},
  {id:10, name:"Pijama Niño 5 Años", cat:"Niños", brand:"ColeKids", price:665, img:"https://m.media-amazon.com/images/I/91eWrGsJKLL._AC_UL320_.jpg", desc:"Pijama cómoda para niño de 5 años.", diet:[], nutri:null},
  {id:11, name:"Uniforme Preescolar Niño", cat:"Niños", brand:"ColeKids", price:810, img:"https://m.media-amazon.com/images/I/61oRMWOJ6eL._AC_UL320_.jpg", desc:"Uniforme de preescolar para niño.", diet:["uniforme"], nutri:null},
  {id:12, name:"Uniforme Primaria Niño", cat:"Niños", brand:"ColeKids", price:925, img:"https://m.media-amazon.com/images/I/716uGfgGd4L._AC_UL320_.jpg", popular:1, desc:"Uniforme de primaria para niño.", diet:["uniforme"], nutri:null},
  {id:13, name:"Pantalón Uniforme Niño", cat:"Niños", brand:"ColeKids", price:605, img:"https://m.media-amazon.com/images/I/81l0V76RBAL._AC_UL320_.jpg", desc:"Pantalón de uniforme para niño.", diet:["uniforme"], nutri:null},
  {id:14, name:"Camisa Blanca Uniforme Niño", cat:"Niños", brand:"ColeKids", price:575, img:"https://m.media-amazon.com/images/I/71zsvDlEfLL._AC_UL320_.jpg", desc:"Camisa blanca de uniforme para niño.", diet:["uniforme"], nutri:null},
  {id:15, name:"Suéter Uniforme Niño", cat:"Niños", brand:"ColeKids", price:720, img:"https://m.media-amazon.com/images/I/81pfRnbB0vL._AC_UL320_.jpg", desc:"Suéter de uniforme para niño.", diet:["uniforme"], nutri:null},
  {id:16, name:"Short Deportivo Niño", cat:"Niños", brand:"ColeKids", price:520, img:"https://m.media-amazon.com/images/I/61B3xTtVBbL._AC_UL320_.jpg", desc:"Short deportivo para niño.", diet:[], nutri:null},
  {id:17, name:"Traje de Baño Niño", cat:"Niños", brand:"BabyKids", price:575, img:"https://m.media-amazon.com/images/I/71kHY0VEIxL._AC_UL320_.jpg", new:1, desc:"Traje de baño para niño.", diet:[], nutri:null},
  {id:18, name:"Gorra Niño", cat:"Niños", brand:"ColeKids", price:375, img:"https://m.media-amazon.com/images/I/61OBVzB+94L._AC_UL320_.jpg", desc:"Gorra ajustable para niño.", diet:[], nutri:null},
  {id:19, name:"Calcetines Niño 6pk", cat:"Niños", brand:"BabyKids", price:285, img:"https://m.media-amazon.com/images/I/81ZHzoeBT-L._AC_UL320_.jpg", desc:"Paquete de 6 calcetines para niño.", diet:["eco"], nutri:null},
  {id:20, name:"Zapatos Escolares Niño", cat:"Niños", brand:"ColeKids", price:1155, img:"https://m.media-amazon.com/images/I/71WuQQOoibL._AC_UL320_.jpg", desc:"Zapatos escolares para niño.", diet:["premium"], nutri:null},
  {id:21, name:"Tenis Niño", cat:"Niños", brand:"BabyKids", price:1040, img:"https://m.media-amazon.com/images/I/71IdZEVXehL._AC_UL320_.jpg", desc:"Tenis cómodos para niño.", diet:[], nutri:null},
  {id:22, name:"Disfraz Superhéroe 5 Años", cat:"Niños", brand:"ColeKids", price:985, img:"https://m.media-amazon.com/images/I/71yJAQ1ZoFL._AC_UL320_.jpg", new:1, desc:"Disfraz de superhéroe para niño de 5 años.", diet:["personalizable"], nutri:null},
  {id:23, name:"Chamarra Invierno Niño", cat:"Niños", brand:"BabyKids", price:1330, img:"https://m.media-amazon.com/images/I/71w7Qv5Cp4L._AC_UL320_.jpg", desc:"Chamarra gruesa de invierno para niño.", diet:["premium"], nutri:null},
  {id:24, name:"Conjunto Fiesta Niño", cat:"Niños", brand:"ColeKids", price:1100, img:"https://m.media-amazon.com/images/I/71jj0p1UYFL._AC_UL320_.jpg", desc:"Conjunto elegante de fiesta para niño.", diet:["personalizable"], nutri:null},
  {id:25, name:"Kit Uniforme Completo Niño", cat:"Niños", brand:"ColeKids", price:1445, old:1735, img:"https://m.media-amazon.com/images/I/612PuTaWrhL._AC_UL320_.jpg", popular:1, tag:"Sale", desc:"Kit completo de uniforme para niño.", diet:["uniforme"], nutri:null},
  {id:26, name:"Vestido Bebé 0 Años", cat:"Niñas", brand:"BabyKids", price:750, img:"https://m.media-amazon.com/images/I/71eJQynYg+L._AC_UL320_.jpg", popular:1, desc:"Vestido suave para bebé de 0 años.", diet:["bebe"], nutri:null},
  {id:27, name:"Vestido Niña 1 Año", cat:"Niñas", brand:"BabyKids", price:810, img:"https://m.media-amazon.com/images/I/717r-KJ3n-L._AC_UL320_.jpg", desc:"Vestido para niña de 1 año.", diet:["bebe"], nutri:null},
  {id:28, name:"Conjunto Niña 1 Año", cat:"Niñas", brand:"BabyKids", price:720, img:"https://m.media-amazon.com/images/I/81W30ZXGAJL._AC_UL320_.jpg", new:1, desc:"Conjunto para niña de 1 año.", diet:["bebe"], nutri:null},
  {id:29, name:"Playera Niña 1 Año", cat:"Niñas", brand:"ColeKids", price:460, img:"https://m.media-amazon.com/images/I/81mo2JShg2L._AC_UL320_.jpg", desc:"Playera de algodón para niña de 1 año.", diet:["bebe"], nutri:null},
  {id:30, name:"Leggings Niña 1 Año", cat:"Niñas", brand:"ColeKids", price:490, img:"https://m.media-amazon.com/images/I/71AvJRPXINL._AC_UL320_.jpg", desc:"Leggings suaves para niña de 1 año.", diet:["bebe"], nutri:null},
  {id:31, name:"Vestido Niña 5 Años", cat:"Niñas", brand:"ColeKids", price:865, img:"https://m.media-amazon.com/images/I/81XVxXiaUFL._AC_UL320_.jpg", popular:1, desc:"Vestido para niña de 5 años.", diet:[], nutri:null},
  {id:32, name:"Falda Niña 5 Años", cat:"Niñas", brand:"ColeKids", price:635, img:"https://m.media-amazon.com/images/I/71t9o8tdjCL._AC_UL320_.jpg", desc:"Falda para niña de 5 años.", diet:[], nutri:null},
  {id:33, name:"Blusa Niña 5 Años", cat:"Niñas", brand:"ColeKids", price:550, img:"https://m.media-amazon.com/images/I/7121hTmElfL._AC_UL320_.jpg", desc:"Blusa para niña de 5 años.", diet:[], nutri:null},
  {id:34, name:"Sudadera Niña 5 Años", cat:"Niñas", brand:"ColeKids", price:840, img:"https://m.media-amazon.com/images/I/71Au2L1XgIL._AC_UL320_.jpg", new:1, desc:"Sudadera abrigadora para niña de 5 años.", diet:[], nutri:null},
  {id:35, name:"Chamarra Niña", cat:"Niñas", brand:"BabyKids", price:1070, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCy9Br7cCOpNcC6VuPNFaR1UzWIXGB64fZ1nM2CaXJSg&s=10", desc:"Chamarra para niña.", diet:["premium"], nutri:null},
  {id:36, name:"Pijama Niña", cat:"Niñas", brand:"ColeKids", price:665, img:"https://m.media-amazon.com/images/I/8187MXSpQ3L._AC_UL320_.jpg", desc:"Pijama cómoda para niña.", diet:[], nutri:null},
  {id:37, name:"Uniforme Preescolar Niña", cat:"Niñas", brand:"ColeKids", price:810, img:"https://m.media-amazon.com/images/I/71QpSoGlqZL._AC_UL320_.jpg", desc:"Uniforme de preescolar para niña.", diet:["uniforme"], nutri:null},
  {id:38, name:"Uniforme Primaria Niña", cat:"Niñas", brand:"ColeKids", price:925, img:"https://m.media-amazon.com/images/I/61mv0SXC5xL._AC_UL320_.jpg", popular:1, desc:"Uniforme de primaria para niña.", diet:["uniforme"], nutri:null},
  {id:39, name:"Falda Uniforme Niña", cat:"Niñas", brand:"ColeKids", price:605, img:"https://m.media-amazon.com/images/I/71jgyF1v35L._AC_UL320_.jpg", desc:"Falda de uniforme para niña.", diet:["uniforme"], nutri:null},
  {id:40, name:"Blusa Blanca Uniforme", cat:"Niñas", brand:"ColeKids", price:575, img:"https://m.media-amazon.com/images/I/71o2p2dArXL._AC_UL320_.jpg", desc:"Blusa blanca de uniforme para niña.", diet:["uniforme"], nutri:null},
  {id:41, name:"Suéter Uniforme Niña", cat:"Niñas", brand:"ColeKids", price:720, img:"https://m.media-amazon.com/images/I/81++RRKcdPL._AC_UL320_.jpg", desc:"Suéter de uniforme para niña.", diet:["uniforme"], nutri:null},
  {id:42, name:"Calcetas Blancas 6pk", cat:"Niñas", brand:"BabyKids", price:285, img:"https://m.media-amazon.com/images/I/71PAJfG0GPL._AC_UL320_.jpg", desc:"Paquete de 6 calcetas blancas para niña.", diet:["eco"], nutri:null},
  {id:43, name:"Zapatos Escolares Niña", cat:"Niñas", brand:"ColeKids", price:1155, img:"https://m.media-amazon.com/images/I/71rMqTn8IPL._AC_UL320_.jpg", desc:"Zapatos escolares para niña.", diet:["premium"], nutri:null},
  {id:44, name:"Zapatillas Niña", cat:"Niñas", brand:"BabyKids", price:1010, img:"https://m.media-amazon.com/images/I/81ApQseKgXL._AC_UL320_.jpg", desc:"Zapatillas cómodas para niña.", diet:[], nutri:null},
  {id:45, name:"Diadema de Moños", cat:"Niñas", brand:"BabyKids", price:345, img:"https://m.media-amazon.com/images/I/71chsDFJjdL._AC_UL320_.jpg", desc:"Diadema con moños para niña.", diet:["personalizable"], nutri:null},
  {id:46, name:"Disfraz Princesa 5 Años", cat:"Niñas", brand:"ColeKids", price:985, img:"https://m.media-amazon.com/images/I/611q2l2meKL._AC_UL320_.jpg", new:1, desc:"Disfraz de princesa para niña de 5 años.", diet:["personalizable"], nutri:null},
  {id:47, name:"Traje de Baño Niña", cat:"Niñas", brand:"BabyKids", price:635, img:"https://m.media-amazon.com/images/I/71zd760gaVL._AC_UL320_.jpg", desc:"Traje de baño para niña.", diet:[], nutri:null},
  {id:48, name:"Chamarra Invierno Niña", cat:"Niñas", brand:"BabyKids", price:1300, img:"https://m.media-amazon.com/images/I/61jw2oxMrnL._AC_UL320_.jpg", desc:"Chamarra gruesa de invierno para niña.", diet:["premium"], nutri:null},
  {id:49, name:"Conjunto Fiesta Niña", cat:"Niñas", brand:"ColeKids", price:1100, img:"https://m.media-amazon.com/images/I/81G39haeTuL._AC_UL320_.jpg", desc:"Conjunto elegante de fiesta para niña.", diet:["personalizable"], nutri:null},
  {id:50, name:"Kit Uniforme Completo Niña", cat:"Niñas", brand:"ColeKids", price:1445, old:1735, img:"https://http2.mlstatic.com/D_NQ_NP_2X_829174-MLM87855860295_072025-F-uniforme-escolar-completo-para-nina-todo-el-outfit-escolar.webp", tag:"Sale", desc:"Kit completo de uniforme para niña.", diet:["uniforme"], nutri:null},
  {id:51, name:"Globos Látex 20pk", cat:"Fiesta", brand:"FiestaPop", price:285, img:"https://m.media-amazon.com/images/I/61PGgs4HUiL._AC_UL320_.jpg", popular:1, desc:"Paquete de 20 globos de látex.", diet:[], nutri:null},
  {id:52, name:"Globos Cromados 10pk", cat:"Fiesta", brand:"FiestaPop", price:405, img:"https://m.media-amazon.com/images/I/71x4k+kaXzL._AC_UL320_.jpg", new:1, desc:"Globos cromados de 10 piezas.", diet:[], nutri:null},
  {id:53, name:"Globos de Números", cat:"Fiesta", brand:"FiestaPop", price:230, img:"https://m.media-amazon.com/images/I/71+6j3cT12L._AC_UL320_.jpg", desc:"Globos de números para cumpleaños.", diet:["personalizable"], nutri:null},
  {id:54, name:"Globo Gigante", cat:"Fiesta", brand:"FiestaPop", price:315, img:"https://m.media-amazon.com/images/I/71ifiIgPJgL._AC_UL320_.jpg", desc:"Globo gigante para decoración.", diet:[], nutri:null},
  {id:55, name:"Kit Arco de Globos", cat:"Fiesta", brand:"FiestaPop", price:865, img:"https://m.media-amazon.com/images/I/81iCqvC2FvL._AC_UL320_.jpg", popular:1, desc:"Kit para arco de globos.", diet:["premium"], nutri:null},
  {id:56, name:"Fundas Dulceras 10pk", cat:"Fiesta", brand:"FiestaPop", price:200, img:"https://m.media-amazon.com/images/I/814XyrB4OMS._AC_UL320_.jpg", desc:"Fundas dulceras de 10 piezas.", diet:[], nutri:null},
  {id:57, name:"Fundas Celofán 20pk", cat:"Fiesta", brand:"FiestaPop", price:170, img:"https://http2.mlstatic.com/D_NQ_NP_2X_642108-MLA106321773119_012026-F.webp", desc:"Fundas de celofán, 20 piezas.", diet:["eco"], nutri:null},
  {id:58, name:"Fundas de Personajes 10pk", cat:"Fiesta", brand:"FiestaPop", price:260, img:"https://imgs.search.brave.com/bDAiRAAefGfvH3cWdXtwdSqcw-c0vPOOkpANJH72Y1I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmVi/YXlpbWcuY29tL2lt/YWdlcy9nL29XRUFB/ZVN3UHRscUdISU4v/cy1sOTYwLndlYnA", desc:"Fundas de personajes, 10 piezas.", diet:["personalizable"], nutri:null},
  {id:59, name:"Fundas Kraft 12pk", cat:"Fiesta", brand:"FiestaPop", price:230, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQv7ksEp6m8D5Nsb8ELGWMxYcghNR-VhQ1UeICap8UWg&s=10", desc:"Fundas kraft ecológicas, 12 piezas.", diet:["eco"], nutri:null},
  {id:60, name:"Fundas Metalizadas 10pk", cat:"Fiesta", brand:"FiestaPop", price:245, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtG7NTEjIW3QFQviqjEH1r-X-gIYm--4EcybSZhdcCXA&s=10", new:1, desc:"Fundas metalizadas, 10 piezas.", diet:[], nutri:null},
  {id:61, name:"Cajitas Dulceras 10pk", cat:"Fiesta", brand:"FiestaPop", price:345, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyLqut6sUqieiK-Vnukgo-MKOlpOCPIg2IetWw-dYBGA&s", popular:1, desc:"Cajitas dulceras de 10 piezas.", diet:[], nutri:null},
  {id:62, name:"Cajitas de Personaje 8pk", cat:"Fiesta", brand:"FiestaPop", price:375, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqinCqfOcbIzIt3ee6PSkxwsolDF-Xat-u4RR22DUKDA&s=10", desc:"Cajitas de personaje, 8 piezas.", diet:["personalizable"], nutri:null},
  {id:63, name:"Cajitas Kraft 12pk", cat:"Fiesta", brand:"FiestaPop", price:315, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xm0p3CNjww1wZDwFNkvSCnEWrGdoswd-GyS-rFcOgQ&s=10", desc:"Cajitas kraft ecológicas, 12 piezas.", diet:["eco"], nutri:null},
  {id:64, name:"Cajita Torre de Regalo", cat:"Fiesta", brand:"FiestaPop", price:460, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr9dv9wDaxdpyzIep461Hazqyr5p_3yLiDSwdmHCW3mA&s=10", new:1, desc:"Cajita torre para regalo.", diet:[], nutri:null},
  {id:65, name:"Mini Cajitas 20pk", cat:"Fiesta", brand:"FiestaPop", price:285, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSG4IH3IXxQuAzcNEOfaJ6QaMBPWUqMJRRfEf5824xdA&s=10", desc:"Mini cajitas, 20 piezas.", diet:[], nutri:null},
  {id:66, name:"Letrero Feliz Cumpleaños", cat:"Fiesta", brand:"FiestaPop", price:345, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd32uz-Lpg-CWEFsMzPdHtrZwNzFkrHWW6ZNv04PChSA&s=10", popular:1, desc:"Letrero de feliz cumpleaños.", diet:["personalizable"], nutri:null},
  {id:67, name:"Letrero Baby Shower", cat:"Fiesta", brand:"FiestaPop", price:315, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGNGrJnOBdLVdFy3StlnirNDOlsOiYEndkVROWz7Nvrg&s=10", desc:"Letrero para baby shower.", diet:["bebe"], nutri:null},
  {id:68, name:"Letrero Luminoso LED", cat:"Fiesta", brand:"FiestaPop", price:750, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQx1J9Hgcwhj9K0F1FXKZUsALG3FyzeT3GZI-C7_T6hw&s=10", new:1, desc:"Letrero luminoso LED para fiesta.", diet:["premium"], nutri:null},
  {id:69, name:"Banderines 10m", cat:"Fiesta", brand:"FiestaPop", price:260, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_iWtI7157v5PRTSuaxp9j4AfZVdfFZleMN_s8YTv-lA&s=10", desc:"Banderines de 10 metros.", diet:[], nutri:null},
  {id:70, name:"Cortina Metálica de Fondo", cat:"Fiesta", brand:"FiestaPop", price:405, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi1CAI7qkI-HWQRxFnIurRumZbIA13i3lEzo9rTmqKOw&s=10", desc:"Cortina metálica para fondo de fotos.", diet:[], nutri:null},
  {id:71, name:"Papel Kraft en Rollo", cat:"Fiesta", brand:"FiestaPop", price:285, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHmR_Fyu-gGLB2M18ObABmk2eKWsRMKmqcTKx5K2hYrg&s=10", desc:"Rollo de papel kraft para envolver.", diet:["eco"], nutri:null},
  {id:72, name:"Papel Metalizado 5 Pliegos", cat:"Fiesta", brand:"FiestaPop", price:230, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHGfDFsJGSaQ3osPevWljBODxLdWrBhPPHgoBPCuPGLQ&s=10", desc:"Papel metalizado, 5 pliegos.", diet:[], nutri:null},
  {id:73, name:"Papel de Personajes 5 Pliegos", cat:"Fiesta", brand:"FiestaPop", price:260, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjVeC4OiKuj2aZGT2xTMCUXWlyeAO_096qQwqfIfR1QA&s=10", desc:"Papel de personajes, 5 pliegos.", diet:["personalizable"], nutri:null},
  {id:74, name:"Bolsa de Regalo Grande", cat:"Fiesta", brand:"FiestaPop", price:140, img:"https://m.media-amazon.com/images/I/81vHs0+jSoL._AC_UL480_FMwebp_QL65_.jpg", desc:"Bolsa grande para regalo.", diet:[], nutri:null},
  {id:75, name:"Kit Fiesta Completa 50pzas", cat:"Fiesta", brand:"FiestaPop", price:1155, old:1445, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9iMdjNSwVnfs_-HemDCBwmPr0EhclWGRVJoysdOHpVA&s", popular:1, tag:"Sale", desc:"Kit completo de fiesta de 50 piezas.", diet:[], nutri:null},
  {id:76, name:"Taza de Cerámica 350ml", cat:"Cocina", brand:"CocinaPro", price:285, img:"https://m.media-amazon.com/images/I/71biuU9lzgL._AC_UL480_FMwebp_QL65_.jpg", desc:"Taza de cerámica de 350 ml.", diet:[], nutri:null},
  {id:77, name:"Set de Tazas 4pk", cat:"Cocina", brand:"CocinaPro", price:865, img:"https://m.media-amazon.com/images/I/61EVrfx4xbL._AC_UL480_FMwebp_QL65_.jpg", popular:1, desc:"Set de 4 tazas de cerámica.", diet:[], nutri:null},
  {id:78, name:"Taza Viajera", cat:"Cocina", brand:"CocinaPro", price:460, img:"https://m.media-amazon.com/images/I/41Va7I+K2mS._AC_UL480_FMwebp_QL65_.jpg", new:1, desc:"Taza viajera reutilizable.", diet:["eco"], nutri:null},
  {id:79, name:"Taza de Personaje", cat:"Cocina", brand:"CocinaPro", price:345, img:"https://m.media-amazon.com/images/I/81LSaFR8fZL._AC_UL480_FMwebp_QL65_.jpg", desc:"Taza de personaje para niños.", diet:["personalizable"], nutri:null},
  {id:80, name:"Taza de Peltre", cat:"Cocina", brand:"HogarPlus", price:375, img:"https://m.media-amazon.com/images/I/81uWndRZiIL._AC_UL480_FMwebp_QL65_.jpg", desc:"Taza de peltre tradicional.", diet:[], nutri:null},
  {id:81, name:"Sartén Antiadherente 24cm", cat:"Cocina", brand:"CocinaPro", price:985, img:"https://m.media-amazon.com/images/I/81eGBRdaAbL._AC_UL480_FMwebp_QL65_.jpg", popular:1, desc:"Sartén antiadherente de 24 cm.", diet:[], nutri:null},
  {id:82, name:"Sartén Hondo 28cm", cat:"Cocina", brand:"CocinaPro", price:1155, img:"https://m.media-amazon.com/images/I/61U6ihkoOmL._AC_UL480_FMwebp_QL65_.jpg", desc:"Sartén hondo de 28 cm.", diet:["premium"], nutri:null},
  {id:83, name:"Set de Sartenes 3pzas", cat:"Cocina", brand:"CocinaPro", price:1735, old:2025, img:"https://m.media-amazon.com/images/I/810p9EjwspL._AC_UL480_FMwebp_QL65_.jpg", tag:"Sale", desc:"Set de 3 sartenes antiadherentes.", diet:["premium"], nutri:null},
  {id:84, name:"Comal Redondo", cat:"Cocina", brand:"CocinaPro", price:750, img:"https://m.media-amazon.com/images/I/71lvYaJyL0L._AC_UL480_FMwebp_QL65_.jpg", desc:"Comal redondo para tortillas.", diet:[], nutri:null},
  {id:85, name:"Parrilla Grill", cat:"Cocina", brand:"CocinaPro", price:1100, img:"https://m.media-amazon.com/images/I/7115HBg+IIL._AC_UY327_FMwebp_QL65_.jpg", new:1, desc:"Parrilla grill para carnes.", diet:["premium"], nutri:null},
  {id:86, name:"Set de Platos 12pzas", cat:"Cocina", brand:"HogarPlus", price:1275, img:"https://m.media-amazon.com/images/I/6182Exh37pL._AC_UL480_FMwebp_QL65_.jpg", popular:1, desc:"Set de 12 platos.", diet:[], nutri:null},
  {id:87, name:"Platos Hondos 4pk", cat:"Cocina", brand:"CocinaPro", price:575, img:"https://m.media-amazon.com/images/I/71mHwMwUuEL._AC_UL480_FMwebp_QL65_.jpg", desc:"Platos hondos, 4 piezas.", diet:[], nutri:null},
  {id:88, name:"Platos Desechables 50pk", cat:"Cocina", brand:"FiestaPop", price:375, img:"https://m.media-amazon.com/images/I/81gTRsRKMBL._AC_UL480_FMwebp_QL65_.jpg", desc:"Platos desechables, 50 piezas.", diet:["eco"], nutri:null},
  {id:89, name:"Plato Infantil", cat:"Cocina", brand:"CocinaPro", price:260, img:"https://m.media-amazon.com/images/I/61KIm0lCTAL._AC_UL480_FMwebp_QL65_.jpg", desc:"Plato infantil de personajes.", diet:["bebe"], nutri:null},
  {id:90, name:"Ensaladera Grande", cat:"Cocina", brand:"CocinaPro", price:520, img:"https://m.media-amazon.com/images/I/61rRWWmUmXL._AC_UL480_FMwebp_QL65_.jpg", desc:"Ensaladera grande de vidrio.", diet:[], nutri:null},
  {id:91, name:"Set de Cuchillos 5pzas", cat:"Cocina", brand:"CocinaPro", price:1040, img:"https://m.media-amazon.com/images/I/81B6wJWkA9L._AC_UL480_FMwebp_QL65_.jpg", desc:"Set de 5 cuchillos de cocina.", diet:["premium"], nutri:null},
  {id:92, name:"Tabla para Picar", cat:"Cocina", brand:"CocinaPro", price:430, img:"https://m.media-amazon.com/images/I/81XzeSsY+BL._AC_SY300_SX300_QL70_FMwebp_.jpg", desc:"Tabla de madera para picar.", diet:["eco"], nutri:null},
  {id:93, name:"Set de Cucharones", cat:"Cocina", brand:"CocinaPro", price:520, img:"https://m.media-amazon.com/images/I/615CbF7dxCL._AC_UL480_FMwebp_QL65_.jpg", desc:"Set de cucharones de cocina.", diet:[], nutri:null},
  {id:94, name:"Espátulas de Silicona 3pk", cat:"Cocina", brand:"CocinaPro", price:405, img:"https://m.media-amazon.com/images/I/514OhjcBAbL._AC_UL480_FMwebp_QL65_.jpg", new:1, desc:"Espátulas de silicona, 3 piezas.", diet:[], nutri:null},
  {id:95, name:"Pelador y Rallador", cat:"Cocina", brand:"CocinaPro", price:315, img:"https://m.media-amazon.com/images/I/71YPqeyhH4L._AC_UL480_FMwebp_QL65_.jpg", desc:"Pelador y rallador de verduras.", diet:[], nutri:null},
  {id:96, name:"Envases Herméticos 5pk", cat:"Cocina", brand:"HogarPlus", price:750, img:"https://m.media-amazon.com/images/I/81Ap89R-ajL._AC_UL480_FMwebp_QL65_.jpg", popular:1, desc:"Envases herméticos, 5 piezas.", diet:["eco"], nutri:null},
  {id:97, name:"Toppers de Vidrio 3pk", cat:"Cocina", brand:"CocinaPro", price:865, img:"https://m.media-amazon.com/images/I/716tAiY7kAL._AC_UL480_FMwebp_QL65_.jpg", desc:"Toppers de vidrio, 3 piezas.", diet:["premium"], nutri:null},
  {id:98, name:"Botellas de Agua 3pk", cat:"Cocina", brand:"HogarPlus", price:520, img:"https://m.media-amazon.com/images/I/61SH+QaRzrL._AC_UL480_FMwebp_QL65_.jpg", desc:"Botellas reutilizables, 3 piezas.", diet:["eco"], nutri:null},
  {id:99, name:"Frascos de Cocina 6pk", cat:"Cocina", brand:"CocinaPro", price:635, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeovpMjL6D4LdnrBw15rbl7Gfd9LL5EusVhdo2Msq1b730HOGI17RblRI&s=10", diet:[], nutri:null},
  {id:100, name:"Organizador para Refri", cat:"Cocina", brand:"HogarPlus", price:550, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTA0cIUcu6Vl2YsUJkv0LYOPuPmJ7lkBd6atzJCOJ5iVylXoMB-HTEDnw&s=10", diet:[], nutri:null},
  {id:101, name:"Renta de Silla de Plástico", cat:"Renta", brand:"EventRenta", price:85, img:"https://gruporamos.vtexassets.com/arquivos/ids/176441/1-und-7705152072006.jpg?v=639184524881400000", diet:[], nutri:null},
  {id:102, name:"Renta de Silla Tiffany", cat:"Renta", brand:"EventRenta", price:200, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7bCpQj8lbfnL3rJD1II95hrfjffMy2-gB3DYwGdz1fbQfGZECYP0IlUE&s=10", diet:["premium"], nutri:null},
  {id:103, name:"Renta de Silla Infantil", cat:"Renta", brand:"EventRenta", price:70, img:"https://loscastillos.com.do/wp-content/uploads/2026/07/P000004723_0.png", diet:["bebe"], nutri:null},
  {id:104, name:"Renta de Banca de Jardín", cat:"Renta", brand:"EventRenta", price:520, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuocPplPGuJCzR-yW7gKzZ9a1kbymp7wh-IZqCSj3mzkM_R8uEKQ9Pd5fh&s=10", diet:["eco"], nutri:null},
  {id:105, name:"Paquete 10 Sillas", cat:"Renta", brand:"EventRenta", price:750, img:"https://gruporamos.vtexassets.com/arquivos/ids/176441/1-und-7705152072006.jpg?v=639184524881400000", diet:[], nutri:null},
  {id:106, name:"Paquete 50 Sillas", cat:"Renta", brand:"EventRenta", price:1735, img:"https://gruporamos.vtexassets.com/arquivos/ids/176441/1-und-7705152072006.jpg?v=639184524881400000", diet:["premium"], nutri:null},
  {id:107, name:"Renta de Mesa Redonda", cat:"Renta", brand:"EventRenta", price:575, img:"https://acdn-us.mitiendanube.com/stores/004/757/389/products/mesa-redonda-tienda-f2873cafefab5a905a17565254510193-1024-1024.webp", diet:[], nutri:null},
    {id:108, name:"Renta de Mesa Rectangular", cat:"Renta", brand:"EventRenta", price:520, img:"https://catalogo.divano.com.do/wp-content/uploads/2016/09/products-I12257.jpg", diet:[], nutri:null},
  {id:109, name:"Renta de Mesa Infantil", cat:"Renta", brand:"EventRenta", price:345, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRSXkFo6fTW_9PLH5Fis7utpogWCF3o9wnV87SeEk-dLl9u2Ar2t1ubec&s=10", diet:["bebe"], nutri:null},
  {id:110, name:"Renta de Tablón con Caballetes", cat:"Renta", brand:"EventRenta", price:460, img:"https://dcdn-us.mitiendanube.com/stores/325/316/products/tablon-faa100dfd0a386bcbb17278033851734-1024-1024.webp", diet:[], nutri:null},
  {id:111, name:"Renta de Mesa Alta para Cocktail", cat:"Renta", brand:"EventRenta", price:695, img:"https://mitylite.com/wp-content/uploads/2023/03/Reveal_MAX_Cocktail_1024x1024_42-inch_Round_X-Base.jpg", diet:["premium"], nutri:null},
  {id:112, name:"Paquete Mesa + 10 Sillas", cat:"Renta", brand:"EventRenta", price:1155, old:1445, img:"https://m.media-amazon.com/images/I/71WrqtNAoML._AC_UF894,1000_QL80_.jpg", diet:[], nutri:null},
  {id:113, name:"Mantel Blanco Redondo", cat:"Renta", brand:"EventRenta", price:230, img:"https://alquileresmadhere.com/wp-content/uploads/2024/04/mantel54.png", diet:[], nutri:null},
  {id:114, name:"Mantel de Color Redondo", cat:"Renta", brand:"EventRenta", price:260, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDtbakhK8deUnUFgmQ_DOHtQkn6SHD6rqt409LemyyuaDryvhzTG1ES10&s=10", diet:["personalizable"], nutri:null},
  {id:115, name:"Mantel Rectangular", cat:"Renta", brand:"EventRenta", price:200, img:"https://m.media-amazon.com/images/I/7119sk3-B9L._AC_UF894,1000_QL80_.jpg", diet:[], nutri:null},
  {id:116, name:"Mantel Infantil de Personaje", cat:"Renta", brand:"EventRenta", price:285, img:"https://http2.mlstatic.com/D_NQ_NP_772583-MLM31239246625_062019-O-mantel-personalizado-fiesta-infantil-cualquier-personaje.webp", diet:["personalizable","bebe"], nutri:null},
  {id:117, name:"Cubremantel Transparente", cat:"Renta", brand:"EventRenta", price:170, img:"https://acdn-us.mitiendanube.com/stores/001/820/381/products/d_nq_np_2x_623865-mla96789491666_112025-f-5e2c4b0d1ee6af77ff17665883183734-1024-1024.webp", diet:[], nutri:null},
  {id:118, name:"Servilletas de Tela 10pk", cat:"Renta", brand:"EventRenta", price:345, img:"https://casacuesta.com/media/catalog/product/cache/fde49a4ea9a339628caa0bc56aea00ff/3/3/3351181-1__1762161371.jpg", diet:["premium"], nutri:null},
  {id:119, name:"Cortina Blanca 3x3m", cat:"Renta", brand:"EventRenta", price:750, img:"https://m.media-amazon.com/images/I/814mCUdzlKL._AC_UF894,1000_QL80_.jpg", diet:[], nutri:null},
  {id:120, name:"Cortina de Luces LED", cat:"Renta", brand:"EventRenta", price:925, img:"https://www.lacasadelled.do/wp-content/uploads/2020/11/Cortinas-LED-Para-Exterior-2.jpg", diet:["premium"], nutri:null},
  {id:121, name:"Cortina Metálica", cat:"Renta", brand:"EventRenta", price:405, img:"https://persialux.cl/wp-content/uploads/2024/10/CORTINAS-METALICAS-1.jpg", diet:[], nutri:null},
  {id:122, name:"Fondo para Fotos 2x2m", cat:"Renta", brand:"EventRenta", price:1100, img:"https://img.magnific.com/fotos-premium/marco-tono-neutro-png-fondo-transparente_53876-975558.jpg?semt=ais_hybrid&w=740&q=80", diet:["personalizable","premium"], nutri:null},
  {id:123, name:"Carpa 3x3m", cat:"Renta", brand:"EventRenta", price:1735, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbNGon0rzarUPhp934UiDbVlhedpRJv7POkDkttfC_hw60LsO-TGzLcHc&s=10", diet:["premium"], nutri:null},
  {id:124, name:"Pista de Baile por m²", cat:"Renta", brand:"EventRenta", price:575, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY_xTOJTEPoMLJ-qDqpj7OYW9p5eUmEaoescvg_K7aIMseTBOaxPgQHW0a&s=10", diet:["premium"], nutri:null},
  {id:125, name:"Kit Evento 50 Personas", cat:"Renta", brand:"EventRenta", price:1735, old:2085, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkk0bxIVFqf9Pc2fiEfUA1o_X-LyMZmRgJrRhERpGlSftVk0HvrRzgKDq&s=10", diet:[], nutri:null},
  {id:126, name:"Arreglo Cerveza y Botana", cat:"Arreglos", brand:"Detalles", price:985, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKdyc53iNbyuhtp1O3uzYDEhKY_qP2kMz_PpOkY7OK02CNyN9Ftf_opPk&s=10h", diet:[], nutri:null},
  {id:127, name:"Arreglo Café Gourmet", cat:"Arreglos", brand:"Detalles", price:865, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuFyLW0gn0nx0_0pPgSDN0Be2flbAsxM7iE4_zHC8OU3FUBxgG08RxdtoX&s=10", diet:[], nutri:null},
  {id:128, name:"Arreglo Parrillero", cat:"Arreglos", brand:"Detalles", price:1155, img:"https://i.pinimg.com/originals/f3/1b/a7/f31ba7630002018f195408e4ce14d0c3.jpg", diet:["premium"], nutri:null},
  {id:129, name:"Arreglo Reloj y Cartera", cat:"Arreglos", brand:"Detalles", price:1445, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGL8cer4Nid4UG1VviXW-cgYHWX-BN_6cFE3EOisYbUA&s=10", diet:["premium"], nutri:null},
  {id:130, name:"Arreglo Deportivo", cat:"Arreglos", brand:"Detalles", price:925, img:"https://i.pinimg.com/736x/43/74/62/437462da333299f053ff9f07fc357ce3.jpg", diet:[], nutri:null},
  {id:131, name:"Arreglo 12 Rosas", cat:"Arreglos", brand:"FlorArte", price:1100, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-qsuqB5AmAB3bF2xvd48n5EiTnCcb52Ig8VLlMEwIbweVIkVoyWWcnPQ&s=10", diet:["premium"], nutri:null},
  {id:132, name:"Arreglo de Tulipanes", cat:"Arreglos", brand:"FlorArte", price:985, img:"https://fam18.cdn.imgeng.in/foto_producto/eur_me_prod46_484_Dominicana.jpg?imgeng=/cmpr_0/s_5", diet:["premium"], nutri:null},
  {id:133, name:"Arreglo de Chocolates", cat:"Arreglos", brand:"Detalles", price:865, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdI59wyFpI-QpAfYHh9ELpJ9PMmFCgLUjmqU8xsCpJLd7-JUYZWiiZM2rz&s=10", diet:[], nutri:null},
  {id:134, name:"Arreglo Spa", cat:"Arreglos", brand:"Detalles", price:1155, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPNqf2tRDrlpTncz3k-3htR19Hl_K31eBw_bwdlMJUAnhZIjx9Jmdmqnon&s=10", diet:["premium"], nutri:null},
  {id:135, name:"Canasta Frutas y Flores", cat:"Arreglos", brand:"FlorArte", price:1040, img:"https://www.fiorence.com.mx/cdn/shop/files/01.jpg?v=1716584964", diet:["eco"], nutri:null},
  {id:136, name:"Arreglo Baby Shower Azul", cat:"Arreglos", brand:"Detalles", price:925, img:"https://i.pinimg.com/originals/fc/fc/8a/fcfc8a4aeab7e7c896c3ff7739c5a00d.jpg", diet:["bebe"], nutri:null},
  {id:137, name:"Arreglo Baby Shower Rosa", cat:"Arreglos", brand:"Detalles", price:925, img:"https://i.pinimg.com/originals/05/a8/fd/05a8fd797f788996fe34833663a615fb.jpg", diet:["bebe"], nutri:null},
  {id:138, name:"Arreglo de Pañales", cat:"Arreglos", brand:"Detalles", price:1100, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSYOsGYx5Q_ATUP9lnUe6SK17hDURhJWhy-FRZZ9vZp8bak2Qqm0mdozw&s=10", diet:["bebe"], nutri:null},
  {id:139, name:"Canasta para Bebé", cat:"Arreglos", brand:"Detalles", price:1275, img:"https://i.pinimg.com/736x/7f/a0/7a/7fa07a850ca2f29bce0c0150ac9e6789.jpg", diet:["bebe","premium"], nutri:null},
  {id:140, name:"Peluche con Globo Bebé", cat:"Arreglos", brand:"Detalles", price:750, img:"https://m.media-amazon.com/images/I/61DnKkAY3kL._AC_SX679_.jpg", diet:["bebe"], nutri:null},
  {id:141, name:"Arreglo Dulcero Niño", cat:"Arreglos", brand:"Detalles", price:695, img:"https://m.media-amazon.com/images/I/71EnLk2kxLL._AC_UL480_FMwebp_QL65_.jpg", diet:["personalizable"], nutri:null},
  {id:142, name:"Arreglo Superhéroe", cat:"Arreglos", brand:"Detalles", price:810, img:"https://m.media-amazon.com/images/I/81yn3zdBtIL._AC_UY327_FMwebp_QL65_.jpg", diet:["personalizable"], nutri:null},
  {id:143, name:"Piñata con Dulces", cat:"Arreglos", brand:"FiestaPop", price:985, img:"https://m.media-amazon.com/images/I/71QzVilOhFL._AC_UL480_FMwebp_QL65_.jpg", diet:["personalizable"], nutri:null},
  {id:144, name:"Arreglo de Juguetes", cat:"Arreglos", brand:"Detalles", price:1040, img:"https://m.media-amazon.com/images/I/71fVnUudc4L._AC_UY327_FMwebp_QL65_.jpg", diet:["premium"], nutri:null},
  {id:145, name:"Lonchera Sorpresa", cat:"Arreglos", brand:"Detalles", price:575, img:"https://m.media-amazon.com/images/I/91lt6dFJEhL._AC_UL480_FMwebp_QL65_.jpg", diet:[], nutri:null},
  {id:146, name:"Arreglo Princesa", cat:"Arreglos", brand:"Detalles", price:810, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLrmDcDVnY395Vj3JpX3KjHNlmDHauYdCMhkO04fUOfIngqnofOwSsHlg&s=10", diet:["personalizable"], nutri:null},
  {id:147, name:"Arreglo Muñeca con Accesorios", cat:"Arreglos", brand:"Detalles", price:1100, img:"https://i.pinimg.com/736x/c7/1f/42/c71f42265e7f60c5864261227e408f4b.jpg", diet:["premium"], nutri:null},
  {id:148, name:"Arreglo Unicornio", cat:"Arreglos", brand:"Detalles", price:865, img:"https://i.pinimg.com/736x/df/7d/1c/df7d1c1f966db45838abf691f8d61ab8.jpg", diet:["personalizable"], nutri:null},
  {id:149, name:"Arreglo Maquillaje Niña", cat:"Arreglos", brand:"Detalles", price:985, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROt3ruRdrht9dghbEbeuWc5EaGct-6l1Xs8Liwf5Mth9-p550JtElzBzY&s=10", diet:[], nutri:null},
  {id:150, name:"Corona y Cetro de Princesa", cat:"Arreglos", brand:"Detalles", price:520, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHAb-eInfAQn6ezRkzVR0I8oATpkDLqZxOMFOHkn6Ig&s=10", diet:["personalizable"], nutri:null},
  {id:151, name:"Mochila Escolar", cat:"Escolar", brand:"EscolarPlus", price:1100, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoAi9Me7lghQzN_rnEIIga1FmDL1E-v6nz70dU1Rdasg&s=10", diet:[], nutri:null},
  {id:152, name:"Mochila con Ruedas", cat:"Escolar", brand:"EscolarPlus", price:1445, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2tMTwpFZ0ryVtH8vnHmgTGzND64HDBcbn_3gbFPmwaA&s=10", diet:["premium"], nutri:null},
  {id:153, name:"Mochila Preescolar", cat:"Escolar", brand:"EscolarPlus", price:865, img:"https://cdn.media.amplience.net/s/hottopic/15036853_hi", diet:["bebe"], nutri:null},
  {id:154, name:"Lonchera Térmica", cat:"Escolar", brand:"EscolarPlus", price:575, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCPIVRTAeRgthbAEUPEHblPDHQg55VFwSJeq3iMfqO8Q&s=10", diet:[], nutri:null},
  {id:155, name:"Lapicera", cat:"Escolar", brand:"EscolarPlus", price:345, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5F7I7LCHzaf5FcmZjI2IJikFwOmpsiqfPNjyNuqP1Kg&s=10", diet:["personalizable"], nutri:null},
  {id:156, name:"Cuaderno Rayado 100h", cat:"Escolar", brand:"PapelArte", price:170, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPYuOpiKsfQeO5xJO96AylaDTqYcm7vgmgge9JCNJt-Q&s=10", diet:["eco"], nutri:null},
  {id:157, name:"Cuaderno de Cuadros 100h", cat:"Escolar", brand:"PapelArte", price:170, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDb_QwejyurNWyp3uHP0N13SWO-ALgRlaYrLbLQURzBw&s=10", diet:["eco"], nutri:null},
  {id:158, name:"Cuaderno de Dibujo", cat:"Escolar", brand:"PapelArte", price:200, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH65Kf9uwQf15KT0ZNEmN_9UMEjJS09uGGw40Z0U1KJg&s=10", diet:[], nutri:null},
  {id:159, name:"Libreta de Argollas", cat:"Escolar", brand:"PapelArte", price:285, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR86Vdqi1Vo_TaackCGGWRlGgvpeAgKSQs1Hu1MhrLSMQ&s=10", diet:[], nutri:null},
  {id:160, name:"Pack 5 Cuadernos", cat:"Escolar", brand:"PapelArte", price:750, old:925, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMAUlGFqkSSlsZlesPOgAe3sq6TFmZSnGjZ2DNKTWmOQ&s=10", diet:[], nutri:null},
  {id:161, name:"Lápices 12pk", cat:"Escolar", brand:"PapelArte", price:200, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy8jFkh197yXuuAy91trLw8y_GuX2XdWJyws_4fAwKFQ&s=10", diet:["eco"], nutri:null},
  {id:162, name:"Plumas 10pk", cat:"Escolar", brand:"PapelArte", price:260, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8jTEqu4fjfKMibE77lamTPhNf_0xFTBBmvONxPU73OQ&s=10", diet:[], nutri:null},
  {id:163, name:"Colores 24pk", cat:"Escolar", brand:"PapelArte", price:345, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5BlOU_7OeVGOi_8uwigMs5AcEcVTlvBSfnml1j_0e5Q&s=10", diet:[], nutri:null},
  {id:164, name:"Plumones 12pk", cat:"Escolar", brand:"PapelArte", price:375, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8SgzPmFHG8R7n3T2yZvaN5nK2_ZDxmqd3MjjPOhZ3Xg&s=10", diet:[], nutri:null},
  {id:165, name:"Kit de Geometría", cat:"Escolar", brand:"PapelArte", price:285, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEg5fy-brRKSDpfZwVaex-RldXPhfFtzDtVoKNPygqEQ&s=10", diet:[], nutri:null},
  {id:166, name:"Kit Mochila con Útiles", cat:"Escolar", brand:"EscolarPlus", price:1735, old:2025, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHNoapfkA6u8RUUbdR2sEGy5IJUTjWEGDz9ZJumey6U7psUdmSrQSL5oM&s=10", popular:1, tag:"Sale", desc:"Kit de mochila con útiles completos.", diet:["premium"], nutri:null},
  {id:167, name:"Tijeras Escolares", cat:"Escolar", brand:"PapelArte", price:140, img:"https://cdn.almacen.do/2021/06/Tijeras-Escolar-Beifa-Front.jpg", diet:["bebe"], nutri:null},
  {id:168, name:"Pegamento en Barra", cat:"Escolar", brand:"PapelArte", price:230, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU4lntriMn5idCnr0x6qU-lYcaZqFN_Biun72zcJiCL5JNdXRdp0jrXo5n&s=10", diet:[], nutri:null},
  {id:169, name:"Hojas Blancas 500pk", cat:"Escolar", brand:"PapelArte", price:520, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPk-jFsKzsXPvNqvtphDBaHBQmiQKmY4MZtCZlPTPxOA&s=10", diet:["eco"], nutri:null},
  {id:170, name:"Folders 10pk", cat:"Escolar", brand:"PapelArte", price:285, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyIud2XEywE_dUMEhUxR7e7xJ4IJJ8kAhY0FStiE1SXA&s=10", diet:[], nutri:null},
  {id:171, name:"Cartulina 20 Pliegos", cat:"Escolar", brand:"PapelArte", price:315, img:"https://distribuidor.dimeiggs.cl/cdn/shop/files/371398_800x.jpg?v=1717358248", diet:[], nutri:null},
  {id:172, name:"Acuarelas", cat:"Escolar", brand:"PapelArte", price:405, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5eVhNHwxSFqRxoCUnIxqyTZW89PcizSWRsdyav7bXdw&s=10", diet:["eco"], nutri:null},
  {id:173, name:"Plastilina 12 Colores", cat:"Escolar", brand:"PapelArte", price:260, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBnHmwPRH3r3qVzNEphxTPeniF7UhbibEohn5eu2g2_w&s=10", diet:["bebe"], nutri:null},
  {id:174, name:"Calculadora Básica", cat:"Escolar", brand:"EscolarPlus", price:575, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXHGs-iVUYCz3tELKKtKuLpTkmyVXzOx-XTyfSrON2Ag&s=10", diet:[], nutri:null},
  {id:175, name:"Pizarra Blanca 60x40", cat:"Escolar", brand:"EscolarPlus", price:810, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt8LNKiD61B7E8CKSDGEfYRlAuJNbTUItFk6kQJARAmw&s=10", diet:["premium"], nutri:null},
];

const BANNERS = [
  {t:"Todo para tu Fiesta", s:"Globos, dulceros y decoración al mejor precio.", icon:"party"},
  {t:"Renta para tus Eventos", s:"Sillas, mesas, manteles y cortinas.", icon:"tent"},
  {t:"Regreso a Clases", s:"Mochilas, cuadernos y papelería.", icon:"backpack"}
];

/* ============ STATE ============ */
let cart = [];
try { cart = JSON.parse(localStorage.getItem('asfer_cart_v2') || '[]'); } catch(e){ cart = []; }
let filters = { cat:new Set(), brand:new Set(), diet:new Set(), price:3000 };
let lastSearch = "";
let heroIdx = 0, heroTimer = null;
let pdQty = 1;

function saveCart(){ try { localStorage.setItem('asfer_cart_v2', JSON.stringify(cart)); } catch(e){} }
function money(n){ return 'RD$' + n.toLocaleString('en-US',{minimumFractionDigits:2, maximumFractionDigits:2}); }
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

/* ============ IMÁGENES (SVG sprite en img/icons.svg) ============
   Cada producto muestra una imagen según su nombre/categoría.
   Para usar una FOTO real en un producto, agrégale el campo
   img:"img/mi-foto.jpg" (o una URL https) y se mostrará sola. */
function icon(name, cls){ return '<svg class="'+(cls||"thumb-icon")+'" aria-hidden="true"><use href="img/icons.svg#i-'+name+'"></use></svg>'; }
function thumbHTML(p, cls){
  if (p.img) return '<img class="thumb-photo" src="'+p.img+'" alt="'+esc(p.name)+'">';
  return icon(productIcon(p), cls);
}
function productIcon(p){
  const n = (p.name||"").toLowerCase();
  const has = (...ws) => ws.some(w => n.includes(w));
  if ((p.cat==="Niños"||p.cat==="Niñas") && (p.diet||[]).includes("bebe")) return "onesie";
  if (has("vestido","falda")) return "dress";
  if (has("princesa","corona","cetro")) return "crown";
  if (has("disfraz","superh")) return "mask";
  if (has("uniforme")) return "uniform";
  if (has("chamarra","sudadera","suéter","sueter")) return "jacket";
  if (has("pantalón","pantalon","leggings")) return "pants";
  if (has("playera","camiseta","conjunto","camisa","blusa")) return "shirt";
  if (has("traje de baño","short","bermuda")) return "shorts";
  if (has("pijama")) return "moon";
  if (has("zapatos","tenis","zapatillas")) return "shoe";
  if (has("calcet")) return "socks";
  if (has("gorra","diadema")) return "cap";
  if (has("muñeca","muneca")) return "doll";
  if (has("peluche","juguete")) return "teddy";
  if (has("maquillaje","labial")) return "lipstick";
  if (has("mochila")) return "backpack";
  if (has("lonchera")) return "basket";
  if (has("lapicera")) return "pencil";
  if (has("cuaderno","libreta")) return "notebook";
  if (has("lápices","lapices")) return "pencil";
  if (has("plumas","plumones")) return "pen";
  if (has("colores")) return "pencil";
  if (has("geometría","geometria")) return "ruler";
  if (has("tijeras")) return "scissors";
  if (has("pegamento")) return "glue";
  if (has("hojas")) return "paper";
  if (has("folder")) return "folder";
  if (has("cartulina","acuarela","plastilina")) return "palette";
  if (has("calculadora")) return "calculator";
  if (has("pizarra")) return "board";
  if (has("globo","arco")) return "balloon";
  if (has("piñata","pinata")) return "pinata";
  if (has("funda")) return "giftbag";
  if (has("cajita","canasta")) return "basket";
  if (has("letrero","bander")) return "sign";
  if (p.cat==="Fiesta" && has("cortina")) return "sparkles";
  if (has("papel","pliego","kraft","rollo","bolsa de regalo")) return "wrap";
  if (has("kit fiesta")) return "party";
  if (has("taza")) return "mug";
  if (has("sartén","sarten","comal","parrilla","grill")) return "pan";
  if (has("plato","ensaladera")) return "plate";
  if (has("cuchillo")) return "knife";
  if (has("tabla")) return "cutboard";
  if (has("cuchar","espátula","espatula","pelador","rallador")) return "spoon";
  if (has("envase","topper","frasco","organizador")) return "jar";
  if (has("botella")) return "bottle";
  if (has("silla","banca")) return "chair";
  if (has("mesa","tablón","tablon")) return "table";
  if (has("mantel","servilleta","cubremantel")) return "tablecloth";
  if (has("luces","led")) return "lights";
  if (has("cortina","fondo para fotos")) return "curtain";
  if (has("carpa")) return "tent";
  if (has("pista")) return "music";
  if (has("kit evento","paquete")) return "package";
  if (has("cerveza")) return "mug";
  if (has("café","cafe")) return "mug";
  if (has("reloj","cartera")) return "watch";
  if (has("deport")) return "ball";
  if (has("rosa","tulip","flor")) return "rose";
  if (has("chocolate","dulce","dulcero")) return "chocolate";
  if (has("spa")) return "spa";
  if (has("fruta")) return "basket";
  if (has("baby shower")) return "baby";
  if (has("pañal","panales")) return "onesie";
  const byCat = {"Niños":"shirt","Niñas":"dress","Fiesta":"balloon","Cocina":"mug","Renta":"chair","Arreglos":"gift","Escolar":"notebook"};
  return byCat[p.cat] || "gift";
}

/* ============ THEME ============ */
function initTheme(){
  const saved = localStorage.getItem('asfer_theme');
  if (saved === 'dark') document.documentElement.setAttribute('data-theme','dark');
  else if (saved === 'light') document.documentElement.setAttribute('data-theme','light');
  updateThemeBtn();
}
function toggleTheme(){
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('asfer_theme', next);
  updateThemeBtn();
}
function updateThemeBtn(){
  const b = document.getElementById('themeBtn');
  if (!b) return;
  b.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
}

/* ============ NAV / MEGA MENU (sin bugs con "&") ============ */
function buildCatMenu(){
  const ul = document.getElementById('catList');
  ul.innerHTML = Object.keys(CATEGORIES).map(cat => `
    <li>
      <a href="#" data-cat="${esc(cat)}">${esc(cat)}</a>
      <div class="megamenu">${CATEGORIES[cat].map(sub => `<a href="#" data-cat="${esc(cat)}">${esc(sub)}</a>`).join('')}</div>
    </li>`).join('');
  // Delegación con data-cat: evita problemas con nombres con "&" o espacios
  ul.querySelectorAll('a[data-cat]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      filterByCategory(a.dataset.cat);
    });
  });
}
function filterByCategory(cat){
  filters.cat = new Set([cat]);
  lastSearch = "";
  document.getElementById('searchInput').value = "";
  document.querySelector('.catbar')?.classList.remove('mshow');
  showView('products');
  renderFilterPanels();
  renderProducts();
}

/* ============ VIEW ROUTING ============ */
function showView(name){
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + name).classList.add('active');
  window.scrollTo({ top:0, behavior:'smooth' });
}
function doSearch(){
  lastSearch = document.getElementById('searchInput').value.trim();
  showView('products');
  renderProducts();
}

/* ============ HERO CAROUSEL ============ */
function buildHero(){
  const hero = document.getElementById('hero'), dots = document.getElementById('heroDots');
  hero.querySelectorAll('.slide').forEach(s => s.remove());
  hero.insertAdjacentHTML('afterbegin', BANNERS.map((b,i) => `
    <div class="slide ${i===0?'active':''}">
      <div class="content">
        <span>${icon(b.icon,"hero-icon")}</span>
        <h2>${esc(b.t)}</h2><p>${esc(b.s)}</p>
        <button class="btn btn-primary" data-goto="products">Comprar ahora</button>
      </div>
    </div>`).join(''));
  hero.querySelectorAll('[data-goto]').forEach(btn => btn.addEventListener('click', () => showView('products')));
  dots.innerHTML = BANNERS.map((_,i) => `<span class="${i===0?'active':''}" data-i="${i}"></span>`).join('');
  dots.querySelectorAll('span').forEach(d => d.addEventListener('click', () => goHero(+d.dataset.i)));
  restartHeroTimer();
}
function goHero(i){
  heroIdx = (i + BANNERS.length) % BANNERS.length;
  document.querySelectorAll('.slide').forEach((s,idx) => s.classList.toggle('active', idx === heroIdx));
  document.querySelectorAll('#heroDots span').forEach((s,idx) => s.classList.toggle('active', idx === heroIdx));
}
function heroNext(){ goHero(heroIdx + 1); }
function heroPrev(){ goHero(heroIdx - 1); }
function restartHeroTimer(){
  clearInterval(heroTimer);
  heroTimer = setInterval(() => goHero(heroIdx + 1), 5000);
}

/* ============ PRODUCT CARD ============ */
function cardHTML(p){
  return `<div class="card" data-id="${p.id}" tabindex="0">
    <div class="thumb">${p.tag ? `<span class="tag">${esc(p.tag)}</span>` : ''}${thumbHTML(p)}</div>
    <div class="info">
      <span class="cat">${esc(p.cat)}</span>
      <span class="name">${esc(p.name)}</span>
      <div class="price-row">
        <span>${p.old ? `<span class="old-price">${money(p.old)}</span>` : ''}<span class="price">${money(p.price)}</span></span>
        <button class="addbtn" data-add="${p.id}" title="Agregar al carrito">+</button>
      </div>
    </div></div>`;
}
function bindCards(scope){
  scope.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => openProduct(+card.dataset.id));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter') openProduct(+card.dataset.id); });
  });
  scope.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', (e) => { e.stopPropagation(); addToCart(+btn.dataset.add, 1); });
  });
}
function renderHome(){
  const pop = document.getElementById('popularGrid');
  const neu = document.getElementById('newGrid');
  pop.innerHTML = PRODUCTS.filter(p => p.popular).map(cardHTML).join('');
  neu.innerHTML = PRODUCTS.filter(p => p.new).map(cardHTML).join('');
  bindCards(pop); bindCards(neu);
}

/* ============ FILTER PANEL ============ */
function renderFilterPanels(){
  const brands = [...new Set(PRODUCTS.map(p => p.brand))];
  const fc = document.getElementById('fCategory');
  const fb = document.getElementById('fBrand');
  const fd = document.getElementById('fDiet');
  fc.innerHTML = Object.keys(CATEGORIES).map(c =>
    `<label><input type="checkbox" data-type="cat" value="${esc(c)}" ${filters.cat.has(c)?'checked':''}>${esc(c)}</label>`).join('');
  fb.innerHTML = brands.map(b =>
    `<label><input type="checkbox" data-type="brand" value="${esc(b)}" ${filters.brand.has(b)?'checked':''}>${esc(b)}</label>`).join('');
  fd.innerHTML = ['bebe','uniforme','premium','eco','personalizable'].map(d =>
    `<label><input type="checkbox" data-type="diet" value="${d}" ${filters.diet.has(d)?'checked':''}>${d}</label>`).join('');
  [fc, fb, fd].forEach(box => box.querySelectorAll('input').forEach(inp => {
    inp.addEventListener('change', () => {
      const set = filters[inp.dataset.type];
      inp.checked ? set.add(inp.value) : set.delete(inp.value);
      renderProducts();
    });
  }));
}
function resetFilters(){
  filters = { cat:new Set(), brand:new Set(), diet:new Set(), price:3000 };
  lastSearch = "";
  document.getElementById('searchInput').value = "";
  document.getElementById('fPrice').value = 3000;
  document.getElementById('sortSel').value = "relevance";
  renderFilterPanels();
  renderProducts();
}

function renderProducts(){
  const titleEl = document.getElementById('listingTitle');
  if (lastSearch) titleEl.textContent = `Resultados para "${lastSearch}"`;
  else if (filters.cat.size === 1) titleEl.textContent = [...filters.cat][0];
  else if (filters.cat.size > 1) titleEl.textContent = "Productos filtrados";
  else titleEl.textContent = "Todos los productos";

  const priceInput = document.getElementById('fPrice');
  document.getElementById('fPriceVal').textContent = priceInput.value;
  filters.price = +priceInput.value;

  const q = lastSearch.toLowerCase();
  let list = PRODUCTS.filter(p => {
    if (filters.cat.size && !filters.cat.has(p.cat)) return false;
    if (filters.brand.size && !filters.brand.has(p.brand)) return false;
    if (filters.diet.size && ![...filters.diet].every(d => p.diet.includes(d))) return false;
    if (p.price > filters.price) return false;
    if (q && !p.name.toLowerCase().includes(q)) return false;
    return true;
  });
  const sort = document.getElementById('sortSel').value;
  if (sort === 'lohi') list = list.slice().sort((a,b) => a.price - b.price);
  if (sort === 'hilo') list = list.slice().sort((a,b) => b.price - a.price);

  document.getElementById('resultCount').textContent = list.length + ' productos';
  const grid = document.getElementById('listingGrid');
  grid.innerHTML = list.map(cardHTML).join('') || '<p style="color:var(--gray)">Ningún producto coincide con estos filtros.</p>';
  bindCards(grid);
}

/* ============ PRODUCT DETAIL + RELACIONADOS ============ */
function openProduct(id){
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  pdQty = 1;
  const related = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  document.getElementById('pdContent').innerHTML = `
    <div class="pd-grid">
      <div>
        <div class="pd-visual">${p.tag ? `<span class="tag" style="position:absolute;margin:12px">${esc(p.tag)}</span>` : ''}${thumbHTML(p,"pd-icon")}</div>
        ${p.nutri ? `<h4 style="margin-top:14px;font-size:13px;color:var(--gray)">INFORMACIÓN NUTRICIONAL</h4>
        <table class="nutri-table">${Object.entries(p.nutri).map(([k,v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}</table>` : ''}
      </div>
      <div>
        <span class="cat" style="font-size:12px;color:var(--gray);text-transform:uppercase">${esc(p.cat)} · ${esc(p.brand)}</span>
        <h2 style="margin:6px 0">${esc(p.name)}</h2>
        <div style="font-size:22px;font-weight:700">${money(p.price)} ${p.old ? `<span class="old-price" style="font-size:14px">${money(p.old)}</span>` : ''}</div>
        <p style="margin:12px 0;color:var(--gray);font-size:14px">${esc(p.desc || 'Producto de calidad ASFERmart, fresco y al mejor precio.')}</p>
        <div class="chip-row">${p.diet.map(d => `<span class="chip">${esc(d)}</span>`).join('') || '<span class="chip">general</span>'}</div>
        <div class="qty-selector">
          <button id="pdMinus">−</button><strong id="pdQtyVal">1</strong><button id="pdPlus">+</button>
        </div>
        <button class="btn btn-primary" id="pdAdd" style="width:100%">Agregar al carrito · <span id="pdTotal">${money(p.price)}</span></button>
      </div>
    </div>
    ${related.length ? `<h3 style="margin:20px 0 12px">También te puede gustar</h3><div class="grid" id="pdRelated">${related.map(cardHTML).join('')}</div>` : ''}`;
  const upd = () => {
    document.getElementById('pdQtyVal').textContent = pdQty;
    document.getElementById('pdTotal').textContent = money(p.price * pdQty);
  };
  document.getElementById('pdMinus').onclick = () => { if (pdQty > 1) pdQty--; upd(); };
  document.getElementById('pdPlus').onclick = () => { pdQty++; upd(); };
  document.getElementById('pdAdd').onclick = () => { addToCart(p.id, pdQty); closeModal(); };
  const rel = document.getElementById('pdRelated');
  if (rel) bindCards(rel);
  document.getElementById('pdModal').classList.add('open');
  document.getElementById('overlayBg').classList.add('open');
}

/* ============ CART ============ */
function addToCart(id, qty = 1){
  const p = PRODUCTS.find(x => x.id === id);
  const line = cart.find(l => l.id === id);
  line ? line.qty += qty : cart.push({ id, qty });
  saveCart(); renderCart();
  toast(`${p.name} agregado al carrito`);
  toggleCart(true);
}
function changeQty(id, delta){
  const line = cart.find(l => l.id === id);
  if (!line) return;
  line.qty += delta;
  if (line.qty <= 0) cart = cart.filter(l => l.id !== id);
  saveCart(); renderCart();
}
function removeLine(id){ cart = cart.filter(l => l.id !== id); saveCart(); renderCart(); }
function cartTotal(){ return cart.reduce((s,l) => s + PRODUCTS.find(p => p.id === l.id).price * l.qty, 0); }
function shippingCost(){ const t = cartTotal(); return t === 0 ? 0 : (t >= 2000 ? 0 : 250); }

function renderCart(){
  const count = cart.reduce((s,l) => s + l.qty, 0);
  document.getElementById('cartBadge').textContent = count;
  document.getElementById('cartSubtotal').textContent = money(cartTotal());
  const ship = shippingCost();
  document.getElementById('shipNote').textContent =
    cartTotal() >= 2000 ? "🎉 ¡Tienes ENVÍO GRATIS!" :
    cart.length ? `Agrega ${money(2000 - cartTotal())} más para envío gratis (envío ${money(ship)})` :
    "Envío gratis en pedidos sobre RD$2,000.";
  document.getElementById('cartItems').innerHTML = cart.length ? cart.map(l => {
    const p = PRODUCTS.find(x => x.id === l.id);
    return `<div class="cart-line">
      <div class="thumb">${thumbHTML(p)}</div>
      <div class="meta">
        <div class="name">${esc(p.name)}</div>
        <div style="font-size:12.5px;color:var(--gray)">${money(p.price)} c/u</div>
        <div class="qty"><button data-dec="${p.id}">−</button><span>${l.qty}</span><button data-inc="${p.id}">+</button>
        <a class="remove-x" data-del="${p.id}" style="margin-left:8px">quitar</a></div>
      </div>
      <div style="font-weight:700;font-size:13.5px">${money(p.price * l.qty)}</div>
    </div>`;
  }).join('') : '<p style="color:var(--gray);padding:20px 0;text-align:center">Tu carrito está vacío.</p>';
  document.querySelectorAll('[data-inc]').forEach(b => b.onclick = () => changeQty(+b.dataset.inc, 1));
  document.querySelectorAll('[data-dec]').forEach(b => b.onclick = () => changeQty(+b.dataset.dec, -1));
  document.querySelectorAll('[data-del]').forEach(b => b.onclick = () => removeLine(+b.dataset.del));
}
function toggleCart(open){
  document.getElementById('cartDrawer').classList.toggle('open', open);
  document.getElementById('overlayBg').classList.toggle('open', open);
}
function closeModal(){
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('open'));
  if (!document.getElementById('cartDrawer').classList.contains('open'))
    document.getElementById('overlayBg').classList.remove('open');
}

/* ============ AUTH (demo con localStorage) ============ */
function openAuth(mode){
  const html = {
    login:`<h2>Inicia sesión en ASFER</h2><p style="color:var(--gray);font-size:13.5px;margin:6px 0 18px">¡Bienvenido de nuevo! Accede a tus pedidos y listas.</p>
      <div class="field"><label>Correo electrónico</label><input id="authEmail" type="email" placeholder="tu@correo.com"></div>
      <div class="field"><label>Contraseña</label><input id="authPass" type="password" placeholder="••••••••"></div>
      <button class="btn btn-primary" style="width:100%" id="authGo">Iniciar sesión</button>
      <p style="font-size:13px;margin-top:12px;text-align:center">
        <a href="#" id="goForgot" style="color:var(--red)">¿Olvidaste tu contraseña?</a> ·
        <a href="#" id="goReg" style="color:var(--red)">Crear cuenta</a></p>`,
    register:`<h2>Crea tu cuenta</h2><p style="color:var(--gray);font-size:13.5px;margin:6px 0 18px">Únete a ASFERmart en segundos.</p>
      <div class="field"><label>Nombre completo</label><input id="authName" type="text" placeholder="María Pérez"></div>
      <div class="field"><label>Correo electrónico</label><input id="authEmail" type="email" placeholder="tu@correo.com"></div>
      <div class="field"><label>Contraseña</label><input id="authPass" type="password" placeholder="Crea una contraseña"></div>
      <button class="btn btn-primary" style="width:100%" id="authGo">Registrarse</button>
      <p style="font-size:13px;margin-top:12px;text-align:center">¿Ya tienes cuenta? <a href="#" id="goLogin" style="color:var(--red)">Inicia sesión</a></p>`,
    forgot:`<h2>Restablece tu contraseña</h2><p style="color:var(--gray);font-size:13.5px;margin:6px 0 18px">Escribe tu correo y te enviaremos instrucciones.</p>
      <div class="field"><label>Correo electrónico</label><input id="authEmail" type="email" placeholder="tu@correo.com"></div>
      <button class="btn btn-primary" style="width:100%" id="authGo">Enviar enlace</button>
      <p style="font-size:13px;margin-top:12px;text-align:center"><a href="#" id="goLogin2" style="color:var(--red)">Volver a iniciar sesión</a></p>`
  };
  document.getElementById('authContent').innerHTML = html[mode] || html.login;
  document.getElementById('authModal').classList.add('open');
  document.getElementById('overlayBg').classList.add('open');
  const go = (m) => (e) => { e.preventDefault(); openAuth(m); };
  document.getElementById('goForgot') && (document.getElementById('goForgot').onclick = go('forgot'));
  document.getElementById('goReg') && (document.getElementById('goReg').onclick = go('register'));
  document.getElementById('goLogin') && (document.getElementById('goLogin').onclick = go('login'));
  document.getElementById('goLogin2') && (document.getElementById('goLogin2').onclick = go('login'));
  document.getElementById('authGo').onclick = () => {
    const email = document.getElementById('authEmail')?.value.trim();
    if (!email || !email.includes('@')) { document.getElementById('authEmail').classList.add('invalid'); toast('Escribe un correo válido'); return; }
    if (mode === 'register') localStorage.setItem('asfer_user', JSON.stringify({ email, name: document.getElementById('authName')?.value || 'Cliente' }));
    else localStorage.setItem('asfer_user', JSON.stringify({ email }));
    closeModal();
    toast(mode === 'login' ? 'Sesión iniciada correctamente' : mode === 'register' ? '¡Cuenta creada, bienvenido a ASFER!' : 'Enlace enviado (demostración)');
  };
}

/* ============ CHECKOUT ============ */
let ckStep = 1;
let ckData = {};
function startCheckout(){
  if (!cart.length){ toast('Tu carrito está vacío'); return; }
  ckStep = 1; ckData = {};
  toggleCart(false);
  renderCheckout();
  document.getElementById('checkoutModal').classList.add('open');
  document.getElementById('overlayBg').classList.add('open');
}
function renderCheckout(){
  const steps = `<div class="steps">${[1,2,3].map(n => `<div class="${ckStep >= n ? 'done' : ''}"></div>`).join('')}</div>`;
  let body = '';
  if (ckStep === 1){
    body = `<h2>Datos de envío</h2>${steps}
      <div class="field"><label>Nombre completo</label><input id="ckName" placeholder="María Pérez" value="${esc(ckData.name || '')}"></div>
      <div class="field"><label>Dirección</label><input id="ckAddr" placeholder="Av. Winston Churchill 123" value="${esc(ckData.addr || '')}"></div>
      <div class="field"><label>Ciudad</label><input id="ckCity" placeholder="Santo Domingo" value="${esc(ckData.city || '')}"></div>
      <button class="btn btn-primary" style="width:100%" id="ckNext1">Continuar al pago</button>`;
  } else if (ckStep === 2){
    body = `<h2>Pago</h2>${steps}
      <div class="field"><label>Número de tarjeta</label><input id="ckCard" inputmode="numeric" placeholder="4242 4242 4242 4242"></div>
      <div style="display:flex;gap:10px">
        <div class="field" style="flex:1"><label>Vencimiento</label><input id="ckExp" placeholder="MM/AA"></div>
        <div class="field" style="flex:1"><label>CVC</label><input id="ckCvc" inputmode="numeric" placeholder="123"></div>
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn btn-outline" id="ckBack" style="flex:1">Atrás</button>
        <button class="btn btn-primary" id="ckNext2" style="flex:2">Revisar pedido</button>
      </div>`;
  } else {
    const sub = cartTotal(), ship = shippingCost();
    body = `<h2>Revisa y confirma</h2>${steps}
      <div style="border:1px solid var(--line);border-radius:10px;padding:12px;margin-bottom:14px;max-height:180px;overflow-y:auto">
      ${cart.map(l => { const p = PRODUCTS.find(x => x.id === l.id); return `<div style="display:flex;justify-content:space-between;font-size:13.5px;padding:4px 0">${esc(p.name)} × ${l.qty}<span>${money(p.price * l.qty)}</span></div>`; }).join('')}
      <div style="display:flex;justify-content:space-between;font-size:13px;padding:4px 0;color:var(--gray)">Envío<span>${ship === 0 ? 'GRATIS' : money(ship)}</span></div>
      </div>
      <div class="subtotal-row"><span>Total</span><span>${money(sub + ship)}</span></div>
      <div style="display:flex;gap:10px">
        <button class="btn btn-outline" id="ckBack" style="flex:1">Atrás</button>
        <button class="btn btn-primary" id="ckPlace" style="flex:2">Confirmar pedido</button>
      </div>`;
  }
  document.getElementById('checkoutContent').innerHTML = body;
  if (ckStep === 1) document.getElementById('ckNext1').onclick = () => {
    const name = document.getElementById('ckName').value.trim();
    const addr = document.getElementById('ckAddr').value.trim();
    const city = document.getElementById('ckCity').value.trim();
    if (!name || !addr || !city){ toast('Completa los datos de envío'); return; }
    ckData = { name, addr, city }; ckStep = 2; renderCheckout();
  };
  if (ckStep === 2){
    document.getElementById('ckBack').onclick = () => { ckStep = 1; renderCheckout(); };
    document.getElementById('ckNext2').onclick = () => {
      const card = document.getElementById('ckCard').value.replace(/\s/g,'');
      if (card.length < 12){ toast('Escribe un número de tarjeta válido (demo: 4242...)'); return; }
      ckStep = 3; renderCheckout();
    };
  }
  if (ckStep === 3){
    document.getElementById('ckBack').onclick = () => { ckStep = 2; renderCheckout(); };
    document.getElementById('ckPlace').onclick = placeOrder;
  }
}
function placeOrder(){
  const orderId = 'ASF-' + Math.floor(100000 + Math.random() * 900000);
  const total = cartTotal() + shippingCost();
  cart = []; saveCart(); renderCart();
  document.getElementById('checkoutContent').innerHTML = `
    <div class="success-box">
      <div class="success-icon">✅</div>
      <h2>¡Gracias${ckData.name ? ', ' + esc(ckData.name.split(' ')[0]) : ''}!</h2>
      <p style="color:var(--gray);margin:8px 0">Pedido <strong>${orderId}</strong> confirmado por <strong>${money(total)}</strong>.<br>Confirmación enviada a tu correo (demostración).</p>
      <button class="btn btn-primary" style="width:100%;margin-top:12px" id="ckDone">Seguir comprando</button>
    </div>`;
  document.getElementById('ckDone').onclick = () => { closeModal(); showView('home'); };
}

/* ============ NEWSLETTER / MISC ============ */
function subscribeNews(e){
  e.preventDefault();
  const inp = document.getElementById('newsEmail');
  if (!inp.value.includes('@')){ toast('Escribe un correo válido'); return; }
  toast('¡Gracias por suscribirte! 🎉');
  inp.value = '';
}

/* ============ TOAST ============ */
let toastTimer;
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  buildCatMenu();
  buildHero();
  renderHome();
  renderFilterPanels();
  renderProducts();
  renderCart();
  document.getElementById('year').textContent = new Date().getFullYear();

  document.getElementById('searchInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') doSearch(); });
  document.getElementById('fPrice').addEventListener('input', renderProducts);
  document.getElementById('sortSel').addEventListener('change', renderProducts);
  document.getElementById('heroPrev').addEventListener('click', () => { heroPrev(); restartHeroTimer(); });
  document.getElementById('heroNext').addEventListener('click', () => { heroNext(); restartHeroTimer(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape'){ closeModal(); toggleCart(false); } });
});
