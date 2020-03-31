
$(document).ready(function() {
  var keyArr =[];
  var currentPage =1;
  var fillter =1;
  function FilterItem(key) {
    this.keyword = key;
    this.obj = [];
  }
  FilterItem.p1=[];
  FilterItem.p2=[];
  FilterItem.prototype.saveToP = function(p){
    if(p===1){
      FilterItem.p1.push(this);
    }else if(p===2){
      FilterItem.p2.push(this);
    }
  };
  FilterItem.prototype.add = function(obj){
    this.obj.push(obj);
  };
  FilterItem.prototype.render = function(){
    let $itemColne = $('#photo-template').clone();
    $('main section').remove();
    $('main ').append($itemColne);
    this.obj.forEach(element => {
      let $photoTemplate = $('#photo-template').html();
      console.log('my objects', element);
      var rendered = Mustache.render($photoTemplate , element);//this line of code
      //will do the magic for us the first parameter is template html "string"/html code/tags
      //this will refer to objects that we created
      $('main').append(rendered);
    });
  };


  function Item(item) {
    this.title = item.title;
    this.image_url = item.image_url;
    this.description = item.description;
    this.keyword = item.keyword;
    this.horns = item.horns;
  }
  Item.p1 = [];
  Item.p2 = [];
  Item.prototype.saveToP1 = function(){
    Item.p1.push(this);
  };
  Item.prototype.saveToP2 = function(){
    Item.p2.push(this);
  };
  Item.prototype.render = function() {
    // let $itemColne = $('#photo-template').clone();
    // $itemColne.find('h2').text(this.title);
    // $itemColne.find('img').attr('src', this.image_url);
    // $itemColne.find('p').text(this.description);
    // // $itemColne.removeClass("dog-template");
    // $itemColne.removeAttr('id');
    // $itemColne.attr('id', this.title);
    // $('main ').append($itemColne);
    let $photoTemplate = $('#photo-template').html();
    console.log('my objects', this);
    var rendered = Mustache.render($photoTemplate , this);//this line of code
    //will do the magic for us the first parameter is template html "string"/html code/tags
    //this will refer to objects that we created
    $('main').append(rendered);
  };
  const opRender = () =>{
    // edite here
    $('option').remove();
    var option = $('<option/>');
    option.attr({ 'value': 'default' }).text('Filter by Keyword');
    $('select').append(option);

    if(currentPage===1){

      FilterItem.p1.forEach(item1 => {
        option = $('<option/>');
        option.attr({ 'value': item1.keyword }).text(item1.keyword);
        $('select').append(option);
      });}
    if(currentPage===2){
      FilterItem.p2.forEach(item1 => {
        option = $('<option/>');
        option.attr({ 'value': item1.keyword }).text(item1.keyword);
        $('select').append(option);
      });}

  };
  const objBulider =(itemToCheck,p)=>{
    var newKey = true;
    if(p===1){
      FilterItem.p1.forEach(element => {
        if (element.keyword ===itemToCheck.keyword) {
          element.add(itemToCheck);
          newKey =false;
        }
      });
      if(newKey){
        let key = new FilterItem(itemToCheck.keyword);
        key.add(itemToCheck);
        key.saveToP(1);
      }}else if (p===2){
      FilterItem.p2.forEach(element => {
        if (element.keyword ===itemToCheck.keyword) {
          element.add(itemToCheck);
          newKey =false;
        }
      });
      if(newKey){
        let key = new FilterItem(itemToCheck.keyword);
        key.add(itemToCheck);
        key.saveToP(2);
      }
    }
  };
  const readJsonP1 = () => {
    $.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' }).then(data => {
      data.forEach(item => {
        let item1 = new Item(item);
        item1.saveToP1();
        item1.render();
        objBulider(item1,1);
      });
      opRender();
    });
  };
  readJsonP1();
  const readJsonP2 = () => {
    $.ajax('data/page-2.json', { method: 'GET', dataType: 'JSON' }).then(data => {
      data.forEach(item => {
        let item1 = new Item(item);
        item1.saveToP2();
        item1.render();
        objBulider(item1,2);
      });
      opRender();
    });
  };
  readJsonP2();
  $('#dropdownList').on('change',function(){
    //var optionValue = $(this).val();
    //var optionText = $('#dropdownList option[value="'+optionValue+'"]').text();
    var optionText = $('#dropdownList option:selected').text();
    if(currentPage === 1){
      FilterItem.p1.forEach(element => {
        if(optionText===element.keyword)
          element.render();
      });}
    if(currentPage === 2){
      FilterItem.p2.forEach(element => {
        if(optionText===element.keyword)
          element.render();
      });}

  });
  const renderPages = () =>{
    if (fillter ===1){
      Item.p1.sort((a,b)=>{if(a.title>b.title){
        return 1;
      }else{
        return -1;}});
      Item.p2.sort((a,b)=>{if(a.title>b.title){
        return 1;
      }else{
        return -1;}});
    }else{
      Item.p1.sort((a,b)=>{if(a.horns>b.horns){
        return 1;
      }else{
        return -1;}});
      Item.p2.sort((a,b)=>{if(a.horns>b.horns){
        return 1;
      }else{
        return -1;}});
    }
    console.log('see me',Item.p1);
    if(currentPage === 1){
      Item.p1.forEach(element => {
        element.render();
      });}
    if(currentPage === 2){
      Item.p2.forEach(element => {
        element.render();
      });}
  };
  $('#pages').on('click',function(event){
    //var optionValue = $(this).val();
    //var optionText = $('#dropdownList option[value="'+optionValue+'"]').text();
    if(event.target.id === 'p1'){
      console.log('p1');
      currentPage =1;
      opRender();
    }else if(event.target.id === 'p2'){
      console.log('p2');
      currentPage = 2;
      opRender();
    }
    $('main section').remove();
    renderPages ();
  });
  function sortfilter() {
    if (fillter ===1){
      FilterItem.p1.forEach(element => {
        element.obj.sort((a,b)=>{if(a.title>b.title){
          return 1;
        }else{
          return -1;}});
      });

      FilterItem.p2.forEach(element => {
        element.obj.sort((a,b)=>{if(a.title>b.title){
          return 1;
        }else{
          return -1;}});
      });
    }else{
      FilterItem.p1.forEach(element => {
        element.obj.sort((a,b)=>{if(a.horns>b.horns){
          return 1;
        }else{
          return -1;}});
      });
      FilterItem.p2.forEach(element => {
        element.obj.sort((a,b)=>{if(a.horns>b.horns){
          return 1;
        }else{
          return -1;}});
      });
    }
  }
  $('input[type=\'radio\']').on('change',function(){
    var radioValue = $('input[name=\'gender\']:checked').val();
    if(radioValue ==='Name'){
      fillter = 1 ;
      sortfilter();
      $('main section').remove();
      renderPages ();
    }
    if(radioValue ==='Horns'){
      fillter = 2 ;
      sortfilter();
      $('main section').remove();
      renderPages ();
    }
  });
});
