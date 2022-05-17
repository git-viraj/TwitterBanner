const axios = require("axios")
const sharp = require("sharp")
const Jimp = require("jimp")
const fs = require("fs")
const fsPromises = fs.promises
const {getFollowers} = require("./twitterController")

async function saveImage(name, url) {
    const {data} = await axios.get(url, {
        responseType: "arraybuffer"
    })

    await sharp(data).resize(150, 150).toFile(`./images/${name}.png`)
}

async function createBanner() {
    const banner = await Jimp.read("./final.png")
    const files = await fsPromises.readdir("./images")
	var index=0;
    var x_cor=[1233,1433,1233,1433];
   var y_cor=[227,227,400,400];
    

 const followers = await getFollowers()
for(const follower of followers) {
		 const imgPath = "./images/"+follower.id+".png";
		 const image = await Jimp.read(imgPath)
	console.log(imgPath); 
        banner.composite(image, x_cor[index], y_cor[index]);

        index++
	}

    await banner.writeAsync("./final.png");

}

module.exports = {saveImage, createBanner}
