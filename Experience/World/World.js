import Experience from "../Experience.js"
import { EventEmitter } from "events";

import Environment from "./Enviroment.js"

import Floor from "./floor.js"
import Controls from "./Controls.js"
import Room from "./Room.js"
export default class World extends EventEmitter {
    constructor(){
        super();
        this.experience =  new Experience();
        this.sizes =  this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;

        this.resources.on("ready",()=>{
            this.environment = new Environment();
            this.room = new Room();
            this.floor = new Floor();
            this.controls = new Controls();
            this.emit("worldready");
            
        });
        this.theme.on("switch",(theme)=>{
            this.switchTheme(theme);
        })
        

    }
    switchTheme(theme){
        if(this.environment){
            this.environment.switchTheme(theme);
        }
    }
    resize(){

    }
    
    update(){
        if(this.room){
            this.room.update();
        }
        if(this.controls){
            this.controls.update();
        }
    }
}