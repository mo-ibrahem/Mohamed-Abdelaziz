import { EventEmitter } from "events";
import Experience from "./Experience.js"
import GSAP from 'gsap'
import convert from "./Utils/converDivsToSpans"
export default class Preloader extends EventEmitter{
    constructor(){
        super();
        this.experience =  new Experience();
        this.scene = this.experience.scene;
        this.recources = this.experience.resources;
        this.time = this.experience.time;
        this.size = this.experience.sizes;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.size.device;
        this.size.on("switchdevice",(device)=>{
            this.device = device;
        })
        this.world.on("worldready",()=>{
            this.setAssets();
            this.scale();
            this.playIntro();
        })

    }

    setAssets(){
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-discription"));
        convert(document.querySelector(".md"));
        convert(document.querySelector(".hero-second-subheading"));
        convert(document.querySelector(".second-sub"));
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;



    }
    onScroll(e){
        if (e.deltaY > 0){
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }
    async playSecondIntro(){
        await this.secondIntro();
        this.moveFlag = false;
        this.scale();
        document.querySelector("body").style.overflow = "visible";
        this.emit("enablecontrols");
    }
    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if(difference> 0){
            console.log("swiped up")
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.initialY = null;
        
    }
    onTouch(e) {
        this.initialY = e.touches[0].clientY;
    }
    removeEventListeners(){
        window.removeEventListener("wheel",this.scrollDownEvent);
        window.removeEventListener("touchstart",this.touchStart);
        window.removeEventListener("touchmove",this.touchMove);
    }
    async playIntro(){
        await this.firstIntro();

        this.moveFlag = true;
        this.scrollDownEvent = this.onScroll.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        this.touchStart = this.onTouch.bind(this);
        window.addEventListener("wheel",this.scrollDownEvent);
        window.addEventListener("touchstart",this.touchStart);
        window.addEventListener("touchmove",this.touchMove);
    }
    scale(){
        this.roomChildren.rectLight.width = 0;
        this.roomChildren.rectLight.height = 0;
    }
    firstIntro(){
        return new Promise ((resolve)=>{
            this.timeline = new GSAP.timeline();
            this.timeline.to(".preloader",{
                opacity:0,
                delay: 1,
                onComplete: ()=>{
                    document.querySelector(".preloader").classList.add("hidden")
                }
            })
            if(this.device === "desktop"){
                this.timeline.to(this.roomChildren.cube.scale,{
                    x: 3,
                    y: 3,
                    z: 3,
                    ease: "back.out(3)",
                }).to(this.room.position,{
                    x: -1.5,
                    ease: "power1.out",
                    duration: 0.7,
                })
            }else{
                this.timeline.to(this.roomChildren.cube.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(3)",

                }).to(this.room.position,{
                    z: -1,
                    ease: "power1.out",
                    duration: 0.7,
                })
            }
            this.timeline.to(".intro-text .animatedis",{
                yPercent: -100,
                stagger: 0.07,
                ease: "back.out(1.7)",
                onComplete: resolve,
            }).to(".arrow-svg-wrapper",{
                opacity:1,
            },"same")
            .to(".toggle-bar",{
                opacity:1,
                onComplete: resolve,
            },"same")
        
        })
        
    }
    secondIntro(){
        return new Promise ((resolve)=>{
            this.secondTimeline = new GSAP.timeline();
                this.secondTimeline
                .to(".intro-text .animatedis",{
                    yPercent: 100,
                    stagger: 0.07,
                    ease: "back.in(1.7)",
                },"fadeout").to(".arrow-svg-wrapper",{
                    opacity:0,
                },"fadeout")
                .to(this.room.position,{
                    z: 0,
                    y: 0,
                    x: 0,
                    ease: "power1.out",
                    duration: 0.7
                },"same")
                .to(this.roomChildren.cube.rotation,{
                    y: 2 * Math.PI + Math.PI /4,
                },"same")
                .to(this.roomChildren.cube.scale,{
                    x: 10.25,
                    y: 8,
                    z: 10.25
                },"same")
                .to(this.camera.orthographicCamera.position,{
                    y:3.5,
                    
                },"same")
                // .to(this.room.rotation,{
                //     y:2* Math.PI + Math.PI
                    
                // },"same")
                .to(this.roomChildren.cube.position,{
                    x: -0.064253,
                    y: 6.47681,
                    z: -1.42661,
                },"same").set(this.roomChildren.body.scale,{
                    x:1,
                    y:1,
                    z:1
                })
                .to(this.roomChildren.cube.scale,{
                    x:0,
                    y:0,
                    z:0,
                },"e")
                .to(".hero-main-title .animatedis",{
                    yPercent: -100,
                    stagger: 0.07,
                    ease: "back.out(1.7)",

                },"e")
                .to(".hero-main-discription .animatedis",{
                    yPercent: -100,
                    stagger: 0.090,
                    ease: "back.out(1.7)",

                },"e")
                .to(".first-sub .animatedis",{
                    yPercent: -100,
                    stagger: 0.07,
                    ease: "back.out(1.7)",

                },"e",)
                .to(".md .animatedis",{
                    yPercent: -100,
                    stagger: 0.07,
                    ease: "back.out(1.7)",

                },"e",)
                .to(".second-sub .animatedis",{
                    yPercent: -100,
                    stagger: 0.07,
                    ease: "back.out(1.7)",
                },"e")
                .to(this.roomChildren.aquaruim.scale,{
                    x:1,
                    y:1,
                    z:1,
                    ease: "back.out(2)",
                    duration: 0.5,
                },"fish")
                .to(this.roomChildren.fish.scale,{
                    x:1,
                    y:1,
                    z:1,
                    ease: "back.out(2)",
                    duration: 0.5,
                },"fish")
                .to(this.roomChildren.clock.scale,{
                    x:1,
                    y:1,
                    z:1,
                    ease: "back.out(2)",
                    duration: 0.5,
                },)
                .to(this.roomChildren.desks.scale,{
                    x:1,
                    y:1,
                    z:1,
                    ease: "back.out(2)",
                    duration: 0.5,
                })
                .to(this.roomChildren.shelves.scale,{
                    x:1,
                    y:1,
                    z:1,
                    ease: "back.out(2)",
                    duration: 0.5,
                })
                .to(this.roomChildren.floor_items.scale,{
                    x:1,
                    y:1,
                    z:1,
                    ease: "back.out(2)",
                    duration: 0.5,
                })
                .to(this.roomChildren.table_stuff.scale,{
                    x:1,
                    y:1,
                    z:1,
                    ease: "back.out(2)",
                    duration: 0.5,
                })
                .to(this.roomChildren.computer.scale,{
                    x:1,
                    y:1,
                    z:1,
                    ease: "back.out(2)",
                    duration: 0.5,
                })
                .to(this.roomChildren.chair.scale,{
                    x:1,
                    y:1,
                    z:1,
                    ease: "back.out(2)",
                    duration: 0.5,
                },"chair")
                .to(this.roomChildren.chair.rotation,{
                    y: 4* Math.PI + Math.PI /4,
                    ease: "power2.out",
                    duration: 1,
                },"chair")
                .to(".arrow-svg-wrapper",{
                    opacity:1,
                    onComplete: resolve,
                })

            
        });
    }
    move(){
        if(this.device ==="desktop"){
            this.room.position.set(-1,0,0);
        }
        else{
            this.room.position.set(0,0,-1);

        }
    }
    // update(){
    //     if(this.moveFlag){
    //         this.move();
    //     }
    // }
}
