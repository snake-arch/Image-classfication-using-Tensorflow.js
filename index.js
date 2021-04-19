
function PreviewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("image-selector").files[0]);

    oFReader.onload = function (oFREvent) {
        document.getElementById("selected-image").src = oFREvent.target.result;
        $("#prediction-list").empty();
    };
};

async function getPred(){
    let image = $("#selected-image").get(0);
    const model = await mobilenet.load();
    const predictions = await model.classify(image);
    //console.log(predictions);
    predictions.forEach(function (p){
        const className = p.className.split(',')[0];
        const probability = (p.probability*100).toFixed(5);
        $('#prediction-list').append('<li>'+className+' : '+probability+'</li>')
    });

}

//////////////////////////////////////////////// Try out casual
const img = new Image()
img.src='https://image.shutterstock.com/image-vector/vector-illustration-unused-match-stick-260nw-1662505090.jpg';
img.crossOrigin = "anonymous";

  // Load the model.
mobilenet.load().then(mdl => {
    // Classify the image.
    mdl.classify(img).then(predictions => {
      console.log('Predictions: ');
      console.log(predictions);
    });
});
/////////////////////////////////////////////////Try out end

// (async function(){
//     const model = await mobilenet.load();

// })();

// $("#predict-button").click(async function (){
//     let image = $("#selected-image").get(0);
//     const predictions = await model.classify(image);
//     console.log(predictions);
// });
// console.log(1);