// ******* call to languages json. ***********
// $.ajax({
//   url: "../data/languages.json",
//   dataType: "json"
// }).done(function(data, Status) {
//   // codigo aqui
// });
$.getJSON("../data/languages.json")
  .done(function(data, Status, jqXHR ) {
    for(d=0; d<data.length; d++){
        // console.log('Dentro del for');
        console.log(`Position ${d} [Label ${data[d].label}]`);
        console.log(`Position ${d} [Name ${data[d].name}]`);
        console.log(`Position ${d} [Defaul value ${data[d].defaultValue}]`);
        console.log('\n');
    };
    // console.log('Estoy fuera del for');
  })
  .fail(function(data,jqXHR){
      if(jqXHR.statusText !== 'OK'){
        console.log('[ERROR]: on loading json.');
      }
  });
//data es el array
// key son 3(propiedades del objeto)
//valor de esa key