import Experience from "./Experience.js"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import * as THREE from 'three'
export default class Camera{
    constructor(){
        this.experience =  new Experience();
        this.sizes =  this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPrespectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }
    createPrespectiveCamera(){
        this.prespectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 1,1000);
        this.scene.add(this.prespectiveCamera);
        this.prespectiveCamera.position.z = 12;
        this.prespectiveCamera.position.x = 29;
        this.prespectiveCamera.position.y = 14;

    }
    createOrthographicCamera(){
        this.orthographicCamera = new THREE.OrthographicCamera((-this.sizes.aspect * this.sizes.frustrum )/2,(this.sizes.aspect * this.sizes.frustrum )/2, this.sizes.frustrum/2, -this.sizes.frustrum/2, -20, 20);
        // this.orthographicCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 1,1000);
        this.orthographicCamera.position.y = 2.9;
        this.orthographicCamera.position.z = 5;
        this.orthographicCamera.rotation.x = -Math.PI / 6;

        this.scene.add(this.orthographicCamera);
        // this.helper = new THREE.CameraHelper(this.orthographicCamera);
        // this.scene.add(this.helper);

        // const size = 20;
        // const divisions = 20;

        // const gridHelper = new THREE.GridHelper( size, divisions );
        // this.scene.add( gridHelper );

        // const axesHelper = new THREE.AxesHelper( 10 );
        // this.scene.add( axesHelper );
    }
    setOrbitControls(){
        this.controls = new OrbitControls(this.prespectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom =true;
    }
    resize(){
        // Updating Prespective Camera on Resize
        this.prespectiveCamera.aspect = this.sizes.aspect;
        this.prespectiveCamera.updateProjectionMatrix();
        // this.perspectiveCamera.updateProjectionMatrix();

        // Updating Orthographic Camera on Resize
        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum )/2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum )/2;
        this.orthographicCamera.top = this.sizes.frustrum/2;
        this.orthographicCamera.bottom = -this.sizes.frustrum/2;
        this.orthographicCamera.updateProjectionMatrix();
    }
    
    update(){
        this.controls.update();
        // this.helper.matrixWorldNeedsUpdate = true;
        // this.helper.update();
        // this.helper.position.copy(this.orthographicCamera.position);
        // this.helper.rotation.copy(this.orthographicCamera.rotation);
    }
}