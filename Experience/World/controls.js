import Experience from "../Experience.js"
import * as THREE from 'three'
import GSAP from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger.js'
import ASScroll from '@ashthornton/asscroll'

export default class Controls{
    constructor(){
        this.experience =  new Experience();
        this.scene = this.experience.scene;
        this.recources = this.experience.resources;
        this.time = this.experience.time;
        this.size = this.experience.sizes;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach((child)=>{
            if(child.type === 'RectAreaLight'){
                this.rectLight = child;
            }
        })

        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        this.circleThird = this.experience.world.floor.circleThird;

        GSAP.registerPlugin(ScrollTrigger);

        this.setScrollTrigger();
        // this.setSmoothScroll();
    }
    // setupASScroll() {
    //     // https://github.com/ashthornton/asscroll
    //     const asscroll = new ASScroll({
    //       disableRaf: true });
    
      
    //     GSAP.ticker.add(asscroll.update);
      
    //     ScrollTrigger.defaults({
    //       scroller: asscroll.containerElement });
      
      
    //     ScrollTrigger.scrollerProxy(asscroll.containerElement, {
    //       scrollTop(value) {
    //         if (arguments.length) {
    //           asscroll.currentPos = value;
    //           return;
    //         }
    //         return asscroll.currentPos;
    //       },
    //       getBoundingClientRect() {
    //         return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    //       },
    //       fixedMarkers: true });
      
      
    //     asscroll.on("update", ScrollTrigger.update);
    //     ScrollTrigger.addEventListener("refresh", asscroll.resize);
      
    //     requestAnimationFrame(() => {
    //       asscroll.enable({
    //         newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });
      
