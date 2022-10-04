import * as THREE from 'three'

import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time.js"
import Resources from "./Utils/Recourses.js" 
import assets from "./Utils/assets"

import Preloader from "./Preloader"
import Camera from "./Camera.js"
import Theme from "./theme.js"
import Renderer from "./Renderer.js"

import World from "./World/World.js"
import Controls from "./World/controls.js"
export default class Experience{
    static instance;
  
    constructor(canvas){

        if (Experience.instance){
            return Experience.instance;
        }

        Experience.instance = this
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.sizes = new Sizes();
        this.time = new Time();

        this.camera =  new Camera();
        this.theme = new Theme();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.world = new World();
        this.preloader= new Preloader();

        this.preloader.on("enablecontrols", ()=>{
            this.controls = new Controls();
        })

        this.time.on("update", ()=>{
            this.update();
        })
        this.sizes.on("resize", ()=>{
            this.resize();
        })
    }
    resize(){
        this.camera.resize();

        this.renderer.resize();
    }
    update(){
        // this.preloader.update();

        this.camera.update();
        this.world.update();

        this.renderer.update();

    }
}