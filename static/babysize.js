const slider = document.getElementById("image-slider");
const sliderImage = document.getElementById("slider-image");
const sliderValue = document.getElementById("slider-value");
const imageDescription = document.getElementById("image-description");
const images = [
  " static//0infant.png",
  " static//4poppy.png",
  " static//5sesame.png",
  " static//6lentil.png",
  " static//7blueberry.png",
  " static//8kidneybean.png",
  " static//9grape.png",
  " static//10kumquat.png",
  " static//11fig.png",
  " static//12lime.png",
  " static//13peapod.png",
  " static//14lemon.png",
  " static//15apple.png",
  " static//16avocado.png",
  " static//17turnip.png",
  " static//18capsicum.png",
  " static//19largetomato.png",
  " static//20banan.png",
  " static//21carrot.png",
  " static//22spaghettisquash.png",
  " static//23largemango.png",
  " static//24corn.png",
  " static//25rutabaga.png",
  " static//26scallion.png",
  " static//27cuali.png",
  " static//28largeeggplant.png",
  " static//29butternutsquash.png",
  " static//30largecabbage.png",
  " static//31coconut.png",
  " static//32jicama.png",
  " static//33pineapple.png",
  " static//34cantaloupe.png",
  " static//35honeydewmel.png",
  " static//36romainlettuce.png",
  " static//37swiss.png",
  " static//38leek.png",
  " static//39miniwater.png",
    " static//40smallpumpkin.png",
];

const descriptions = [
  "Infant",
  "Poppy",
  "Sesame",
  "Lentil",
  "Blueberry",
  "Kidney Bean",
  "Grape",
  "Kumquat",
  "Fig",
  "Lime",
  "Peapod",
  "Lemon",
  "Apple",
  "Avocado",
  "Turnip",
  "Capsicum",
  "Large Tomato",
  "Banana",
  "Carrot",
  "Spaghetti Squash",
  "Large Mango",
  "Corn",
  "Rutabaga",
  "Scallion",
  "Cuali",
  "Large Eggplant",
  "Butternut Squash",
  "Large Cabbage",
  "Coconut",
  "Jicama",
  "Pineapple",
  "Cantaloupe",
  "Honeydew Melon",
  "Romaine Lettuce",
  "Swiss",
  "Leek",
  "Mini Watermelon",
  "Small Pumpkin",
];


slider.addEventListener("input", () => {
  const value = slider.value - 1;
  console.log(value)
  console.log(images[value])
  sliderImage.src = images[value]
  sliderValue.textContent = value+3 + " weeks";
  imageDescription.textContent = descriptions[value];
});