    //     });
    //     return asscroll;
    // }
    // setSmoothScroll(){
    //     this.asscroll = this.setupASScroll();
    // }
    setScrollTrigger(){

        ScrollTrigger.matchMedia({
	
            //desktop  
            "(min-width: 969px)": () =>  {
                this.room.scale.set(0.11,0.11,0.11);
                this.rectLight.width=.5;
                this.rectLight.height=.7;
                // First Section --------------------------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".first-move",
                        start:"top top",
                        end:"bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh: true,

                    }
                });
                this.firstMoveTimeline.to(
                    this.room.position,
                    {
                        x: () => {
                            return this.size.width * 0.0014;
                        },
                    }
                );

                 // Second Section --------------------------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".second-move",
                        start:"top top",
                        end:"bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh: true,

                    }
                });

                this.secondMoveTimeline.to(this.room.position,{
                   x:1,
                   z:3
                },
                "same"
                );

                this.secondMoveTimeline.to(this.room.scale,{
                    x: 0.4,
                    y: 0.4,
                    z: 0.4,
                 },
                  "same"
                );
                this.secondMoveTimeline.to(this.rectLight,{
                    width: 0.5 * 6,
                    height: 0.7 * 6,
                  
                 },
                  "same"
                );

                // Third Section --------------------------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".third-move",
                        start:"top top",
                        end:"bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.camera.orthographicCamera.position,{
                   y:.5,
                   x: -3.5
                }) 

            },
            
            //mobile
            "(max-width: 969px)": () => {
                //resetGlobalState
                this.room.position.set(0,0,0);
                this.room.scale.set(0.07,0.07,0.07);
                this.rectLight.width=1;
                this.rectLight.height=1;

                // First Section --------------------------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".first-move",
                        start:"top top",
                        end:"bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh: true,

                    }
                }).to(this.room.scale,{
                    x:0.1,
                    y:0.1, z:0.1,
                });
                // Second Section --------------------------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".second-move",
                        start:"top top",
                        end:"bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh: true,

                    }
                }).to(this.room.scale,{
                    x:0.25,
                    y:0.25
                    , z:0.25,
                },"same").to(this.rectLight,{
                    width: 0.3 * 3.4,
                    height: 0.4 * 3.4,
                },"same").to(this.room.position,{
                    x:1.5
                },"same");
                // Third Move Timeline --------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".third-move",
                        start:"top top",
                        end:"bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh: true,
                        }
                    }).to(this.room.position,{
                        z: -4.5,
                    })
            },
          
            //all
            "all": ()=> {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section)=>{
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if(section.classList.contains("right")){
                        GSAP.to(section,{
                            borderTopLeftRadius: 10,
                            scrollTrigger:{
                                trigger: section,
                                start: "top bottom",
                                end:"top top",
                                scrub: 0.6,
                            }
                        });
                        GSAP.to(section,{
                            borderBottomLeftRadius: 700,
                            scrollTrigger:{
                                trigger: section,
                                start: "bottom bottom",
                                end:"bottom top",
                                scrub: 0.6,
                            }
                        });
                    }else{
                        GSAP.to(section,{
                            borderTopRightRadius: 10,
                            scrollTrigger:{
                                trigger: section,
                                start: "top bottom",
                                end:"top top",
                                scrub: 0.6,
                            }
                        });
                        GSAP.to(section,{
                            borderBottomRightRadius: 700,
                            scrollTrigger:{
                                trigger: section,
                                start: "bottom bottom",
                                end:"bottom top",
                                scrub: 0.6,
                            }
                        });
                    }
                    GSAP.from(this.progressBar,{
                        scaleY:0,
                        scrollTrigger:{
                            trigger: section,
                            start:"top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressBar,
                            pinSpacing: false,
                        }
                    })
                })

                //mini platform animations
                this.secondPartTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".third-move",
                        start:"cener center",
                        }
                    });
                this.room.children.forEach((child)=>{
                    if(child.name ==="Mini_Floor"){
                        this.first =  GSAP.to(child.position,{
                            z: -0.144419,
                            x: 0.1962126,
                            ease:"back.out(2)",
                            duration: 0.6
                        })
                        this.firstt = GSAP.to(child.scale,{
                            x:1,
                            y:1.05,
                            z:1
                        })
                    }
                    if(child.name ==="Mailbox"){
                        this.second =  GSAP.to(child.scale,{
                            z: 1,
                            x:1,
                            y: 1,
                            ease:"back.out(2)",
                            duration: 0.6
                        })
                    }
                    if(child.name ==="Lamp"){
                        this.third =  GSAP.to(child.scale,{
                            z: 1,
                            x:1,
                            y: 1,
                            ease:"back.out(2)",
                            duration: 0.6
                        })
                    }
                    if(child.name ==="FloorFirst"){
                        this.fourth = GSAP.to(child.scale,{
                            z: 1,
                            x:1,
                            y: 1,
                            ease:"back.out(2)",
                            duration: 0.6
                        })
                    }
                    if(child.name ==="FloorSecond"){
                        this.fifth = GSAP.to(child.scale,{
                            z: 1,
                            x:1,
                            y: 1,
                            ease:"back.out(2)",
                            duration: 0.6
                        })
                    }
                    if(child.name ==="FloorThird"){
                        this.sixth = GSAP.to(child.scale,{
                            z: 1,
                            x:1,
                            y: 1,
                            ease:"back.out(2)",
                            duration: 0.6
                        })
                    }
                    if(child.name ==="Dirt"){
                        this.seventh = GSAP.to(child.scale,{
                            z: 1,
                            x:1,
                            y: 1,
                            ease:"back.out(2)",
                            duration: 0.6
                        })
                    }
                    if(child.name ==="Flower1"){
                        this.eighth = GSAP.to(child.scale,{
                            z: 1,
                            x:1,
                            y: 1,
                            ease:"back.out(2)",
                            duration: 0.6
                        })
                    }
                    if(child.name ==="Flower2"){
                        this.ninth = GSAP.to(child.scale,{
                            z: 1,
                            x:1,
                            y: 1,
                            ease:"back.out(2)",
                            duration: 0.6
                        })
                    }
                })
                this.secondPartTimeline.add(this.firstt);

                this.secondPartTimeline.add(this.firstt);
                this.secondPartTimeline.add(this.second,"-=0.2");
                this.secondPartTimeline.add(this.third,"-=0.2");
                this.secondPartTimeline.add(this.fourth,"-=0.2");
                this.secondPartTimeline.add(this.fifth,"-=0.2");
                this.secondPartTimeline.add(this.sixth,"-=0.2");
                this.secondPartTimeline.add(this.seventh,"-=0.2");
                this.secondPartTimeline.add(this.eighth);
                this.secondPartTimeline.add(this.ninth ,"-=0.1");

                // all Aniimationsss
                // First Section --------------------------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".first-move",
                        start:"top top",
                        end:"bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh: true,

                    }
                }).to(this.circleFirst.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                },)

                 // Second Section --------------------------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".second-move",
                        start:"top top",
                        end:"bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh: true,

                    }
                }).to(this.circleSecond.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                },"samee").to(this.room.position,{
                    y: 0.7,
                },"samee")


                // Third Section --------------------------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".third-move",
                        start:"top top",
                        end:"bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.circleThird.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                })

            },
            
              
          }); 






        // this.timeline = new GSAP.timeline();
        // this.timeline.to(this.room.position,{
        //     x: () => {
        //         return this.size.width * 0.0017
        //     },
        //     scrollTrigger:{
        //         trigger:".first-move",
        //         markers:true,
        //         start:"top top",
        //         end:"bottom bottom",
        //         scrub:0.6,
        //         invalidateOnRefresh: true,

        //     }
        // }) 
    }

    resize(){

    }
    
    update(){
        
    }
} 
















        // this.curve.getPointAt(this.lerp.current % 1, this.position);
        // this.camera.orthographicCamera.position.copy(this.position);
        
        // this.directionalVector.subVectors(this.curve.getPointAt((this.lerp.current+0.00001)%1), this.position);
        // this.directionalVector.normalize();
        // this.crossVector.crossVectors(this.StaticVector, this.directionalVector);
        // this.crossVector.multiplyScalar(100000);
        // this.camera.orthographicCamera.lookAt(this.crossVector);
         

    // onWheel(){
    //     // window.addEventListener("wheel", (e)=>{
    //     //     console.log(e);
    //     //     if(e.deltaY > 0){
    //     //         this.lerp.target -= 0.01;
    //     //         if(this.lerp.target<0){
    //     //             this.lerp.target =1;
    //     //         }
    //     //     }
    //     //     else{
    //     //         this.lerp.target += 0.01;
    //     //     }
    //     // } );
    // }
    // setPath(){
    //         this.curve = new THREE.CatmullRomCurve3( [
    //             new THREE.Vector3( -5, 0, 0 ),
    //             new THREE.Vector3( 0, 0, -5 ),
    //             new THREE.Vector3( 5, 0, 0 ),
    //             new THREE.Vector3( 0, 0, 5 ),
    //          ],
    //          true
    //     );
        

    //     const points = this.curve.getPoints( 50 );
    //     const geometry = new THREE.BufferGeometry().setFromPoints( points );
        
    //     const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
        
    //     // Create the final object to add to the scene
    //     const curveObject = new THREE.Line( geometry, material );

    //     this.scene.add(curveObject);
    // }