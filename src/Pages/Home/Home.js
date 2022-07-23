import React, { useState } from 'react'
import Slider from './Slider'
import SidebarItem from './SidebarItem'
import DEFAULT_OPTIONS from '../../Constants/PhotoOptions'



export default function Home() {

    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
    const [options, SetOptions] = useState(DEFAULT_OPTIONS)
    const selectedOption = options[selectedOptionIndex]

    function handleSliderChange({ target }) {
        SetOptions(prevOptions => {
            return prevOptions.map((option, index) => {
                if(index !== selectedOptionIndex) return option
                return { ...option, value: target.value}
            })
        })
    }

    function getImageStyle() {
        const filters = options.map(option => {
            return `${option.property}(${option.value}${option.unit})`
        })

        return { filter: filters.join(" ") }
    }


    return (
    <div className='container'>
        <div className='main-image' style={getImageStyle()} />
        <div className='sidebar'>
            {options.map((option, index) => {
                return (
                    <SidebarItem
                        key={index}
                        name={option.name}
                        active={index === selectedOptionIndex}
                        handleClick={() => setSelectedOptionIndex(index)}
                    />
                ) 
            })}
        </div>
        <Slider 
            min = {selectedOption.range.min}
            max = {selectedOption.range.max}
            value = {selectedOption.value}
            handleChange={handleSliderChange}

        />
    </div>
    )
}
