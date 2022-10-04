import Experience from "../Experience.js"
import * as THREE from 'three'
import GSAP from "gsap"
export default class Environment{
    constructor(){
        this.experience =  new Experience();
        this.scene = this.experience.scene;
        this.recources = this.experience.resources;
        
        this.setSunlight();
    }
    
    setSunlight(){
        this.sunLight =new THREE.DirectionalLight("#ffffff",3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048,2048);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(0,7,3);
        this.scene.add(this.sunLight);

        this.ambientlight  =  new THREE.AmbientLight("#ffffff",1);
        // this.ambientlight.intensity = 0.5;
        this.scene.add(this.ambientlight);
    }
    resize(){

    }
    switchTheme(theme){
        if(theme ==='dark'){
            GSAP.to(this.sunLight.color,{
                r: 0.17254901960784313,
                g: 0.23137254901960785,
                b: 0.6862745098039216,
            });
            GSAP.to(this.ambientlight.color,{
                r: 0.17254901960784313,
                g: 0.23137254901960785,
                b: 0.6862745098039216,
            });
            GSAP.to(this.sunLight,{
                intensity: 0.78,
            });
            GSAP.to(this.ambientlight,{
                intensity: 0.78,
            })
        }
        else{
            GSAP.to(this.sunLight.color,{
                r: '1',
                g: '1',
                b: '1'
            })
            GSAP.to(this.ambientlight.color,{
                r: '1',
                g: '1',
                b: '1'
            })
            GSAP.to(this.sunLight,{
                intensity: 3,
            });
            GSAP.to(this.ambientlight,{
                intensity: 0.5,
            })
        }
    }
    update(){
    }
}