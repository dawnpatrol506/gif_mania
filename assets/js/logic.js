$(document).ready(function(){

    var movies = [
        'Back to the Future',
        'The Breakfast Club',
        "Ferris Buellers's Day Off",
        'Ghostbusters',
        'E.T.',
        'The Goonies',
        'Raiders of the Lost Ark',
        'The Empire Strikes Back',
        'Die Hard',
        'Top Gun',
        'The Terminator',
        'Who Framed Roger Rabbit'
    ];

    function populateButtons(arr){
        $('#button-list').empty();
        
        for(let i = 0; i < arr.length; i++){
            let btn = $('<button>');
            btn.text(arr[i]);
            btn.addClass('btn btn-info movie-button');
            $('#button-list').append(btn);
        }
    }

    $(document).on('click', '.movie-button', function(){
        $('#gif-area').empty();
        getGifs($(this).text());
    });

    $('#sbmt').click(function(event){

        event.preventDefault();
        //console.log('prevented');
        let text = $('#search-box').val();
        $('#search-box').val('');
        //console.log(text);
        movies.push(text);
        populateButtons(movies);
    });

    $(document).on('click', 'img', function(){
        if($(this).attr('data-status') === 'still'){
            $(this).attr('src', $(this).attr('data-gif'));
            $(this).attr('data-status', 'gif');
        }
        else{
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-status', 'still');
        }
    });

    function getGifs(searchTerm){

        let apiKey = '4B683HV0HZ3XpkSpxwW0Ar4G04rYcBFa';
        let queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + searchTerm + '&limit=10&offset=0&rating=G&lang=en';
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .then(function(res){
            console.log(res);
            
            for(let i = 0; i < res.data.length; i++){
                addGif(res.data[i].images.fixed_height.url, res.data[i].images.fixed_height_still.url, res.data[i].rating);
            }

        });
    }

    function addGif(gif, still, rating){
        let card = $('<div class="card"></div>');
        let cardBody = $('<div class="card-body"></div>');
        let header = $('<div class="card-header"></div>');
        header.text('Rating: ' + rating);
        let img = $('<img>');
        img.attr('src', still);
        img.attr('data-still', still);
        img.attr('data-gif', gif);
        img.attr('data-status', 'still');

        cardBody.append(img);
        card.append(header);
        card.append(cardBody);

        $('#gif-area').append(card);
    }

    populateButtons(movies);

});