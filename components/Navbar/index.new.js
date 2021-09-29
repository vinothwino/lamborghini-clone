import React, { useRef, useEffect, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap'
import LOGO from 'assets/images/png/logo.png'
import CollapsiveContainer from './CollapsiveContainer'
import gsap from 'gsap'

const Navbar = () => {
    const [selectedNav, setSelectedNav] = useState()
    const timeline = useRef(gsap.timeline())
    useEffect(() => {
        document.getElementById('models-container').addEventListener('mouseover', (event) => {
            console.log('changes')
            let target = event.target.getAttribute('data-target')
            let element = document.getElementById('collapsive-container')

            if (target)
                switch (target) {
                    case 'models':
                    case 'ownership':
                    case 'motorsport':


                        if (selectedNav !== target) {
                            setSelectedNav(target)
                            alert('in')
                            let item = document.querySelector(`[data-item=${target}]`)
                            let t1 = timeline.current
                            if (item) {
                                // document.querySelectorAll(`[data-item]`).forEach(el => el.classList.remove('show'))
                                t1.to(item, { autoAlpha: 1, left: event.target.offsetLeft })
                                t1.to(element, { autoAlpha: 1, yPercent: 0, height: element.scrollHeight, duration: 0, delay: 0 })
                            }
                            else {
                                t1.set(element, { autoAlpha: 0, yPercent: -100, height: '0px' })
                            }

                            // element.style.height = element.scrollHeight + 'px'
                            // item.style.left = event.target.offsetLeft + 'px'
                            // item.classList.add('show')
                        }
                        // if (!element.classList.contains('show')) {
                        //     element.classList.toggle('show')
                        // }
                        break;
                    default:
                        if (element.classList.contains('show'))
                            document.getElementById('collapsive-container').classList.toggle('show')
                        break;
                }
        })

        document.getElementById('header').addEventListener('mouseleave', function (e) {
            let element = document.getElementById('collapsive-container')
            setSelectedNav()
            let t1 = timeline.current
            alert('out')
            t1.progress(1).kill()
            t1.set(element, { autoAlpha: 0, yPercent: -100, height: '0px' })
        })
    }, [])
    return (
        <header id="header" className="fixed-top">
            <nav id="navbar">
                <a href="#" className="brand">
                    <img src={LOGO} alt="LOGO" />
                </a>
                <ul id="models-container">
                    <li>
                        <a href="#" data-target="models">models</a>
                    </li>
                    <li>
                        <a href="#" data-target="ownership">ownership</a>
                    </li>
                    <li>
                        <a href="#" data-target="motorsport">motorsport</a>
                    </li>
                    <li>
                        <a href="#" data-target="close">pre-owned</a>
                    </li>
                </ul>
                <ul className="ms-auto">
                    <li>
                        <a href="#">dealerships</a>
                    </li>
                    <li>
                        <a href="#">museum</a>
                    </li>
                    <li>
                        <a href="#">store</a>
                    </li>
                </ul>
                <div className="button-group d-flex justify-content-start align-items-center">
                    <Button variant="transparent">
                        <i className="icon-chat"></i>
                    </Button>
                    <Button variant="transparent">
                        <i className="icon-search"></i>
                    </Button>
                    <Button variant="transparent" className="custom-burger">
                        <div></div>
                        <div></div>
                        <div></div>
                    </Button>
                </div>
            </nav>
            <CollapsiveContainer selectedNav={selectedNav} />
        </header>
    );
}

export default Navbar;