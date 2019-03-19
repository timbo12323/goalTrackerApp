import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AddGoalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-goal',
  templateUrl: 'add-goal.html',
})
export class AddGoalPage {


  key:string = "goals";
  goals:[{goalTitle: string, goalDesc: string, goalDateStart: string,
          goalDateEnd: string, mileStone: string, expanded: boolean}] = [{goalTitle:"", goalDesc: "", goalDateStart: "",
                                                      goalDateEnd:"", mileStone:"", expanded: false}];

  todaysDate = new Date();
  milestoneDate:  string;
  milestoneObjs: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

    this.milestoneDate = this.todaysDate.toISOString().substring(0, 10);
    console.log(this.todaysDate.toISOString().substring(0, 10));
    this.goals.splice(0,1);
    this.storage.get(this.key).then((val) => {
      if (val != null && val != undefined) {
        this.goals = JSON.parse(val);
        console.log(val);
      }
    });
  }

  addGoal(event, goalTitle, goalDesc, goalTimeStart, goalTimeEnd){
    if(goalTitle != null || goalTitle != ""){
        this.goals.push({goalTitle: goalTitle, goalDesc: goalDesc, goalDateStart:goalTimeStart, goalDateEnd:goalTimeEnd, mileStone:this.milestoneObjs, expanded: false});
        this.storage.set(this.key, JSON.stringify(this.goals))
        this.navCtrl.push(HomePage);
    }
  }

  AddMilestone(event, milestoneTitle, milestoneDate){
    console.log("milestone added");
    this.milestoneObjs.push({milestoneTitle: milestoneTitle, milestoneDate: milestoneDate});
  }


  clearDatabase(){
    this.storage.clear();
    this.navCtrl.push(HomePage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGoalPage');
  }



}
