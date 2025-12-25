const fs = require('fs')
const path = require('path')  
const crypto = require('crypto')  

try {
    if(!fs.existsSync('imgs')) 
    { 
        fs.mkdirSync('imgs')
    }

    const envPath = path.join('backend', '.env')
    if(!fs.existsSync(envPath)) {
        const secret = crypto.randomBytes(64).toString('hex')
        const data = `MONGO_URL = ""\n\nACCESS_TOKEN_SECRET = "${secret}"`
        fs.writeFileSync(envPath, data)
    }

    console.log("\n* Environment setup complete (～￣▽￣)～ *");

} catch(error) {
    console.log("Something went wrong while trying to set up the project ＞︿＜\n", error.message)
    process.exit(1)
}