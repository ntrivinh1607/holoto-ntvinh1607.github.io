const fs = require('fs');
const axios = require('axios');
const { promisify } = require('util');
const googleTTS = require('google-tts-api');

const writeFileAsync = promisify(fs.writeFile);

async function createTTSFiles() {
    const directory = './tts/';
    try {
        // Create directory if it doesn't exist
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        // Create files
        for (let i = 1; i <= 90; i++) {
            const text = i <= 10 ? `Số ${i.toString()}` : i.toString();
            const outputFile = `${directory}${i}.mp3`;
            await textToSpeech(text, outputFile);
            console.log(`File ${outputFile} created.`);
        }

        console.log('All files created successfully.');
    } catch (error) {
        console.error('Error:', error);
    }
}

async function textToSpeech(text, outputFile, language = 'en') {
    try {
        const url = googleTTS.getAudioUrl(text, {
            lang: 'vi',
            slow: false,
            host: 'https://translate.google.com',
        });

        // Download the audio file
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const audioBuffer = Buffer.from(response.data);

        // Save the audio file
        await writeFileAsync(outputFile, audioBuffer);
    } catch (error) {
        console.error('Error:', error);
    }
}

createTTSFiles();
