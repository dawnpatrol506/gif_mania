$(document).ready(function(){

    $('#sbmt').click(function(event){

        event.preventDefault();
        //console.log('prevented');
        let text = $('#search-box').val();
        $('#search-box').val('');
        console.log(text);
        addButton(text);
        getGifs(text);

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


    function addButton(text){
        let newButton = $('<button class="btn btn-info">');
        newButton.text(text);
        $('#button-list').append(newButton);
    }

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

});