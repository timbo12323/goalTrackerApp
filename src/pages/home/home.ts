import { Component, Input} from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';
import { AddGoalPage } from '../add-goal/add-goal';
import { Storage } from '@ionic/storage';
import { ExpandableComponent } from '../../components/expandable/expandable';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  key: string = "goals"
  goals: any = [];
  goalListLength: number;
  noResults: boolean;
  itemExpandHeight: string = "auto";

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.length().then(result =>{
      if(result <= 0 ){
        this.noResults = true;
      } else {
        this.noResults = false;
      }
    });
    this.storage.get(this.key).then((val) => {
      if (val != null && val != undefined) {
        this.goals = JSON.parse(val);
      }

    });


  }

  addGoalPage(): void {
    this.navCtrl.push(AddGoalPage);
  }

  deleteGoal(goalTitle){
    var pos=this.goals.map(function(e){return e.goalTitle}).indexOf(goalTitle);
    console.log(pos);
    this.goals.splice(pos,1);
    if(this.goals.length <= 0){
      this.storage.clear();
      this.noResults = true;
    } else {
      this.storage.set(this.key, JSON.stringify(this.goals));
      this.noResults = false;
    }
  }

  expandItem(item){
    this.goals.map((listItem) => {
        if(item == listItem){
            listItem.expanded = !listItem.expanded;
        } else {
            listItem.expanded = false;
        }
        return listItem;
    });
  }
}
