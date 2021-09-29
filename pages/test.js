import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Hero from 'assets/images/fly.svg'
import Hero1 from 'assets/images/hero1.svg'
import gsap from 'gsap'
const all = dynamic(import('gsap/all'), { ssr: false })
// const plugins = [ TextPlugin ];

let styles = {
    dot: {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: '20px',
        visibility:'hidden'
    }
}
export default function Home() {
    useEffect(async () => {
        let plugin = await all.render.preload()
        gsap.registerPlugin(plugin.EasePack.ExpoScaleEase,plugin.TextPlugin);
        // gsap.registerPlugin(plugins)
        // GSAP element animation
        let t1 = gsap.timeline()
        t1.addLabel('anim1', "-=.5")
        //TO
        t1.to('.hero1',
            {
                duration: 2,
                x: 300,
                rotation: 360,
                scale: .3,
                opacity: 0
            }
        )
        //FROM
        t1.from('.hero2',
            {
                duration: 2,
                rotation: 360,
                x: 300,
                scale: .3,
                opacity: 0
            },
            "anim1"
        )
        // GSAP js object animation
        const rotationObj = { rotation: 0 }
        gsap.to(rotationObj,
            {
                duration: 2,
                rotation: 360,
                onStart: function () { console.log('started') },
                onUpdate: function () { console.log(rotationObj.rotation) },
                onComplete: function () { console.log('ended') },
            }
        )
        //GSAP stagger
        t1.from(".dot",
            {
                duration: 2,
                // y:() => Math.random() *  400-200,
                y: "random(0,100)",
                stagger: .15,
                opacity: 0
            },
            "anim1"
        )

        gsap.to("#textplugin", { duration: 3, ease: "power2", opacity: 1, text: "Hello there!!",stagger:1 })



        machineGun("GSAP animation is cool!!");
    }, [])
    const machineGun = function(text) {
        var container =  document.getElementById('text-animation'),
        _sentenceEndExp = /(\.|\?|!)$/g; //regular expression to sense punctuation that indicates the end of a sentence so that we can adjust timing accordingly
        var words = text.split(" "),
            t2 = gsap.timeline({ delay: 0.6}),
            wordCount = words.length,
            time = 0,textEl,
            word, element, duration, isSentenceEnd, i;

        for (let i = 0; i < wordCount; i++) {
            word = words[i];
            isSentenceEnd = _sentenceEndExp.test(word);
            element  = document.createElement('H3')
            textEl  = document.createTextNode(word)
            element.appendChild(textEl)
            container.appendChild(element)
            duration = 1 //longer words take longer to read, so adjust timing. Minimum of 0.5 seconds.
            if (isSentenceEnd) {
                duration += 1; //if it's the last word in a sentence, drag out the timing a bit for a dramatic pause.
            }
            //set opacity and scale to 0 initially. We set z to 0.01 just to kick in 3D rendering in the browser which makes things render a bit more smoothly.
            gsap.set(element, { autoAlpha:0, scale: 0, z: 0.01 });
            //the SlowMo ease is like an easeOutIn but it's configurable in terms of strength and how long the slope is linear. See https://www.greensock.com/v12/#slowmo and https://api.greensock.com/js/com/greensock/easing/SlowMo.html
            t2.to(element, {autoAlpha:0,scale:1.2,duration, ease:"slow(0.25, 0.9)"}, isSentenceEnd ? ">0.8":">0.3")
            // //     //notice the 3rd parameter of the SlowMo config is true in the following tween - that causes it to yoyo, meaning opacity (autoAlpha) will go up to 1 during the tween, and then back down to 0 at the end. 
            .to(element, {autoAlpha:1,duration, ease:"slow(0.25, 0.9, true)"},"<")
        }
    }
    return (
        <div className="p-5">
            <p>From  animation</p>
            <img className="hero1" src={Hero} width="100" />
            <p>To  animation</p>
            <img className="hero2" src={Hero1} width="100" />
            <p>Stagger animation</p>
            <div>
                <span style={{ ...styles.dot }} className="dot  bg-primary"></span>
                <span style={{ ...styles.dot }} className="dot  bg-secondary"></span>
                <span style={{ ...styles.dot }} className="dot bg-warning"></span>
                <span style={{ ...styles.dot }}></span>
            </div>
            <div id="textplugin"></div>
            <p>Text Animation</p>
            <div id="text-animation">
            </div>
        </div>
    )
}
