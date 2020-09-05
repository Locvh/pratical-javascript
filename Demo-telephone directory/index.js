/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên hoặc 1 phần số điện thoại
 */

var readlineSync = require('readline-sync');
var fs= require('fs');
var phoneList = [];

function loadData(){
	var fileContact = fs.readFileSync('./data.json');
   phoneList = JSON.parse(fileContact);
}

function showContact(phoneList){
	for (var person of phoneList){
		console.log(person.id +"||"+ person.name +"||"+ person.contact);
		console.log('***---------------------------***');
	}
}

function dataContact(){
	console.log('Add new contact');
	var name =readlineSync.question('Enter the contact name:');
	var contact = readlineSync.question('Enter the contact phone:');
	phoneList.push({id:phoneList[phoneList.length-1].id+1,name:name,contact:contact});
	var fileContact=JSON.stringify(phoneList);
	fs.writeFileSync('./data.json',fileContact,{ encoding: 'utf8'});
	console.log('Add successfully');
}

function editContact(){
    console.log('Edit contact');
	var idEdit =readlineSync.question('Enter id need to edit:');
	idEdit = Number(idEdit);
	for(var i=0; i<phoneList.length;i++){
		if(phoneList[i].id==idEdit)
    {
	var newname =readlineSync.question('Enter the contact new name ('+phoneList[i].name+'):');
	var newcontact = readlineSync.question('Enter the contact new phonee ('+phoneList[i].contact+ '):');
	phoneList[i].name=newname;
	phoneList[i].contact=newcontact;
}


}
	var fileContact=JSON.stringify(phoneList);
	fs.writeFileSync('./data.json',fileContact,{ encoding: 'utf8'});
	console.log('Edit successfully');
}

function deleteContact(){
    console.log('Delete contact');
	var idDelete =readlineSync.question('Enter id need to delete:');
	idDelete = Number(idDelete);
	for(var i=0; i<phoneList.length;i++){
		if(phoneList[i].id==idDelete)
    {
		phoneList.splice(i,1);
	}
	}	
	var fileContact=JSON.stringify(phoneList);
	fs.writeFileSync('./data.json',fileContact,{ encoding: 'utf8'});
	console.log('Delete successfully');
}

function findContact(arr){
    console.log('Search contact');
    var kq=[];
	var temp =readlineSync.question('Enter the information you want to find:');
	if(!isNaN(temp)){
		temp=Number(temp);
		for(var x of arr){
			if(Number(x.contact).toString().indexOf(Number(temp)).toString()>=0){
				kq.push(x);
			}
	}
	showContact(kq);
    }else{
    temp = temp.toString();
    for(x of arr){
      if(x.name.toLowerCase().indexOf(temp.toLowerCase())>=0){
         kq.push(x);
      }
    }
    showContact(kq);
  }
}

function showMenu(){
    console.log('1.Please enter contact information ');
    console.log('2.Edit data contact ');
    console.log('3.Delete data contact ');
    console.log('4.Find contact ');
    console.log('5.Show contact');
    console.log('6.Exit');
    var option = readlineSync.question('Enter number: ');
    switch (option){
	    case '1':
		dataContact();
		showMenu();
		break;
		case '2':
		editContact();
		showMenu();
		break;
		case '3':
		deleteContact();
		showMenu();
		break;
		case '4':
		findContact(phoneList);
		showMenu();
		break;
		case '5':
		showContact(phoneList);
		showMenu();
		break;
		case '6':
		break;
		default:
		console.log('wrong number');
		break;
}
}


function main(){
    loadData();
    showMenu();
}
main();