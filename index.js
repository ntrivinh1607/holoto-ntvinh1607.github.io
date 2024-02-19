const fs = require('fs');
const path = require('path');
const player = require('play-sound')();

const directory = './tts/';
const numbersList = Array.from({length: 90}, (_, index) => index + 1);
const files = numbersList.map(e => `${e}.mp3`)

const delayInSeconds = 3; // Adjust this value as needed

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function playAudioFilesWithDelayAndShuffle(files, delay) {
    const shuffledFiles = shuffleArray(files);
    let currentIndex = 0;
    const playNext = () => {
        if (currentIndex >= shuffledFiles.length) {
            console.log('All files played.');
            return;
        }

        const currentFile = shuffledFiles[currentIndex];
        const filePath = path.join(directory, currentFile);

        console.log(`Playing: ${currentFile}`);
        player.play(filePath, (err) => {
            if (err) {
                console.error('Error playing audio:', err);
            }
            currentIndex++;
            setTimeout(playNext, delay * 1000); // Convert seconds to milliseconds
        });
    };

    playNext();
}

// Play audio files shuffled, with a delay of 'delayInSeconds' seconds between each file
playAudioFilesWithDelayAndShuffle(files, delayInSeconds);

