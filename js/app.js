
$(document).ready(function() {
  var keyArr =[];
  function FilterItem(key) {
    this.keyword = key;
    this.obj = [];
    keyArr.push(this);
  }
  FilterItem.prototype.add = function(obj){
    this.obj.push(obj);
  };
  FilterItem.prototype.render = function(){
    let $itemColne = $('#photo-template').clone();
    $('main section').remove();
    $('main ').append($itemColne);
    this.obj.forEach(element => {
      $itemColne = $('#photo-template').clone();
      $itemColne.find('h2').text(element.title);
      $itemColne.find('img').attr('src', element.image_url);
      $itemColne.find('p').text(element.description);
      // $itemColne.removeClass("dog-template");
      $itemColne.removeAttr('id');
      $itemColne.attr('id', element.title);
      $('main ').append($itemColne);
    });
   
  };


  function Item(item) {
    this.title = item.title;
    this.image_url = item.image_url;
    this.description = item.description;
    this.keyword = item.keyword;
    this.horns = item.horns;
  }
  Item.prototype.render = function() {
    let $itemColne = $('#photo-template').clone();
    $itemColne.find('h2').text(this.title);
    $itemColne.find('img').attr('src', this.image_url);
    $itemColne.find('p').text(this.description);
    // $itemColne.removeClass("dog-template");
    $itemColne.removeAttr('id');
    $itemColne.attr('id', this.title);
    $('main ').append($itemColne);
  };
  const opRender = () =>{
    keyArr.forEach(item1 => {
      var option = $('<option/>');
      option.attr({ 'value': item1.keyword }).text(item1.keyword);
      $('select').append(option);
    });

  };
  const objBulider =(itemToCheck)=>{
    var newKey = true;
    keyArr.forEach(element => {
      if (element.keyword ===itemToCheck.keyword) {
        element.add(itemToCheck);
        newKey =false;
      }
    });
    if(newKey){
      let key = new FilterItem(itemToCheck.keyword);
      key.add(itemToCheck);
    }
  };
  const readJson = () => {
    $.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' }).then(data => {
      data.forEach(item => {
        let item1 = new Item(item);
        item1.render();
        objBulider(item1);
      });
      opRender();
    });
  };
  readJson();
  $('#dropdownList').on('change',function(){
    //var optionValue = $(this).val();
    //var optionText = $('#dropdownList option[value="'+optionValue+'"]').text();
    var optionText = $('#dropdownList option:selected').text();
    keyArr.forEach(element => {
      if(optionText===element.keyword)
        element.render();
    });
  });
});
