let songList = [
    {songname:"Bey Yaar Title Song Sad Tara Vina" ,songsrc:"song/Beyyaar.mp3" ,coverimg:"song/beyyaar.jpg" ,artist:"Madhav Krishna, Darshan Rawal"},
    {songname:"Kehvu Ghanu Ghanu Che Chhello Divas Movie Song" ,songsrc:"song/KehvuGhanuGhanuChe.mp3" ,coverimg:"song/chellodivas.jpg" ,artist:"Parthiv Gohil"},
    {songname:"Nayan Ne Bandh Rakhine Best Of Luck Laalu" ,songsrc:"song/nayannebadhrakhi.mp3" ,coverimg:"song/bestoflalu.jpg" ,artist:"Sachin-Jigar, Sachin Sanghvi"},
    {songname:"Tu Maaro Shwaas Chhe " ,songsrc:"song/tumaroswasche.mp3" ,coverimg:"song/tumaroswas.jpg" ,artist:"Mitali Mahant"},
    {songname:"Unchi Talavadi A Gujarati Song" ,songsrc:"song/unchitalavadi.mp3" ,coverimg:"song/coverimg.jpg" ,artist:"Santavni Trivedi"},
    {songname:"Preet - Song Best Of Luck Laalu" ,songsrc:"song/preet.mp3" ,coverimg:"song/bestoflalu.jpg" ,artist:"Sachin-Jigar, Priya Saraiya,Divya Kumar"},
    {songname:"Vhalam Aavo Ne Full Audio Song Love Ni Bhavai" ,songsrc:"song/valamavone.mp3" ,coverimg:"song/valamavone.jpg" ,artist:" Sachin-Jigar Jigardan Gadhavi"}
];

let audioElement = new Audio(songList[0]["songsrc"]);
let musicProgeressBar =  document.getElementById("musicprogressbar");
let masterPlay =  document.getElementById('masterplay');
let musicTab = document.getElementById('musictab');
let playMusicTitle =  document.getElementById('playmusictitle');
let playArtist =  document.getElementById('playartist');
let playCoverImg =  document.getElementById('playcoverimg');
let startTime = document.getElementById('starttime');
let durationTime = document.getElementById('durationtime');


try{
    // show music list
    for(let item in songList){
        let musicList = `<div class="d-flex align-items-center bg-light rounded p-1 text-black musiclist">
        <img src=${songList[item]["coverimg"]} id="coverimg" class="me-2" alt="">
        <h6 id="musicname">${songList[item]["songname"]}</h6>
        </div>`;
        musicTab.insertAdjacentHTML('beforeend',musicList);
    }

    // handle list play pause
    let listPlay =  document.querySelectorAll('.musiclist');
    listPlay.forEach((btn,index)=>{
        btn.addEventListener('click',()=>{
            audioElement.pause();
            musicProgeressBar.value = 0;
            audioElement = new Audio(songList[index]["songsrc"]);
            playMusicTitle.innerHTML = songList[index]["songname"];
            playArtist.innerHTML = songList[index]["artist"];
            playCoverImg.src = songList[index]["coverimg"];
            masterPlay.classList.add("ri-play-circle-fill");
            masterPlay.classList.remove("ri-pause-circle-fill");
            loadSong(index);

            audioElement.addEventListener("timeupdate", () => {
                let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
                if (audioElement.currentTime <= audioElement.duration) {
                    musicProgeressBar.value = progress;

                    // Calculate starting time in minutes and seconds
                    let startMinutes = Math.floor(audioElement.currentTime / 60);
                    let startSeconds = Math.floor(audioElement.currentTime % 60);

                    // Display starting time in the format "mm:ss"
                    startTime.innerHTML = (startMinutes < 10 ? '0' : '') + startMinutes + ':' + (startSeconds < 10 ? '0' : '') + startSeconds;

                    // Display duration time in minutes and seconds
                    let durationMinutes = Math.floor(audioElement.duration / 60);
                    let durationSeconds = Math.floor(audioElement.duration % 60);
                    durationTime.innerHTML = (durationMinutes < 10 ? '0' : '') + durationMinutes + ':' + (durationSeconds < 10 ? '0' : '') + durationSeconds;
                } else {
                    musicProgeressBar.value = 0;
                }
            });
        });
    })


    // handle master play/pause
    masterPlay.addEventListener("click",()=>{
        if(audioElement.paused || audioElement.currentTime <= 0){
            audioElement.play();
            masterPlay.classList.add("ri-pause-circle-fill");
            masterPlay.classList.remove("ri-play-circle-fill");
        }else{
            audioElement.pause();
            masterPlay.classList.add("ri-play-circle-fill");
            masterPlay.classList.remove("ri-pause-circle-fill");
        }
    });

    // progress bar
    audioElement.addEventListener("timeupdate", () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    if (audioElement.currentTime <= audioElement.duration) {
        musicProgeressBar.value = progress;

        // Calculate starting time in minutes and seconds
        let startMinutes = Math.floor(audioElement.currentTime / 60);
        let startSeconds = Math.floor(audioElement.currentTime % 60);

        // Display starting time in the format "mm:ss"
        startTime.innerHTML = (startMinutes < 10 ? '0' : '') + startMinutes + ':' + (startSeconds < 10 ? '0' : '') + startSeconds;

        // Display duration time in minutes and seconds
        let durationMinutes = Math.floor(audioElement.duration / 60);
        let durationSeconds = Math.floor(audioElement.duration % 60);
        durationTime.innerHTML = (durationMinutes < 10 ? '0' : '') + durationMinutes + ':' + (durationSeconds < 10 ? '0' : '') + durationSeconds;
    } else {
        musicProgeressBar.value = 0;
    }
    });


    // progressbar mannuly change then song current time change
    musicProgeressBar.addEventListener('change',()=>{
        audioElement.currentTime = (musicProgeressBar.value * audioElement.duration/100);
    });

    // next and prev song play when click next btn and prev btn
    let currentSongIndex = 0;

    function loadSong(index) {
        currentSongIndex = index;
        audioElement.src = songList[currentSongIndex]["songsrc"];
        playMusicTitle.textContent = songList[currentSongIndex]["songname"];
        playArtist.textContent = songList[currentSongIndex]["artist"];
        playCoverImg.src = songList[currentSongIndex]["coverimg"];
        audioElement.currentTime = 0;
        updateProgressBar();
    }

    function updateProgressBar() {
        let progress = (audioElement.currentTime / audioElement.duration) * 100;
        startTime.textContent = formatTime(audioElement.currentTime);
        durationTime.textContent = formatTime(audioElement.duration);
    }

    function formatTime(timeInSeconds) {
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    loadSong(currentSongIndex);

    audioElement.addEventListener("timeupdate", updateProgressBar);

    audioElement.addEventListener("ended", () => {
        loadNextSong();
        audioElement.play();
    });

    function loadNextSong() {
        currentSongIndex = (currentSongIndex + 1) % songList.length;
        loadSong(currentSongIndex);
    }

    document.getElementById("prevsongbtn").addEventListener("click", () => {
        currentSongIndex = (currentSongIndex - 1 + songList.length) % songList.length;
        loadSong(currentSongIndex);
        audioElement.play();
    });

    document.getElementById("nextsongbtn").addEventListener("click", () => {
        currentSongIndex = (currentSongIndex + 1) % songList.length;
        loadSong(currentSongIndex);
        audioElement.play();
    });



}catch(error){
    console.log(error);
}
