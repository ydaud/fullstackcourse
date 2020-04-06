import React from 'react'

const Part = ({ part, exercises }) => {
    return (
        <p>
            {part} {exercises}
        </p>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part =>
                <Part key={part.id}
                    part={part.name}
                    exercises={part.exercises}
                />
            )}
        </div>
    )
}

export default Content
