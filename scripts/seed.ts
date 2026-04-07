import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../src/models/Product.js';

dotenv.config();

const productsData = {
  products: [
    {"id":1,"name":"Nike Air Zoom Pegasus 40","price":12999,"originalPrice":15999,"description":"Premium running shoes with responsive cushioning and breathable mesh upper for everyday runs.","material":"Nike","category":"Running","weight":"280g","image":"https://images-cdn.ubuy.co.in/6778cff3cc16e416c720980e-nike-men-39-s-low-top-running-shoe-0.jpg","rating":4.5,"reviews":128,"dailyWear":true},
    {"id":2,"name":"Adidas Ultraboost 23","price":18999,"description":"High-performance running shoe with Boost midsole for incredible energy return.","material":"Adidas","category":"Running","weight":"290g","image":"https://rukminim2.flixcart.com/image/480/640/xif0q/shoe/t/v/v/-original-imah4a5dkzezrbtr.jpeg?q=90","rating":4.8,"reviews":89},
    {"id":3,"name":"Puma Velocity Nitro 2","price":9999,"originalPrice":12999,"description":"Lightweight running shoe with NITRO foam for optimal cushioning and speed.","material":"Puma","category":"Running","weight":"265g","image":"https://d1i8d6ce8wwubf.cloudfront.net/photos/28/65/407977_21622_XXL.jpg","rating":4.3,"reviews":256,"dailyWear":true},
    {"id":4,"name":"Under Armour HOVR Sonic 5","price":14999,"description":"Running shoes with HOVR technology for zero gravity feel and smooth stride.","material":"Under Armour","category":"Running","weight":"275g","image":"https://5.imimg.com/data5/SELLER/Default/2024/8/439497959/XC/IV/FR/102860792/whatsapp-image-2024-07-31-at-8-26-08-pm-500x500.jpeg","rating":4.7,"reviews":67},
    {"id":5,"name":"Nike Air Jordan Max Aura 4","price":11999,"originalPrice":14999,"description":"High-top basketball shoes with Air cushioning and premium leather upper.","material":"Nike","category":"Basketball","weight":"420g","image":"https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/00927f4e-6a1a-48e3-9e98-041588e89635/JORDAN+MAX+AURA+4.png","rating":4.6,"reviews":192,"dailyWear":true},
    {"id":6,"name":"Adidas Dame 9","price":15999,"description":"Lightweight basketball shoes with Bounce cushioning for explosive moves.","material":"Adidas","category":"Basketball","weight":"380g","image":"https://cdn.runrepeat.com/storage/gallery/product_content/40347/adidas-dame-9-laces-22690812-main.jpg","rating":4.9,"reviews":305},
    {"id":7,"name":"Puma Clyde All-Pro","price":10999,"description":"Performance basketball shoes with PROFOAM midsole for court dominance.","material":"Puma","category":"Basketball","weight":"390g","image":"https://assets.ajio.com/medias/sys_master/root/20231207/nDmD/6571e160ddf7791519b9660d/-1117Wx1400H-469534236-blue-MODEL.jpg","rating":4.4,"reviews":178,"dailyWear":true},
    {"id":8,"name":"Under Armour Curry 10","price":18999,"description":"Signature basketball shoes with Flow technology for unlimited court control.","material":"Under Armour","category":"Basketball","weight":"360g","image":"https://cdn.runrepeat.com/storage/gallery/product_content/39311/under-armour-curry-10-review-20323160-main.jpg","rating":4.7,"reviews":145},
    {"id":9,"name":"Nike Mercurial Superfly 9","price":15999,"originalPrice":18999,"description":"Elite football boots with Flyknit upper and aerodynamic studs for speed.","material":"Nike","category":"Football","weight":"210g","image":"https://rukmini1.flixcart.com/image/1500/1500/xif0q/shoe/e/2/7/-original-imah9mg9tajusgw8.jpeg?q=70","rating":4.8,"reviews":98},
    {"id":10,"name":"Adidas Predator Edge+","price":19999,"description":"Professional football boots with Zone Skin for enhanced ball control.","material":"Adidas","category":"Football","weight":"220g","image":"https://preview.thenewsmarket.com/Previews/ADID/StillAssets/1920x1080/708976_v2.jpg","rating":4.9,"reviews":76},
    {"id":11,"name":"Puma Future Z 4.1","price":8999,"originalPrice":11999,"description":"Flexible football boots with FUZIONFIT+ for optimal foot lockdown.","material":"Puma","category":"Football","weight":"200g","image":"https://rukminim2.flixcart.com/image/300/300/xif0q/shoe/g/l/f/-original-imahfhj9npjtxgrd.jpeg","rating":4.2,"reviews":234,"dailyWear":true},
    {"id":12,"name":"Under Armour Magnetico Pro","price":12999,"description":"Premium football boots with leather upper for superior touch and control.","material":"Under Armour","category":"Football","weight":"215g","image":"https://www.underarmour.in/media/catalog/product/cache/49532286929922a0f94d0abd09ec96a5/8/_/8.5-120260108071741719.jpg?aio=w-295","rating":4.6,"reviews":112},
    {"id":13,"name":"Nike Air Zoom Vapor Pro 2","price":14999,"description":"Professional tennis shoes with Zoom Air for explosive court movements.","material":"Nike","category":"Tennis","weight":"340g","image":"https://rukminim2.flixcart.com/image/480/640/xif0q/shoe/q/g/q/-original-imahgcsbfjthrdmk.jpeg?q=90","rating":4.7,"reviews":87},
    {"id":14,"name":"Adidas Barricade 13","price":11999,"description":"Durable tennis shoes with AdiPrene for excellent stability and cushioning.","material":"Adidas","category":"Tennis","weight":"360g","image":"https://assets.adidas.com/images/w_600,f_auto,q_auto/c8afcac798fe4642934644f69fcbb02d_9366/Barricade_13_Tennis_Shoes_White_IF9129_HM1.jpg","rating":4.9,"reviews":45},
    {"id":15,"name":"Puma RS-0 Tennis","price":7999,"originalPrice":9999,"description":"Stylish tennis shoes with Running System technology for comfort.","material":"Puma","category":"Tennis","weight":"320g","image":"https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/14521974/2022/6/29/9597f986-a5fc-452c-beb8-7880d6a98e311656498795013-Puma-Unisex-Black--Grey-Mesh-RS-0-Core-Running-Shoes-7261656-1.jpg","rating":4.3,"reviews":167,"dailyWear":true},
    {"id":16,"name":"Under Armour Tribase Reeler","price":10999,"description":"Performance tennis shoes with TriBase foundation for natural ground contact.","material":"Under Armour","category":"Tennis","weight":"350g","image":"https://fitatmidlife.com/wp-content/uploads/UA-tribase-reign-cross-training-shoe-side.jpg","rating":4.5,"reviews":134,"dailyWear":true},
    {"id":17,"name":"Nike Hydromove Goggles","price":2999,"description":"Anti-fog swimming goggles with comfortable silicone gasket.","material":"Nike","category":"Swimming","weight":"50g","image":"https://firstlens.in/cdn/shop/files/First-Lens-Customised-Powered-Swimming-Goggle-013-7.png?v=1755274847&width=1080","rating":4.4,"reviews":198,"dailyWear":true},
    {"id":18,"name":"Adidas Power Swim Fins","price":2499,"originalPrice":3499,"description":"Swimming fins with ergonomic design for efficient kick training.","material":"Adidas","category":"Swimming","weight":"180g","image":"https://finisswim.in/wp-content/uploads/2024/01/lffbp2-2.jpg","rating":4.2,"reviews":278,"dailyWear":true},
    {"id":19,"name":"Puma Swim Cap Pro","price":899,"description":"Silicone swim cap with hydrodynamic shape for reduced drag.","material":"Puma","category":"Swimming","weight":"30g","image":"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/052535/04/fnd/IND/fmt/png/PUMA-Swim-Cap","rating":4.6,"reviews":56},
    {"id":20,"name":"Nike Metcon 9","price":12999,"description":"Versatile training shoes with stable base for heavy lifts and cardio.","material":"Nike","category":"Gym","weight":"450g","image":"https://cdn.runrepeat.com/storage/gallery/product_content/40112/nike-metcon-9-review-20971468-main.jpg","rating":4.8,"reviews":34},
    {"id":21,"name":"Adidas Nano X3","price":10999,"description":"Cross-training shoes with Floatride Energy foam for all-day comfort.","material":"Adidas","category":"Gym","weight":"420g","image":"https://cdn.runrepeat.com/storage/gallery/product_content/39556/reebok-nano-x3-review-19679430-main.jpg","rating":4.7,"reviews":28},
    {"id":22,"name":"Puma Tazon 7","price":6999,"description":"Training shoes with breathable mesh and supportive midfoot strap.","material":"Puma","category":"Gym","weight":"380g","image":"https://assets.ajio.com/medias/sys_master/root/20240820/UnMu/66c490131d763220fa87e13e/-1117Wx1400H-469652200-black-MODEL.jpg","rating":4.9,"reviews":18},
    {"id":23,"name":"Nike Cycling Helmet","price":4999,"originalPrice":6499,"description":"Lightweight cycling helmet with adjustable fit and ventilation.","material":"Nike","category":"Cycling","weight":"280g","image":"https://i.ebayimg.com/images/g/fQIAAeSw8sRn~8jL/s-l1200.jpg","rating":4.5,"reviews":223,"dailyWear":true},
    {"id":24,"name":"Adidas Cycling Shoes","price":8999,"description":"Performance cycling shoes with stiff sole for efficient power transfer.","material":"Adidas","category":"Cycling","weight":"520g","image":"https://cdn.mos.cms.futurecdn.net/Ma3FrmNL8Ktj58RmVXNUNN.jpg","rating":4.7,"reviews":91},
    {"id":25,"name":"Puma Cycling Gloves","price":1499,"description":"Padded cycling gloves with grip and breathability for long rides.","material":"Puma","category":"Cycling","weight":"60g","image":"https://rukminim2.flixcart.com/image/480/480/kppt47k0/sport-glove/3/s/4/left-right-s-at-shift-gloves-4161403-na-na-gym-fitness-gloves-original-imag3w37zgsfsvaq.jpeg?q=90","rating":4.3,"reviews":189,"dailyWear":true},
    {"id":26,"name":"Under Armour Cycling Jersey","price":3999,"description":"Moisture-wicking cycling jersey with UV protection for outdoor rides.","material":"Under Armour","category":"Cycling","weight":"180g","image":"https://underarmour.scene7.com/is/image/Underarmour/FW25_Cyber_Filter_Site_Clothing_LongSleeves_1_1_M?qlt=85&wid=767&hei=767","rating":4.8,"reviews":156}
  ]
};

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(productsData.products);
    console.log(`Seeded ${productsData.products.length} products`);

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedProducts();

