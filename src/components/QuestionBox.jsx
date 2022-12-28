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
        if(answer !== vocabulary.esp) {
            console.log(vocabulary.eng)
        }
        if(answer === vocabulary.esp && index < vocab.length) {
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

    function speakWord(text) {
        const speech = new SpeechSynthesisUtterance()
        if(speechSynthesis.speaking) return
        speech.lang = 'es-ES'
        speech.text = text
        speech.rate = 1
        speechSynthesis.speak(speech)
    }

    function playWord() {
        speakWord(vocabulary.esp)
    }

    return (
        <div className="field box">
            {show && 
                <div className='question box'>
                    <label className='label'>{vocabulary.eng} <i className="fa-solid fa-volume-high" onClick={playWord}></i></label>
                    <input type="text" className='input-field' name="userAnswer" onChange={handleChange} value={answer} autoFocus/>
                </div>}
            <button className='btn' onClick={handleClick}>{vocabulary.id === 0 ? 'Start' : 'Submit'}</button>
            {summary && vocab.map(v => {
                return <p>{v.eng} = {v.esp}</p>
            })}
        </div>
    )
}