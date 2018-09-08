$(document).ready(function(){

    let apiKey = '4B683HV0HZ3XpkSpxwW0Ar4G04rYcBFa'
    let query = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=&limit=25&offset=0&rating=G&lang=en';

    let test = 'https://api.giphy.com/v1/gifs/search?api_key=4B683HV0HZ3XpkSpxwW0Ar4G04rYcBFa&q=&limit=25&offset=0&rating=G&lang=en';

    $.ajax({
        url: query,
        method: 'GET'
    })
    .then(function(res){
        console.log(res);
    });

    $('#sbmt').click(function(event){

        event.preventDefault();
        //console.log('prevented');
        let text = $('#search-box').val();
        $('#search-box').val('');
        console.log(text);
        addButton(text);

    })


    function addButton(text){
        let newButton = $('<button class="btn btn-info">');
        newButton.text(text);
        $('#button-list').append(newButton);
    }

});