const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
    const path = './fileBase';
    const fiveFiles = [];
    fs.readdir(path, (err, files) => {
        files.reverse();
        for(let i = 0; i < files.length; i++){
            if(i < 5){
                const textFile = fs.readFileSync(path + '/' + files[i]);
                fiveFiles.push(JSON.parse(textFile))
            } else {break}
        }
        res.send(fiveFiles)
    });
});

router.post('/', (req, res) => {
    const date = new Date();
    const waySave = './fileBase/' + date.toISOString();
    req.body.date = date.toISOString();
    const info = JSON.stringify(req.body);
    fs.writeFile(waySave , info, err => {
        if(err){
            console.error(err)
        } else {
            console.log('Save file')
        }
    });
    res.send(req.body)
});

module.exports = router;