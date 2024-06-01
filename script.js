//initilize variable
let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myProgressbar');
let gif = document.getElementById('gif');
let mastersongName = document.getElementById('mastersongName');
let songs = [
    { songName: 'Aaja we mahiya', filepath: './songs/1.mp3', coverpath: './cover/1.jpg' },
    { songName: 'Harley in hawaii', filepath: './songs/2.mp3', coverpath: './cover/2.jpg' },
    { songName: 'Kangna', filepath: './songs/3.mp3', coverpath: './cover/3.jpg' },
    { songName: 'Kina chir', filepath: './songs/4.mp3', coverpath: './cover/4.jpg' },
    { songName: 'Brown munde', filepath: './songs/5.mp3', coverpath: './cover/5.jpg' },
    { songName: 'kinne salo', filepath: './songs/6.mp3', coverpath: './cover/6.jpg' },
    { songName: 'Lut gaye', filepath: './songs/7.mp3', coverpath: './cover/7.jpg' }
]


//handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
//listen to events
audioElement.addEventListener('timeupdate', () => {
    //update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogressbar.value = progress;
})
myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = myprogressbar.value * audioElement.duration / 100;
})
const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}
// when songlist on click logic
Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        // label change
        e.target.classList.remove('fa-circle-pause');
        e.target.classList.add('fa-circle-pause');
        //take song id
        songIndex = parseInt(e.target.id);
        // set song depends to songindex
        audioElement.src = ` songs/${songIndex + 1}.mp3`;
        //songname chnage depends to arrys
        mastersongName.innerText = songs[songIndex].songName;
        //current time = 0
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.add('fa-circle-pause');
        masterPlay.classList.remove('fa-circle-play');
    })

})
// forward and backword logic

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 6) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = ` songs/${songIndex + 1}.mp3`;
    mastersongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 6;
    } else {
        songIndex -= 1;
    }
    audioElement.src = ` songs/${songIndex + 1}.mp3`;
    mastersongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');
})