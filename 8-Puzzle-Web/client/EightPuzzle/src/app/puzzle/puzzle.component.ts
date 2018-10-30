import { Component, OnInit } from '@angular/core';
import { SolverService } from '../services/solver.service'

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {

  result:any;
  state:any;
  algorithm:string='bfs';
  heuristic:string = 'manhattan';
  algos:any = [];
  heuristics:any = [];
  tiles_state:any=[];
  speed:number=50;
  blocked:boolean=false;
  constructor(private solverService:SolverService) { }

  ngOnInit() {
    this.state = "1,2,0,3,4,5,6,7,8"
    this.tiles_state = this.state.split(',').map(Number);
    this.algos=[
            {label: 'BFS', value: 'bfs', icon: 'pi pi-sitemap'},
            {label: 'DFS', value: 'dfs', icon: 'pi pi-share-alt'},
            {label: 'A*', value: 'a_star', icon: 'fas fa-star-of-life'}
    ]
    this.heuristics=[
            {label: 'Manhattan', value: 'manhattan', icon: 'fas fa-route'},
            {label: 'Euclidean', value: 'euclidean', icon: 'fas fa-square-root-alt'}
    ]
    this.blocked=false;
  }
  solvePuzzle(){
    this.tiles_state = this.state.split(',').map(Number);
    this.result=null;
    this.blocked = true;
    if(this.algorithm != 'a_star'){
      this.heuristic=null;
    }
    let game ={
      "state":this.state.split(',').map(Number),
      "algorithm":this.algorithm,
      "heuristic":this.heuristic
    }
    this.solverService.solve(game)
    .subscribe(res=>{
        this.blocked=false;
        this.result=res;
        console.log(res);
    });
  }

  async runAnimation(){
    this.tiles_state = this.state.split(',').map(Number);
    for(let move of this.result.steps)
    {
      await this.delay(1000-this.speed*10);
      let zero=this.tiles_state.indexOf(0);
      this.moveTile(zero,move);
    }

  }

  moveTile(zero,move){
    if(move =='right'){
        this.tiles_state[zero-1] = this.tiles_state.splice(zero,1,this.tiles_state[zero-1])[0];
        console.log(this.tiles_state);
  }
    if(move == 'left'){
        this.tiles_state[zero+1] = this.tiles_state.splice(zero,1,this.tiles_state[zero+1])[0];
  }
    if(move == 'up'){
        this.tiles_state[zero+3] = this.tiles_state.splice(zero,1,this.tiles_state[zero+3])[0];
  }
    if(move == 'down'){
        this.tiles_state[zero-3] = this.tiles_state.splice(zero,1,this.tiles_state[zero-3])[0];
  }
  }

  shuffle(){
    this.tiles_state.shuffle();
    this.state='';
    for(let a of this.tiles_state){
      if(this.tiles_state.indexOf(a)<this.tiles_state.length-1)
      this.state+=a+',';
      else this.state+=a;
    }
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

onClick(s){
  let index = this.tiles_state.indexOf(s);
  let zero=this.tiles_state.indexOf(0);
  let boundray = zero-index;
  console.log(boundray);
  if(boundray==1&&zero!=6 &&zero!=3 || boundray==-1&&zero!=2 &&zero!=5||boundray==3||boundray==-3)
  {
  this.tiles_state[index] = this.tiles_state.splice(zero,1,this.tiles_state[index])[0];
  this.state='';
  for(let a of this.tiles_state){
    if(this.tiles_state.indexOf(a)<this.tiles_state.length-1)
    this.state+=a+',';
    else this.state+=a;
  }
}
}

}

Array.prototype['shuffle'] = function() {
    var input = this;

    for (var i = input.length-1; i >=0; i--) {

        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}
