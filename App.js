
  var filmset = [
    { id:1, title:"IronMan", year:2008, rating: "5 Stars"},
    { id:2, title:"StarWars: The Last Jedi", year:2017, rating: "5 Stars"},
    { id:3, title:"The Godfather: Part II", year:1974, rating: "3 Stars"},
    { id:4, title:"Bruce Almighty", year:2003, rating: "3 Stars"},
    { id:5, title:"Lord of the rings", year:2001, rating: "4 Stars"},
    { id:6, title:"Scary movie 3", year:2003, rating: "5 Stars"}
];

webix.ui({

  rows:[

      { view:"template", 
        type:"header", template:"MoJoe"},
      
      { view:"toolbar", id:"mybar", elements:[
        { view:"button", value:"Add", width:70, click:add_row },
        { view:"button", value:"Delete", width:70, click:delete_row },
        { view:"button", value:"Update", width:70, click:update_row },
        { view:"button", value:"Clear Form", width:95, click:"$$('myform').clear()"}]
      },
      { cols:[
        {view:"form", id:"myform", width: 300, elements:[
            { view:"text", name:"title", placeholder:"Title", width:250, align:"center"},  
            { view:"text", name:"year", placeholder:"Year", width: 250, align:"center"}, 
            { view:"text", name:"rating", placeholder:"Rating", width: 250, align:"center"} ]
        },
        {     
        view:"datatable", 
        id:"mylist",
        autoConfig:true,
        template:"#title# - #year#", 
        select:true, //enables selection 
        height:400,
        data: filmset }]
      }

      // { view:"datatable", 
      //   , 
      //   data:{
      //     title:"My Fair Lady", year:1964, votes:533848, rating:8.9, rank:5
      //   }
      // }
  ]
});

function add_row(){
	$$("mylist").add({
		title: $$("myform").getValues().title,
		year: $$("myform").getValues().year,
	})
}

function delete_row() {
	var id = $$("mylist").getSelectedId();
	
	webix.confirm({
		title: "Delete",// the text of the box header
		text: "Are you sure you want to delete the selected item?",
		callback: function(result) { 
		if (result) {
			$$("mylist").remove(id);
			} 
		}
	});
}

$$("mylist").attachEvent("onAfterSelect", function(id){
	$$("myform").setValues({
		title: $$("mylist").getItem(id).title,
    year: $$("mylist").getItem(id).year,
    rating: $$("mylist").getItem(id).rating 
	});
});

function update_row() {
	var sel = $$("mylist").getSelectedId();
	if(!sel) return;
			
	var value1 = $$("myform").getValues().title;
	var value2 = $$("myform").getValues().year;
			
		
	var item = $$("mylist").getItem(sel); //selected item object
	item.title = value1;
	item.year = value2;
	$$("mylist").updateItem(sel, item);
}