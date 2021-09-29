import React, { useEffect, useState, useRef } from 'react';
import aventadorImg from 'assets/images/png/models/aventador/menu_aventador_svj.png'
import DiagonalButton from 'components/Button/DiagonalButton'
import gsap from 'gsap'
let models = [
    {
        modelName: 'aventador',
        collection: [
            {
                modelName: 'aventador s'
            },
            {
                modelName: 'aventador s roadster'
            },
            {
                modelName: 'aventador svj'
            },
            {
                modelName: 'aventador svj roadster'
            }
        ]
    },
    {
        modelName: 'Huracán',
        collection: [
            {
                modelName: 'Huracán EVO'
            },
            {
                modelName: 'Huracán EVO SPYDER'
            },
            {
                modelName: 'Huracán EVO RWD'
            },
            {
                modelName: 'Huracán EVO RWD SPYDER'
            },
            {
                modelName: 'Huracán EVO RWD CAPSULE'
            },
            {
                modelName: 'Huracán STO'
            }
        ]
    },
    {
        modelName: 'urus',
        collection: [
            {
                modelName: 'urus'
            },
            {
                modelName: 'urus pearl capsule'
            },
            {
                modelName: 'urus graphite capsule'
            }
        ]
    },
    {
        modelName: 'limited series',
        collection: [
            {
                modelName: 'Sián FKP 37'
            },
            {
                modelName: 'SIÁN ROADSTER'
            }
        ]
    },
    {
        modelName: 'concept',
        collection: [
            {
                modelName: 'Terzo Millennio'
            },
            {
                modelName: 'Asterion'
            },
            {
                modelName: 'Estoque'
            }
        ]
    }
]
const Models = () => {
    let [selectedModelName, setModelName] = useState()
    let [selectedModelItem, setModelItem] = useState()
    const timeline = useRef(gsap.timeline())
    useEffect(() => {
        document.getElementById('models-list').addEventListener('mousemove', (event) => {
            let target = event.target.getAttribute('data-target') || event.target.parentElement.getAttribute('data-target')
            let modelListContainer = document.getElementById("models-list")
            let listContainer = document.getElementById("list-container")
            let oldSelectedItem = modelListContainer.getAttribute('data-selected')
            let collapsiveContainer = document.getElementById('collapsive-container')
            let t1 = timeline.current
            if (target) {
                if (oldSelectedItem !== target) {
                    modelListContainer.setAttribute('data-selected', target)
                    t1.clear()
                    t1.set('#model-item', { autoAlpha: 0 })
                    setModelItem()
                    setModelName(target)
                    t1.to(collapsiveContainer, { autoAlpha: 1, yPercent: 0, height: listContainer.scrollHeight, duration: 0, delay: 0 })
                    t1.to('#model-item', { autoAlpha: 1, duration: 0 })
                }
            }
            document.getElementById('model-item').addEventListener('mousemove', (event) => {
                let target = event.target.getAttribute('data-target') || event.target.parentElement.getAttribute('data-target')
                let collapsiveContainer = document.getElementById('collapsive-container')
                let t1 = timeline.current
                let carModel = document.getElementById('car-model')
                let oldSelectedItem = carModel.getAttribute('data-selected')
                if (target && oldSelectedItem !== target) {
                    carModel.setAttribute('data-selected', target)
                    setModelItem(target)
                    //ANIMATION
                    t1.clear()
                    t1.set(carModel, { autoAlpha: 0 })
                    t1.set("#animation-1 .heading,#animation-1 .content", { autoAlpha: 0, xPercent: -60 })
                    t1.set("#animation-1 svg", { autoAlpha: 0, scale: 0 })
                    t1.set("#animation-2 .heading,#animation-2 .content", { autoAlpha: 0, xPercent: -60 })
                    t1.set("#animation-2 svg", { autoAlpha: 0, scale: 0 })
                    t1.set("#animation-3 .heading,#animation-3 .content", { autoAlpha: 0, xPercent: -60 })
                    t1.set("#animation-3 svg", { autoAlpha: 0, scale: 0 })
                    t1.to(collapsiveContainer, { autoAlpha: 1, yPercent: 0, height: carModel.scrollHeight, duration: 0, delay: 0 })
                    t1.to(carModel, { autoAlpha: 1, duration: 1.2, ease: "Sine.easeInOut" })
                    t1.to("#animation-1 .heading", { autoAlpha: 1, xPercent: 0, ease: "Sine.easeInOut", duration: .3 }, '<')
                    t1.to("#animation-1 .content", { autoAlpha: 1, xPercent: 0, ease: "Sine.easeInOut", duration: .3 }, '<.1')
                    t1.to("#animation-1 svg", { autoAlpha: 1, scale: 1, duration: .25 }, '>')
                    t1.to("#animation-2 .heading", { autoAlpha: 1, xPercent: 0, ease: "Sine.easeInOut", duration: .3 }, '<-.25')
                    t1.to("#animation-2 .content", { autoAlpha: 1, xPercent: 0, ease: "Sine.easeInOut", duration: .3 }, '<.1')
                    t1.to("#animation-3 .heading", { autoAlpha: 1, xPercent: 0, ease: "Sine.easeInOut", duration: .3 }, '<.2')
                    t1.to("#animation-3 .content", { autoAlpha: 1, xPercent: 0, ease: "Sine.easeInOut", duration: .3 }, '<.1')
                    t1.to("#animation-3 svg", { autoAlpha: 1, scale: 1, duration: .25 }, '>')
                }
            })
        })
    }, [])
    let selectedModel = models.find(model => model.modelName === selectedModelName)
    return (
        <>
            <div id="list-container" data-item="models" className="list-container">
                <ul className="list-unstyled theme-light" id="models-list">
                    {
                        models.map(({ modelName }, key) => (
                            <li key={key} data-target={modelName} className={`${selectedModelName === modelName ? "active" : ""}`}>
                                <a href="#">{modelName}</a>
                            </li>
                        ))
                    }
                </ul>
                <ul id="model-item" className="list-unstyled  theme-light-reverse">
                    {
                        selectedModel && selectedModel.collection.map((coln, subKey) => (
                            <li data-target={coln.modelName} className={`${selectedModelItem === coln.modelName ? "active" : ""}`}>
                                <a href="#" >{coln.modelName}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div id="car-model">
                {
                    selectedModelItem && (
                        <div className="row no-gutters car-model">
                            <div className="col-10 offset-1 position-relative">
                                <img className="image" src={aventadorImg} />
                                <div className="row no-gutters car-model-content">
                                    <div className="col-12 col-xxl-10 offset-xxl-1">
                                        <div className="d-flex align-items-end table-list">
                                            <div id="animation-1" className="flex-fill">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <div className="me-4">
                                                        <DiagonalButton width="40px" />
                                                    </div>
                                                    <div>
                                                        <h6 className="fw-400 text-uppercase heading">Avendator LP 780-4 ULTIMAE</h6>
                                                        <h5 className="mb-0 fw-300 content">Model information</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="animation-2" className="flex-fill">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <div>
                                                        <h6 className="fw-400 text-uppercase heading">POWER (CV) / POWER (KW)</h6>
                                                        <h5 className="mb-0 fw-300 content">780 CV / 574 km/h</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-fill" id="animation-3">
                                                <div className="d-flex flex-column details">
                                                    <div className="flex-fill">
                                                        <div className="d-flex align-items-center justify-content-center">
                                                            <div className="me-4">
                                                                <DiagonalButton width="40px" />
                                                            </div>
                                                            <div>
                                                                <h6 className="fw-400 text-uppercase heading">create your aventador</h6>
                                                                <h5 className="mb-0 fw-300 content">Start configuration</h5>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="flex-fill"></div>
                                                    <div className="flex-fill p-0">
                                                        <div className="d-flex last-grid">
                                                            <div className="flex-fill">
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <div>
                                                                        <h6 className="fw-400 text-uppercase heading">MAX SPEED</h6>
                                                                        <h5 className="mb-0 fw-300 content">355 km/h</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex-fill">
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <div>
                                                                        <h6 className="fw-400 text-uppercase heading">0-100 KM/H</h6>
                                                                        <h5 className="mb-0 fw-300 content">2.8 s</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Models;