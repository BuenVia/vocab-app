import { useState } from 'react'
import vocab from '../vocab'

export default function QuestionBox() {

    const [show, setShow] = useState(false)
    const [index, setIndex] = useState(0)
    const [vocabulary, setVocabulary] = useState({
        id: 0,
        eng: '',
        esp: ''
    })
    const [answer, setAnswer] = useState('')
    const [summary, setSummary] = useState(false)

    function handleChange(e) {
        setAnswer(e.target.value)
    }

    function handleClick() {
        if(answer !== vocabulary.eng) {
            console.log(vocabulary.eng)
        }
        if(answer === vocabulary.eng && index < vocab.length) {
            setShow(true)
            setIndex(prevVal => {
                return prevVal + 1
            })
            setVocabulary(() => {
                return {
                    eng: vocab[index].eng,
                    esp: vocab[index].esp
                }
            })
            setAnswer('')
        }
        if (index >= vocab.length) { 
            setShow(false)
            setSummary(true)
        }
    }

    return (
        <div className="question-box">
            {show && 
                <div>
                    <label>{vocabulary.esp}</label>
                    <input type="text" name="userAnswer" onChange={handleChange} value={answer} />
                </div>}
            <button onClick={handleClick}>{vocabulary.id === 0 ? 'Start' : 'Submit'}</button>
            {summary && vocab.map(v => {
                return <p>{v.eng} = {v.esp}</p>
            })}
        </div>
    )
}