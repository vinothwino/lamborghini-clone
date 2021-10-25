import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap'
import LOGO from 'assets/images/png/logo.png'
import CollapsiveContainer from './CollapsiveContainer'
import BurgerCollapsiveContainer from './BurgerCollapsiveContainer'
import gsap from 'gsap'

const Navbar = () => {
    const [selectedNav, setSelectedNav] = useState()
    const [showBurgerContainer, toggleBurgerContainer] = useState(false)
    const timeline = useRef(gsap.timeline())
    useEffect(() => {
        document.getElementById('models-container').addEventListener('mousemove', (event) => {
            console.log('changes')
            let target = event.target.getAttribute('data-target') || event.target.parentElement.getAttribute('data-target')
            let element = document.getElementById('collapsive-container')
            let t1 = timeline.current
            if (target)
                switch (target) {
                    case 'models':
                    case 'custom-solution':
                    case 'ownership':
                    case 'motorsport':
                        if (selectedNav !== target) {
                            setSelectedNav(target)
                            let item = document.querySelector(`[data-item=${target}]`)
                            if (item) {
                                t1.clear()
                                t1.to(item, { autoAlpha: 1, left: event.target.offsetLeft, duration: 0 })
                                t1.to(element, { autoAlpha: 1, yPercent: 0, height: item.scrollHeight, duration: 0, delay: 0 })
                            }
                            else
                                t1.to(element, { yPercent: -100, height: '0px', duration: 0, delay: 0 })
                        }
                        break;
                    default:
                        setSelectedNav()
                        t1.to(element, { yPercent: -100, height: '0px', duration: 0, delay: 0 })
                        break;
                }
        })

        document.getElementById('header').addEventListener('mouseleave', function (e) {
            let element = document.getElementById('collapsive-container')
            setSelectedNav()
            let t1 = timeline.current
            t1.clear()
            t1.to(element, { yPercent: -100, height: '0px', duration: 0, delay: 0 })
        })

        window.addEventListener('resize', (event) => {
            resizeAnimation()
        })

        resizeAnimation()

    }, [])

    const resizeAnimation = useCallback(() => {
        const navbarElement = document.getElementById('navbar')
        const maskElement = document.getElementById('navbar-mask')
        const modelElement = document.getElementById('mask-left')
        const hamburger = document.getElementById('hamburger')
        if (navbarElement.getAttribute('data-toggle-view') === 'settings') {
            maskElement.style.left = modelElement.offsetLeft + modelElement.offsetWidth + 'px'
            maskElement.style.width = hamburger.offsetLeft - (modelElement.offsetLeft + modelElement.offsetWidth + 15) + 'px'
        }
        else {
            maskElement.style.left = modelElement.offsetLeft + 'px'
            maskElement.style.width = '100%'
        }
    })
    return (
        <header id="header" className="fixed-top">
            <nav id="navbar" data-toggle-view="settings">
                <a id="mask-left" href="#" className="brand">
                    <img src={LOGO} alt="LOGO" />
                </a>
                <ul id="models-container">
                    <li>
                        <a href="#" data-target="models">models</a>
                    </li>
                    <li>
                        <a href="#" data-target="custom-solution">custom solutions</a>
                    </li>
                    <li>
                        <a href="#" data-target="ownership">ownership</a>
                    </li>
                    <li>
                        <a href="#" data-target="motorsport">motorsport</a>
                    </li>
                </ul>
                <div className="ms-auto d-flex">
                    <ul className="d-none d-xl-flex">
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
                        <Button
                            id="hamburger"
                            variant="transparent"
                            className={`custom-burger bg-transparent ${showBurgerContainer && 'active'}`}
                            onClick={() => toggleBurgerContainer(!showBurgerContainer)}
                        >
                            <div></div>
                            <div></div>
                            <div></div>
                        </Button>
                    </div>
                </div>
                <div
                    id="navbar-mask"
                    className={`overlay-mask ${showBurgerContainer && 'show'}`}>
                </div>
            </nav>
            <CollapsiveContainer selectedNav={selectedNav} />
            <BurgerCollapsiveContainer
                show={showBurgerContainer}
                toggle={() => toggleBurgerContainer(!showBurgerContainer)}
                resizeAnimation={resizeAnimation}
            />
        </header>
    );
}

export default Navbar;