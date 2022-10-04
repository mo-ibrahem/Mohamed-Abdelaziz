import Experience from "../Experience.js"
import * as THREE from 'three'
import GSAP from 'gsap'
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
 

export default class Room{
    constructor(){
        this.experience =  new Experience();
        this.scene = this.experience.scene;
        this.recources = this.experience.resources;
        this.room = this.recources.items.room;
        this.actualRoom = this.room.scene;
        this.time = this.experience.time;
        this.roomChildren = {};

        this.lerp = {
            current:0,
            target:1,
            ease: 0.5,

        }

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }
    
    setModel(){
        this.actualRoom.children.forEach((child)=>{
            child.castShadow = true;
            child.receiveShadow = true;
            if(child instanceof THREE.Group){
                child.children.forEach((groupchild)=>{
    
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })
            }
            if(child.name ==="Aquaruim"){
                child.children[0].material = new THREE.MeshPhysicalMaterial;
                child.children[0].material.roughness = 0 ;
                child.children[0].material.color.set(0x549dd2);
                child.children[0].material.ior = 3;
                child.children[0].material.transmission = 1;
                child.children[0].material.opacity = 1;
            }
            if(child.name ==="Computer"){
                child.children[0].material = new THREE.MeshBasicMaterial({
                    map: this.recources.videoTexture["screen"],
                });
            }
            if(child.name === "Mini_Floor"){
                
                child.position.z = -4.3696;
                child.position.x = 4.24879;
            }
            // if(child.name === "Mailbox" || child.name === "Lamp"|| child.name === "FloorFirst" || child.name === "FloorSecond" ||child.name === "FloorThird" || child.name === "Flower1" || child.name === "Flower2" || child.name === "Dirt" ){
            //    child.scale.set(0,0,0)
            // }
            child.scale.set(0,0,0);
            if(child.name ==="Cube"){
                // child.scale.set(3,3,3);
                child.position.set(0,0,0);
                child.rotation.y = Math.PI /4;
            }
            this.roomChildren[child.name.toLowerCase()] = child;
        })

        const width = .5;
        const height = .5;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        rectLight.position.set( 4.18244, 7.6, -0.810353 );
        rectLight.rotation.x = - Math.PI / 2;
        rectLight.rotation.z = Math.PI / 4;
  
        this.actualRoom.add( rectLight );
        this.roomChildren["rectLight"] = rectLight;


        // const LampLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        // LampLight.position.set( 6.9373, -0.399356, -7.2717 );
        // LampLight.rotation.x = - Math.PI /2;
        // LampLight.rotation.z = Math.PI / 4;
        // this.actualRoom.add( LampLight )

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11,0.11,0.11);
    }
    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[0]);
        this.swim.play();
    }
    onMouseMove(){
        window.addEventListener("mousemove", (e)=>{
            this.rotation = ((e.clientX - window.innerWidth/2)*2)/window.innerWidth;
            this.lerp.target = this.rotation * 0.1;

        })
    }
    resize(){

    }
    
    update(){
        this.mixer.update(this.time.delta * 0.0009);
        this.lerp.current = GSAP.utils.interpolate( 
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
            );
        
        this.actualRoom.rotation.y = this.lerp.current;
    }
}