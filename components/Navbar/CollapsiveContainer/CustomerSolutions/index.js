import { useEffect, useState } from "react"

let solutionList = [
    {
        name: 'customization',
    },
    {
        name: 'accessories',
    },
    {
        name: 'financial services',
    },
]

const CustomerSolutions = () => {
    let [selectedName, setModelName] = useState()
    useEffect(() => {
        document.getElementById('customer-solution')
            .addEventListener('mousemove', (event) => {
                let target = event.target.getAttribute('data-target') || event.target.parentElement.getAttribute('data-target')
                let container = document.getElementById('customer-solution')
                let oldSelectedItem = container.getAttribute('data-selected')
                if (target && oldSelectedItem !== target) {
                    container.setAttribute('data-selected', target)
                    setModelName(target)
                }
            })
    }, [])
    return (
        <div id="customer-solution" data-item="custom-solution" className="list-container">
            <ul className="list-unstyled theme-light" id="models-list">
                {
                    solutionList.map(({ name }, key) => (
                        <li key={key} data-target={name} className={`${selectedName === name ? "active" : ""}`}>
                            <a href="#">{name}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default CustomerSolutions;