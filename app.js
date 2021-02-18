console.log("Let's get this party started!");

const API_KEY = "7fiNf76L5gNwHh6KG6RtrqKmHjPgH5KK";


async function searchGiphy(query) {
    //Try/catch for the api get request
    try {
        //Set url and add params of api key, query, and limit(optional)
        const url = `http://api.giphy.com/v1/gifs/search`;
        const response = await axios.get(url, { params: { api_key: API_KEY, q: query} });
        //Console.log the response data
        console.log(response.data.data);
        //The response will send up to 50 images per search request. Math Random selects a random index of the data array
        //return the url of the gif image
        return response.data.data[Math.floor(Math.random() * response.data.data.length)].images.original.url;
    //catch any error
    } catch (e) {
        alert("COULD NOT GET IMAGE!");
    }
}


//Populate GIFS
function populateGif(gifUrl) {
    //save the gif area where images will populate
    const $gifArea = $("#gif-area");
    //create the element that the gif will sit in
    let $gif = $(
        `<div class="col-md-6 col-lg-3"> 
            <img src="${gifUrl}" class="img-fluid rounded-3 my-2">
        </div>`
    );
    //append the image block to the gif area
    $gifArea.append($gif);
}


//Event Listener for gif form
$("#search-gifs").on("click", async function handleSearch(evt) {
    evt.preventDefault();
    //Collect current gif search value
    let query = $("#gif").val();
    //if the query is empty or null return
    if (!query) return;
    //the the girURL be set to the searchGiphy response 
    let gifUrl = await searchGiphy(query);
    //cal populate gif
    populateGif(gifUrl);
});


//Event Listener to remove all gifs
$("#remove-gifs").on("click", async function handleRemove(evt) {
    evt.preventDefault();
    //Empty the gif area
    $("#gif-area").empty();
});
