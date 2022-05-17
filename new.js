const client = require("./twitterClient");
async  function updateBanner() {
console.log("inside function");    
await client.v1.updateAccountProfileBanner("./final.png", {
        width: 1500,
        height: 500
    })
}

updateBanner();
