/*
Written by Joe and Austin and Sam(This file was done with the group)
*/

import React, { Component } from 'react';
import '../stylesheets/Favorite.css';
import Firebase from '../utils/firebase.js'

class Favorite extends Component {
  constructor(props){
    super(props);
  }

  addGift(item){
    console.log(item);
    let links = [];
    item.sitedetails.map(function (site, index){
      return links.push(site);
    })

    let favItem = {
      name: item.name,
      image: item.images[0],
      price: item.price,
      links: links
    }

    console.log(favItem);

    Firebase.findUser(this.props.user).then((json)=>{
      console.log("User Found", json);
      // //check if it has property of favoriteItems

      let favoriteItemExists = false;
      let convJson = [];
      let favItems = [];
      let key = Object.keys(json)[0];
      console.log(key);

      // //convert to array
      for(let prop in json){
        convJson.push(json[prop]);
      }

      //check to see if it has a favoriteItem property
      if(convJson[0].hasOwnProperty("favoriteItems")){
        favoriteItemExists = true;
      }

      console.log(convJson[0].name);
      console.log("FIE", favoriteItemExists);
      if(favoriteItemExists === false){
        convJson[0].favoriteItems = [];
        convJson[0].favoriteItems.push(favItem);
        console.log(convJson);
      }

      if(favoriteItemExists === true) {
        console.log("WHEN FAVORITES EXIST", convJson);
        convJson[0].favoriteItems.push(favItem);
        console.log(convJson);
      }
      favItems = convJson[0].favoriteItems;
    //update account
      Firebase.addFavItem(favItems, this.props.user, key).then((json)=>{
        console.log("Saved!");
      })

    })

   }

  render() {
    let item = this.props.item;
    console.log(this.props.user);
    return(
      <div>
        <button id="gift-list-btn" className='gift-list-btn' onClick={(event) => this.addGift(item)}>Save to Gift List</button>
      </div>
    )
  }
}

export default Favorite;
